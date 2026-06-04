import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Employee {
  name: string;
  department: string;
  active_status: boolean;
}
@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard {
  employees: Employee[] = [
    {name: 'Kusuma', department: "IT", active_status: true},
    {name: 'Teja', department: "IT", active_status: false},
    {name: 'Maha Lakshmi', department: "IT", active_status: true},
    {name: 'Hemanth Kumar', department: "Arts", active_status: false}
  ];
  // toggleStatus() {
  //   for(let i = 0; i < this.employees.length; i++) {
  //     if(this.employees[i].active_status === true) {
  //       this.employees[i].active_status = false;
  //     } else {
  //       this.employees[i].active_status = true;
  //     }
  //   }
  // }
  
  toggleStatus(index: number) {
    this.employees[index].active_status = !this.employees[index].active_status;
  }
}
