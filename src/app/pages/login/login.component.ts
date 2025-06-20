import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

interface ErrorResponse {
  message: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  jwtToken: string;
  username: string;
  roles: string[];
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  passwordVisible = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const loginData: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.login(loginData);
  }

  private login(data: LoginRequest) {
    this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', data, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (res) => this.handleLoginSuccess(res),
      error: (err) => this.handleLoginError(err)
    });
  }

  private handleLoginSuccess(response: LoginResponse) {
    sessionStorage.setItem('jwtToken', response.jwtToken);
    sessionStorage.setItem('username', response.username);
    sessionStorage.setItem('roles', JSON.stringify(response.roles));
    this.router.navigate(['/dashboard']);
  }

  private handleLoginError(err: any) {
    const errorBody = err.error as ErrorResponse;
    this.errorMessage = 'Login fehlgeschlagen: ' + (errorBody?.message || 'Unbekannter Fehler');
  }
}
