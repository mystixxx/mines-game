import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default';
  className?: string;
}

export default function Button({
  text,
  onClick,
  disabled = false,
  variant = 'default',
  className = '',
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className} body-medium`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
} 