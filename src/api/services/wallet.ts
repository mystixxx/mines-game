import { API_CONFIG } from "../config";
import { API_ROUTES } from "../routes";
import toast from "react-hot-toast";

export interface WalletBalanceResponse {
  status: {
    code: string;
    error: boolean;
    error_message: string;
  };
  balance: number;
  currency: string;
}

/**
 * Fetches the user's wallet balance
 */
export const fetchWalletBalance = async (
  customerId: string = "e293915c-da83-4ef3-a471-5578e5bcb9cf"
): Promise<WalletBalanceResponse> => {
  const requestBody = {
    provider: "Hogamba",
    customer: {
      id: customerId,
      token: "40d80626-e63d-44fa-a801-595cc4624ed3",
    },
  };

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_ROUTES.WALLET.BALANCE}`,
    {
      headers: API_CONFIG.HEADERS,
      method: "POST",
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Failed to fetch wallet balance`;
    
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch (e) {
      // If parsing fails, keep the default message
    }
    
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};
