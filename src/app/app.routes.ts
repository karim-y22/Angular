import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { AdminScheduleManagerComponent } from './pages/admin-schedule-manager/admin-schedule-manager.component';
import { UserAppointmentBookingComponent } from './pages/user-appointment-booking/user-appointment-booking.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [

  // Öffentliche Seiten ohne AuthGuard
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-reset', component: PasswordResetComponent },


  {
    path: '',
    component: MainLayoutComponent,
   // canActivate: [AuthGuard],  // Hier sicherstellen, dass nur angemeldete User rein können
    children:
      [
        { path: 'dashboard', component: DashboardComponent } ,
        { path: 'profile', component: ProfileComponent },

        { path: 'adminschedulemanager', component: AdminScheduleManagerComponent },
        { path: 'userappointmentbooking', component: UserAppointmentBookingComponent},

        { path: 'settings', component: SettingsComponent} ,

        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ]
  },

  { path: '**', redirectTo: 'login' }  // falls pfad ned gefunden wurde und später auf PageNotFoundComponent umstellen


];
