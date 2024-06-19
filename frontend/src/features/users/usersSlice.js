import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin } from './usersApi';

const initialState = {
  userInfo: {},
  userList: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  'users/fetchUserInfo',
  async (email, password) => {
    const userInfo = await userLogin(email, password);
    return userInfo;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.success, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
