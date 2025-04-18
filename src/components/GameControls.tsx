import React from "react";
import { Button, Input } from "@/components/ui";
import { useAppDispatch } from "@/store/hooks";
import {
  useGameStatus,
  useBetAmount,
  useRevealedGems,
  useCurrentMultiplier,
  useCalculateProfit,
  useWalletBalance,
} from "@/store/hooks";
import { initializeGrid, handleCashout as gameHandleCashout, setBetAmount } from "@/store/gameSlice";
import { BOMB_COUNT, GEM_COUNT } from "@/lib/constants";
import styles from "@/app/page.module.css";
import { usePlaceBet, useCashout } from "@/api/hooks/useBet";
import { updateBalance } from "@/store/walletSlice";

export function GameControls() {
  // Redux state and hooks
  const dispatch = useAppDispatch();
  const gameState = useGameStatus();
  const betAmount = useBetAmount();
  const revealedGems = useRevealedGems();
  const currentMultiplier = useCurrentMultiplier();
  const calculateProfit = useCalculateProfit();
  const walletBalance = useWalletBalance();
  
  // API mutation hooks
  const { mutate: placeBet, isPending: isPlacingBet } = usePlaceBet();
  const { mutate: cashout, isPending: isCashingOut } = useCashout();

  // Converts API balance (cents) to display balance (euros)
  const convertToDisplayBalance = (balanceInCents: number): number => balanceInCents / 100;

  // Updates wallet balance from API response
  const updateWalletBalance = (balanceInCents: number): void => {
    dispatch(updateBalance(convertToDisplayBalance(balanceInCents)));
  };

  const handleBetChange = (value: number) => {
    dispatch(setBetAmount(value));
  };

  const handlePlaceBet = () => {
    if (betAmount <= 0) return;
    
    // Convert to cents for API
    const betAmountInCents = Math.round(betAmount * 100);
    
    placeBet(
      { betAmount: betAmountInCents },
      {
        onSuccess: (response) => {
          // Update balance and initialize game
          updateWalletBalance(response.balance);
          dispatch(initializeGrid());
        },
      }
    );
  };

  const handleCashout = () => {
    const profit = parseFloat(calculateProfit());
    if (profit <= 0 || revealedGems === 0) return;
    
    // Expected balance after cashout
    const expectedBalance = walletBalance + profit;
    
    // Convert to cents for API
    const cashoutAmountInCents = Math.round(profit * 100);
    
    cashout(
      { cashoutAmount: cashoutAmountInCents },
      {
        onSuccess: (response) => {
          // Update balance
          updateWalletBalance(response.balance);
          
          // Verify balance matches expected value
          const receivedBalance = convertToDisplayBalance(response.balance);
          if (Math.abs(receivedBalance - expectedBalance) > 0.01) {
            console.warn("Balance mismatch after cashout", {
              expected: expectedBalance,
              received: receivedBalance
            });
          }
          
          dispatch(gameHandleCashout());
        }
      }
    );
  };

  // Determine if bet button should be disabled
  const isBetButtonDisabled = isPlacingBet || betAmount <= 0;
  
  // Determine if cashout button should be disabled
  const isCashoutButtonDisabled = isCashingOut || revealedGems === 0;

  // Calculate profit display text
  const profitDisplay = calculateProfit();
  const cashoutButtonText = isCashingOut ? "Cashing Out..." : `Cashout ${profitDisplay} EUR`;

  return (
    <div className={styles.controls}>
      <Input
        label="Bet Amount"
        value={betAmount}
        onChange={handleBetChange}
        disabled={gameState === "playing"}
      />

      {gameState === "idle" || gameState === "won" || gameState === "lost" ? (
          <Button 
            text={isPlacingBet ? "Placing Bet..." : "Place Bet"} 
            onClick={handlePlaceBet} 
            disabled={isBetButtonDisabled}
        />
      ) : (
        <>
          <Button
            text={cashoutButtonText}
            onClick={handleCashout}
            disabled={isCashoutButtonDisabled}
          />
          <div className={styles.betInputs}>
            <Input label="Mines" value={BOMB_COUNT} disabled/>
            <Input label="Gems" value={GEM_COUNT} disabled/>
          </div>
          <Input
            label={`Total Profit (${currentMultiplier.toFixed(2)}x)`}
            value={Number(parseFloat(profitDisplay).toFixed(2))}
            disabled
          />
        </>
      )}
    </div>
  );
}
