import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import cartReducer from './features/cart/cartSlice';
import { loadCartState, saveCartState } from './utility/localStorageUtils';

const preloadedState = {
  cart: loadCartState(),
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export default store;
