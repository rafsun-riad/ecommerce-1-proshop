import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
