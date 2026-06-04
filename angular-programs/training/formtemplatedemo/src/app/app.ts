import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateformcompComponent } from './templateformcomp/templateformcomp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TemplateformcompComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('formtemplatedemo');
}
