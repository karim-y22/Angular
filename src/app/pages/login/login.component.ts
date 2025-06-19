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
 username: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginPayload = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8080/login', loginPayload, { responseType: 'text' })
      .subscribe({
        next: response => {
          console.log('Login erfolgreich', response);
          this.errorMessage = '';
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          this.errorMessage = 'Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.';
        }
      });
  }
}
