import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  
  products = [
    'Laptop',
    'Mobile',
    'Headphones',
    'Keyboard',
    'Mouse'
  ];
  showCount = 3;
  showMore() {
    this.showCount = this.products.length;
  }
  showLess() {
    this.showCount = 3;
  }
}
