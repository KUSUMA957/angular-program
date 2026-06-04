import { Component, signal } from '@angular/core';
import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'app-root',
  imports: [ParentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inputouputdecorator');
}
