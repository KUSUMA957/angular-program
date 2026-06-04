import { HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, concatAll, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  api = 'api_url';
  constructor(private http: HttpClient) {}
  addEmployee(data: any): Observable<any> {
    return this.http.post(this.api, data).pipe(catchError(this.handleError));
  }
  getEmployees(): Observable<any> {
    return this.http.get(this.api).pipe(catchError(this.handleError));
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data).pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if(error.status === 0) {
      msg = 'Ntwk err';
    } else if(error.status === 400) {
      msg = 'Bad Request';
    } else if(error.status === 404) {
      msg = 'Data Not Found';
    } else if(error.status === 500) {
      msg = 'Server Error';
    } else {
      msg = 'Smthg went wrong';
    }
    return throwError(() => msg);
  }
}
