import { describe, it, expect } from "vitest";
import {
  DEFAULT_WEIGHTS,
  validateMatchingWeights,
  normalizeMatchingWeights,
  computeExplainableMatchScore,
} from "../src/lib/matching-validation";

describe("Matching Weights Validation & Normalization", () => {
  it("validates that default weights sum to 1.0 (100%)", () => {
    const result = validateMatchingWeights(DEFAULT_WEIGHTS);
    expect(result.isValid).toBe(true);
    expect(result.sum).toBe(1);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects configurations that do not sum to 1.0", () => {
    const invalid = {
      ...DEFAULT_WEIGHTS,
      skillWeight: 0.60, // sum = 1.20
    };
    const result = validateMatchingWeights(invalid);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toContain("Total weights must sum to 1.0");
  });

  it("rejects negative weights", () => {
    const negative = {
      ...DEFAULT_WEIGHTS,
      roleWeight: -0.10,
      skillWeight: 0.60,
    };
    const result = validateMatchingWeights(negative);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("cannot be negative"))).toBe(true);
  });

  it("rejects non-finite weights such as Infinity", () => {
    const nonFinite = {
      ...DEFAULT_WEIGHTS,
      availabilityWeight: Number.POSITIVE_INFINITY,
    };

    const result = validateMatchingWeights(nonFinite);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("non-finite"))).toBe(true);
  });

  it("handles floating point tolerance cleanly", () => {
    const floatWeights = {
      skillWeight: 0.3333,
      availabilityWeight: 0.3333,
      interestWeight: 0.3334,
      roleWeight: 0.0,
      workloadWeight: 0.0,
    };
    const result = validateMatchingWeights(floatWeights);
    expect(result.isValid).toBe(true);
  });

  it("normalizes arbitrary positive weights so they sum to 1.0", () => {
    const raw = {
      skillWeight: 40,
      availabilityWeight: 25,
      interestWeight: 15,
      roleWeight: 10,
      workloadWeight: 10,
    };
    const normalized = normalizeMatchingWeights(raw);
    const sum = Object.values(normalized).reduce((a, b) => a + b, 0);
    expect(Math.abs(sum - 1.0)).toBeLessThan(0.0001);
    expect(normalized.skillWeight).toBeCloseTo(0.40, 2);
  });

  it("falls back to equal distribution (20% each) when all weights are 0", () => {
    const allZero = {
      skillWeight: 0,
      availabilityWeight: 0,
      interestWeight: 0,
      roleWeight: 0,
      workloadWeight: 0,
    };
    const normalized = normalizeMatchingWeights(allZero);
    expect(normalized.skillWeight).toBe(0.20);
    expect(normalized.availabilityWeight).toBe(0.20);
    expect(normalized.interestWeight).toBe(0.20);
    expect(normalized.roleWeight).toBe(0.20);
    expect(normalized.workloadWeight).toBe(0.20);
  });

  it("uses default-weight fallback for missing/invalid/non-finite normalization input", () => {
    const normalized = normalizeMatchingWeights({
      skillWeight: Number.NEGATIVE_INFINITY,
      availabilityWeight: 0.5,
      interestWeight: undefined,
      roleWeight: Number.NaN,
      workloadWeight: null,
    });

    expect(normalized).toEqual(DEFAULT_WEIGHTS);
    expect(Object.values(normalized).every((v) => Number.isFinite(v))).toBe(true);
  });

  it("reweights remaining factors when some factor scores are unavailable", () => {
    const result = computeExplainableMatchScore({
      factorScores: {
        skillWeight: 1,
        availabilityWeight: 0.5,
        interestWeight: null,
        roleWeight: undefined,
        workloadWeight: 0,
      },
    });

    expect(result.isValid).toBe(true);
    expect(result.isSufficientData).toBe(true);
    expect(result.score).not.toBeNull();
    expect(result.excludedFactors).toHaveLength(2);

    const effectiveWeightSum = Object.values(result.effectiveWeights).reduce((a, b) => a + b, 0);
    expect(Math.abs(effectiveWeightSum - 1.0)).toBeLessThan(0.0001);
  });

  it("returns insufficient-data result when no usable factors remain", () => {
    const result = computeExplainableMatchScore({
      factorScores: {
        skillWeight: null,
        availabilityWeight: undefined,
        interestWeight: Number.NaN,
        roleWeight: null,
        workloadWeight: undefined,
      },
    });

    expect(result.isValid).toBe(true);
    expect(result.isSufficientData).toBe(false);
    expect(result.score).toBeNull();
    expect(result.errors[0]).toContain("Insufficient data");
  });

  it("excludes non-finite factor scores from explainable scoring", () => {
    const result = computeExplainableMatchScore({
      factorScores: {
        skillWeight: Number.POSITIVE_INFINITY,
        availabilityWeight: 0.8,
        interestWeight: 0.4,
        roleWeight: 0.5,
        workloadWeight: 0.6,
      },
    });

    expect(result.isValid).toBe(true);
    expect(result.isSufficientData).toBe(true);
    expect(result.excludedFactors.some((f) => f.factor === "skillWeight")).toBe(true);
    expect(Number.isFinite(result.score)).toBe(true);
  });
});
