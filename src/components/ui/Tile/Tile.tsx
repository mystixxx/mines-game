import React from "react";
import styles from "./Tile.module.css";
import Image from "next/image";
import { motion } from "motion/react";

export type TileVariant = "default" | "gem" | "bomb";

interface TileProps {
  variant?: TileVariant;
  clicked?: boolean;
  revealed?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Tile({
  variant = "default",
  clicked = false,
  revealed = false,
  onClick,
  className = "",
}: TileProps) {
  const getAsset = () => {
    switch (variant) {
      case "gem":
        return "/assets/gem.svg";
      case "bomb":
        return "/assets/bomb.svg";
      default:
        return null;
    }
  };

  const asset = getAsset();
  const isVisible = clicked || revealed;

  return (
    <motion.div
      className={`${styles.tile} ${
        isVisible ? styles[variant] : styles.default
      } ${revealed ? styles.revealed : ""} ${className}`}
      onClick={onClick}
      layout
      animate={
        isVisible
          ? {
              scale: [1, 1.1, 1],
              transition: { duration: 0.3 },
            }
          : {}
      }
    >
      {/* Show contents when clicked or revealed */}
      {isVisible && asset && (
        <motion.div
          className={styles.assetContainer}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.1, duration: 0.2 },
          }}
        >
          <Image
            src={asset}
            alt={variant}
            width={36}
            height={36}
            priority
            className={styles.asset}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
