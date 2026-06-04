import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-overlay" *ngIf="isVisible()" (click)="onOverlayClick($event)">
      <div class="form-container" (click)="$event.stopPropagation()">
        <div class="form-header">
          <h3>{{ isEditMode() ? 'Edit Employee' : 'Add New Employee' }}</h3>
          <button class="close-btn" (click)="closeForm()" type="button">×</button>
        </div>

        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" class="employee-form">
          <!-- Personal Information -->
          <div class="form-section">
            <h4>Personal Information</h4>
            
            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input 
                  id="name"
                  type="text" 
                  formControlName="name"
                  [class.error]="employeeForm.get('name')?.invalid && employeeForm.get('name')?.touched"
                >
                <div class="error-message" *ngIf="employeeForm.get('name')?.invalid && employeeForm.get('name')?.touched">
                  Name is required
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  id="email"
                  type="email" 
                  formControlName="email"
                  [class.error]="employeeForm.get('email')?.invalid && employeeForm.get('email')?.touched"
                >
                <div class="error-message" *ngIf="employeeForm.get('email')?.invalid && employeeForm.get('email')?.touched">
                  <span *ngIf="employeeForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="employeeForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input 
                  id="phone"
                  type="tel" 
                  formControlName="phone"
                >
              </div>

              <div class="form-group">
                <label for="website">Website</label>
                <input 
                  id="website"
                  type="url" 
                  formControlName="website"
                >
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div class="form-section" formGroupName="address">
            <h4>Address Information</h4>
            
            <div class="form-row">
              <div class="form-group">
                <label for="street">Street</label>
                <input 
                  id="street"
                  type="text" 
                  formControlName="street"
                >
              </div>

              <div class="form-group">
                <label for="suite">Suite</label>
                <input 
                  id="suite"
                  type="text" 
                  formControlName="suite"
                >
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input 
                  id="city"
                  type="text" 
                  formControlName="city"
                >
              </div>

              <div class="form-group">
                <label for="zipcode">Zipcode</label>
                <input 
                  id="zipcode"
                  type="text" 
                  formControlName="zipcode"
                >
              </div>
            </div>
          </div>

          <!-- Company Information -->
          <div class="form-section" formGroupName="company">
            <h4>Company Information</h4>
            
            <div class="form-group">
              <label for="companyName">Company Name</label>
              <input 
                id="companyName"
                type="text" 
                formControlName="name"
              >
            </div>

            <div class="form-group">
              <label for="catchPhrase">Catch Phrase</label>
              <input 
                id="catchPhrase"
                type="text" 
                formControlName="catchPhrase"
              >
            </div>

            <div class="form-group">
              <label for="bs">Business</label>
              <input 
                id="bs"
                type="text" 
                formControlName="bs"
              >
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="closeForm()">
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="employeeForm.invalid || saving()"
            >
              {{ saving() ? 'Saving...' : (isEditMode() ? 'Update Employee' : 'Add Employee') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .form-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;
      border-bottom: 1px solid #dee2e6;
      background-color: #f8f9fa;
      border-radius: 12px 12px 0 0;
    }

    .form-header h3 {
      margin: 0;
      color: #333;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6c757d;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 0.2s;
    }

    .close-btn:hover {
      background-color: #e9ecef;
      color: #495057;
    }

    .employee-form {
      padding: 30px;
    }

    .form-section {
      margin-bottom: 30px;
    }

    .form-section h4 {
      margin: 0 0 20px 0;
      color: #495057;
      font-size: 1.1rem;
      font-weight: 600;
      border-bottom: 2px solid #007bff;
      padding-bottom: 8px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 500;
      margin-bottom: 8px;
      color: #495057;
    }

    .form-group input {
      padding: 12px;
      border: 2px solid #dee2e6;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .form-group input.error {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .form-container {
        width: 95%;
        margin: 10px;
      }

      .form-header,
      .employee-form {
        padding: 20px;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly employeeService = inject(EmployeeService);

  // Inputs
  employee = input<Employee | null>(null);
  
  // Outputs
  employeeSaved = output<Employee>();
  formClosed = output<void>();

  // Signals
  isVisible = signal(false);
  saving = signal(false);

  employeeForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: [''],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
        geo: this.fb.group({
          lat: [''],
          lng: ['']
        })
      }),
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    });
  }

  isEditMode(): boolean {
    return !!this.employee();
  }

  openForm(employee?: Employee): void {
    if (employee) {
      this.populateForm(employee);
    } else {
      this.employeeForm.reset();
    }
    this.isVisible.set(true);
  }

  closeForm(): void {
    this.isVisible.set(false);
    this.employeeForm.reset();
    this.formClosed.emit();
  }

  private populateForm(employee: Employee): void {
    this.employeeForm.patchValue({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      website: employee.website,
      address: {
        street: employee.address.street,
        suite: employee.address.suite,
        city: employee.address.city,
        zipcode: employee.address.zipcode,
        geo: {
          lat: employee.address.geo.lat,
          lng: employee.address.geo.lng
        }
      },
      company: {
        name: employee.company.name,
        catchPhrase: employee.company.catchPhrase,
        bs: employee.company.bs
      }
    });
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeForm();
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.saving.set(true);
      const formValue = this.employeeForm.value;
      
      const employeeData = {
        ...formValue,
        address: {
          ...formValue.address,
          geo: {
            lat: formValue.address.geo.lat || '0',
            lng: formValue.address.geo.lng || '0'
          }
        }
      };

      const operation = this.isEditMode() 
        ? this.employeeService.updateEmployee(this.employee()!.id, employeeData)
        : this.employeeService.createEmployee(employeeData);

      operation.subscribe({
        next: (employee: Employee) => {
          this.saving.set(false);
          this.employeeSaved.emit(employee);
          this.closeForm();
        },
        error: (error) => {
          this.saving.set(false);
          console.error('Error saving employee:', error);
          alert('Error saving employee. Please try again.');
        }
      });
    }
  }
}
