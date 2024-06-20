import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserDetails,
  updateUserProfile,
  userLogin,
  userRegister,
} from './usersApi';

const initialState = {
  user: null,
  userInfo: null,
  userList: [],
  isLoading: false,
  isError: false,
  error: null,
  success: false,
};

export const fetchUserInfo = createAsyncThunk(
  'users/fetchUserInfo',
  async (userCredential) => {
    const { email, password } = userCredential;
    const userData = await userLogin(email, password);
    return userData;
  }
);

export const fetchUserRegister = createAsyncThunk(
  'users/fetchUserRegister',
  async (userRegData) => {
    const { name, email, password } = userRegData;
    const userData = await userRegister(name, email, password);
    return userData;
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (userData) => {
    const { token } = userData;
    const userDetails = await getUserDetails(token);
    return userDetails;
  }
);

export const fetchUserProfileUpdate = createAsyncThunk(
  'users/fetchUserProfileUpdate',
  async (userData) => {
    const userUpdateDetails = await updateUserProfile(userData);
    return userUpdateDetails;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = null;
      state.user = null;
      localStorage.removeItem('userInfo');
    },
    updateSuccessReset: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchUserRegister.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchUserRegister.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = true;
        state.error = action.error?.message;
      })
      .addCase(fetchUserProfileUpdate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.success = false;
      })
      .addCase(fetchUserProfileUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isError = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfileUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.success = false;
        state.error = action.error?.message;
      });
  },
});

export const { userLogout, updateSuccessReset } = userSlice.actions;
export default userSlice.reducer;
