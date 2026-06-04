import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-selector">
      <label for="category">Select Category:</label>
      <select id="category" (change)="onSelect($event)" class="category-dropdown">
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothes">Clothes</option>
        <option value="Food">Food</option>
      </select>
    </div>
  `,
  styles: [`
    .category-selector {
      margin: 20px 0;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }
    
    .category-dropdown {
      padding: 8px 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      background: white;
      cursor: pointer;
      transition: border-color 0.3s;
    }
    
    .category-dropdown:hover {
      border-color: #007bff;
    }
    
    .category-dropdown:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  `]
})
export class CategorySelectorComponent {
  constructor(private categoryService: CategoryService) {}

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.categoryService.selectCategory(target.value);
  }
}
