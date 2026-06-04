import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private nextId = 1;
  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
  addItem(name: string, price: number, quantity: number = 1) {
    const newItem: CartItem = {
      id: this.nextId++,
      name,
      price,
      quantity
    };
    const current = this.cartSubject.value;
    this.cartSubject.next([...current, newItem]);
  }
  removeItem(id: number) {
    const updated = this.cartSubject.value.filter(item => item.id !== id);
    this.cartSubject.next(updated);
  }
  getTotal(): number {
    return this.cartSubject.value.reduce((sum, item) => 
      sum + item.price * item.quantity, 
    0);
  }
}