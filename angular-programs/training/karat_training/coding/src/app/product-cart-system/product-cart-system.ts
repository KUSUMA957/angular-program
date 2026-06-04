import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Product{
  product_name: string;
  product_price: number;
  product_quantity: number;
}
@Component({
  selector: 'app-product-cart-system',
  imports: [CommonModule],
  templateUrl: './product-cart-system.html',
  styleUrl: './product-cart-system.css',
})
export class ProductCartSystem {
  products: Product[] = [
    {product_name: "phone", product_price: 16000, product_quantity: 3},
    {product_name: "laptop", product_price: 75000, product_quantity: 7},
    {product_name: "charger", product_price: 500, product_quantity: 10},
    {product_name: "books", product_price: 120, product_quantity: 10},
    {product_name: "water bottle", product_price: 200, product_quantity: 15}
  ];
  increment(index: number) {
    this.products[index].product_quantity+=1;
  }
  decrement(index: number) {
    this.products[index].product_quantity-=1;
  }
}
