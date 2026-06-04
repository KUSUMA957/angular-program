import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TemplateformcompComponent } from './templateformcomp';

describe('TemplateformcompComponent', () => {
  let component: TemplateformcompComponent;
  let fixture: ComponentFixture<TemplateformcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateformcompComponent, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateformcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty employee', () => {
    expect(component.employee.firstName).toBe('');
    expect(component.employee.lastName).toBe('');
    expect(component.employee.email).toBe('');
    expect(component.employee.isActive).toBe(true);
  });

  it('should have departments and positions arrays', () => {
    expect(component.departments.length).toBeGreaterThan(0);
    expect(component.positions.length).toBeGreaterThan(0);
  });

  it('should add employee to submitted list on valid form submission', () => {
    // Setup valid employee data
    component.employee = {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: 75000,
      hireDate: '2024-01-15',
      isActive: true
    };

    // Mock form
    const mockForm = {
      valid: true,
      resetForm: jasmine.createSpy('resetForm')
    } as any;

    const initialLength = component.submittedEmployees.length;
    component.onSubmit(mockForm);

    expect(component.submittedEmployees.length).toBe(initialLength + 1);
    expect(component.submittedEmployees[initialLength].firstName).toBe('John');
  });

  it('should reset form correctly', () => {
    // Set some data
    component.employee.firstName = 'Test';
    component.employee.email = 'test@example.com';

    const mockForm = {
      resetForm: jasmine.createSpy('resetForm')
    } as any;

    component.resetForm(mockForm);

    expect(component.employee.firstName).toBe('');
    expect(component.employee.email).toBe('');
    expect(mockForm.resetForm).toHaveBeenCalled();
  });
});
