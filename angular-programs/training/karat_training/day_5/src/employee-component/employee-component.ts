import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee-service';

@Component({
  selector: 'app-employee-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];
  loading = false;
  errorMsg = '';
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.loading = true;
    this.errorMsg = '';
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err;
        this.loading = false;
      }
    });
  }

  addEmployee(): void {
    const employeeData = {
      name: 'Kusuma'
    };
    this.loading = true;
    this.employeeService.addEmployee(employeeData).subscribe({
      next: () => {
        alert('Emp added');
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err;
        this.loading = false;
      }
    });
  }

  updateEmployee() {
    const employee = {
      name: 'Updated name'
    };
    this.loading = true;
    this.employeeService
      .updateEmployee(1, employee)
      .subscribe({
        next: () => {
          alert('Emp updated');
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = err;
          this.loading = false;
        }
      });
  }

  deleteEmployee() {
    this.loading = true;
    this.employeeService.deleteEmployee(1).subscribe({
      next: () => {
         alert('Emp deleted');
         this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err;
        this.loading = false;
      }
    });
  }
}
