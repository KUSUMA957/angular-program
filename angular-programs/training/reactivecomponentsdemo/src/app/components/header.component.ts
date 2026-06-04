import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header">
      <h1>Reactive Component Demo</h1>
      <div class="selected-category">
        <span class="label">Current Selection:</span>
        <span class="category-badge">{{ selectedCategory$ | async }}</span>
      </div>
    </div>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 30px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      font-weight: 300;
    }
    
    .selected-category {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .label {
      font-size: 16px;
      opacity: 0.9;
    }
    
    .category-badge {
      background: rgba(255, 255, 255, 0.2);
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `]
})
export class HeaderComponent {
  selectedCategory$;
  
  constructor(private categoryService: CategoryService) {
    this.selectedCategory$ = this.categoryService.selectedCategory$;
  }
}
