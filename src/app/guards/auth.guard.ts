import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('AuthGuard: canActivate called');

    const token = sessionStorage.getItem('jwtToken');
    console.log('JWT Token from sessionStorage:', token);

    if (!token) {
      console.warn('Kein Token gefunden – Weiterleitung zu /login');
      this.router.navigate(['/login']);
      return false;
    }

    if (this.isTokenExpired(token)) {
      console.warn('Token ist abgelaufen – Weiterleitung zu /sessionexpired');
      this.router.navigate(['/sessionexpired']);
      return false;
    }

    const allowedRoles: string[] = route.data['roles'] || [];
    console.log('Erlaubte Rollen für Route:', allowedRoles);

    const userRoles = this.getUserRolesFromSessionStorage();
    console.log('Rollen des Benutzers aus sessionStorage:', userRoles);

    const hasAccess = allowedRoles.length === 0 || userRoles.some(role => allowedRoles.includes(role));
    console.log('Hat Benutzer Zugang zur Route?', hasAccess);

    if (!hasAccess) {
      console.warn('Benutzer hat keine Berechtigung – Weiterleitung zu /unauthorized');
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      console.log('JWT decoded im isTokenExpired:', decoded);

      const now = Date.now() / 1000;
      const exp = decoded.exp;
      if (!exp) {
        console.warn('Token enthält kein exp-Feld - gilt als abgelaufen');
        return true;
      }

      const expired = exp < now;
      console.log(`Token expires at ${exp} (now: ${now}) - expired? ${expired}`);
      return expired;
    } catch (e) {
      console.error('Fehler beim JWT-Decode in isTokenExpired:', e);
      return true;
    }
  }

  private getUserRolesFromSessionStorage(): string[] {
    const rolesRaw = sessionStorage.getItem('roles');
    console.log('sessionStorage.getItem("roles"):', rolesRaw);

    if (!rolesRaw) {
      console.warn('Keine Rollen im sessionStorage gefunden');
      return [];
    }

    try {
      const parsed = JSON.parse(rolesRaw);

      if (Array.isArray(parsed)) {
        console.log('Rollen als Array erkannt:', parsed);
        return parsed.map(role => String(role).trim());
      }

      if (typeof parsed === 'string') {
        console.log('Einzelne Rolle als JSON-String erkannt:', parsed);
        return parsed.split(',').map(role => role.trim()).filter(role => !!role);
      }
    } catch (err) {
      console.log('Rollen sind kein JSON - wahrscheinlich ein Komma-getrennter String');
    }

    // Fallback: Komma-getrennter String
    if (typeof rolesRaw === 'string') {
      const roles = rolesRaw.split(',').map(role => role.trim()).filter(role => !!role);
      console.log('Rollen als String geparsed (Fallback):', roles);
      return roles;
    }

    console.warn('Unerwartetes Format für Rollen:', rolesRaw);
    return [];
  }

}
