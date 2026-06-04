import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   constructor(private authService: Auth, private router: Router) {}
  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
