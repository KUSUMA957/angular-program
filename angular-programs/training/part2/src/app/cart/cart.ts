import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);
  cartItems$: Observable<CartItem[]> = this.cartService.getCart();
  itemName = '';
  itemPrice: number | null = null;
  itemQuantity: number = 1;
  addItem() {
    if (!this.itemName.trim() || !this.itemPrice) return;
    this.cartService.addItem(
      this.itemName,
      this.itemPrice,
      this.itemQuantity
    );
    this.itemName = '';
    this.itemPrice = null;
    this.itemQuantity = 1;
  }
  removeItem(id: number) {
    this.cartService.removeItem(id);
  }
  get totalPrice() {
    return this.cartService.getTotal();
  }
}