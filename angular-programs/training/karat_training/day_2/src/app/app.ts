import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../employee/employee';
import { NotificationComponent } from '../notification-component/notification-component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Employee, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('day_2');
}
