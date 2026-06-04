import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-product-component',
  imports: [],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})
export class ProductComponent {
  products = signal<string[]>([
    'Bottle',
    'Laptop',
    'Pen',
    'Book'
  ]);
  cartCount = signal(0);
  totalItems = computed(() => {
    return this.products().length + this.cartCount();
  });
  constructor() {
    effect(() => {
      console.log('Products changed: ', this.products());
      console.log('Cart count changed: ', this.cartCount());
      console.log('Total Items: ', this.totalItems());
    });
  }
  addProduct() {
    this.products.update((oldProducts) => [
      ...oldProducts, 
      'Book'
    ]);
  }
  addToCart() {
    this.cartCount.update(
      (count) => count + 1
    );
  }
}
