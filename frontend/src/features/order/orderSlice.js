import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getOrderDetails } from './orderAPI';

const initialState = {
  order: {},
  orderDetails: {},
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

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (data) => {
    const orderDetails = await getOrderDetails(data);
    return orderDetails;
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
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
