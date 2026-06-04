import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Create Account</h2>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name:</label>
              <input 
                id="firstName"
                type="text" 
                formControlName="firstName" 
                class="form-control"
                [class.error]="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched"
              >
              <div class="error-message" *ngIf="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched">
                <span *ngIf="registerForm.get('firstName')?.errors?.['required']">First name is required</span>
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name:</label>
              <input 
                id="lastName"
                type="text" 
                formControlName="lastName" 
                class="form-control"
                [class.error]="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched"
              >
              <div class="error-message" *ngIf="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched">
                <span *ngIf="registerForm.get('lastName')?.errors?.['required']">Last name is required</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email"
              type="email" 
              formControlName="email" 
              class="form-control"
              [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
              <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input 
              id="password"
              type="password" 
              formControlName="password" 
              class="form-control"
              [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input 
              id="confirmPassword"
              type="password" 
              formControlName="confirmPassword" 
              class="form-control"
              [class.error]="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Confirm password is required</span>
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords don't match</span>
            </div>
          </div>

          <div class="error-message" *ngIf="error$ | async as error">
            {{ error }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary"
            [disabled]="registerForm.invalid || (isLoading$ | async)"
          >
            <span *ngIf="isLoading$ | async">Creating Account...</span>
            <span *ngIf="!(isLoading$ | async)">Create Account</span>
          </button>
        </form>

        <div class="auth-links">
          <p>Already have an account? <a routerLink="/login">Login here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .register-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 500px;
    }

    .register-card h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
      font-weight: 600;
    }

    .form-row {
      display: flex;
      gap: 1rem;
    }

    .form-row .form-group {
      flex: 1;
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
  `]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  private destroy$ = new Subject<void>();
  isLoading$: any;
  error$: any;

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
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword?.errors?.['passwordMismatch']) {
      const errors = { ...confirmPassword.errors };
      delete errors['passwordMismatch'];
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: RegisterRequest = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName
      };
      
      this.authService.register(userData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user: any) => {
            console.log('Registration successful:', user);
            this.router.navigate(['/dashboard']);
          },
          error: (error: any) => {
            console.error('Registration failed:', error);
            // Error is already handled in the service
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }
}
