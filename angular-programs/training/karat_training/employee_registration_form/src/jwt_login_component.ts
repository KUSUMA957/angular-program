import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth-service/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <input
      type="text"
      placeholder="Username"
      [(ngModel)]="username"
    />
    <br><br>
    <input
      type="password"
      placeholder="Password"
      [(ngModel)]="password"
    />
    <br><br>
    <button (click)="login()">Login</button>
    <p>{{ message }}</p>
  `
})
export class JWTLoginComponent {
  username = '';
  password = '';
  message = '';
  constructor(private authService: AuthService) {}
login() {
  this.authService.login(this.username, this.password)
    .subscribe(response => {
      if (response.token) {
        this.authService.saveToken(response.token);
        this.message = 'Login successful';
      } else {
        this.message = 'Invalid credentials';
      }
    });
}
}