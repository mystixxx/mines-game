import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selector for game state
export const useGameState = () => {
  return useAppSelector((state) => state.game);
};

// Selectors for game properties
export const useGrid = () => useAppSelector((state) => state.game.grid);
export const useGameStatus = () =>
  useAppSelector((state) => state.game.gameState);
export const useBetAmount = () =>
  useAppSelector((state) => state.game.betAmount);
export const useRevealedGems = () =>
  useAppSelector((state) => state.game.revealedGems);
export const useCurrentMultiplier = () =>
  useAppSelector((state) => state.game.currentMultiplier);
export const useWinAmount = () =>
  useAppSelector((state) => state.game.winAmount);

// Calculate profit helper
export const useCalculateProfit = () => {
  const { betAmount, currentMultiplier } = useAppSelector(
    (state) => state.game
  );
  return () => (betAmount * currentMultiplier).toFixed(2);
};

// Wallet selectors
export const useWallet = () => useAppSelector((state) => state.wallet);
export const useWalletBalance = () =>
  useAppSelector((state) => state.wallet.balance);
export const useWalletStatus = () =>
  useAppSelector((state) => state.wallet.status);
