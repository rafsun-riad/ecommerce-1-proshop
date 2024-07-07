import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
  order: {},
  isLoading: false,
  isError: false,
  success: false,
  error: null,
};

export const fetchOrderCreate = createAsyncThunk(
  'order/fetchOrderCreate',
  async (orderDetails) => {
    const order = await createOrder(orderDetails);
    return order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.success = false;
      state.error = null;
      state.isError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderCreate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(fetchOrderCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
