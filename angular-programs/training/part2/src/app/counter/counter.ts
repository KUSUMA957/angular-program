import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  counter$; 
  constructor(private counterService: CounterService) {
    this.counter$ = this.counterService.counter$;
  }
  increment() {
    this.counterService.increment();
  }
  decrement() {
    this.counterService.decrement();
  }
}