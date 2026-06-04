import { Component, signal } from '@angular/core';
import { Reactivecomponents } from '../components/reactivecomponents/reactivecomponents';


@Component({
  selector: 'app-root',
  imports: [Reactivecomponents],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reactiveformdemo');
}
