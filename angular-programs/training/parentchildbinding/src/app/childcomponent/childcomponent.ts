import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Product {
  productName: string;
  productPrice: number;
  inStock: boolean; // if your data uses ProductinStock, map it in the parent
}

@Component({
  selector: 'app-childcomponent',
  imports: [CommonModule, FormsModule],
  templateUrl: './childcomponent.html',
  styleUrl: './childcomponent.css',
})
export class Childcomponent {
  @Input() name!: string;
  @Input() products: Product[] = [];
  @Input() user!: {name: string, age: number, role: string};
  //@Input() products: {productName: string; productPrice: number; ProductinStock: boolean} | null = null;
}
