import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDatePipe } from '../../pipes/jwt-date.pipe';


export interface UserProfileDto {
  id: number;
  username: string;
  role: string;
  jwtissuedAtDate: Date;
  jwtexpirationDate: Date;
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    JwtDatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userInfo!: UserProfileDto;
  countdown: string = '';
  private countdownInterval?: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.http.get<UserProfileDto>('http://localhost:8080/api/user/profile').subscribe({
      next: (data) => {
        this.userInfo = {
          ...data,
          jwtissuedAtDate: new Date(data.jwtissuedAtDate),
          jwtexpirationDate: new Date(data.jwtexpirationDate)
        };
        this.startCountdown();
      },
      error: (err) => console.error('Fehler beim Laden des Benutzerprofils', err)
    });
  }

  private startCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.countdownInterval = setInterval(() => {
      if (!this.userInfo) {
        this.countdown = '';
        return;
      }

      const now = new Date().getTime();
      const exp = this.userInfo.jwtexpirationDate.getTime();
      const diffMs = exp - now;

      if (diffMs <= 0) {
        this.countdown = 'Abgelaufen';
        clearInterval(this.countdownInterval);
        return;
      }

      const pad = (n: number, digits = 2) => n.toString().padStart(digits, '0');

      const minutes = Math.floor(diffMs / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      const hundredths = Math.floor((diffMs % 1000) / 10);

      this.countdown = `${pad(minutes)}:${pad(seconds)}:${pad(hundredths)}`;
    }, 100); // 100 ms Intervall für flüssigere Millisekundenanzeige
  }
}
