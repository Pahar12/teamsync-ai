"use client";

import React, { useState } from "react";
import { cn, getInitials } from "@/lib/utils";
import styles from "./Avatar.module.css";

/**
 * Avatar component with initials fallback and status indicator
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.alt]
 * @param {string} [props.name]
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md']
 * @param {'online'|'offline'|'busy'|'away'} [props.status]
 * @param {string} [props.className]
 */
export function Avatar({
  src,
  alt,
  name = "",
  size = "md",
  status,
  className,
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const initials = getInitials(name);
  const displayAlt = alt || name || "Avatar";

  const showImage = Boolean(src && !hasError);

  return (
    <div
      role={showImage ? undefined : "img"}
      aria-label={showImage ? undefined : displayAlt}
      className={cn(styles.avatar, styles[size] || styles.md, className)}
      {...props}
    >
      {showImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={displayAlt}
          onError={() => setHasError(true)}
          className={styles.image}
        />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initials}
        </span>
      )}

      {status && (
        <span
          className={cn(
            styles.statusDot,
            styles[`status_${status}`] || styles.status_offline
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export default Avatar;
