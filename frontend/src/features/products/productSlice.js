import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductDetails, getProducts } from './productsAPI';

const initialState = {
  products: [],
  productDetails: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchProductsList = createAsyncThunk(
  'products/fetchProductList',
  async () => {
    const products = await getProducts();
    return products;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (id) => {
    const product = await getProductDetails(id);
    return product;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      // fetch productlist
      .addCase(fetchProductsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default productSlice.reducer;
