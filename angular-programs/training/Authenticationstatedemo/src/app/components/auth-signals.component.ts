import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthSignalService } from '../services/auth-signal.service';

@Component({
  selector: 'app-auth-signals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h3>Signals Authentication</h3>
      <div class="status">
        Status: <span [class]="authStatusClass()">
          {{ authStatusText() }}
        </span>
      </div>
      
      <div *ngIf="!authService.isLoggedIn()" class="login-form">
        <h4>Login</h4>
        <input 
          [(ngModel)]="username" 
          placeholder="Username" 
          type="text"
          class="form-input">
        <input 
          [(ngModel)]="password" 
          placeholder="Password" 
          type="password"
          class="form-input">
        <button (click)="login()" class="btn btn-primary">Login</button>
      </div>
      
      <div *ngIf="authService.isLoggedIn()" class="logout-section">
        <p>Welcome, {{ username() }}!</p>
        <button (click)="logout()" class="btn btn-secondary">Logout</button>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px;
      max-width: 400px;
    }
    
    .status {
      margin: 15px 0;
      font-weight: bold;
    }
    
    .logged-in {
      color: green;
    }
    
    .logged-out {
      color: red;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .form-input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .btn:hover {
      opacity: 0.8;
    }
  `]
})
export class AuthSignalsComponent {
  protected authService = inject(AuthSignalService);
  
  username = signal('');
  password = signal('');

  // Computed signals for reactive UI
  authStatusText = computed(() => 
    this.authService.isLoggedIn() ? 'Logged In' : 'Logged Out'
  );
  
  authStatusClass = computed(() => 
    this.authService.isLoggedIn() ? 'logged-in' : 'logged-out'
  );

  login() {
    if (this.username() && this.password()) {
      this.authService.login(this.username(), this.password());
    }
  }

  logout() {
    this.authService.logout();
    this.username.set('');
    this.password.set('');
  }
}
