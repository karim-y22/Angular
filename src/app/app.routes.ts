import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SessionExpiredComponent } from './pages/session-expired/session-expired.component';
import { SecurityInfoComponent } from './pages/securityprofile/security.profile.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserAppointmentBookingComponent } from './pages/user-appointment-booking/user-appointment-booking.component';
import { AdminScheduleManagerComponent } from './pages/admin-schedule-manager/admin-schedule-manager.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AccessrequiredComponent } from './pages/accessrequired/accessrequired.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { RegistersuccessComponent } from './pages/registersuccess/registersuccess.component';

export const routes: Routes = [


    { path: 'login', component: LoginComponent },
    { path: 'sessionexpired', component: SessionExpiredComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'password-reset', component: PasswordResetComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'registersuccess', component: RegistersuccessComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full' }, // leerer Pfad (Root) 

    { path: 'home', component: HomeComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'zugang', component: AccessrequiredComponent },



    { path: 'userappointmentbooking', component: UserAppointmentBookingComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },
    { path: 'security', component: SecurityInfoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_SUPERADMIN'] } },

    { path: 'adminschedulemanager', component: AdminScheduleManagerComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_SUPERADMIN'] } },

    { path: '**', component: PageNotFoundComponent },      // Wildcard als letztes


];
