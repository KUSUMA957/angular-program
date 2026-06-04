import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement } from '../counter/counter.action';
import { selectCount } from '../counter/counter.selectors';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count$: any;
  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
  }
  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
}
