"use client";

import { motion } from "motion/react";
import { Provider } from "react-redux";
import { Header } from "@/components/ui";
import { GameGrid } from "@/components/GameGrid";
import { GameControls } from "@/components/GameControls";
import { DEFAULT_BALANCE } from "@/lib/constants";
import { store } from "@/store/store";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <Header balance={DEFAULT_BALANCE} />
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
    </Provider>
  );
}
