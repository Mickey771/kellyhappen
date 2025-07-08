// store/slices/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
  negativeAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.product;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.product;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/admin/products");
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

export const setUserTaskOverride = createAsyncThunk(
  "product/setUserOverride",
  async (
    data: { userId: number; productId: number; negativeAmount: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/admin/products/user-override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        return rejectWithValue(result.message);
      }

      return result.override;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Set user task override
    builder
      .addCase(setUserTaskOverride.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setUserTaskOverride.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setUserTaskOverride.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
