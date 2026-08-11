import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/environment-info.component').then(
        (m) => m.EnvironmentInfoComponent
      )
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
