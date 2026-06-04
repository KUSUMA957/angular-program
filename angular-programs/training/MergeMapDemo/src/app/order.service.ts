import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Order {
  orderId: number;
  productName: string;
  quantity: number;
  price: number;
  status: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private products = [
    { name: 'Laptop', price: 999 },
    { name: 'Smartphone', price: 699 },
    { name: 'Headphones', price: 199 },
    { name: 'Keyboard', price: 89 }
  ];

  /**
   * Simulates an API call to fetch order details
   * Each order takes a random time (500-2000ms) to complete
   */
  getOrderDetails(orderId: number): Observable<Order> {
    const randomDelay = Math.floor(Math.random() * 1500) + 500; // 500-2000ms
    const productIndex = (orderId - 101) % this.products.length;
    const product = this.products[productIndex];
    
    const order: Order = {
      orderId,
      productName: product.name,
      quantity: Math.floor(Math.random() * 3) + 1,
      price: product.price,
      status: 'Processed',
      timestamp: new Date()
    };

    // Simulate API delay
    return of(order).pipe(delay(randomDelay));
  }
}
