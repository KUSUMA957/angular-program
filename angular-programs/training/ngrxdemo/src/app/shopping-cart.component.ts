import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from './store/product.model';
import * as CartActions from './store/cart.actions';
import * as CartSelectors from './store/cart.selectors';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  private store = inject(Store);

  // Observables from store
  cartProducts$: Observable<Product[]> = this.store.select(CartSelectors.selectAllProducts);
  totalPrice$: Observable<number> = this.store.select(CartSelectors.selectTotalPrice);
  totalItemsCount$: Observable<number> = this.store.select(CartSelectors.selectTotalItemsCount);

  // Form fields for adding new product
  newProductName = '';
  newProductPrice = 0;
  newProductQuantity = 1;

  // Add product to cart
  addProduct() {
    if (!this.newProductName.trim() || this.newProductPrice <= 0 || this.newProductQuantity <= 0) {
      alert('Please enter valid product details');
      return;
    }

    const product: Product = {
      id: Date.now().toString(), // Simple ID generation
      name: this.newProductName,
      price: this.newProductPrice,
      quantity: this.newProductQuantity,
    };

    this.store.dispatch(CartActions.addProduct({ product }));

    // Reset form
    this.newProductName = '';
    this.newProductPrice = 0;
    this.newProductQuantity = 1;
  }

  // Remove product from cart
  removeProduct(productId: string) {
    this.store.dispatch(CartActions.removeProduct({ productId }));
  }

  // Update product quantity
  updateQuantity(productId: string, quantity: number) {
    if (quantity < 0) {
      return;
    }
    this.store.dispatch(CartActions.updateProductQuantity({ productId, quantity }));
  }

  // Increase quantity by 1
  increaseQuantity(product: Product) {
    this.updateQuantity(product.id, product.quantity + 1);
  }

  // Decrease quantity by 1
  decreaseQuantity(product: Product) {
    this.updateQuantity(product.id, product.quantity - 1);
  }

  // Clear cart
  clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.store.dispatch(CartActions.clearCart());
    }
  }
}
