import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DynamicFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Dynamic Forms Demo - Angular FormArray & Configuration-Driven Forms');
}
