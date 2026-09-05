import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSessionStorage } from './auth-session-storage';

const PUBLIC_AUTH_PATHS = [
  '/authentication/sign-in',
  '/authentication/sign-up',
];

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(AuthSessionStorage);
  const router = inject(Router);
  const isPlatformRequest = request.url.startsWith(environment.platformProviderApiBaseUrl);
  const isPublicAuthRequest = PUBLIC_AUTH_PATHS.some((path) => request.url.includes(path));
  const token = session.getAccessToken();

  const authorizedRequest =
    isPlatformRequest && !isPublicAuthRequest && token
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

  return next(authorizedRequest).pipe(
    catchError((error: unknown) => {
      if (isPlatformRequest && typeof error === 'object' && error !== null && 'status' in error && error.status === 401) {
        session.clear();
        void router.navigate(['/auth']);
      }
      return throwError(() => error);
    }),
  );
};

