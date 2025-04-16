import React from "react";
import styles from "./MultiplierPopup.module.css";
import { motion } from "motion/react";

interface MultiplierPopupProps {
  multiplier: number;
  amount: number;
  visible?: boolean;
}

export default function MultiplierPopup({
  multiplier,
  amount,
  visible = true,
}: MultiplierPopupProps) {
  return (
    <motion.div
      className={styles.popup}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${styles.multiplier} h1-demibold`}>
        {multiplier.toFixed(2)}x
      </div>
      <div className={`${styles.amount} body-medium`}>
        {amount.toFixed(2)} EUR
      </div>
    </motion.div>
  );
}
