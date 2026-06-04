
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';   
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],   
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  email = '';
  password = '';
  error = signal('');

  private auth = inject(AuthService);
  private router = inject(Router);

  login() {
    this.auth.login(this.email, this.password).subscribe(users => {
      if (users.length === 0) {
        this.error.set('Invalid email or password');
        return;
      }
      this.auth.setUser(users[0]);
      this.router.navigate(['/products']);
    });
  }
}