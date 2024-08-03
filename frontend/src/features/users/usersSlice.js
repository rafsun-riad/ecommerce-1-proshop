import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  getAllUser,
  getUserById,
  getUserDetails,
  updateUser,
  updateUserProfile,
  userLogin,
  userRegister,
} from './usersApi';

const initialState = {
  user: null,
  userInfo: null,
  usersList: [],
  userDetailsById: {},
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

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (data) => {
    const allUsers = await getAllUser(data);
    return allUsers;
  }
);

export const fetchDeleteUser = createAsyncThunk(
  'users/fetchDeleteUser',
  async (data) => {
    const deletedUser = await deleteUser(data);
    return deletedUser;
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (data) => {
    const userById = await getUserById(data);
    return userById;
  }
);

export const updateUserById = createAsyncThunk(
  'users/updateUserById',
  async (data) => {
    const updatedUserData = await updateUser(data);
    return updatedUserData;
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
        state.error = null;
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
        state.error = null;
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
        state.error = null;
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
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.usersList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(fetchDeleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchDeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userDetailsById = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      })
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.success = true;
        state.userDetailsById = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
        state.success = false;
      });
  },
});

export const { userLogout, updateSuccessReset } = userSlice.actions;
export default userSlice.reducer;
