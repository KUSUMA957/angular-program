import { Component, signal } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, CommonModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  products = [
    { name: 'Laptop', category: 'Electronics', price: 60000 },
    { name: 'Shirt', category: 'Clothing', price: 1200 },
    { name: 'Mobile', category: 'Electronics', price: 25000 },
    { name: 'Shoes', category: 'Footwear', price: 3000 },
  ];
  selectedIndex: number | null = null;
  select(i: number) {
    this.selectedIndex = i;
    console.log('Selected index =', i);
  }
  currentItemSelected = signal('Electronics');
  setSelectedItem(item: string) {
    this.currentItemSelected.set(item);
  }

  categories = Array.from(new Set(this.products.map((p) => p.category)));

  filteredProducts = this.products;

  onCategorySelect(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    this.filteredProducts =
      selected === 'ALL' ? this.products : this.products.filter((p) => p.category === selected);
  }
}
