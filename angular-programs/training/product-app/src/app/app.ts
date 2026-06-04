import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('product-app');
}