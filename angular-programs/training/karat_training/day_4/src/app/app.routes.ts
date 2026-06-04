import { Routes } from '@angular/router';
import { adminGuard } from '../guard/admin-guard';
export const routes: Routes = [
    {
        path:'',
        loadComponent:() => import('../home/home/home')
        .then(comp => comp.Home)
    },
    {
        path:'admin',
        canActivate: [adminGuard],
        loadComponent:() => import('../admin-dashboard-component/admin-dashboard-component')
        .then(comp => comp.AdminDashboardComponent)
    }
];
