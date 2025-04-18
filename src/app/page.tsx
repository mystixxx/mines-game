"use client";

import { motion } from "motion/react";
import { Provider } from "react-redux";
import { Header } from "@/components/ui";
import { GameGrid } from "@/components/GameGrid";
import { GameControls } from "@/components/GameControls";
import { store } from "@/store/store";
import styles from "./page.module.css";
import { useEffect } from "react";
import { fetchWalletBalanceThunk } from "@/store/walletSlice";
import { useAppDispatch, useWalletBalance } from "@/store/hooks";
import { ReactQueryProvider } from "@/lib/react-query";

function Game() {
  const dispatch = useAppDispatch();
  const balance = useWalletBalance();

  useEffect(() => {
    dispatch(fetchWalletBalanceThunk())
      .unwrap()
      .catch((error) => {
        console.log("Failed to fetch wallet balance:", error);
      });
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <Header balance={balance} />
      <div className={styles.content}>
        <motion.div
          className={styles.gameContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GameGrid />
          <GameControls />
        </motion.div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <Game />
      </ReactQueryProvider>
    </Provider>
  );
}
