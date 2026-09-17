import { Routes } from '@angular/router';
import { authGuard } from './auth-guard/auth-guard';
import { adminGuard } from './auth-guard/admin-guard';

const authPage = () => import('./auth-page/auth-page').then((m) => m.AuthPage);
const profilePage = () => import('./profile-page/profile-page').then((m) => m.ProfilePage);
const userList = () => import('./user-list/user-list').then((m) => m.UserList);
const userRolesForm = () => import('./user-roles-form/user-roles-form').then((m) => m.UserRolesForm);

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
  {
    path: 'users',
    loadComponent: userList,
    canActivate: [adminGuard],
    title: 'SafeStep - Users',
  },
  {
    path: 'users/edit/:id',
    loadComponent: userRolesForm,
    canActivate: [adminGuard],
    title: 'SafeStep - Edit User Roles',
  },
];
