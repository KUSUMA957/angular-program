import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pagination } from '../pagination/pagination';
@Component({
  selector: 'app-root',
  imports: [Pagination, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('day_4');
}
