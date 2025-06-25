import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwtTokeninterceptor';

export const appConfig: ApplicationConfig = {
  providers: 
  [
     provideHttpClient(
     withXsrfConfiguration({
       cookieName: 'XSRF-TOKEN',
       headerName: 'X-XSRF-TOKEN'
     }),
      withInterceptors([jwtInterceptor])
    ),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
