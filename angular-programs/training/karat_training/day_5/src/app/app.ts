import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from '../card/card';
import { EmployeeComponent } from '../employee-component/employee-component';
@Component({
  selector: 'app-root',
  imports: [Card, EmployeeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('day_5');
}
