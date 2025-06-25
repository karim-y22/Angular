import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-expired',
  imports: [],
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.css'
})
export class SessionExpiredComponent {

  constructor(private router: Router) { }

  onLogin() {
    this.router.navigate(['/login']);
  }

}
