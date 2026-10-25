"use client";

import React, { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./Modal.module.css";

/**
 * Accessible Modal / Dialog component
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer]
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.closeOnBackdrop=true]
 * @param {boolean} [props.closeOnEsc=true]
 * @param {string} [props.className]
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
}) {
  const modalRef = useRef(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock body scroll and focus modal when open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus modal for keyboard accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleBackdropClick(event) {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose?.();
    }
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(styles.modal, styles[size] || styles.md, className)}
      >
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            {description && (
              <p id={descId} className={styles.description}>
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={styles.closeButton}
            data-testid="modal-close-button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
