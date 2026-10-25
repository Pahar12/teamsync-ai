/**
 * Reusable matching weight validation and normalization logic for TeamSync AI.
 * Enforces nonnegative weights and a normalized total of 1.0 (100%).
 */

export const DEFAULT_WEIGHTS = {
  skillWeight: 0.40,
  availabilityWeight: 0.25,
  interestWeight: 0.15,
  roleWeight: 0.10,
  workloadWeight: 0.10,
};

const REQUIRED_FACTOR_KEYS = [
  "skillWeight",
  "availabilityWeight",
  "interestWeight",
  "roleWeight",
  "workloadWeight",
];

const FLOAT_TOLERANCE = 0.001;

/**
 * Validates a matching weights configuration.
 * @param {Record<string, number>} weights
 * @returns {{ isValid: boolean, sum: number, errors: string[] }}
 */
export function validateMatchingWeights(weights) {
  const errors = [];

  if (!weights || typeof weights !== "object") {
    return {
      isValid: false,
      sum: 0,
      errors: ["Weights must be provided as an object"],
    };
  }

  let sum = 0;

  for (const key of REQUIRED_FACTOR_KEYS) {
    const value = weights[key];
    if (value === undefined || value === null || typeof value !== "number" || !Number.isFinite(value)) {
      errors.push(`Missing or non-finite numeric weight for "${key}"`);
      continue;
    }

    if (value < 0) {
      errors.push(`Weight for "${key}" cannot be negative (received ${value})`);
    }

    sum += value;
  }

  if (errors.length === 0) {
    const difference = Math.abs(sum - 1.0);
    if (difference > FLOAT_TOLERANCE) {
      errors.push(
        `Total weights must sum to 1.0 (100%), but summed to ${sum.toFixed(4)}`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    sum: Math.round(sum * 1000) / 1000,
    errors,
  };
}

/**
 * Safely normalizes matching weights so they strictly sum to 1.0 (100%).
 * If all weights are 0 or invalid, falls back to an equal distribution (20% each).
 * @param {Record<string, number>} weights
 * @returns {Record<string, number>}
 */
export function normalizeMatchingWeights(weights) {
  const safeWeights = {};
  let rawSum = 0;
  let hasInvalidInput = false;

  for (const key of REQUIRED_FACTOR_KEYS) {
    const rawVal = weights?.[key];
    const isFiniteNumber = typeof rawVal === "number" && Number.isFinite(rawVal);
    if (!isFiniteNumber) {
      hasInvalidInput = true;
    }

    const num = isFiniteNumber ? Math.max(0, rawVal) : 0;
    safeWeights[key] = num;
    rawSum += num;
  }

  // Invalid or missing inputs use a deterministic fallback instead of risking NaN/Infinity.
  if (hasInvalidInput) {
    return { ...DEFAULT_WEIGHTS };
  }

  const normalized = {};

  if (rawSum === 0) {
    const equalShare = 1 / REQUIRED_FACTOR_KEYS.length;
    for (const key of REQUIRED_FACTOR_KEYS) {
      normalized[key] = equalShare;
    }
    return normalized;
  }

  for (const key of REQUIRED_FACTOR_KEYS) {
    normalized[key] = safeWeights[key] / rawSum;
  }

  return normalized;
}

/**
 * Computes an explainable weighted score with dynamic reweighting.
 * Unavailable factors are excluded and remaining configured weights are
 * proportionally reweighted to sum to 1.0 for this calculation.
 *
 * @param {{
 *   factorScores: Record<string, number | null | undefined>,
 *   weights?: Record<string, number>
 * }} params
 * @returns {{
 *   isValid: boolean,
 *   isSufficientData: boolean,
 *   score: number | null,
 *   excludedFactors: Array<{ factor: string, reason: string }>,
 *   effectiveWeights: Record<string, number>,
 *   errors: string[]
 * }}
 */
export function computeExplainableMatchScore({ factorScores, weights = DEFAULT_WEIGHTS }) {
  const weightValidation = validateMatchingWeights(weights);
  if (!weightValidation.isValid) {
    return {
      isValid: false,
      isSufficientData: false,
      score: null,
      excludedFactors: [],
      effectiveWeights: {},
      errors: weightValidation.errors,
    };
  }

  const excludedFactors = [];
  const usableFactors = [];

  for (const factor of REQUIRED_FACTOR_KEYS) {
    const score = factorScores?.[factor];
    const baseWeight = weights[factor];

    if (baseWeight <= 0) {
      excludedFactors.push({
        factor,
        reason: "Configured weight is zero or negative",
      });
      continue;
    }

    if (typeof score !== "number" || !Number.isFinite(score)) {
      excludedFactors.push({
        factor,
        reason: "Factor score is missing or non-finite",
      });
      continue;
    }

    if (score < 0 || score > 1) {
      excludedFactors.push({
        factor,
        reason: "Factor score must be between 0 and 1",
      });
      continue;
    }

    usableFactors.push({ factor, score, baseWeight });
  }

  if (usableFactors.length === 0) {
    return {
      isValid: true,
      isSufficientData: false,
      score: null,
      excludedFactors,
      effectiveWeights: {},
      errors: ["Insufficient data: no usable factors available for scoring"],
    };
  }

  const usableWeightSum = usableFactors.reduce((sum, item) => sum + item.baseWeight, 0);
  const effectiveWeights = {};

  let score = 0;
  for (const item of usableFactors) {
    const normalizedWeight = item.baseWeight / usableWeightSum;
    effectiveWeights[item.factor] = normalizedWeight;
    score += normalizedWeight * item.score;
  }

  return {
    isValid: true,
    isSufficientData: true,
    score: Math.round(score * 10000) / 10000,
    excludedFactors,
    effectiveWeights,
    errors: [],
  };
}
