import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactivecomponents',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactivecomponents.html',
  styleUrl: './reactivecomponents.css',
})
export class Reactivecomponents {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
}
