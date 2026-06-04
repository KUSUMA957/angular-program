import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  imports: [CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  employees: any[] = [];
  message: string = '';
  constructor() {
    console.log('Constructor called');
  }
  ngOnInit(): void {
    this.employees = [
      { id: 1, name: 'Kusuma', role: 'Developer' },
      { id: 2, name: 'Pallavi', role: 'Manager' },
      { id: 3, name: 'Keerthana', role: 'Tester' }
    ];
    this.message = 'Data Loaded Successfully';
    console.log('Component Loaded - Employee data initialized');
  }
}
