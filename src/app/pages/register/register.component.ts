import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8080/api/auth/register', body).subscribe({
      next: response => {
        console.log('Erfolgreich registriert:', response);
      },
      error: error => {
        console.error('Fehler bei der Registrierung:', error);
      }
    });
  }

}
