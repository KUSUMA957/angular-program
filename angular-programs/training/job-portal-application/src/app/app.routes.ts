// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';
import { LandingComponent } from '../app/pages/landing/landing.component';
import { HomeComponent } from '../app/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' }
];