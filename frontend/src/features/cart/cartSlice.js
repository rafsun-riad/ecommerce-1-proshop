import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === item._id ? action.payload : x
          ),
        };
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      state.cartItems.splice(itemIndex, 1);
    },
    updateQuantiy: (state, action) => {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.qty = action.payload.qty;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantiy } = cartSlice.actions;
export default cartSlice.reducer;
