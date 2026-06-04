import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from '../posts-component/posts-component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crud');
}
