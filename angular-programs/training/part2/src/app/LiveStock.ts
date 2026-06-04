// src/app/live-stock/live-stock.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-live-stock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stock">
      <h2>Stock</h2>
      <div class="price">
        ₹{{ price$ | async }}
      </div>
      <small>Updates every 2 seconds</small>
    </section>
  `,
  styles: [`
    .stock { font-family: Arial, sans-serif; padding: 12px; border: 1px solid #ddd; border-radius: 8px; max-width: 260px; }
    .price { font-size: 28px; font-weight: 600; margin: 8px 0; }
  `]
})
export class LiveStockComponent {
  private base = 100; 
  // Emits immediately with a starting price, then every 2s with a new simulated price
  price$ = interval(2000).pipe(
    startWith(0), // emit once immediately so UI doesn't wait
    map(() => {
      const d = (Math.random() * 10 - 5); // -5 to +5
      const price = this.base + d;
      return price.toFixed(2);
    })
  );
}