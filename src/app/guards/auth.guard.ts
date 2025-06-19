import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAccess(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAccess(childRoute);
  }


  // private checkAccess(route: ActivatedRouteSnapshot): boolean {
  //   const token = sessionStorage.getItem('jwtToken');
  //   console.log('Token vorhanden?', !!token);
  //   if (!token) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   const rolesString = sessionStorage.getItem('roles');
  //   let userRoles: string[] = [];

  //   try {
  //     const parsed = JSON.parse(rolesString || '[]');
  //     userRoles = Array.isArray(parsed) ? parsed : [parsed];
  //   } catch {
  //     userRoles = rolesString ? [rolesString] : [];
  //   }
  //   console.log('User-Rollen:', userRoles);

  //   let allowedRolesRaw = route.data['roles'];
  //   let allowedRoles: string[] = [];

  //   if (!allowedRolesRaw) {
  //     console.log('Keine Rollen im Route-Data, Zugriff erlaubt');
  //     return true;
  //   }

  //   allowedRoles = Array.isArray(allowedRolesRaw) ? allowedRolesRaw : [allowedRolesRaw];
  //   console.log('Erlaubte Rollen für Route:', allowedRoles);

  //   const hasAccess = userRoles.some(role => allowedRoles.includes(role));
  //   console.log('Hat Zugriff?', hasAccess);

  //   if (!hasAccess) {
  //     this.router.navigate(['/unauthorized']);
  //   }

  //   return hasAccess;
  // }

  private checkAccess(route: ActivatedRouteSnapshot): boolean {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    let userRoles: string[] = [];
    try {
      const parsed = JSON.parse(sessionStorage.getItem('roles') || '[]');
      userRoles = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      userRoles = sessionStorage.getItem('roles') ? [sessionStorage.getItem('roles')!] : [];
    }

    const allowedRolesRaw = route.data['roles'];
    if (!allowedRolesRaw) {
      // Kein Rollen-Check definiert -> Zugriff erlauben
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