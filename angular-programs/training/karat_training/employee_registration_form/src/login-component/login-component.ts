import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    });
  }
  login() {
    console.log(this.loginForm.value);
  }
  resetForm() {
    this.loginForm.reset();  
  }

}
