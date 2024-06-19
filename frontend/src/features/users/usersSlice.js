import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin } from './usersApi';

const initialState = {
  userInfo: null,
  userList: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  'users/fetchUserInfo',
  async (userCredential) => {
    const { email, password } = userCredential;
    const userData = await userLogin(email, password);
    return userData;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = null;
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
      });
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;