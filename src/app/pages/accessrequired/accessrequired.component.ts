import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accessrequired',
  standalone: true,
  imports: [],
  templateUrl: './accessrequired.component.html',
  styleUrl: './accessrequired.component.css'
})
export class AccessrequiredComponent {
  constructor(private router: Router) { }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
