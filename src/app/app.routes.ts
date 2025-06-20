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
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SessionExpiredComponent } from './pages/session-expired/session-expired.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'sessionexpired', component: SessionExpiredComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children:
      [
        { path: 'dashboard', component: DashboardComponent, data: { roles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },
        { path: 'profile', component: ProfileComponent, data: { roles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },
        { path: 'userappointmentbooking', component: UserAppointmentBookingComponent, data: { roles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },


        { path: 'adminschedulemanager', component: AdminScheduleManagerComponent, data: { roles: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },
        { path: 'settings', component: SettingsComponent, data: { roles: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },

        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      ]
  },

  { path: '**', component: PageNotFoundComponent }


];
