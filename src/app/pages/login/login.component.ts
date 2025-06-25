import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;
  showPassword = false;
  email: string = '';
  password: string = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  onSubmit() {
    this.isLoading = true;

    const data: LoginRequest = {
      username: this.email,
      password: this.password,
    };

    this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data)
      .subscribe({
        next: (response) => {
          this.handleLoginSuccess(response);
          this.isLoading = false;
        },
        error: (err) => {
          this.handleLoginError(err);
          this.isLoading = false;
        }
      });
  }

  private handleLoginSuccess(response: LoginResponse) {
    sessionStorage.setItem('jwtToken', response.jwtToken);
    sessionStorage.setItem('username', response.username);
    sessionStorage.setItem('roles', JSON.stringify(response.roles));

    this.router.navigate(['/userappointmentbooking']);
  }

  private handleLoginError(err: any) {
    const errorBody = err.error as ErrorResponse;
    this.errorMessage = 'Login fehlgeschlagen: ' + (errorBody?.message || 'Unbekannter Fehler');
  }
}
