import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  balance: number;
  backUrl?: string;
}

export default function Header({ balance, backUrl = "/" }: HeaderProps) {
  // Format balance as Euro currency
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(balance);
  
  return (
    <header className={styles.header}>
      <Link href={backUrl} className={styles.backButton}>
        <ChevronLeft size={36} color="#FFF"/>
      </Link>
      <div className={styles.balanceContainer}>
        <p className={`${styles.balanceLabel} subtext-medium`}>Balance</p>
        <p className={`${styles.balanceValue} body-demibold`}>{formattedBalance}</p>
      </div>
    </header>
  );
} 