import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  isLoading: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = {};
    },
  },
  extraReducers: {},
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
