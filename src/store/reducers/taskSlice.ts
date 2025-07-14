// store/slices/taskSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Task {
  id: number;
  productId: number;
  profitEarned: number;
  amountDebited: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    image?: string;
    price: number;
    negativeAmount: number;
  };
}

interface TaskState {
  tasks: Task[];
  availableProducts: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  availableProducts: [],
  isLoading: false,
  error: null,
};

export const fetchUserTasks = createAsyncThunk(
  "task/fetchUserTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/tasks");
      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.tasks;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const fetchAvailableProducts = createAsyncThunk(
  "task/fetchAvailableProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/products");
      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.products;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const submitTask = createAsyncThunk(
  "task/submit",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/tasks/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.task;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user tasks
    builder
      .addCase(fetchUserTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch available products
    builder
      .addCase(fetchAvailableProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availableProducts = action.payload;
      })
      .addCase(fetchAvailableProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Submit task
    builder
      .addCase(submitTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
