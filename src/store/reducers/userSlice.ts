// store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserProfile {
  id: number;
  email: string;
  username: string;
  name?: string;
  walletAddress?: string;
  phone?: string;
  walletNetwork?: string;
  country?: string;
  profilePicture?: string;
  balance: number;
  level: number;
  completedTasks: number;
}

interface Deposit {
  id: number;
  amount: number;
  network: string;
  walletAddress: string;
  status: string;
  txHash?: string;
  createdAt: string;
}

interface Withdrawal {
  id: number;
  amount: number;
  network: string;
  walletAddress: string;
  status: string;
  adminNote?: string;
  createdAt: string;
}

interface Transactions {
  deposits: Deposit[];
  withdrawals: Withdrawal[];
}

interface UserState {
  profile: UserProfile | null;
  transactions: Transactions;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  transactions: {
    deposits: [],
    withdrawals: [],
  },
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/profile");
      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.profile;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.profile;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const createDeposit = createAsyncThunk(
  "user/createDeposit",
  async (
    depositData: {
      network: string;
      walletAddress: string;
      amount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/users/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(depositData),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.deposit;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "user/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/transactions");
      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.transactions;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const createWithdrawal = createAsyncThunk(
  "user/createWithdrawal",
  async (
    withdrawalData: {
      network: string;
      walletAddress: string;
      amount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/users/withdrawal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withdrawalData),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.withdrawal;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create deposit
    builder
      .addCase(createDeposit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDeposit.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createDeposit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create withdrawal
    builder
      .addCase(createWithdrawal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createWithdrawal.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createWithdrawal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
