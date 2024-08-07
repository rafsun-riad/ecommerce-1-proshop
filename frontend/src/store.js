import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/users/usersSlice';
import orderReducer from './features/order/orderSlice';
import {
  loadCartState,
  loadPaymentMethod,
  loadShippingAddress,
  loadUserState,
  saveCartState,
  savePaymentMethodLocal,
  saveShippingAddress,
  saveUserState,
} from './utility/localStorageUtils';

const preloadedState = {
  cart: {
    cartItems: loadCartState(),
    shippingAddress: loadShippingAddress(),
    paymentMethod: loadPaymentMethod(),
  },
  users: { userInfo: loadUserState() },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    users: userReducer,
    order: orderReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartState([...store.getState().cart.cartItems]);
  saveUserState(store.getState().users.userInfo);
  saveShippingAddress(store.getState().cart.shippingAddress);
  savePaymentMethodLocal(store.getState().cart.paymentMethod);
});

export default store;
