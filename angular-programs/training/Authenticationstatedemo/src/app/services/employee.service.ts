import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  department: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', department: 'Sales' },
    { id: 4, name: 'Alice Brown', department: 'HR' },
    { id: 5, name: 'Charlie Wilson', department: 'Engineering' }
  ];

  getEmployees(): Observable<Employee[]> {
    // Simulate HTTP delay
    return of(this.employees).pipe(delay(1000));
  }

  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee[]> {
    const newEmployee: Employee = {
      ...employee,
      id: Math.max(...this.employees.map(e => e.id)) + 1
    };
    this.employees.push(newEmployee);
    return of(this.employees).pipe(delay(500));
  }
}
