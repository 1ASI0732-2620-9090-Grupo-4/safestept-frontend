import { Routes } from '@angular/router';

const simulationsPage = () =>
  import('./simulations-page/simulations-page').then((m) => m.SimulationsPage);
const simulationDetailPage = () =>
  import('./simulation-detail-page/simulation-detail-page').then((m) => m.SimulationDetailPage);
const medicalSimulationList = () =>
  import('./medical-simulation-list/medical-simulation-list').then((m) => m.MedicalSimulationList);
const medicalSimulationForm = () =>
  import('./medical-simulation-form/medical-simulation-form').then((m) => m.MedicalSimulationForm);

export const medicalSimulationRoutes: Routes = [
  { path: 'simulations', loadComponent: simulationsPage, title: 'SafeStep - Simulations' },
  {
    path: 'simulations/admin',
    loadComponent: medicalSimulationList,
    title: 'SafeStep - Manage Simulations',
  },
  {
    path: 'simulations/admin/new',
    loadComponent: medicalSimulationForm,
    title: 'SafeStep - Add Simulations',
  },
  {
    path: 'simulations/admin/edit/:id',
    loadComponent: medicalSimulationForm,
    title: 'SafeStep - Edit Simulations',
  },
  { path: 'simulations/:id', loadComponent: simulationDetailPage, title: 'SafeStep - Simulations' },
];
