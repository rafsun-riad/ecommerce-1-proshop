import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createProduct,
  createReview,
  deleteProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from './productsAPI';

const initialState = {
  products: [],
  productDetails: {},
  success: false,
  productDelete: {},
  productCreated: {},
  productReview: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchProductsList = createAsyncThunk(
  'products/fetchProductList',
  async (data) => {
    const products = await getProducts(data);
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

export const fetchCreateProduct = createAsyncThunk(
  'products/fetchCreateProduct',
  async (data) => {
    const createdProduct = await createProduct(data);
    return createdProduct;
  }
);

export const deleteProductById = createAsyncThunk(
  'products/deleteProductById',
  async (data) => {
    const deletedProduct = await deleteProduct(data);
    return deletedProduct;
  }
);

export const updateProductById = createAsyncThunk(
  'products/updateProductById',
  async (data) => {
    const updatedProduct = await updateProduct(data);
    return updatedProduct;
  }
);

export const createProductReview = createAsyncThunk(
  'products/createProductReview',
  async (data) => {
    const createdReview = await createReview(data);
    return createdReview;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
    resetCreatedProduct: (state) => {
      state.productCreated = {};
    },
  },
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
      })
      .addCase(fetchCreateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchCreateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.success = true;
        state.productCreated = action.payload;
      })
      .addCase(fetchCreateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.success = false;
        state.error = action.error;
      })
      .addCase(updateProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.productDetails = action.payload;
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(createProductReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.productReview = action.payload;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export const { resetSuccess, resetCreatedProduct } = productSlice.actions;
export default productSlice.reducer;
