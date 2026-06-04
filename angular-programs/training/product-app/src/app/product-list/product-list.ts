// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-list',
//   imports: [],
//   templateUrl: './product-list.html',
//   styleUrl: './product-list.css',
// })
// export class ProductList {}

import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList {

  products: Product[] = [];
  newName = '';
  newPrice: number = 0;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  addProduct() {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: this.newName,
      price: this.newPrice
    };
    this.productService.addProduct(newProduct);
    this.newName = '';
    this.newPrice = 0;
  }

  // deleteProduct(id: number) {
  //   this.productService.deleteProduct(id);
  // }
  deleteProduct(id: number) {
  this.productService.deleteProduct(id);
  this.products = this.productService.getProducts(); // RETRIGGER UI UPDATE
}
}