import { Routes } from '@angular/router';
import { RecordsComponent } from './features/records/records.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/records',
    pathMatch: 'full',
  },
  {
    path: 'records',
    component: RecordsComponent,
  },
  {
    path: 'records/:plateId',
    component: RecordsComponent,
  },
];
