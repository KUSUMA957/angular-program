import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  creds = { username: '', password: '' };
  welcomeMsg = '';

  submit(form: NgForm) {
    if (form.invalid) return;
    // Simulate success (replace with real auth check if needed)
    this.welcomeMsg = `Welcome ${this.creds.username}`;
  }

  reset(form: NgForm) {
    form.resetForm({ username: '', password: '' });
    this.welcomeMsg = '';
  }
}