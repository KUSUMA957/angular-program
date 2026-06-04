import { Component } from '@angular/core';
import {  Childcomponent, Product } from '../childcomponent/childcomponent';
@Component({
  selector: 'app-parentcomponent',
  imports: [Childcomponent],
  templateUrl: './parentcomponent.html',
  styleUrl: './parentcomponent.css',
})
export class Parentcomponent {
  username: string = "Kusuma";
  
products: Product[] = [
    { productName: 'Laptop', productPrice: 75000, inStock: true },
    { productName: 'Phone', productPrice: 35000, inStock: false },
    { productName: 'Headphones', productPrice: 2999, inStock: true },
  ];
  user = { name: "Maya", age: 30, role: 'Admin'};
}
