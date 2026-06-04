import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from '../app/counter/counter';
import { SearchFilter } from '../app/search-filter/search-filter';
import { Timer } from '../app/timer/timer';
import { UserListComponent } from '../app/user/user';
import { Cart } from '../app/cart/cart';
import { LiveStockComponent } from './LiveStock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, Counter, SearchFilter, Timer, UserListComponent, CommonModule, Cart, LiveStockComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('part2');
}
