import { Component } from '@angular/core';
import { EmployeeService } from '../employeeService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  employees: any[] = [];
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
  }
}
