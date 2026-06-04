import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-admission-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-admission-form.html',
  styleUrl: './student-admission-form.css',
})
export class StudentAdmissionForm {
  
  admissionForm: FormGroup;
  constructor(private router: Router) {
    this.admissionForm = new FormGroup({
      studentName: new FormControl('', Validators.required),
      age: new FormControl('', [
        Validators.required,
        Validators.min(6)
      ]),
      course: new FormControl('', Validators.required)
    });
  }

  submitForm() {
    if (this.admissionForm.valid) {
      console.log(this.admissionForm.value);
      this.router.navigate(['/success']);
    }
  }
}
