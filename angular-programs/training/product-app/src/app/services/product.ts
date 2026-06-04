// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Product {}

import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Phone', price: 30000 },
    { id: 3, name: 'Tablet', price: 20000 }
  ];

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}