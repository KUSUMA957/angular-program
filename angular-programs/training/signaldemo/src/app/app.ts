import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CounterComponent],
  templateUrl: './app-simple.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('signaldemo');
}
