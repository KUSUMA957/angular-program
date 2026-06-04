import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-rxjs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h3>RxJS Authentication</h3>
      <div class="status">
        Status: <span [class]="isLoggedIn ? 'logged-in' : 'logged-out'">
          {{ isLoggedIn ? 'Logged In' : 'Logged Out' }}
        </span>
      </div>
      
      <div *ngIf="!isLoggedIn" class="login-form">
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
      
      <div *ngIf="isLoggedIn" class="logout-section">
        <p>Welcome, {{ username }}!</p>
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
export class AuthRxjsComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private subscription = new Subscription();
  
  username = '';
  password = '';
  isLoggedIn = false;

  ngOnInit() {
    this.subscription.add(
      this.authService.isLoggedIn$.subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password);
    }
  }

  logout() {
    this.authService.logout();
    this.username = '';
    this.password = '';
  }
}
