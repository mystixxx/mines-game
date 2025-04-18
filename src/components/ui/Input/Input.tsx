import React, { useState, useEffect } from "react";
import styles from "./Input.module.css";

interface InputProps {
  value: number;
  onChange?: (value: number) => void;
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
  const [inputString, setInputString] = useState<string>(value ? value.toString() : "");
  
  // Update local state when prop value changes
  useEffect(() => {
    setInputString(value ? value.toString() : "");
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    
    // Remove any minus signs
    newValue = newValue.replace(/-/g, '');
    
    setInputString(newValue);
    
    // Only call onChange with a valid number
    if (newValue === "" || newValue === ".") {
      onChange?.(0);
    } else {
      onChange?.(parseFloat(newValue));
    }
  };

  return (
    <div className={styles.inputContainer}>
      <label className={`${styles.label} subtext-medium`}>{label}</label>
      <input
        type="number"
        step={0.01}
        min={0}
        placeholder="10,00"
        value={inputString}
        onChange={handleChange}
        onKeyDown={(e) => {
          // Prevent typing the minus key
          if (e.key === '-') {
            e.preventDefault();
          }
        }}
        disabled={disabled}
        className={`${styles.input} ${className} body-medium`}
      />
    </div>
  );
}
