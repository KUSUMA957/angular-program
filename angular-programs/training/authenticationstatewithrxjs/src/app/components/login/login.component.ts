import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email"
              type="email" 
              formControlName="email" 
              class="form-control"
              [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            >
            <div class="error-message" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              id="password"
              type="password" 
              formControlName="password" 
              class="form-control"
              [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            >
            <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
            </div>
          </div>

          <div class="error-message" *ngIf="error$ | async as error">
            {{ error }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary"
            [disabled]="loginForm.invalid || (isLoading$ | async)"
          >
            <span *ngIf="isLoading$ | async">Logging in...</span>
            <span *ngIf="!(isLoading$ | async)">Login</span>
          </button>
        </form>

        <div class="auth-links">
          <p>Don't have an account? <a routerLink="/register">Register here</a></p>
          <p class="demo-info">Demo: user@example.com / password</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }

    .login-card h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e1e5e9;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-control.error {
      border-color: #e74c3c;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      margin-bottom: 0.5rem;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .auth-links {
      text-align: center;
      margin-top: 1.5rem;
    }

    .auth-links p {
      margin: 0.5rem 0;
      color: #666;
    }

    .auth-links a {
      color: #667eea;
      text-decoration: none;
    }

    .auth-links a:hover {
      text-decoration: underline;
    }

    .demo-info {
      font-size: 0.875rem;
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #e9ecef;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private destroy$ = new Subject<void>();

  // Expose observables for template
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
    // Initialize observables after authService is available
    this.isLoading$ = this.authService.isLoading$;
    this.error$ = this.authService.error$;
  }

  ngOnInit(): void {
    // Clear any previous errors
    this.authService.clearError();

    // Redirect if already authenticated
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginRequest = this.loginForm.value;
      
      this.authService.login(credentials)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user: any) => {
            console.log('Login successful:', user);
            this.router.navigate(['/dashboard']);
          },
          error: (error: any) => {
            console.error('Login failed:', error);
            // Error is already handled in the service
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }
}
