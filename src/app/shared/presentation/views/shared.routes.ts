import { Routes } from '@angular/router';
import { adminGuard } from '../../../identity-access/presentation/views/auth-guard/admin-guard';

const dashboardPage = () => import('./dashboard/dashboard-page').then((m) => m.DashboardPage);
const adminDashboardPage = () => import('./admin-dashboard/admin-dashboard-page').then((m) => m.AdminDashboardPage);

export const sharedRoutes: Routes = [
  { path: 'dashboard', loadComponent: dashboardPage, title: 'SafeStep - Dashboard' },
  { path: 'admin', loadComponent: adminDashboardPage, canActivate: [adminGuard], title: 'SafeStep - Admin' },
];
