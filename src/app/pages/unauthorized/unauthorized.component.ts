// unauthorized.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized-container">
      <h1>Zugriff verweigert</h1>
      <p>Du hast keine Berechtigung, diese Seite zu sehen.</p>
      <button (click)="goHome()" class="btn btn-primary">Zur Startseite</button>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60vh;
      text-align: center;
      color: #b00020;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
