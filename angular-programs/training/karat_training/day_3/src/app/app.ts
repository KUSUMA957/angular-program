import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './NgRx_Demo/counter/counter';
import { User } from '../app/NgRx_Demo/user/user';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, User],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('day_3');
}
