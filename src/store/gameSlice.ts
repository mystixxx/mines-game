import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameGrid, GameState } from "@/lib/types";
import { TileVariant } from "@/components/ui/Tile/Tile";
import {
  GRID_SIZE,
  BOMB_COUNT,
  GEM_COUNT,
  INITIAL_MULTIPLIER,
  INITIAL_BET,
  MULTIPLIER_INCREMENT,
} from "@/lib/constants";

// Define the state structure
interface GameSliceState {
  grid: GameGrid;
  gameState: GameState;
  betAmount: number;
  revealedGems: number;
  currentMultiplier: number;
}

// Create empty grid
const createEmptyGrid = (): GameGrid => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({
          variant: "default" as TileVariant,
          clicked: false,
          revealed: false,
        }))
    );
};

// Place items randomly on the grid
const placeRandomItems = (
  grid: GameGrid,
  count: number,
  itemType: TileVariant
): GameGrid => {
  const newGrid = JSON.parse(JSON.stringify(grid)) as GameGrid;
  let itemsPlaced = 0;

  while (itemsPlaced < count) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);

    if (newGrid[row][col].variant === "default") {
      newGrid[row][col].variant = itemType;
      itemsPlaced++;
    }
  }

  return newGrid;
};

// Initialize the state
const initialState: GameSliceState = {
  grid: createEmptyGrid(),
  gameState: "idle",
  betAmount: INITIAL_BET,
  revealedGems: 0,
  currentMultiplier: INITIAL_MULTIPLIER,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeGrid: (state) => {
      // Reset game state
      state.revealedGems = 0;
      state.currentMultiplier = INITIAL_MULTIPLIER;

      // Create empty grid with default tiles
      let newGrid = createEmptyGrid();

      // Place bombs and gems
      newGrid = placeRandomItems(newGrid, BOMB_COUNT, "bomb");
      newGrid = placeRandomItems(newGrid, GEM_COUNT, "gem");

      state.grid = newGrid;
      state.gameState = "playing";
    },
    revealAllTiles: (state) => {
      state.grid = state.grid.map((row) =>
        row.map((tile) => {
          // If already clicked by the user, don't mark as "revealed"
          if (tile.clicked) {
            return tile;
          }
          // Otherwise mark unclicked tiles as revealed
          return { ...tile, revealed: true };
        })
      );
    },
    handleTileClick: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      const { row, col } = action.payload;

      if (state.gameState !== "playing") return;

      // Skip if already clicked or revealed
      if (state.grid[row][col].clicked || state.grid[row][col].revealed) return;

      // Mark as clicked (not revealed)
      state.grid[row][col].clicked = true;

      // Handle what happens based on tile content
      if (state.grid[row][col].variant === "bomb") {
        // Immediately set game state to lost when a bomb is clicked
        state.gameState = "lost";

        // Immediately reveal all tiles
        state.grid = state.grid.map((row) =>
          row.map((tile) => {
            if (tile.clicked) return tile;
            return { ...tile, revealed: true };
          })
        );
      } else if (state.grid[row][col].variant === "gem") {
        const newRevealedGems = state.revealedGems + 1;
        state.revealedGems = newRevealedGems;

        // Update multiplier: 1 + (0.2 * number of opened tiles)
        state.currentMultiplier =
          INITIAL_MULTIPLIER + MULTIPLIER_INCREMENT * newRevealedGems;
      }
    },
    handleCashout: (state) => {
      if (state.gameState !== "playing" || state.revealedGems === 0) return;

      // Set game state to won immediately to prevent further clicks
      state.gameState = "won";

      // Reveal all remaining tiles
      state.grid = state.grid.map((row) =>
        row.map((tile) => {
          if (tile.clicked) return tile;
          return { ...tile, revealed: true };
        })
      );
    },
    setBetAmount: (state, action: PayloadAction<number>) => {
      state.betAmount = action.payload;
    },
    resetGame: (state) => {
      state.grid = createEmptyGrid();
      state.gameState = "idle";
      state.revealedGems = 0;
      state.currentMultiplier = INITIAL_MULTIPLIER;
    },
  },
});

export const {
  initializeGrid,
  revealAllTiles,
  handleTileClick,
  handleCashout,
  setBetAmount,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
