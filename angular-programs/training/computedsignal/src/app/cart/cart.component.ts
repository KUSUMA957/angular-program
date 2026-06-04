import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  // Base signals
  price = signal(100);
  quantity = signal(2);
  discount = signal(10); // in percentage

  // Computed signal — depends on other signals
  totalPrice = computed(() => {
    const subtotal = this.price() * this.quantity();
    const discountAmount = (subtotal * this.discount()) / 100;
    return subtotal - discountAmount;
  });

  // Methods to update signals
  increaseQty() {
    this.quantity.update(q => q + 1);
  }

  decreaseQty() {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  changeDiscount(event: Event) {
    const target = event.target as HTMLInputElement;
    this.discount.set(Number(target.value));
  }
}
