import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStatusComponent } from './user-status.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserStatusComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ngifdemotwo');
}
