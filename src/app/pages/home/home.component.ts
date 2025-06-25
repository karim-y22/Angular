import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  email = 'kontakt@outlook.de';

  constructor(private router: Router) {
  }

  goToBooking() {
    this.router.navigate(['/zugang']);
  }

   get isAuthenticated(): boolean {
    return !!sessionStorage.getItem('jwtToken');
  }

}
