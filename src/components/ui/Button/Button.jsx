import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

/**
 * Reusable Button component
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.isLoading=false]
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {'button'|'submit'|'reset'} [props.type='button']
 * @param {string} [props.className]
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = "button",
  className,
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading ? "true" : undefined}
      aria-disabled={isDisabled ? "true" : undefined}
      className={cn(
        styles.button,
        styles[variant] || styles.primary,
        styles[size] || styles.md,
        isDisabled && styles.disabled,
        isLoading && styles.loading,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" data-testid="button-spinner">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </span>
      ) : (
        leftIcon && <span className={styles.icon}>{leftIcon}</span>
      )}

      {children}

      {!isLoading && rightIcon && (
        <span className={styles.icon}>{rightIcon}</span>
      )}
    </button>
  );
}

export default Button;
