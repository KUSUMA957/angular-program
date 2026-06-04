import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCategoryFilterPipe } from '../pipes/product-category-filter-pipe';
@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, FormsModule, ProductCategoryFilterPipe],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  categories: string[] = ['Electronics', 'Clothing', 'Grocery'];
  selectedCategory: string = '';
  products = [
    { name: 'Laptop', category: 'Electronics' },
    { name: 'EarPhones', category: 'Electronics' },
    { name: 'Television', category: 'Electronics' },
    { name: 'Tablet', category: 'Electronics' },
    { name: 'Kurtas', category: 'Clothing' },
    { name: 'Trousers', category: 'Clothing' },
    { name: 'Shirts', category: 'Clothing' },
    { name: 'Rice', category: 'Grocery' },
    { name: 'Fruits', category: 'Grocery' },
    { name: 'Eggs', category: 'Grocery' }
  ];
  filteredProducts = this.products;
  // onCategoryChange() {
  //   if (this.selectedCategory) {
  //     this.filteredProducts = this.products.filter(
  //       product => product.category === this.selectedCategory
  //     );
  //   } else {
  //     this.filteredProducts = this.products;
  //   }
  // }
  resetFilter() {
    this.selectedCategory = '';
    this.filteredProducts = this.products;
  }
}
