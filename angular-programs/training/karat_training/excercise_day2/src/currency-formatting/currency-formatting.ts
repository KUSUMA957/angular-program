import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-formatting',
  imports: [CommonModule],
  templateUrl: './currency-formatting.html',
  styleUrl: './currency-formatting.css',
})
export class CurrencyFormatting {
  products = [
    { name: 'Laptop', price: 75000 },
    { name: 'Headphones', price: 2999.5 },
    { name: 'Airpods', price: 4999 }
  ];
}
