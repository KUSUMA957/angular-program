import { Component, computed, signal, effect } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter-container">
      <h2>Counter Component</h2>
      
      <div class="counter-display">
        <p class="count-value">Count: {{ count() }}</p>
        <p class="multiplied-value">Count × 10: {{ multipliedCount() }}</p>
      </div>
      
      <div class="button-group">
        <button class="btn btn-increment" (click)="increment()">Increment</button>
        <button class="btn btn-decrement" (click)="decrement()">Decrement</button>
      </div>
    </div>
  `,
  styles: [`
    .counter-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      text-align: center;
      background: #f9f9f9;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    .counter-display {
      margin: 1.5rem 0;
    }

    .count-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin: 0.5rem 0;
    }

    .multiplied-value {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin: 0.5rem 0;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1.5rem;
    }

    .btn {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 100px;
    }

    .btn-increment {
      background-color: #27ae60;
      color: white;
    }

    .btn-increment:hover {
      background-color: #229954;
      transform: translateY(-2px);
    }

    .btn-decrement {
      background-color: #e74c3c;
      color: white;
    }

    .btn-decrement:hover {
      background-color: #c0392b;
      transform: translateY(-2px);
    }

    .btn:active {
      transform: translateY(0);
    }
  `],
  standalone: true
})
export class CounterComponent {
  // Create a count signal
  count = signal(0);

  // Create a computed value showing count * 10
  multipliedCount = computed(() => this.count() * 10);

  // Convert signal to observable and log it
  constructor() {
    const count$ = toObservable(this.count);
    
    // Subscribe to the observable to log changes
    count$.subscribe(value => {
      console.log('Count signal as Observable:', value);
    });
  }

  // Increment method
  increment() {
    this.count.update(current => current + 1);
  }

  // Decrement method
  decrement() {
    this.count.update(current => current - 1);
  }
}
