import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="employee-container">
      <h3>Employee List (toSignal() Demo)</h3>
      
      <div class="add-employee">
        <h4>Add New Employee</h4>
        <input 
          [(ngModel)]="newEmployeeName" 
          placeholder="Employee Name" 
          type="text"
          class="form-input">
        <select [(ngModel)]="newEmployeeDepartment" class="form-input">
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
        </select>
        <button 
          (click)="addEmployee()" 
          [disabled]="!newEmployeeName() || !newEmployeeDepartment()"
          class="btn btn-primary">
          Add Employee
        </button>
      </div>

      <div class="employees-section">
        <h4>Employees ({{ employees().length }})</h4>
        <div *ngIf="employees(); else loading" class="employees-list">
          <div 
            *ngFor="let emp of employees(); trackBy: trackByEmployeeId" 
            class="employee-card">
            <div class="employee-info">
              <strong>{{ emp.name }}</strong>
              <span class="department">{{ emp.department }}</span>
            </div>
            <span class="employee-id">#{{ emp.id }}</span>
          </div>
        </div>
        
        <ng-template #loading>
          <div class="loading">Loading employees...</div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .employee-container {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px;
      max-width: 500px;
    }
    
    .add-employee {
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 6px;
    }
    
    .add-employee h4 {
      margin-bottom: 10px;
    }
    
    .form-input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 5px;
      width: calc(100% - 10px);
    }
    
    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin: 5px;
      width: 100%;
    }
    
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn:hover:not(:disabled) {
      opacity: 0.8;
    }
    
    .employees-section {
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
    
    .employees-list {
      max-height: 300px;
      overflow-y: auto;
    }
    
    .employee-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border: 1px solid #eee;
      border-radius: 6px;
      margin: 8px 0;
      background-color: #ffffff;
    }
    
    .employee-info {
      display: flex;
      flex-direction: column;
    }
    
    .department {
      color: #666;
      font-size: 14px;
      margin-top: 4px;
    }
    
    .employee-id {
      color: #999;
      font-size: 12px;
    }
    
    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
      font-style: italic;
    }
  `]
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);

  // Convert Observable -> Signal using toSignal()
  employees = toSignal(this.employeeService.getEmployees(), { initialValue: [] });
  
  newEmployeeName = signal('');
  newEmployeeDepartment = signal('');

  addEmployee() {
    if (this.newEmployeeName() && this.newEmployeeDepartment()) {
      // This would typically update the signal after the HTTP call
      this.employeeService.addEmployee({
        name: this.newEmployeeName(),
        department: this.newEmployeeDepartment()
      }).subscribe(updatedEmployees => {
        // In a real app, you might want to refresh the signal or use a different approach
        console.log('Employee added successfully', updatedEmployees);
      });
      
      this.newEmployeeName.set('');
      this.newEmployeeDepartment.set('');
    }
  }
  
  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id;
  }
}
