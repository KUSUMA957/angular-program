import { Component, signal } from '@angular/core';
import { NgClasscomp } from '../components/ng-classcomp/ng-classcomp';

@Component({
  selector: 'app-root',
  imports: [NgClasscomp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NGClassDemo');
}
