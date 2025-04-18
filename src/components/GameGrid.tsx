import React from "react";
import { motion } from "motion/react";
import { Tile } from "@/components/ui";
import { MultiplierPopup } from "@/components/ui";
import { useAppDispatch } from "@/store/hooks";
import {
  useGrid,
  useGameStatus,
  useCurrentMultiplier,
  useWinAmount,
} from "@/store/hooks";
import { handleTileClick } from "@/store/gameSlice";
import styles from "@/app/page.module.css";

export function GameGrid() {
  const dispatch = useAppDispatch();
  const grid = useGrid();
  const gameState = useGameStatus();
  const currentMultiplier = useCurrentMultiplier();
  const winAmount = useWinAmount();
  const showMultiplierPopup = gameState === "won";

  const onTileClick = (row: number, col: number) => {
    dispatch(handleTileClick({ row, col }));
  };

  return (
    <motion.div
      className={styles.gridContainer}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {showMultiplierPopup && (
        <div className={styles.multiplierPopup}>
          <MultiplierPopup
            multiplier={currentMultiplier}
            amount={winAmount}
          />
        </div>
      )}

      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.gridRow}>
          {row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              variant={tile.variant}
              clicked={tile.clicked}
              revealed={tile.revealed}
              onClick={() => onTileClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
}
