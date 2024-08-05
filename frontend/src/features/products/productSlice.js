import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteProduct, getProductDetails, getProducts } from './productsAPI';

const initialState = {
  products: [],
  productDetails: {},
  success: false,
  productDelete: {},
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

export const deleteProductById = createAsyncThunk(
  'products/deleteProductById',
  async (data) => {
    const deletedProduct = await deleteProduct(data);
    return deleteProduct;
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
      // fetchproductdetails
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
      })
      .addCase(deleteProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.success = true;
        state.productDelete = action.payload;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.success = false;
        state.error = action.error;
      });
  },
});

export default productSlice.reducer;
