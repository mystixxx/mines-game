import { TileVariant } from "@/components/ui/Tile/Tile";

// Game tile type
export type GameTile = {
  variant: TileVariant;
  clicked: boolean;
  revealed: boolean;
};

// Game grid type
export type GameGrid = GameTile[][];

// Game state type
export type GameState = "idle" | "playing" | "won" | "lost";

// Game context type
export type GameContextType = {
  grid: GameGrid;
  gameState: GameState;
  betAmount: number;
  revealedGems: number;
  currentMultiplier: number;
  handleTileClick: (row: number, col: number) => void;
  handlePlaceBet: () => void;
  handleCashout: () => void;
  handleBetChange: (value: number) => void;
  calculateProfit: () => string;
};
