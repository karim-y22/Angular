import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAccess(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAccess(childRoute);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;
      return decoded.exp ? decoded.exp < now : true;
    } catch {
      return true; // Token ungültig oder nicht decodierbar
    }
  }

  private checkAccess(route: ActivatedRouteSnapshot): boolean {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.isTokenExpired(token)) {
      sessionStorage.clear();
      this.router.navigate(['/sessionexpired']);
      return false;
    }

    let userRoles: string[] = [];
    try {
      const parsed = JSON.parse(sessionStorage.getItem('roles') || '[]');
      userRoles = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      const roles = sessionStorage.getItem('roles');
      userRoles = roles ? [roles] : [];
    }

    const allowedRolesRaw = route.data['roles'];
    if (!allowedRolesRaw) {
      // Kein Rollen-Check -> Zugriff erlauben
      return true;
    }

    const allowedRoles = Array.isArray(allowedRolesRaw) ? allowedRolesRaw : [allowedRolesRaw];
    const hasAccess = userRoles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
      this.router.navigate(['/unauthorized']);
    }

    return hasAccess;
  }
}
