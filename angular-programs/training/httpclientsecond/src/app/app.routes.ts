import { Routes } from '@angular/router';
import { EmployeeManagementComponent } from './components/employee-management.component';
import { PostsComponent } from './components/posts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeManagementComponent },
  { path: 'posts', component: PostsComponent },
  { path: '**', redirectTo: '/employees' }
];
