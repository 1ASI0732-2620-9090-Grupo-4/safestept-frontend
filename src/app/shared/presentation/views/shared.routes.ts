import { Routes } from '@angular/router';

const dashboardPage = () => import('./dashboard/dashboard-page').then((m) => m.DashboardPage);

export const sharedRoutes: Routes = [
  { path: 'dashboard', loadComponent: dashboardPage, title: 'SafeStep - Dashboard' },
];
