import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeFilterPipe } from '../employee-filter-pipe';
@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule, EmployeeFilterPipe],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  text: string = '';
  employees = [
    {id: 1, name: 'Kusuma'},
    {id: 2, name: 'Teja'},
    {id: 3, name: 'Pallavi'},
    {id: 4, name: 'Keerthana'}
  ];
}
