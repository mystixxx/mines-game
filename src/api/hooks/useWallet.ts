import { useQuery } from "@tanstack/react-query";
import { fetchWalletBalance, WalletBalanceResponse } from "../services/wallet";

// Query keys for caching and invalidation
export const walletKeys = {
  all: ["wallet"] as const,
  balance: (customerId?: string) =>
    customerId
      ? ([...walletKeys.all, "balance", customerId] as const)
      : ([...walletKeys.all, "balance"] as const),
};

/**
 * Hook to fetch the user's wallet balance
 * @param customerId - Optional customer ID, defaults to the one in the service
 */
export const useWalletBalance = (customerId?: string) => {
  return useQuery<WalletBalanceResponse>({
    queryKey: walletKeys.balance(customerId),
    queryFn: () => fetchWalletBalance(customerId),
    // Configure as needed
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true,
  });
};
