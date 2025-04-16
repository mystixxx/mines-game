import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWalletBalance } from "@/api/services/wallet";
import { DEFAULT_BALANCE } from "@/lib/constants";

// Define wallet state type
interface WalletState {
  balance: number;
  currency: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state with default values
const initialState: WalletState = {
  balance: DEFAULT_BALANCE,
  currency: "EUR",
  status: "idle",
  error: null,
};

// Async thunk for fetching wallet balance
export const fetchWalletBalanceThunk = createAsyncThunk(
  "wallet/fetchBalance",
  async (customerId?: string) => {
    const response = await fetchWalletBalance(customerId);
    // Convert cents to standard currency
    const standardBalance = response.balance / 100;
    return {
      balance: standardBalance,
      currency: response.currency,
    };
  }
);

// Create wallet slice
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalanceThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWalletBalanceThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balance = action.payload.balance;
        state.currency = action.payload.currency;
        state.error = null;
      })
      .addCase(fetchWalletBalanceThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch balance";
      });
  },
});

// Export actions and reducer
export const { updateBalance } = walletSlice.actions;
export default walletSlice.reducer;
