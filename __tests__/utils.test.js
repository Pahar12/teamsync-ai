import { describe, it, expect } from "vitest";
import {
  cn,
  formatPercent,
  clamp,
  getInitials,
  formatDate,
  slugify,
} from "../src/lib/utils";

describe("Utility Functions", () => {
  describe("cn (classnames helper)", () => {
    it("should join multiple class strings", () => {
      expect(cn("btn", "btn-primary")).toBe("btn btn-primary");
    });

    it("should filter out false, null, undefined, and empty values", () => {
      expect(cn("card", false, null, undefined, "", "active")).toBe("card active");
    });

    it("should handle nested arrays of class names", () => {
      expect(cn(["btn", ["btn-lg", false]], "mt-4")).toBe("btn btn-lg mt-4");
    });
  });

  describe("formatPercent", () => {
    it("should format decimal fractions (0..1) as percentages", () => {
      expect(formatPercent(0.4)).toBe("40%");
      expect(formatPercent(0.852, 1)).toBe("85.2%");
      expect(formatPercent(1)).toBe("100%");
    });

    it("should format whole percentages (0..100) directly", () => {
      expect(formatPercent(75)).toBe("75%");
      expect(formatPercent(99.5, 1)).toBe("99.5%");
    });

    it("should handle 0 and invalid values safely", () => {
      expect(formatPercent(0)).toBe("0%");
      expect(formatPercent(null)).toBe("0%");
      expect(formatPercent(undefined)).toBe("0%");
      expect(formatPercent("not a number")).toBe("0%");
    });
  });

  describe("clamp", () => {
    it("should clamp values within bounds", () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe("getInitials", () => {
    it("should extract initials from two or more names", () => {
      expect(getInitials("Pahar Dwivedi")).toBe("PD");
      expect(getInitials("John Robert Smith")).toBe("JS");
    });

    it("should extract two letters from a single name", () => {
      expect(getInitials("Alex")).toBe("AL");
    });

    it("should return fallback for empty or non-string inputs", () => {
      expect(getInitials("")).toBe("?");
      expect(getInitials(null)).toBe("?");
      expect(getInitials(undefined)).toBe("?");
    });
  });

  describe("formatDate", () => {
    it("should format valid dates correctly", () => {
      const formatted = formatDate("2026-11-08T00:00:00Z");
      expect(formatted).toContain("2026");
      expect(formatted).toContain("Nov");
    });

    it("should return empty string for invalid dates", () => {
      expect(formatDate("invalid-date")).toBe("");
      expect(formatDate(null)).toBe("");
    });
  });

  describe("slugify", () => {
    it("should convert titles into URL-friendly slugs", () => {
      expect(slugify("TeamSync AI Platform")).toBe("teamsync-ai-platform");
      expect(slugify("  Special @# Characters & More!! ")).toBe("special-characters-more");
    });
  });
});
