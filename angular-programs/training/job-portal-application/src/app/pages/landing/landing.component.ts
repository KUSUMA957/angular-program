import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pwd = group.get('password')?.value;
  const cpwd = group.get('confirmPassword')?.value;
  return pwd && cpwd && pwd !== cpwd ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  activePanel: 'none' | 'login' | 'register' = 'none';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loading = false;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: passwordMatchValidator })
    });
  }

  get lf() { return this.loginForm.controls; }
  get rf() { return this.registerForm.controls; }
  get pwdGroup() { return (this.registerForm.get('passwordGroup') as FormGroup).controls; }

  showLogin() {
    this.message = '';
    this.error = '';
    this.activePanel = 'login';
  }

  showRegister() {
    this.message = '';
    this.error = '';
    this.activePanel = 'register';
  }

  closePanel() {
    this.activePanel = 'none';
    this.message = '';
    this.error = '';
    this.loginForm.reset();
    this.registerForm.reset();
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in your email and password correctly.';
      return;
    }
    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.auth.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  submitRegister() {
    if (this.registerForm.invalid) {
      if (this.registerForm.get('passwordGroup')?.hasError('passwordMismatch')) {
        this.error = 'Passwords do not match.';
      } else {
        this.error = 'Please correct the highlighted fields.';
      }
      return;
    }

    const { name, email } = this.registerForm.value;
    const password = this.registerForm.value.passwordGroup.password;

    this.loading = true;
    this.error = '';
    this.message = '';
    this.auth.register({ name, email, password }).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Registration successful! Please login.';
        this.activePanel = 'login';
        this.loginForm.patchValue({ email });
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}