import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './pipes/time.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, CustomDatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentDateTime: Date = new Date();

  constructor(
    private router: Router
  ) { }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    this.router.navigate(['/home']);
  }

  get role(): string | null {
    return sessionStorage.getItem('roles');
  }

  get username(): string | null {
    return sessionStorage.getItem('username');
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
    return roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN');
  }

  get isMember(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    if (!rolesString) return false;

    const roles = JSON.parse(rolesString);
    return roles.includes('ROLE_USER') || roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN');
  }

  get isAuthenticated(): boolean {
    return !!sessionStorage.getItem('jwtToken');
  }
}
