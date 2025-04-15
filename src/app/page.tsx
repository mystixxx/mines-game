import { Button, Header } from "@/components/ui";
import styles from "./page.module.css";

export default function Home() {
  const balance = 868.17;
  
  return (
    <main className={styles.main}>
      <Header balance={balance} />
      <div className={styles.content}>
        <Button text="Default" />
        <Button text="Disabled" disabled />
      </div>
    </main>
  );
}
