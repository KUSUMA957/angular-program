import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeDashboard } from '../app/employee-dashboard/employee-dashboard';
import { ProductCartSystem } from '../app/product-cart-system/product-cart-system';
import { StudentResultPortal } from '../app/student-result-portal/student-result-portal';
import { ToDoList } from '../app/to-do-list/to-do-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeDashboard, ProductCartSystem, StudentResultPortal, ToDoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('coding');
}
