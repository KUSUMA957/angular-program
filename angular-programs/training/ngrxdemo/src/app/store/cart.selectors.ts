import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';
import { cartAdapter } from './cart.reducer';

// Feature selector
export const selectCartState = createFeatureSelector<CartState>('cart');

// Entity selectors
const { selectAll, selectEntities, selectIds, selectTotal } = cartAdapter.getSelectors();

// Select all products in cart
export const selectAllProducts = createSelector(selectCartState, selectAll);

// Select product entities
export const selectProductEntities = createSelector(selectCartState, selectEntities);

// Select product IDs
export const selectProductIds = createSelector(selectCartState, selectIds);

// Select total number of products
export const selectTotalProducts = createSelector(selectCartState, selectTotal);

// Select total price
export const selectTotalPrice = createSelector(selectAllProducts, (products) => {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
});

// Select total items count (sum of all quantities)
export const selectTotalItemsCount = createSelector(selectAllProducts, (products) => {
  return products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
});
