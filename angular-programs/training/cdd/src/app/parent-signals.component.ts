import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildOnPushComponent } from './child-onpush.component';

@Component({
  selector: 'app-parent-signals',
  standalone: true,
  imports: [FormsModule, ChildOnPushComponent],
  template: `
    <h2>Signals-Based Parent (Granular CD)</h2>

    <label>
      Input Text:
      <!-- One-way bind with explicit set for signal -->
      <input [ngModel]="inputText()" (ngModelChange)="inputText.set($event)" />
    </label>

    <p>Uppercase: {{ uppercaseText() }}</p>

    <button (click)="increment()">Increment</button>
    <p>Counter (signal): {{ counter() }}</p>

    <!-- Passing a signal value to an OnPush child -->
    <app-child-onpush [childCounter]="counter()"></app-child-onpush>
  `
})
export class ParentSignalsComponent {
  // Signals
  inputText = signal('');
  uppercaseText = computed(() => this.inputText().toUpperCase());

  counter = signal(0);

  increment() {
    this.counter.update(c => c + 1);
  }
}