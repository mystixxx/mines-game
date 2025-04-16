import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import walletReducer from "./walletSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    wallet: walletReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
