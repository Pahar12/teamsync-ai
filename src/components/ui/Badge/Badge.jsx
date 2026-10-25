import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Badge.module.css";

/**
 * Semantic Badge component for skills, statuses, and tags
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'default'|'success'|'warning'|'danger'|'info'|'outline'} [props.variant='default']
 * @param {'sm'|'md'} [props.size='md']
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        styles.badge,
        styles[variant] || styles.default,
        styles[size] || styles.md,
        className
      )}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}

export default Badge;
