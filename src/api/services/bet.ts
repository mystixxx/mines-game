import { API_CONFIG } from "../config";
import { API_ROUTES } from "../routes";
import toast from "react-hot-toast";

export interface PlaceBetRequest {
  transaction: {
    provider: string;
    customer: {
      id: string;
      token: string;
      session_id: string;
    };
    game_id: string;
    spin_id: string;
    external_id: string;
    amount: number;
    currency: string;
  };
  free_spin: boolean;
}

export interface PlaceBetResponse {
  status: {
    code: string;
    error: boolean;
    error_message: string;
  };
  balance: number;
  currency: string;
  transaction_id: string;
  internal_transaction_id: string;
  free_spins: number;
}

export interface CashoutRequest {
  transaction: {
    provider: string;
    customer: {
      id: string;
      token: string;
      session_id: string;
    };
    game_id: string;
    spin_id: string;
    external_id: string;
    amount: number;
    currency: string;
  };
  jackpot: boolean;
}

export interface CashoutResponse {
  status: {
    code: string;
    error: boolean;
    error_message: string;
  };
  balance: number;
  currency: string;
  transaction_id: string;
  internal_transaction_id: string;
  free_spins: number;
}

/**
 * Places a bet (debit transaction)
 */
export const placeBet = async (
  customerId: string = "e293915c-da83-4ef3-a471-5578e5bcb9cf",
  betAmount: number
): Promise<PlaceBetResponse> => {
  const requestBody: PlaceBetRequest = {
    transaction: {
      provider: "Hogamba",
      customer: {
        id: customerId,
        token: "40d80626-e63d-44fa-a801-595cc4624ed3",
        session_id: "908734530-gh53-4535-tm51-fd1486nr352"
      },
      game_id: "hogamba_mines",
      spin_id: "spin_1234",
      external_id: "external_1234",
      amount: betAmount,
      currency: "EUR"
    },
    free_spin: false
  };

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_ROUTES.WALLET.DEBIT}`,
    {
      headers: API_CONFIG.HEADERS,
      method: "POST",
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Failed to place bet`;
    
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch (e) {
      console.log(e);
    }
    
    toast.error(errorMessage);
  }

  return response.json();
};

/**
 * Cashes out winnings (credit transaction)
 */
export const cashout = async (
  customerId: string = "e293915c-da83-4ef3-a471-5578e5bcb9cf",
  cashoutAmount: number
): Promise<CashoutResponse> => {
  const requestBody: CashoutRequest = {
    transaction: {
      provider: "Hogamba",
      customer: {
        id: customerId,
        token: "40d80626-e63d-44fa-a801-595cc4624ed3",
        session_id: "908734530-gh53-4535-tm51-fd1486nr352"
      },
      game_id: "hogamba_mines",
      spin_id: "spin_1234",
      external_id: "external_1234",
      amount: cashoutAmount,
      currency: "EUR"
    },
    jackpot: false
  };

  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_ROUTES.WALLET.CREDIT}`,
    {
      headers: API_CONFIG.HEADERS,
      method: "POST",
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Failed to cashout`;
    
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch (e) {
      console.log(e);
    }
    
    toast.error(errorMessage);
  }

  return response.json();
}; 