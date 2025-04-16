import React from "react";
import { Button, Input } from "@/components/ui";
import { useAppDispatch } from "@/store/hooks";
import {
  useGameStatus,
  useBetAmount,
  useRevealedGems,
  useCurrentMultiplier,
  useCalculateProfit,
} from "@/store/hooks";
import { initializeGrid, handleCashout, setBetAmount } from "@/store/gameSlice";
import { BOMB_COUNT, GEM_COUNT } from "@/lib/constants";
import styles from "@/app/page.module.css";

export function GameControls() {
  const dispatch = useAppDispatch();
  const gameState = useGameStatus();
  const betAmount = useBetAmount();
  const revealedGems = useRevealedGems();
  const currentMultiplier = useCurrentMultiplier();
  const calculateProfit = useCalculateProfit();

  const handleBetChange = (value: string) => {
    // Convert string to number
    const numericValue = parseFloat(value) || 0;
    dispatch(setBetAmount(numericValue));
  };

  const handlePlaceBet = () => {
    if (betAmount <= 0) return;
    dispatch(initializeGrid());
  };

  const onCashout = () => {
    dispatch(handleCashout());
  };

  return (
    <div className={styles.controls}>
      <Input
        label="Bet Amount"
        value={betAmount.toString()}
        onChange={handleBetChange}
        disabled={gameState === "playing"}
      />

      {gameState === "idle" || gameState === "won" || gameState === "lost" ? (
        <Button text="Place Bet" onClick={handlePlaceBet} />
      ) : (
        <>
          <Button
            text={`Cashout ${calculateProfit()} EUR`}
            onClick={onCashout}
            disabled={revealedGems === 0}
          />
          <div className={styles.betInputs}>
            <Input label="Mines" value={BOMB_COUNT.toString()} />
            <Input label="Gems" value={GEM_COUNT.toString()} />
          </div>
          <Input
            label={`Total Profit (${currentMultiplier.toFixed(2)}x)`}
            value={calculateProfit()}
          />
        </>
      )}
    </div>
  );
}
