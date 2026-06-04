import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getEmployees() {
    return this.http.get('http://localhost:8080/employees')
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }
}
