// store/slices/adminAuthSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AdminUser {
  id: number;
  username: string;
  email: string;
  name?: string;
}

interface AdminAuthState {
  admin: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AdminAuthState = {
  admin: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const adminSignup = createAsyncThunk(
  "adminAuth/signup",
  async (
    adminData: {
      email: string;
      username: string;
      password: string;
      name?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const adminLogout = createAsyncThunk(
  "adminAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logoutLocal: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Admin Signup
    builder
      .addCase(adminSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminSignup.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(adminSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Admin Login
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Admin Logout
    builder
      .addCase(adminLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.admin = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logoutLocal } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
