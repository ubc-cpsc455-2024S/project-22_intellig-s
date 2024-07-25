import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for signing up
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        username,
        password
      });
      if (response.data) {
        return response.data; // Typically, you would store the user and possibly a token, depending on your backend response
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for signing in
export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {
        username,
        password
      });
      if (response.data) {
        return { user: response.data.user }; // Adapt based on actual response structure; include token if sent by backend
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    status: 'idle',
    error: null
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logoutUser(state) {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(signupUser.pending, state => {
          state.status = 'loading';
        })
        .addCase(signupUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token; // Assuming token is returned
          state.isLoggedIn = true;
          state.status = 'succeeded';
        })
        .addCase(signupUser.rejected, (state, action) => {
          state.error = action.payload;
          state.status = 'failed';
        })
        .addCase(signIn.pending, state => {
          state.status = 'loading';
        })
        .addCase(signIn.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.status = 'succeeded';
        })
        .addCase(signIn.rejected, (state, action) => {
          state.error = action.payload;
          state.status = 'failed';
        });
    }
  });
  
  export const { logoutUser } = userSlice.actions;
  export default userSlice.reducer;
  