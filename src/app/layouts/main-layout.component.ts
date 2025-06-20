import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
export class MainLayoutComponent implements OnInit, OnDestroy {

  username: string | null = null;
  jwtissuedAtDate?: Date;
  jwtexpirationDate?: Date;
  countdown: string = '';
  private countdownInterval?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadUserInfo();
  }

  ngOnDestroy() {
    this.countdownInterval?.unsubscribe();
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    this.countdownInterval?.unsubscribe();
    this.router.navigate(['/login']);
  }

  private loadUserInfo() {
    // username aus sessionStorage (falls schon gespeichert)
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }

    // User-Info vom Backend, um JWT-Daten zu bekommen
    this.http.get<{ username: string, jwtissuedAtDate: string, jwtexpirationDate: string }>('http://localhost:8080/api/user/profile').subscribe({
      next: (data: { username: string, jwtissuedAtDate: string, jwtexpirationDate: string }) => {
        this.username = data.username;
        this.jwtissuedAtDate = new Date(data.jwtissuedAtDate);
        this.jwtexpirationDate = new Date(data.jwtexpirationDate);
        this.startCountdown();
      },
      error: (err: any) => {
        console.error('Fehler beim Laden des Benutzerprofils', err);
      }
    });

  }

  private startCountdown() {
    this.countdownInterval?.unsubscribe();

    this.countdownInterval = interval(1000).subscribe(() => {
      if (!this.jwtexpirationDate) {
        this.countdown = '';
        return;
      }

      const now = new Date().getTime();
      const exp = this.jwtexpirationDate.getTime();
      const diffMs = exp - now;

      if (diffMs <= 0) {
        this.countdown = 'Abgelaufen';
        this.logout();
        this.countdownInterval?.unsubscribe();
        return;
      }

      const minutes = Math.floor(diffMs / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);

      const minutesStr = minutes.toString().padStart(2, '0');
      const secondsStr = seconds.toString().padStart(2, '0');
      this.countdown = `Abmeldung in ${minutes} Min ${seconds} Sek`;
    });
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
