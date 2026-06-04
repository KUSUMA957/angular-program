import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-registration-component',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './employee-registration-component.html',
  styleUrl: './employee-registration-component.css',
})
export class EmployeeRegistrationComponent {
employeeForm: FormGroup;
  constructor() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      department: new FormControl('', Validators.required)
    });
  }

  submitForm() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }
  }

}
