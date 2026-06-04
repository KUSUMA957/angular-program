import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ParentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('testdemoinputoutput');
}
