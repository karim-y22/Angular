import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }

  get isSuperAdmin(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    if (!rolesString) return false;

    const roles = JSON.parse(rolesString);
    return roles.includes('ROLE_SUPERADMIN');
  }

  get isAdmin(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    if (!rolesString) return false;

    const roles = JSON.parse(rolesString);
    return roles.includes('ROLE_ADMIN');
  }

  get isMember(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    if (!rolesString) return false;

    const roles = JSON.parse(rolesString);
    return roles.includes('ROLE_USER');
  }

  get isAuthenticated(): boolean {
    return !!sessionStorage.getItem('jwtToken');
  }

}
