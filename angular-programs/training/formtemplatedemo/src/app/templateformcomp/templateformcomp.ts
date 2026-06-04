import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Employee model interface
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  isActive: boolean;
}

@Component({
  selector: 'app-templateformcomp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './templateformcomp.html',
  styleUrls: ['./templateformcomp.css']
})
export class TemplateformcompComponent {
  
  // Employee model instance
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: 0,
    hireDate: '',
    isActive: true
  };

  // Department options
  departments = [
    'Human Resources',
    'Engineering',
    'Marketing',
    'Sales',
    'Finance',
    'Operations',
    'IT Support'
  ];

  // Position options
  positions = [
    'Manager',
    'Senior Developer',
    'Junior Developer',
    'Analyst',
    'Specialist',
    'Coordinator',
    'Director'
  ];

  // Submitted employees list
  submittedEmployees: Employee[] = [];

  constructor() {}

  // Form submission handler
  onSubmit(employeeForm: NgForm) {
    if (employeeForm.valid) {
      // Generate a new ID
      this.employee.id = this.submittedEmployees.length + 1;
      
      // Add to submitted employees list
      this.submittedEmployees.push({ ...this.employee });
      
      console.log('Employee submitted:', this.employee);
      alert('Employee added successfully!');
      
      // Reset form
      this.resetForm(employeeForm);
    } else {
      console.log('Form is invalid');
      alert('Please fill all required fields correctly.');
    }
  }

  // Reset form
  resetForm(employeeForm: NgForm) {
    this.employee = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: 0,
      hireDate: '',
      isActive: true
    };
    employeeForm.resetForm();
  }


}
