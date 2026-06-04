import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = 0;

  getCount(): number {
    return this.count;
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }
}
