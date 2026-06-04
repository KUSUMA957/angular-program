import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../services/employee.service';
import { Employee, CreateEmployeeRequest } from '../models/employee.interface';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  // 🔹 STATE MANAGEMENT IN COMPONENT (not in service)
  // Using signals for reactive state management
  employees = signal<Employee[]>([]);
  selectedEmployee = signal<Employee | null>(null);
  loading = signal<boolean>(false);
  creating = signal<boolean>(false);
  error = signal<string | null>(null);

  // Form data
  showCreateForm = false;
  searchDepartment = '';
  newEmployee: CreateEmployeeRequest = {
    name: '',
    email: '',
    department: '',
    position: '',
    salary: 0
  };

  /**
   * Load all employees using the stateless service
   * The service returns an Observable, component manages the state
   */
  loadEmployees(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        // 🔹 STATE STORED IN COMPONENT, NOT SERVICE
        this.employees.set(employees);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

  /**
   * Search employees by department
   * Service returns filtered Observable, component updates state
   */
  searchByDepartment(): void {
    if (!this.searchDepartment.trim()) {
      this.loadEmployees();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeeService.getEmployeesByDepartment(this.searchDepartment).subscribe({
      next: (employees) => {
        this.employees.set(employees);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      }
    });
  }

  /**
   * View employee details
   * Service returns single employee Observable
   */
  viewEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.selectedEmployee.set(employee);
      },
      error: (error) => {
        this.error.set(error.message);
      }
    });
  }

  /**
   * Create new employee
   * Service returns created employee Observable
   */
  createEmployee(): void {
    this.creating.set(true);
    this.error.set(null);

    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (createdEmployee) => {
        // Update local state with new employee
        const currentEmployees = this.employees();
        this.employees.set([...currentEmployees, createdEmployee]);
        
        // Reset form
        this.newEmployee = { name: '', email: '', department: '', position: '', salary: 0 };
        this.showCreateForm = false;
        this.creating.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.creating.set(false);
      }
    });
  }

  /**
   * Delete employee
   * Service returns success Observable
   */
  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: (result) => {
        if (result.success) {
          // Remove from local state
          const currentEmployees = this.employees();
          this.employees.set(currentEmployees.filter(emp => emp.id !== id));
          
          // Clear selection if deleted employee was selected
          if (this.selectedEmployee()?.id === id) {
            this.selectedEmployee.set(null);
          }
        }
      },
      error: (error) => {
        this.error.set(error.message);
      }
    });
  }

  ngOnInit(): void {
    // Load initial data
    this.loadEmployees();
  }
}
