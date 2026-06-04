// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { ProductListPageComponent } from './products/product-list-page/product-list-page.component';
import { SalesPageComponent } from './sales/sales-page/sales-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },

  { path: 'products', component: ProductListPageComponent },
  { path: 'sales', component: SalesPageComponent },

  { path: '**', redirectTo: 'login' }
];