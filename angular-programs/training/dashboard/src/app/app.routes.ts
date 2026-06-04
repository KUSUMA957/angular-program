import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile.component';
import { SettingsComponent } from './dashboard/settings.component';
import { ReportsComponent } from './dashboard/reports.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }  // ✅ fix
];