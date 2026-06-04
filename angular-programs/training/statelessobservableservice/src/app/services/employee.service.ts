import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../models/employee.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.example.com/employees';

  // 🔹 STATELESS: No internal variables storing employee data
  // ✅ Instead, returns Observables that emit data

  /**
   * Get all employees
   * Returns Observable - no internal state storage
   */
  getEmployees(): Observable<Employee[]> {
    // In a real app, this would be:
    // return this.http.get<Employee[]>(this.baseUrl);
    
    // For demo purposes, returning mock data
    return of(this.getMockEmployees()).pipe(delay(500));
  }

  /**
   * Get employee by ID
   * Returns Observable - stateless operation
   */
  getEmployeeById(id: number): Observable<Employee> {
    // In a real app:
    // return this.http.get<Employee>(`${this.baseUrl}/${id}`);
    
    const employee = this.getMockEmployees().find(emp => emp.id === id);
    if (employee) {
      return of(employee).pipe(delay(300));
    }
    return throwError(() => new Error(`Employee with ID ${id} not found`));
  }

  /**
   * Create a new employee
   * Returns Observable with created employee - no state stored in service
   */
  createEmployee(employeeData: CreateEmployeeRequest): Observable<Employee> {
    // In a real app:
    // return this.http.post<Employee>(this.baseUrl, employeeData);
    
    const newEmployee: Employee = {
      id: Math.floor(Math.random() * 1000) + 100,
      ...employeeData,
      startDate: new Date().toISOString().split('T')[0]
    };
    
    return of(newEmployee).pipe(delay(400));
  }

  /**
   * Update employee
   * Returns Observable with updated employee - stateless
   */
  updateEmployee(employeeData: UpdateEmployeeRequest): Observable<Employee> {
    // In a real app:
    // return this.http.put<Employee>(`${this.baseUrl}/${employeeData.id}`, employeeData);
    
    const mockEmployees = this.getMockEmployees();
    const existingEmployee = mockEmployees.find(emp => emp.id === employeeData.id);
    
    if (existingEmployee) {
      const updatedEmployee = { ...existingEmployee, ...employeeData };
      return of(updatedEmployee).pipe(delay(400));
    }
    
    return throwError(() => new Error(`Employee with ID ${employeeData.id} not found`));
  }

  /**
   * Delete employee
   * Returns Observable indicating success - no state management
   */
  deleteEmployee(id: number): Observable<{ success: boolean; message: string }> {
    // In a real app:
    // return this.http.delete<any>(`${this.baseUrl}/${id}`);
    
    return of({ 
      success: true, 
      message: `Employee with ID ${id} deleted successfully` 
    }).pipe(delay(300));
  }

  /**
   * Search employees by department
   * Returns filtered Observable - stateless operation
   */
  getEmployeesByDepartment(department: string): Observable<Employee[]> {
    // In a real app:
    // return this.http.get<Employee[]>(`${this.baseUrl}?department=${department}`);
    
    const filtered = this.getMockEmployees().filter(
      emp => emp.department.toLowerCase().includes(department.toLowerCase())
    );
    return of(filtered).pipe(delay(400));
  }

  // 🔹 IMPORTANT: This is just for demo purposes
  // In a real stateless service, you wouldn't have this method
  // Data would come from HTTP calls, not stored locally
  private getMockEmployees(): Employee[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Senior Developer',
        salary: 85000,
        startDate: '2022-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'Marketing',
        position: 'Marketing Manager',
        salary: 75000,
        startDate: '2021-06-10'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        department: 'Engineering',
        position: 'DevOps Engineer',
        salary: 80000,
        startDate: '2023-03-20'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        department: 'Human Resources',
        position: 'HR Specialist',
        salary: 65000,
        startDate: '2022-08-05'
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@example.com',
        department: 'Finance',
        position: 'Financial Analyst',
        salary: 70000,
        startDate: '2021-11-12'
      }
    ];
  }
}
