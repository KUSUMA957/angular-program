import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card">
      <h4>{{ name }}</h4>
      <p class="price">\${{ price }}</p>
      <p class="description">{{ description }}</p>
      <p class="category">Category: {{ category }}</p>
    </div>
  `,
  styles: [`
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      background-color: #f9f9f9;
      max-width: 250px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .product-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    
    h4 {
      color: #333;
      margin: 0 0 8px 0;
      font-size: 18px;
    }
    
    .price {
      color: #e74c3c;
      font-weight: bold;
      font-size: 16px;
      margin: 4px 0;
    }
    
    .description {
      color: #666;
      font-size: 14px;
      margin: 8px 0;
    }
    
    .category {
      color: #3498db;
      font-size: 12px;
      font-style: italic;
      margin: 4px 0 0 0;
    }
  `]
})
export class ProductCardComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';
  @Input() category: string = '';
}
