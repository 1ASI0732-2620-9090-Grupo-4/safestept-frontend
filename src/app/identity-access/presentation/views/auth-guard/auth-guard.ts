import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IdentityAccessStore } from '../../../application/identity-access-store';

export const authGuard: CanActivateFn = () => {
  const store = inject(IdentityAccessStore);
  const router = inject(Router);

  if (store.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/auth');
};
