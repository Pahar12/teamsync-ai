/**
 * Utility functions for TeamSync AI
 * Clean, pure JavaScript helpers with zero external dependencies.
 */

/**
 * Combines multiple CSS class names or conditionals into a single string.
 * @param  {...any} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes
    .flat(Infinity)
    .filter((c) => typeof c === "string" && c.trim().length > 0)
    .join(" ");
}

/**
 * Formats a ratio (0..1) or percentage (0..100) into a clean percentage string.
 * Automatically detects whether the input is 0..1 or 0..100.
 * @param {number} value
 * @param {number} [decimals=0]
 * @returns {string}
 */
export function formatPercent(value, decimals = 0) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "0%";
  }
  const numeric = Number(value);
  // If <= 1 and > 0, assume it's a 0..1 fraction unless 0 was passed
  const pct = numeric <= 1 && numeric > 0 ? numeric * 100 : numeric;
  return `${pct.toFixed(decimals)}%`;
}

/**
 * Clamps a number between a lower and upper bound.
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/**
 * Extracts initials (up to 2 letters) from a person's name.
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  if (!name || typeof name !== "string") return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Formats a Date object or ISO string into a readable date string.
 * @param {Date|string|number} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  if (!date) return "";
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      ...options,
    }).format(d);
  } catch {
    return "";
  }
}

/**
 * Simple slugify helper for route params and anchor tags.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
