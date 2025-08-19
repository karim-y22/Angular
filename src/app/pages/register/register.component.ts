import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isSubmitting = false;


  formData = {
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    age: null as number | null,
    dateOfBirth: '',
    phoneNumber: ''
  };

  errorMessage: string | null = null;
  fieldErrors: { [key: string]: string } = {};

  constructor(private http: HttpClient, private router: Router) { }


  onSubmit() {
    // Fehler zurücksetzen
    this.errorMessage = null;
    this.fieldErrors = {};
    this.isSubmitting = true; // Button deaktivieren

    // HTTP POST an dein Backend mit den Formulardaten
    this.http.post(`${environment.apiUrl}/auth/register`, this.formData).subscribe({
      next: (res) => {
        console.log('Registrierung erfolgreich', res);

        // Nach erfolgreicher Registrierung weiterleiten
        // Wir leiten auf die Login-Seite weiter und übergeben einen Query-Parameter "registered=true"
        this.router.navigate(['/registersuccess']);

        this.isSubmitting = false; // Button wieder aktivieren
      },
      error: (err) => {
        console.error('Fehler bei Registrierung', err);
        this.isSubmitting = false;

        // Fehler aus Backend auswerten und zu den passenden Feldern zuordnen
        if (err.error && err.error.errors) {
          err.error.errors.forEach((e: any) => {
            if (e.field && e.field !== 'registerUserDTO') {
              // Spezifische Feldfehler
              this.fieldErrors[e.field] = e.message;
            } else {
              // Allgemeine Fehlermeldung ohne Feldbezug
              this.errorMessage = e.message;
            }
          });
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Unbekannter Fehler';
        }
      },
    });
  }


  getFieldError(fieldName: string): string | null {
    return this.fieldErrors[fieldName] || null;
  }
}
