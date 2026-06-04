import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { EmployeeFormComponent } from './employee-form.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmployeeFormComponent],
  template: `
    <div class="employee-container">
      <h2>Employee Directory</h2>
      
      <!-- Loading State -->
      <div *ngIf="loading()" class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading employees...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error() && !loading()" class="error-message">
        <h3>⚠️ Error Loading Employees</h3>
        <p>{{ error() }}</p>
        <button class="retry-btn" (click)="loadEmployees()">
          🔄 Retry
        </button>
      </div>

      <!-- Success State - Employee Table -->
      <div *ngIf="!loading() && !error() && employees().length > 0" class="table-container">
        <div class="table-header">
          <p>Found {{ employees().length }} employees</p>
          <div class="header-actions">
            <button class="add-btn" (click)="openAddForm()">
              ➕ Add Employee
            </button>
            <button class="refresh-btn" (click)="loadEmployees()">
              🔄 Refresh
            </button>
          </div>
        </div>
        
        <table class="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>City</th>
              <th>Website</th>
              <th class="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of employees(); trackBy: trackByEmployeeId" class="employee-row">
              <td>{{ employee.id }}</td>
              <td class="name-cell">{{ employee.name }}</td>
              <td class="email-cell">
                <a [href]="'mailto:' + employee.email">{{ employee.email }}</a>
              </td>
              <td>{{ employee.phone }}</td>
              <td class="company-cell">
                <div class="company-name">{{ employee.company.name }}</div>
                <div class="company-phrase">{{ employee.company.catchPhrase }}</div>
              </td>
              <td>{{ employee.address.city }}</td>
              <td class="website-cell">
                <a [href]="'https://' + employee.website" target="_blank" rel="noopener">
                  {{ employee.website }}
                </a>
              </td>
              <td class="actions-cell">
                <div class="action-buttons">
                  <button class="btn-edit" (click)="editEmployee(employee)" title="Edit Employee">
                    ✏️
                  </button>
                  <button class="btn-delete" (click)="deleteEmployee(employee)" title="Delete Employee">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading() && !error() && employees().length === 0" class="empty-state">
        <h3>📭 No Employees Found</h3>
        <p>There are no employees to display at the moment.</p>
        <button class="retry-btn" (click)="loadEmployees()">
          🔄 Load Employees
        </button>
      </div>
    </div>

    <!-- Employee Form Modal -->
    <app-employee-form 
      #employeeForm
      [employee]="selectedEmployee()"
      (employeeSaved)="onEmployeeSaved($event)"
      (formClosed)="onFormClosed()">
    </app-employee-form>
  `,
  styles: [`
    .employee-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h2 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    /* Loading Spinner */
    .loading-spinner {
      text-align: center;
      padding: 40px;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Error State */
    .error-message {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }

    .error-message h3 {
      margin-top: 0;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 40px;
      background-color: #f8f9fa;
      border-radius: 8px;
      margin: 20px 0;
    }

    .empty-state h3 {
      color: #6c757d;
      margin-bottom: 10px;
    }

    /* Buttons */
    .retry-btn, .refresh-btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }

    .retry-btn:hover, .refresh-btn:hover {
      background-color: #0056b3;
    }

    /* Table Container */
    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }

    .table-header p {
      margin: 0;
      font-weight: 600;
      color: #495057;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .add-btn {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }

    .add-btn:hover {
      background-color: #218838;
    }

    /* Table Styles */
    .employee-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .employee-table th {
      background-color: #007bff;
      color: white;
      padding: 15px 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #0056b3;
    }

    .actions-col {
      width: 120px;
      text-align: center;
    }

    .employee-table td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
      vertical-align: top;
    }

    .actions-cell {
      text-align: center;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .btn-edit, .btn-delete {
      background: none;
      border: none;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.2s;
    }

    .btn-edit:hover {
      background-color: #e3f2fd;
    }

    .btn-delete:hover {
      background-color: #ffebee;
    }

    .employee-row:hover {
      background-color: #f8f9fa;
    }

    .employee-row:nth-child(even) {
      background-color: #ffffff;
    }

    .employee-row:nth-child(odd) {
      background-color: #f9f9f9;
    }

    /* Cell-specific styles */
    .name-cell {
      font-weight: 600;
      color: #007bff;
    }

    .email-cell a {
      color: #007bff;
      text-decoration: none;
    }

    .email-cell a:hover {
      text-decoration: underline;
    }

    .company-cell {
      max-width: 200px;
    }

    .company-name {
      font-weight: 600;
      color: #333;
    }

    .company-phrase {
      font-size: 12px;
      color: #6c757d;
      font-style: italic;
      margin-top: 4px;
    }

    .website-cell a {
      color: #28a745;
      text-decoration: none;
    }

    .website-cell a:hover {
      text-decoration: underline;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .employee-container {
        padding: 10px;
      }

      .table-container {
        overflow-x: auto;
      }

      .employee-table {
        min-width: 700px;
      }

      .table-header {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }

      .header-actions {
        justify-content: center;
      }

      h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  
  // ViewChild for the form component
  employeeForm = viewChild<EmployeeFormComponent>('employeeForm');
  
  // Signals for reactive state management
  employees = signal<Employee[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  selectedEmployee = signal<Employee | null>(null);

  ngOnInit(): void {
    this.loadEmployees();
  }

  /**
   * Load employees from the API
   */
  loadEmployees(): void {
    this.loading.set(true);
    this.error.set(null);

    this.employeeService.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.employees.set(employees);
        this.loading.set(false);
        console.log('Employees loaded successfully:', employees.length);
      },
      error: (errorMessage: string) => {
        this.error.set(errorMessage);
        this.loading.set(false);
        this.employees.set([]);
        console.error('Failed to load employees:', errorMessage);
      }
    });
  }

  /**
   * TrackBy function for ngFor optimization
   * @param index Array index
   * @param employee Employee object
   * @returns Unique identifier
   */
  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id;
  }

  /**
   * Open the form to add a new employee
   */
  openAddForm(): void {
    this.selectedEmployee.set(null);
    this.employeeForm()?.openForm();
  }

  /**
   * Open the form to edit an existing employee
   * @param employee Employee to edit
   */
  editEmployee(employee: Employee): void {
    this.selectedEmployee.set(employee);
    this.employeeForm()?.openForm(employee);
  }

  /**
   * Delete an employee with confirmation
   * @param employee Employee to delete
   */
  deleteEmployee(employee: Employee): void {
    const confirmed = confirm(`Are you sure you want to delete ${employee.name}?`);
    
    if (confirmed) {
      this.employeeService.deleteEmployee(employee.id).subscribe({
        next: () => {
          // Remove the employee from the local list
          const currentEmployees = this.employees();
          const updatedEmployees = currentEmployees.filter(emp => emp.id !== employee.id);
          this.employees.set(updatedEmployees);
          console.log('Employee deleted successfully');
        },
        error: (errorMessage: string) => {
          console.error('Failed to delete employee:', errorMessage);
          alert('Failed to delete employee. Please try again.');
        }
      });
    }
  }

  /**
   * Handle employee saved event from form
   * @param employee Saved employee
   */
  onEmployeeSaved(employee: Employee): void {
    const currentEmployees = this.employees();
    const existingIndex = currentEmployees.findIndex(emp => emp.id === employee.id);
    
    if (existingIndex >= 0) {
      // Update existing employee
      const updatedEmployees = [...currentEmployees];
      updatedEmployees[existingIndex] = employee;
      this.employees.set(updatedEmployees);
    } else {
      // Add new employee
      this.employees.set([employee, ...currentEmployees]);
    }
    
    console.log('Employee saved successfully:', employee);
  }

  /**
   * Handle form closed event
   */
  onFormClosed(): void {
    this.selectedEmployee.set(null);
  }
}
