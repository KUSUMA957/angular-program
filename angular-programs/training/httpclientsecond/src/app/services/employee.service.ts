import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Using JSONPlaceholder as a mock API endpoint
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // GET all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL).pipe(
      retry(3), // Retry up to 3 times on failure
      catchError(this.handleError)
    );
  }

  // GET employee by ID
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // POST new employee
  createEmployee(employee: CreateEmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(this.API_URL, employee).pipe(
      catchError(this.handleError)
    );
  }

  // PUT update employee
  updateEmployee(employee: UpdateEmployeeRequest): Observable<Employee> {
    return this.http.put<Employee>(`${this.API_URL}/${employee.id}`, employee).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // Handle specific HTTP status codes
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Invalid data provided';
          break;
        case 401:
          errorMessage = 'Unauthorized: Authentication required';
          break;
        case 403:
          errorMessage = 'Forbidden: Access denied';
          break;
        case 404:
          errorMessage = 'Not Found: Employee not found';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later';
          break;
        case 0:
          errorMessage = 'Network Error: Please check your internet connection';
          break;
      }
    }

    console.error('HTTP Error:', errorMessage);
    return throwError(() => errorMessage);
  }
}
