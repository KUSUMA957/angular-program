import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from '../app/product-component/product-component';
import { UserDashboardComponent } from '../user-dashboard-component/user-dashboard-component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('day_6');
}
