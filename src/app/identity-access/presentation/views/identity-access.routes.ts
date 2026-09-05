import { Routes } from '@angular/router';
import { authGuard } from './auth-guard/auth-guard';

const authPage = () => import('./auth-page/auth-page').then((m) => m.AuthPage);
const profilePage = () => import('./profile-page/profile-page').then((m) => m.ProfilePage);

export const identityAccessRoutes: Routes = [
  { path: '', loadComponent: authPage, title: 'SafeStep - Acess' },
];

export const identityAccessProtectedRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: profilePage,
    canActivate: [authGuard],
    title: 'SafeStep - Perfil',
  },
];
