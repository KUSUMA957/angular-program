import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from, mergeMap } from 'rxjs';
import { OrderService, Order } from './order.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Order Processing System - mergeMap Demo');
  
  // Store processed orders
  orders = signal<Order[]>([]);
  
  // Track loading state
  isProcessing = signal(false);
  
  // Track processing status
  processingStatus = signal('');

  constructor(private orderService: OrderService) {}

  /**
   * Process multiple orders using mergeMap
   * - Emits multiple order IDs
   * - Calls API for each order in parallel
   * - Displays results as they arrive
   */
  placeOrders(): void {
    const orderIds = [101, 102, 103, 104];
    
    // Reset state
    this.orders.set([]);
    this.isProcessing.set(true);
    this.processingStatus.set('Processing orders...');
    
    let completedCount = 0;
    
    // Convert array to observable and use mergeMap
    from(orderIds)
      .pipe(
        // mergeMap processes all items in parallel
        // Each orderId triggers an API call simultaneously
        mergeMap(orderId => this.orderService.getOrderDetails(orderId))
      )
      .subscribe({
        next: (order) => {
          // Add order to the list as soon as it arrives
          this.orders.update(orders => [...orders, order]);
          completedCount++;
          this.processingStatus.set(
            `Processed ${completedCount}/${orderIds.length} orders`
          );
        },
        error: (err) => {
          console.error('Error processing orders:', err);
          this.isProcessing.set(false);
          this.processingStatus.set('Error processing orders');
        },
        complete: () => {
          this.isProcessing.set(false);
          this.processingStatus.set('All orders processed successfully! ✓');
        }
      });
  }

  /**
   * Clear all orders
   */
  clearOrders(): void {
    this.orders.set([]);
    this.processingStatus.set('');
  }
}
