import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


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
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<LoginResponse>('http://localhost:8080/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        sessionStorage.setItem('jwtToken', response.jwtToken);
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('roles', JSON.stringify(response.roles));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Login fehlgeschlagen: ' + (err.error?.message || err.statusText);
      }
    });
  }
}
