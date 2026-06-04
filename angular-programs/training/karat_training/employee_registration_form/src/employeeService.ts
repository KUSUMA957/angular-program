import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees = [
    {name: 'Kusuma', role: 'USER'},
    {name: 'Pallavi', role: 'ADMIN'},
    {name: 'Keerthana', role: 'ADMIN'}
  ];
  constructor(){}
  getEmployees() {
    return this.employees;
  }
}
