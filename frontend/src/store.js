import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/users/usersSlice';
import {
  loadCartState,
  loadUserState,
  saveCartState,
  saveUserState,
} from './utility/localStorageUtils';

const preloadedState = {
  cart: loadCartState(),
  users: { userInfo: loadUserState() },
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
  saveUserState(store.getState().users.userInfo);
});

export default store;
