import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authService: Auth, private router: Router) {}
  loginUser() {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }
}
