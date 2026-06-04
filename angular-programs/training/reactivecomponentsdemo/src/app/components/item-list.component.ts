import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="item-list">
      <h3>Items</h3>
      <div class="items-grid">
        <div 
          *ngFor="let item of filteredItems$ | async; trackBy: trackByItemId" 
          class="item-card"
        >
          <h4>{{ item.name }}</h4>
          <p class="category">{{ item.category }}</p>
          <p class="price">\${{ item.price }}</p>
        </div>
      </div>
      <div *ngIf="(filteredItems$ | async)?.length === 0" class="no-items">
        No items found for the selected category.
      </div>
    </div>
  `,
  styles: [`
    .item-list {
      margin: 20px 0;
    }
    
    h3 {
      color: #333;
      margin-bottom: 15px;
    }
    
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .item-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .item-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .item-card h4 {
      margin: 0 0 8px 0;
      color: #333;
    }
    
    .category {
      margin: 5px 0;
      color: #666;
      font-size: 14px;
      font-style: italic;
    }
    
    .price {
      margin: 8px 0 0 0;
      color: #007bff;
      font-weight: 600;
      font-size: 16px;
    }
    
    .no-items {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 40px;
      background: #f8f9fa;
      border-radius: 8px;
    }
  `]
})
export class ItemListComponent {
  private items: Item[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 699 },
    { id: 3, name: 'Angular Guide', category: 'Books', price: 45 },
    { id: 4, name: 'JavaScript Cookbook', category: 'Books', price: 39 },
    { id: 5, name: 'T-Shirt', category: 'Clothes', price: 25 },
    { id: 6, name: 'Jeans', category: 'Clothes', price: 79 },
    { id: 7, name: 'Pizza', category: 'Food', price: 18 },
    { id: 8, name: 'Coffee', category: 'Food', price: 5 },
    { id: 9, name: 'Tablet', category: 'Electronics', price: 449 },
    { id: 10, name: 'Sweater', category: 'Clothes', price: 59 }
  ];

  filteredItems$;

  constructor(private categoryService: CategoryService) {
    this.filteredItems$ = this.categoryService.selectedCategory$.pipe(
      map(category => 
        category === 'All' 
          ? this.items 
          : this.items.filter(item => item.category === category)
      )
    );
  }

  trackByItemId(index: number, item: Item): number {
    return item.id;
  }
}
