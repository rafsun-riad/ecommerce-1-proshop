import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/users/usersSlice';
import {
  loadCartState,
  loadShippingAddress,
  loadUserState,
  saveCartState,
  saveShippingAddress,
  saveUserState,
} from './utility/localStorageUtils';

const preloadedState = {
  cart: { cartItems: loadCartState(), shippingAddress: loadShippingAddress() },
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
  saveCartState(store.getState().cart.cartItems);
  saveUserState(store.getState().users.userInfo);
  saveShippingAddress(store.getState().cart.shippingAddress);
});

export default store;
