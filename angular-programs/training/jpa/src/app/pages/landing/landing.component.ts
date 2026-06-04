import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  showLoginForm = false;
  showRegisterForm = false;

  // LOGIN FIELDS
  loginEmail = '';
  loginPassword = '';

  // REGISTER FIELDS
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  message = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  openLogin() {
    this.resetMessages();
    this.showRegisterForm = false;
    this.showLoginForm = true;
  }

  openRegister() {
    this.resetMessages();
    this.showLoginForm = false;
    this.showRegisterForm = true;
  }

  resetMessages() {
    this.message = '';
    this.error = '';
  }

  login() {
    const success = this.auth.login(this.loginEmail, this.loginPassword);
    if (!success) {
      this.error = 'Invalid email or password';
    } else {
      this.router.navigate(['/home']);
    }
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const success = this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    });

    if (!success) {
      this.error = 'Email already exists';
    } else {
      this.message = 'Registered successfully! Please login.';
      this.showRegisterForm = false;
      this.showLoginForm = true;
    }
  }
}