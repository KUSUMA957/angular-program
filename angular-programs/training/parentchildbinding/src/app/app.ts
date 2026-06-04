import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child/child.component';
import { UserCardComponent } from './user-card/user-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { Parentcomponent } from './parentcomponent/parentcomponent'
@Component({
  selector: 'app-root',
  imports: [CommonModule, ChildComponent, UserCardComponent, ProductCardComponent, Parentcomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('parentchildbinding');
  
  // Parent data to pass to child
  parentMessage = 'Hello from Parent Component!';
  parentNumber = 42;
  parentUser = {
    name: 'John Doe',
    age: 25
  };
  
  // Method to update data
  updateMessage() {
    this.parentMessage = 'Updated message at ' + new Date().toLocaleTimeString();
  }
  
  updateNumber() {
    this.parentNumber = Math.floor(Math.random() * 100);
  }
  
  updateUser() {
    this.parentUser = {
      name: 'Jane Smith',
      age: 30
    };
  }
  
  // User card data for UserCardComponent
  users = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://via.placeholder.com/50/4CAF50/white?text=AJ'
    },
    {
      name: 'Bob Smith', 
      email: 'bob@example.com',
      avatar: 'https://via.placeholder.com/50/2196F3/white?text=BS'
    },
    {
      name: 'Carol Williams',
      email: 'carol@example.com', 
      avatar: 'https://via.placeholder.com/50/FF9800/white?text=CW'
    }
  ];

  // Product data for demonstrating reusable ProductCardComponent
  products = [
    {
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation',
      category: 'Electronics'
    },
    {
      name: 'Running Shoes',
      price: 79.99,
      description: 'Comfortable running shoes for daily exercise',
      category: 'Sports'
    },
    {
      name: 'Coffee Mug',
      price: 12.99,
      description: 'Ceramic coffee mug with elegant design',
      category: 'Kitchen'
    },
    {
      name: 'Smartphone',
      price: 599.99,
      description: 'Latest smartphone with advanced camera features',
      category: 'Electronics'
    }
  ];
}
