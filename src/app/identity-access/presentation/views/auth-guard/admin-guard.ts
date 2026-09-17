import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IdentityAccessStore } from '../../../application/identity-access-store';

export const adminGuard: CanActivateFn = () => {
  const store = inject(IdentityAccessStore);
  const router = inject(Router);
  return store.isAdmin() ? true : router.parseUrl('/app/dashboard');
};
