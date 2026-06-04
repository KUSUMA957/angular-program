import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent {
  name = '';
  email = '';
  password = '';
  error = signal('');

  private auth = inject(AuthService);
  private router = inject(Router);

  signup() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.auth.signup(user).subscribe(() => {
      alert('Signup successful!');
      this.router.navigate(['/login']);
    });
  }
}