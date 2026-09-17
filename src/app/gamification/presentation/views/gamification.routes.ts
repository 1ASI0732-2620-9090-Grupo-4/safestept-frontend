import { Routes } from '@angular/router';
import { adminGuard } from '../../../identity-access/presentation/views/auth-guard/admin-guard';

const gamificationPage = () => import('./gamification-page/gamification-page').then((m) => m.GamificationPage);
const missionList = () => import('./mission-list/mission-list').then((m) => m.MissionList);
const missionForm = () => import('./mission-form/mission-form').then((m) => m.MissionForm);
const badgeList = () => import('./badge-list/badge-list').then((m) => m.BadgeList);
const badgeForm = () => import('./badge-form/badge-form').then((m) => m.BadgeForm);

export const gamificationRoutes: Routes = [
  { path: 'gamification', loadComponent: gamificationPage, title: 'SafeStep - Gamification' },
  {
    path: 'gamification/admin/missions',
    canActivate: [adminGuard],
    loadComponent: missionList,
    title: 'SafeStep - Manage missions',
  },
  {
    path: 'gamification/admin/missions/new',
    canActivate: [adminGuard],
    loadComponent: missionForm,
    title: 'SafeStep - Add mission',
  },
  {
    path: 'gamification/admin/missions/edit/:id',
    canActivate: [adminGuard],
    loadComponent: missionForm,
    title: 'SafeStep - Edit mission',
  },
  {
    path: 'gamification/admin/badges',
    canActivate: [adminGuard],
    loadComponent: badgeList,
    title: 'SafeStep - Manage badges',
  },
  {
    path: 'gamification/admin/badges/new',
    canActivate: [adminGuard],
    loadComponent: badgeForm,
    title: 'SafeStep - Add badge',
  },
  {
    path: 'gamification/admin/badges/edit/:id',
    canActivate: [adminGuard],
    loadComponent: badgeForm,
    title: 'SafeStep - Edit badge',
  },
];
