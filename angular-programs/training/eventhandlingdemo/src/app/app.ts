import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('eventhandlingdemo');

  products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
    { id: 3, name: 'Headphones', price: 3500 }
  ];

  cart: Array<{ id: number; name: string; price: number; qty: number }> = [];
  total = 0;

  addToCart(product: { id: number; name: string; price: number }) {
    const existing = this.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
    this.total += product.price;
  }

  removeFromCart(product: { id: number; price: number }) {
    const existing = this.cart.find((item) => item.id === product.id);
    if (!existing) {
      return;
    }

    existing.qty -= 1;
    this.total -= product.price;

    if (existing.qty <= 0) {
      this.cart = this.cart.filter((item) => item.id !== product.id);
    }
  }

  clearCart() {
    this.cart = [];
    this.total = 0;
  }
}
