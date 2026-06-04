import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

// Add product to cart
export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

// Remove product from cart
export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<{ productId: string }>()
);

// Update product quantity
export const updateProductQuantity = createAction(
  '[Cart] Update Product Quantity',
  props<{ productId: string; quantity: number }>()
);

// Clear cart
export const clearCart = createAction('[Cart] Clear Cart');
