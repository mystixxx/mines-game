import React, { ChangeEvent } from "react";
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const newValue = e.target.value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const decimalCount = (newValue.match(/\./g) || []).length;
    if (decimalCount > 1) return;

    onChange?.(newValue);
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
