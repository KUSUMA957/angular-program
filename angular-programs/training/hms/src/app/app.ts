import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelListComponent } from './components/hotel-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HotelListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hms');
}
