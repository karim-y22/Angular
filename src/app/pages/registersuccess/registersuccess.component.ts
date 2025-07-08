import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registersuccess',
  imports: [CommonModule],
  templateUrl: './registersuccess.component.html',
  styleUrl: './registersuccess.component.css'
})
export class RegistersuccessComponent {


  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
