import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleDemoComponent } from './components/simple-demo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SimpleDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular Reactive State Demo');
}
