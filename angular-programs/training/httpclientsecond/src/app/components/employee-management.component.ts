import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../models/employee.model';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit {
  employees = signal<Employee[]>([]);
  selectedEmployee = signal<Employee | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  showCreateForm = signal(false);
  showUpdateForm = signal(false);

  // Form data
  newEmployee: CreateEmployeeRequest = this.getEmptyEmployee();
  updateEmployee: UpdateEmployeeRequest = this.getEmptyUpdateEmployee();
  searchId = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  // GET all employees
  loadAllEmployees(): void {
    this.loading.set(true);
    this.error.set(null);

    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        // Map the API response to our Employee model
        const mappedEmployees = employees.map(emp => ({
          id: emp.id,
          firstName: (emp as any).name?.split(' ')[0] || 'John',
          lastName: (emp as any).name?.split(' ')[1] || 'Doe',
          email: (emp as any).email || 'john@example.com',
          position: 'Software Engineer',
          department: 'IT',
          salary: 75000
        }));
        this.employees.set(mappedEmployees);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  // GET employee by ID
  loadEmployeeById(): void {
    const id = parseInt(this.searchId);
    if (!id || id <= 0) {
      this.error.set('Please enter a valid employee ID');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        // Map the API response to our Employee model
        const mappedEmployee = {
          id: employee.id,
          firstName: (employee as any).name?.split(' ')[0] || 'John',
          lastName: (employee as any).name?.split(' ')[1] || 'Doe',
          email: (employee as any).email || 'john@example.com',
          position: 'Software Engineer',
          department: 'IT',
          salary: 75000
        };
        this.selectedEmployee.set(mappedEmployee);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.selectedEmployee.set(null);
        this.loading.set(false);
      }
    });
  }

  // POST create new employee
  createEmployee(): void {
    if (!this.isValidEmployee(this.newEmployee)) {
      this.error.set('Please fill in all required fields');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (employee) => {
        console.log('Employee created:', employee);
        
        // Add the new employee to the local array with a unique ID
        const currentEmployees = this.employees();
        const newId = Math.max(...currentEmployees.map(emp => emp.id), 10) + 1;
        const newEmployeeWithId: Employee = {
          ...this.newEmployee,
          id: newId
        };
        
        this.employees.set([...currentEmployees, newEmployeeWithId]);
        this.showCreateForm.set(false);
        this.newEmployee = this.getEmptyEmployee();
        this.loading.set(false);
        
        // Show success message
        this.successMessage.set('Employee created successfully! (Note: Changes are simulated since this is a demo API)');
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  // PUT update employee
  updateEmployeeData(): void {
    if (!this.isValidUpdateEmployee(this.updateEmployee)) {
      this.error.set('Please fill in all required fields');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeeService.updateEmployee(this.updateEmployee).subscribe({
      next: (employee) => {
        console.log('Employee updated:', employee);
        
        // Update the employee in the local array since JSONPlaceholder doesn't persist changes
        const currentEmployees = this.employees();
        const updatedEmployees = currentEmployees.map(emp => 
          emp.id === this.updateEmployee.id ? { ...this.updateEmployee } : emp
        );
        this.employees.set(updatedEmployees);
        
        // Update selected employee if it's the same one
        if (this.selectedEmployee()?.id === this.updateEmployee.id) {
          this.selectedEmployee.set({ ...this.updateEmployee });
        }
        
        this.showUpdateForm.set(false);
        this.updateEmployee = this.getEmptyUpdateEmployee();
        this.loading.set(false);
        
        // Show success message
        this.successMessage.set('Employee updated successfully! (Note: Changes are simulated since this is a demo API)');
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  // DELETE employee
  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log('Employee deleted');
        
        // Remove the employee from the local array since JSONPlaceholder doesn't persist changes
        const currentEmployees = this.employees();
        const filteredEmployees = currentEmployees.filter(emp => emp.id !== id);
        this.employees.set(filteredEmployees);
        
        // Clear selected employee if it's the one being deleted
        if (this.selectedEmployee()?.id === id) {
          this.selectedEmployee.set(null);
          this.searchId = '';
        }
        
        this.loading.set(false);
        
        // Show success message
        this.successMessage.set('Employee deleted successfully! (Note: Changes are simulated since this is a demo API)');
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (error) => {
        this.error.set(error);
        this.loading.set(false);
      }
    });
  }

  // Refresh data from server
  refreshEmployees(): void {
    this.loadAllEmployees();
    this.successMessage.set('Data refreshed from server. Note: Any local changes (create/update/delete) will be reset since this is a demo API.');
    setTimeout(() => this.successMessage.set(null), 5000);
  }

  // Utility methods
  editEmployee(employee: Employee): void {
    this.updateEmployee = { ...employee };
    this.showUpdateForm.set(true);
  }

  cancelCreate(): void {
    this.showCreateForm.set(false);
    this.newEmployee = this.getEmptyEmployee();
  }

  cancelUpdate(): void {
    this.showUpdateForm.set(false);
    this.updateEmployee = this.getEmptyUpdateEmployee();
  }

  clearError(): void {
    this.error.set(null);
  }

  clearSuccess(): void {
    this.successMessage.set(null);
  }

  clearSelectedEmployee(): void {
    this.selectedEmployee.set(null);
    this.searchId = '';
  }

  private getEmptyEmployee(): CreateEmployeeRequest {
    return {
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: '',
      salary: 0
    };
  }

  private getEmptyUpdateEmployee(): UpdateEmployeeRequest {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      department: '',
      salary: 0
    };
  }

  private isValidEmployee(employee: CreateEmployeeRequest): boolean {
    return !!(employee.firstName && 
              employee.lastName && 
              employee.email && 
              employee.position && 
              employee.department && 
              employee.salary > 0);
  }

  private isValidUpdateEmployee(employee: UpdateEmployeeRequest): boolean {
    return !!(employee.id > 0 && 
              employee.firstName && 
              employee.lastName && 
              employee.email && 
              employee.position && 
              employee.department && 
              employee.salary > 0);
  }
}
