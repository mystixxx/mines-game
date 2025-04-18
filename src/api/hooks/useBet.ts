import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeBet, PlaceBetResponse, cashout, CashoutResponse } from "../services/bet";
import { walletKeys } from "./useWallet";

/**
 * Hook to place a bet (debit transaction)
 */
export const usePlaceBet = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PlaceBetResponse, 
    Error, 
    { customerId?: string; betAmount: number }
  >({
    mutationFn: ({ customerId, betAmount }) => placeBet(customerId, betAmount),
    // Invalidate the balance query when a bet is placed
    onSuccess: (data, variables) => {
      // Invalidate the wallet balance query to refresh it
      queryClient.invalidateQueries({ 
        queryKey: walletKeys.balance(variables.customerId) 
      });
    }
  });
};

/**
 * Hook to cashout winnings (credit transaction)
 */
export const useCashout = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CashoutResponse, 
    Error, 
    { customerId?: string; cashoutAmount: number }
  >({
    mutationFn: ({ customerId, cashoutAmount }) => cashout(customerId, cashoutAmount),
    // Invalidate the balance query when a cashout is made
    onSuccess: (data, variables) => {
      // Invalidate the wallet balance query to refresh it
      queryClient.invalidateQueries({ 
        queryKey: walletKeys.balance(variables.customerId) 
      });
    }
  });
}; 