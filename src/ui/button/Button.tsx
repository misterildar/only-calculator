import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'calculator' | 'transparent';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  width?: number;
}

export const Button = ({
  onClick,
  text,
  className,
  type = 'button',
  disabled = false,
  isLoading = false,
  variant = 'primary',
  width,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    isLoading && styles.loading,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonStyle = width ? { width: `${width}px` } : {};

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      style={buttonStyle}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className={styles.loadingText}>Loading...</span> : text}
    </button>
  );
};
