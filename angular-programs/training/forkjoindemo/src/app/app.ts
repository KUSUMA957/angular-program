import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { forkJoin, of, delay } from 'rxjs';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
}

interface Order {
  id: number;
  product: string;
  amount: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

interface DashboardData {
  users: User[];
  orders: Order[];
  products: Product[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('forkJoin() - Dashboard Data Loader');
  protected readonly loading = signal(false);
  protected readonly dashboardData = signal<DashboardData | null>(null);

  // Simulated API call - Get Users (takes 2 seconds)
  private getUsers() {
    console.log('🔵 Calling getUsers()...');
    return of([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' }
    ] as User[]).pipe(delay(2000));
  }

  // Simulated API call - Get Orders (takes 1.5 seconds)
  private getOrders() {
    console.log('🟢 Calling getOrders()...');
    return of([
      { id: 101, product: 'Laptop', amount: 1299 },
      { id: 102, product: 'Mouse', amount: 29 },
      { id: 103, product: 'Keyboard', amount: 89 }
    ] as Order[]).pipe(delay(1500));
  }

  // Simulated API call - Get Products (takes 1 second)
  private getProducts() {
    console.log('🟡 Calling getProducts()...');
    return of([
      { id: 1, title: 'Laptop Pro', price: 1299 },
      { id: 2, title: 'Wireless Mouse', price: 29 },
      { id: 3, title: 'Mechanical Keyboard', price: 89 },
      { id: 4, title: 'Monitor 4K', price: 499 }
    ] as Product[]).pipe(delay(1000));
  }

  // Load all dashboard data using forkJoin
  loadDashboardData() {
    console.log('\n📊 Starting Dashboard Data Load...');
    console.log('⏳ Waiting for all APIs to complete...\n');
    this.loading.set(true);
    this.dashboardData.set(null);

    // forkJoin waits for all observables to complete
    forkJoin({
      users: this.getUsers(),
      orders: this.getOrders(),
      products: this.getProducts()
    }).subscribe({
      next: (result) => {
        console.log('\n✅ All APIs completed!');
        console.log('📦 Combined Result:', result);
        this.dashboardData.set(result);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('❌ Error loading dashboard data:', error);
        this.loading.set(false);
      }
    });
  }
}
