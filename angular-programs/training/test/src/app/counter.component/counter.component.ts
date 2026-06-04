import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-counter.component',
  standalone: true,
  imports: [],
  template: `
    <button (click)="increment()">+</button>
    <p>{{ count }}</p>
  `,
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  count = 0; 

  increment(): void {
    this.count++;
  }

  getNumbers(): Observable<number[]> {
    return of([1, 2, 3]);
  }
}
