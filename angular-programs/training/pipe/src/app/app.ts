import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PipeDemo } from '../pipe-demo/pipe-demo';
@Component({
  selector: 'app-root',
  imports: [PipeDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pipe');
}
