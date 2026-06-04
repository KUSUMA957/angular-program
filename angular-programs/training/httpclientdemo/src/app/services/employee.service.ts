import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  /**
   * Fetch all employees from the API
   * @returns Observable<Employee[]>
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        retry(2), // Retry up to 2 times on failure
        catchError(this.handleError)
      );
  }

  /**
   * Fetch a single employee by ID
   * @param id Employee ID
   * @returns Observable<Employee>
   */
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Create a new employee
   * @param employee Employee data
   * @returns Observable<Employee>
   */
  createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing employee
   * @param id Employee ID
   * @param employee Updated employee data
   * @returns Observable<Employee>
   */
  updateEmployee(id: number, employee: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete an employee
   * @param id Employee ID
   * @returns Observable<void>
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   * @param error HttpErrorResponse
   * @returns Observable<never>
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('EmployeeService Error:', errorMessage);
    return throwError(() => errorMessage);
  }
}
