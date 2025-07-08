// store/slices/adminSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  todaysTransactions: number;
  pendingPayout: number;
}

interface AdminUser {
  id: number;
  username: string;
  phone: string;
  balance: number;
  completedTasks: number;
  level: number;
  createdAt: string;
}

interface AdminState {
  stats: DashboardStats | null;
  users: AdminUser[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  stats: null,
  users: [],
  isLoading: false,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/dashboard/stats");
      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.stats;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.users;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const updateUserBalance = createAsyncThunk(
  "admin/updateBalance",
  async (
    { userId, balance }: { userId: number; balance: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/balance`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance }),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.user;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const resetUserTasks = createAsyncThunk(
  "admin/resetTasks",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/reset-tasks`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return { userId };
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const setUserNegativeOverride = createAsyncThunk(
  "admin/setNegativeOverride",
  async (
    data: {
      userId: number;
      productIds: number[];
      negativeAmount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/admin/user-negative-override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        return rejectWithValue(result.message);
      }

      return result.overrides;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update balance
    builder.addCase(updateUserBalance.fulfilled, (state, action) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index].balance = action.payload.balance;
      }
    });

    // Reset tasks
    builder.addCase(resetUserTasks.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (u) => u.id === action.payload.userId
      );
      if (index !== -1) {
        state.users[index].completedTasks = 0;
      }
    });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
