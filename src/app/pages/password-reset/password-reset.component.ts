import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {


  static readonly API_URL = `${environment.apiUrl}`;

  message: string = '';
  success = false;
  error = false;
  forgotpassForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.forgotpassForm = this.fb.group({
      emailOrUsername: ['']
    });
  }

  handleForm() {
    this.http.post<{ message: string }>(`${environment.apiUrl}/auth/forgot`, this.forgotpassForm.value)
      .pipe(
        tap((result) => {
          this.message = result.message;
          this.success = true;
          this.error = false;
          this.forgotpassForm.reset();
        }),
        catchError((err: HttpErrorResponse) => {
          this.success = false;
          this.error = true;

          if (err.error && typeof err.error === 'object') {
            const hasFieldErrors = Object.entries(err.error).some(([key, _]) => key !== 'message');

            if (hasFieldErrors) {
              // Feldfehler anzeigen
              Object.entries(err.error).forEach(([field, message]) => {
                if (field !== 'message' && this.forgotpassForm.controls[field]) {
                  this.forgotpassForm.controls[field].setErrors({ backend: message });
                }
              });

              // Wenn es auch eine generelle Nachricht gibt
              this.message = err.error.message ?? 'Ein Validierungsfehler ist aufgetreten.';
            } else if (err.error.message) {
              // Nur generelle Nachricht vorhanden
              this.message = err.error.message;
            } else {
              this.message = 'Unbekannter Fehler. Bitte versuche es erneut.';
            }
          } else {
            this.message = 'Unbekannter Fehler. Bitte versuche es erneut.';
          }

          return of(null);
        })


      ).subscribe();
  }

}
