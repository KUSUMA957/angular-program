import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no pending HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve employees (GET)', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'Alice', department: 'HR' },
      { id: 2, name: 'Bob', department: 'IT' }
    ];

    service.getEmployees().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('https://example.com/api/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees); // mock the response
  });

  it('should add a new employee (POST)', () => {
    const newEmployee: Employee = { id: 3, name: 'Charlie', department: 'Finance' };

    service.addEmployee(newEmployee).subscribe(emp => {
      expect(emp).toEqual(newEmployee);
    });

    const req = httpMock.expectOne('https://example.com/api/employees');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);
    req.flush(newEmployee);
  });

  it('should update an employee (PUT)', () => {
    const updatedEmployee: Employee = { id: 1, name: 'Alice Updated', department: 'HR' };

    service.updateEmployee(updatedEmployee).subscribe(emp => {
      expect(emp.name).toBe('Alice Updated');
    });

    const req = httpMock.expectOne('https://example.com/api/employees/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee);
  });

  it('should delete an employee (DELETE)', () => {
    service.deleteEmployee(1).subscribe({
      next: () => {
        // DELETE operation completed successfully
        expect(true).toBe(true); // Just verify the observable completes
      }
    });

    const req = httpMock.expectOne('https://example.com/api/employees/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
