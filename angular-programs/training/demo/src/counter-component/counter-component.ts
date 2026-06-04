import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  imports: [],
  templateUrl: './counter-component.html',
  styleUrl: './counter-component.css',
})
export class CounterComponent {
  count: number = 0;
  increment() {
    this.count++;
  } 
  decrement() {
    if(this.count > 0) {
      this.count--;
    }
  }
  reset() {
    this.count = 0;
  }
}
