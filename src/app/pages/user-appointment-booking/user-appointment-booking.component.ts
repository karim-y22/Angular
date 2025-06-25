import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-appointment-booking',
  standalone:true,
  imports: [],
  templateUrl: './user-appointment-booking.component.html',
  styleUrl: './user-appointment-booking.component.css'
})
export class UserAppointmentBookingComponent {
   constructor(private router: Router) { }

  goToBooking() {
    this.router.navigate(['/booking']); 
  }

}
