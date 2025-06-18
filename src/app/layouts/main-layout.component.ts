import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

  constructor(private router: Router) { }



  logout() {
    // Token und User-Daten aus LocalStorage löschen
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    // Zur Login-Seite navigieren
    this.router.navigate(['/login']);
  }
}
