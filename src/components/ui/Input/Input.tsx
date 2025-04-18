import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export default function Input({
  value,
  onChange,
  disabled = false,
  className = "",
  label = "Bet Amount",
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={`${styles.label} subtext-medium`}>{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`${styles.input} ${className} body-medium`}
      />
    </div>
  );
}
