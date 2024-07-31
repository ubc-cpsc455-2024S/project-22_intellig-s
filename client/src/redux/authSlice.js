import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/auth"; // Update with your backend URL

// Thunks for async actions
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token, { rejectWithValue }) => {
    const user = jwtDecode(token);
    if (Date.now() / 1000 > user.exp) return rejectWithValue("Token expired");

    try {
      const response = await axios.get(`${API_URL}/fetch/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/signin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (userDetails, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();
    try {
      const response = await axios.post(`${API_URL}/edit`, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePreferences = createAsyncThunk(
  "auth/updatePreferences",
  async (preferences, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();
    try {
      const response = await axios.post(
        `${API_URL}/updatePreferences`,
        preferences,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "auth/updateProfilePicture",
  async (file, { getState, rejectWithValue }) => {
    const {
      auth: { token },
    } = getState();

    try {
      let data = new FormData();
      data.append("file", file);

      const response = await axios.post(
        `${API_URL}/updateProfilePicture`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  usernameConflict: false,
  emailConflict: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.token;
        state.user = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        localStorage.removeItem("token");
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.usernameConflict = false;
        state.emailConflict = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.error = null;
        state.user = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.usernameConflict = action.payload.usernameConflict;
        state.emailConflict = action.payload.emailConflict;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.error = null;
        state.user = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.usernameConflict = false;
        state.emailConflict = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = jwtDecode(action.payload.token);
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.usernameConflict = action.payload.usernameConflict;
        state.emailConflict = action.payload.emailConflict;
      })
      .addCase(updateProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.imageId = action.payload.imageId;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePreferences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, preferences: action.payload.preferences };
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
