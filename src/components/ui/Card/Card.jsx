import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Card.module.css";

/**
 * Main Card wrapper
 */
export function Card({ children, className, interactive = false, as: Component = "div", ...props }) {
  return (
    <Component
      className={cn(styles.card, interactive && styles.interactive, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Card Header section
 */
export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn(styles.header, className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card Title heading
 */
export function CardTitle({ children, className, as: Component = "h3", ...props }) {
  return (
    <Component className={cn(styles.title, className)} {...props}>
      {children}
    </Component>
  );
}

/**
 * Card Description subtitle
 */
export function CardDescription({ children, className, as: Component = "p", ...props }) {
  return (
    <Component className={cn(styles.description, className)} {...props}>
      {children}
    </Component>
  );
}

/**
 * Card Content main container
 */
export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn(styles.content, className)} {...props}>
      {children}
    </div>
  );
}

/**
 * Card Footer action container
 */
export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn(styles.footer, className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
