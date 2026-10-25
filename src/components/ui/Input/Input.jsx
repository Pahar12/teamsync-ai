import React, { useId } from "react";
import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

/**
 * Accessible Input component with label, error, and helper text
 * @param {Object} props
 * @param {string} [props.id]
 * @param {string} [props.label]
 * @param {string} [props.helperText]
 * @param {string} [props.error]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {boolean} [props.required=false]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className]
 * @param {string} [props.type='text']
 */
export function Input({
  id: explicitId,
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  required = false,
  disabled = false,
  className,
  type = "text",
  ...props
}) {
  const generatedId = useId();
  const inputId = explicitId || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const isInvalid = Boolean(error);
  const describedBy = [
    isInvalid ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}

      <div className={styles.inputContainer}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <input
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          aria-invalid={isInvalid ? "true" : undefined}
          aria-describedby={describedBy}
          className={cn(
            styles.input,
            leftIcon && styles.hasLeftIcon,
            rightIcon && styles.hasRightIcon,
            isInvalid && styles.invalid,
            className
          )}
          {...props}
        />

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>

      {isInvalid && (
        <p id={errorId} className={styles.errorText} role="alert">
          {error}
        </p>
      )}

      {!isInvalid && helperText && (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
