import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';
import { CartState } from './cart.state';
import * as CartActions from './cart.actions';

// Create entity adapter
export const cartAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

// Initial state
export const initialState: CartState = cartAdapter.getInitialState();

// Reducer
export const cartReducer = createReducer(
  initialState,
  
  // Add product
  on(CartActions.addProduct, (state, { product }) => {
    const existingProduct = state.entities[product.id];
    
    if (existingProduct) {
      // If product exists, update its quantity
      return cartAdapter.updateOne(
        {
          id: product.id,
          changes: { quantity: existingProduct.quantity + product.quantity },
        },
        state
      );
    } else {
      // If product doesn't exist, add it
      return cartAdapter.addOne(product, state);
    }
  }),
  
  // Remove product
  on(CartActions.removeProduct, (state, { productId }) => {
    return cartAdapter.removeOne(productId, state);
  }),
  
  // Update product quantity
  on(CartActions.updateProductQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      // Remove product if quantity is 0 or less
      return cartAdapter.removeOne(productId, state);
    }
    return cartAdapter.updateOne(
      {
        id: productId,
        changes: { quantity },
      },
      state
    );
  }),
  
  // Clear cart
  on(CartActions.clearCart, (state) => {
    return cartAdapter.removeAll(state);
  })
);
