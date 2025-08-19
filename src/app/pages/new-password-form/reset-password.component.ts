import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  static readonly API_URL = `${environment.apiUrl}`;

  message: string = '';
  success = false;
  error = false;
  resetPassForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    // Hole den "token"-Parameter aus der URL oder nutze '' falls keiner vorhanden
    const token = this.route.snapshot.queryParamMap.get('token') || '';

    this.resetPassForm = this.fb.group({
      token: [token],
      newPassword: [''],
      confirmNewPassword: ['']
    });
  }

  handleResetPassForm() {
    // Sende die Formularwerte an das Backend, um das Passwort zurückzusetzen
    this.http.post<{ message: string }>(
      `${environment.apiUrl}/auth/reset-password`,
      this.resetPassForm.value
    )
      .pipe(
        // tap wird genutzt, um Nebeneffekte auszuführen, ohne die Daten im Stream zu verändern
        tap((result) => {
          this.message = result.message; // Zeige die Erfolgsmeldung
          this.success = true;
          this.error = false;

          this.resetPassForm.reset(); // Formular zurücksetzen
        }),
        catchError((err: HttpErrorResponse) => {
          this.success = false;
          this.error = true;

          // Standard-Fehlermeldung
          let errorMsg = 'Unbekannter Fehler. Bitte versuche es erneut.';

          if (err.error && typeof err.error === 'object') {
            const hasFieldErrors = Object.entries(err.error).some(([key, _]) => key !== 'message');

            if (hasFieldErrors) {
              // Setze Feld-spezifische Fehler auf die FormControls
              Object.entries(err.error).forEach(([field, message]) => {
                const controlName = field.split('.').pop() ?? field;
                if (field !== 'message' && this.resetPassForm.controls[controlName]) {
                  this.resetPassForm.controls[controlName].setErrors({ backend: message });
                }
              });
            }

            // Nutze die Nachricht vom Backend, falls vorhanden
            errorMsg = err.error.message ?? errorMsg;
          }

          this.message = errorMsg;

          return of(null); // Stream wird nicht abgebrochen
        })
      )
      .subscribe();
  }
}

