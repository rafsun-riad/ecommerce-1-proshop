import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/users/usersSlice';
import { loadCartState, saveCartState } from './utility/localStorageUtils';

const preloadedState = {
  cart: loadCartState(),
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    users: userReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export default store;
