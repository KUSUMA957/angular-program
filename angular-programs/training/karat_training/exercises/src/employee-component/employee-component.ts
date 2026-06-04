import { Component } from '@angular/core';
import { EmployeeService } from '../employee-service';
@Component({
  selector: 'app-employee-component',
  imports: [],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent {
  employees: any[] = [];
  constructor(private employeeService: EmployeeService) {}
  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }
}
