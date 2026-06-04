import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth-service/auth-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Profile</h2>

    <button (click)="loadProfile()">Load Profile</button>
    <button (click)="logout()">Logout</button>

    <p>{{ message }}</p>
  `
})
export class ProfileComponent {

  message = '';

  constructor(private authService: AuthService) {}

  loadProfile() {
    const token = this.authService.getToken();

    if (token) {
      this.message = 'Access allowed';
    } else {
      this.message = 'Access denied. Please login';
    }
  }

  logout() {
    this.authService.logout();
    this.message = 'Logged out ✅';
  }
}