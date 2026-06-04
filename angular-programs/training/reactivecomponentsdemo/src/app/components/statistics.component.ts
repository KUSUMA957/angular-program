import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { map, combineLatest } from 'rxjs';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="statistics">
      <h3>📊 Statistics</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ totalItems }}</div>
          <div class="stat-label">Total Items</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ (filteredCount$ | async) || 0 }}</div>
          <div class="stat-label">Filtered Items</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ (averagePrice$ | async) | number:'1.0-2' }}</div>
          <div class="stat-label">Avg Price (\$)</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .statistics {
      margin: 20px 0;
      padding: 15px;
      background: #e8f4f8;
      border-radius: 8px;
      border: 1px solid #bee5eb;
    }
    
    h3 {
      margin: 0 0 15px 0;
      color: #0c5460;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;
    }
    
    .stat-card {
      background: white;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #0c5460;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 12px;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `]
})
export class StatisticsComponent {
  private allItems = [
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

  totalItems = this.allItems.length;
  filteredItems$;
  filteredCount$;
  averagePrice$;

  constructor(private categoryService: CategoryService) {
    this.filteredItems$ = this.categoryService.selectedCategory$.pipe(
      map(category => 
        category === 'All' 
          ? this.allItems 
          : this.allItems.filter(item => item.category === category)
      )
    );

    this.filteredCount$ = this.filteredItems$.pipe(
      map(items => items.length)
    );

    this.averagePrice$ = this.filteredItems$.pipe(
      map(items => 
        items.length > 0 
          ? items.reduce((sum, item) => sum + item.price, 0) / items.length
          : 0
      )
    );
  }
}
