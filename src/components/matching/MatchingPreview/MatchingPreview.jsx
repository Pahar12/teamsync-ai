"use client";

import React, { useState, useMemo } from "react";
import { Button, Badge, Avatar, Modal } from "@/components/ui";
import {
  DEFAULT_MATCHING_WEIGHTS,
  MATCHING_FACTOR_DESCRIPTIONS,
} from "@/lib/constants";
import { formatPercent } from "@/lib/utils";
import { Sliders, RotateCcw, Info, Sparkles, CheckCircle2 } from "lucide-react";
import styles from "./MatchingPreview.module.css";

// Synthetic illustrative sample students (for prototype demonstration only)
const SYNTHETIC_CANDIDATES = [
  {
    id: "stud-1",
    name: "Aarav Sharma",
    role: "Full-Stack Engineer",
    status: "online",
    skills: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    fits: {
      skillCoverage: 0.95,
      availabilityFit: 0.85,
      interestAlignment: 0.90,
      roleCoverage: 1.00,
      workloadFit: 0.80,
    },
    strengths: [
      "Deep experience with Next.js and PostgreSQL matches project core stack",
      "Overlapping weekend availability (20 free hrs/wk)",
      "High academic interest in distributed task architectures",
    ],
    tradeoffs: [
      "Currently enrolled in 2 other courses; workload requires balanced sprint commitments",
    ],
  },
  {
    id: "stud-2",
    name: "Neha Patel",
    role: "Backend & Database Lead",
    status: "online",
    skills: ["PostgreSQL", "Prisma ORM", "Node.js", "REST APIs"],
    fits: {
      skillCoverage: 0.90,
      availabilityFit: 0.92,
      interestAlignment: 0.80,
      roleCoverage: 0.85,
      workloadFit: 0.90,
    },
    strengths: [
      "Prisma schema and relational database optimization specialist",
      "Exceptional weekly availability (25 free hrs/wk)",
      "Low extracurricular workload this semester",
    ],
    tradeoffs: [
      "Prefers purely backend tasks; requires complementary frontend partner",
    ],
  },
  {
    id: "stud-3",
    name: "Rohan Verma",
    role: "UI / UX & Frontend Engineer",
    status: "away",
    skills: ["React", "CSS Modules", "Design Systems", "Figma"],
    fits: {
      skillCoverage: 0.72,
      availabilityFit: 0.75,
      interestAlignment: 0.95,
      roleCoverage: 0.90,
      workloadFit: 0.70,
    },
    strengths: [
      "Strong UI component architecture and accessibility fundamentals",
      "Top alignment with web product usability goals",
    ],
    tradeoffs: [
      "Limited relational database experience (supplemented by team members)",
      "Evening slots conflict with laboratory classes",
    ],
  },
  {
    id: "stud-4",
    name: "Pooja Nair",
    role: "QA & DevOps Engineer",
    status: "offline",
    skills: ["Vitest", "Docker", "CI/CD", "Testing Library"],
    fits: {
      skillCoverage: 0.68,
      availabilityFit: 0.82,
      interestAlignment: 0.85,
      roleCoverage: 0.80,
      workloadFit: 0.85,
    },
    strengths: [
      "Test automation setup and unit testing coverage with Vitest",
      "Consistent milestone delivery and git hygiene",
    ],
    tradeoffs: [
      "Requires team pairing for database schema design",
    ],
  },
];

export function MatchingPreview() {
  // Raw slider values (stored as whole percentages 0..100)
  const [weights, setWeights] = useState({
    skillCoverage: DEFAULT_MATCHING_WEIGHTS.skillCoverage * 100,
    availabilityFit: DEFAULT_MATCHING_WEIGHTS.availabilityFit * 100,
    interestAlignment: DEFAULT_MATCHING_WEIGHTS.interestAlignment * 100,
    roleCoverage: DEFAULT_MATCHING_WEIGHTS.roleCoverage * 100,
    workloadFit: DEFAULT_MATCHING_WEIGHTS.workloadFit * 100,
  });

  // State for explanation modal
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Compute normalized weights (sums strictly to 1.0)
  const normalizedWeights = useMemo(() => {
    const factors = Object.keys(weights);
    const rawSum = Object.values(weights).reduce((acc, val) => acc + val, 0);
    const norm = {};

    // If all weights are 0, fall back to equal distribution (20% each)
    if (rawSum === 0) {
      const equalWeight = 1 / factors.length;
      for (const key of factors) {
        norm[key] = equalWeight;
      }
      return norm;
    }

    for (const key of factors) {
      norm[key] = weights[key] / rawSum;
    }
    return norm;
  }, [weights]);

  // Check if all sliders are at zero
  const isAllZero = useMemo(() => {
    return Object.values(weights).every((val) => val === 0);
  }, [weights]);

  // Compute candidate scores dynamically based on normalized weights
  const rankedCandidates = useMemo(() => {
    return SYNTHETIC_CANDIDATES.map((candidate) => {
      let score = 0;
      const factorContributions = {};

      for (const [factor, normWeight] of Object.entries(normalizedWeights)) {
        const factorFit = candidate.fits[factor] || 0;
        const contribution = factorFit * normWeight * 100;
        factorContributions[factor] = {
          rawFit: factorFit,
          normWeight,
          contribution,
        };
        score += contribution;
      }

      return {
        ...candidate,
        score: Math.round(score * 10) / 10, // 1 decimal place
        factorContributions,
      };
    }).sort((a, b) => b.score - a.score);
  }, [normalizedWeights]);

  function handleWeightChange(factor, value) {
    const numeric = Number(value);
    const safeVal = Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : 0;
    setWeights((prev) => ({
      ...prev,
      [factor]: safeVal,
    }));
  }

  function handleReset() {
    setWeights({
      skillCoverage: DEFAULT_MATCHING_WEIGHTS.skillCoverage * 100,
      availabilityFit: DEFAULT_MATCHING_WEIGHTS.availabilityFit * 100,
      interestAlignment: DEFAULT_MATCHING_WEIGHTS.interestAlignment * 100,
      roleCoverage: DEFAULT_MATCHING_WEIGHTS.roleCoverage * 100,
      workloadFit: DEFAULT_MATCHING_WEIGHTS.workloadFit * 100,
    });
  }

  return (
    <div className={styles.container} id="matching-preview">
      {/* Illustrative Demo Disclaimer Banner */}
      <div className={styles.disclaimerBanner} role="note">
        <Info size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <strong>Interactive Simulator Preview (Synthetic Demonstration):</strong> The candidates
          and compatibility scores shown below are calculated live in your browser using our
          normalized 5-factor mathematical weighting. This illustrative prototype contains no real student data
          and is not an automated or experimentally validated grading verdict.
        </div>
      </div>

      <div className={styles.simulatorGrid}>
        {/* Left: Configurable Weights Control Panel */}
        <div className={styles.controlsCard}>
          <div className={styles.controlsHeader}>
            <div className={styles.controlsTitle}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sliders size={18} color="var(--primary)" />
                Configurable Weights
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                leftIcon={<RotateCcw size={14} />}
                title="Reset to default baseline weights"
              >
                Reset
              </Button>
            </div>
            <p className={styles.controlsDescription}>
              Adjust factor importance. Weights automatically normalize to 100% to ensure fair mathematical attribution.
            </p>
          </div>

          <div className={styles.weightsList}>
            {Object.entries(MATCHING_FACTOR_DESCRIPTIONS).map(([key, info]) => {
              const currentVal = weights[key];
              const normPct = Math.round((normalizedWeights[key] || 0) * 100);

              return (
                <div key={key} className={styles.weightItem}>
                  <div className={styles.weightLabelRow}>
                    <span className={styles.weightName}>{info.label}</span>
                    <div className={styles.weightValues}>
                      <span>Slider: {currentVal}</span>
                      <span>•</span>
                      <span className={styles.normWeight}>
                        Active: {normPct}%{isAllZero ? " (Equal share)" : ""}
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={currentVal}
                    onChange={(e) => handleWeightChange(key, e.target.value)}
                    className={styles.slider}
                    aria-label={`${info.label} importance slider`}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.totalRow}>
            <span>Normalized Weight Total:</span>
            <span style={{ color: "var(--color-success)", fontWeight: "bold" }}>
              {isAllZero ? "100% (Equal fallback)" : "100%"}
            </span>
          </div>
        </div>

        {/* Right: Candidate Rankings & Target Project */}
        <div className={styles.resultsColumn}>
          {/* Target Project Card */}
          <div className={styles.projectTarget}>
            <div className={styles.projectTargetInfo}>
              <span style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary)", fontWeight: "600" }}>
                Target Project Context
              </span>
              <h4 className={styles.projectTargetTitle}>
                Collaborative Student Task & Milestone Board
              </h4>
              <p className={styles.projectTargetSub}>
                Required Skills: Next.js, PostgreSQL, REST APIs, Vitest • Desired Team Size: 4
              </p>
            </div>
            <Badge variant="info">4 Mock Candidates Evaluated</Badge>
          </div>

          {/* Candidates List */}
          <div className={styles.candidatesList}>
            {rankedCandidates.map((candidate, index) => (
              <div key={candidate.id} className={styles.candidateCard}>
                <div className={styles.candidateMain}>
                  <Avatar
                    name={candidate.name}
                    status={candidate.status}
                    size="md"
                  />
                  <div className={styles.candidateInfo}>
                    <div className={styles.candidateHeader}>
                      <span className={styles.candidateName}>{candidate.name}</span>
                      <Badge size="sm" variant={index === 0 ? "success" : "default"}>
                        {candidate.role}
                      </Badge>
                    </div>
                    <div className={styles.skillsRow}>
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} size="sm" variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.candidateStats}>
                  <div className={styles.scoreBox}>
                    <span className={styles.scoreValue}>{candidate.score}%</span>
                    <span className={styles.scoreLabel}>Overall Fit</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCandidate(candidate)}
                    aria-label={`Explain score calculation for ${candidate.name}`}
                  >
                    Explain Score
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          title={`Score Breakdown: ${selectedCandidate.name}`}
          description={`Overall Fit: ${selectedCandidate.score}% based on currently active normalized weights`}
          size="lg"
          footer={
            <Button onClick={() => setSelectedCandidate(null)}>
              Done
            </Button>
          }
        >
          <div className={styles.modalExplanation}>
            <div className={styles.formulaNote}>
              <strong>Formula:</strong> Score = ∑ (Normalized Factor Weight × Factor Fit)
            </div>

            <table className={styles.breakdownTable}>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Raw Factor Fit</th>
                  <th>Active Weight</th>
                  <th>Points Contributed</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(MATCHING_FACTOR_DESCRIPTIONS).map(([key, info]) => {
                  const contrib = selectedCandidate.factorContributions[key];
                  return (
                    <tr key={key}>
                      <td>
                        <strong>{info.label}</strong>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                          {info.description}
                        </div>
                      </td>
                      <td>{formatPercent(contrib.rawFit)}</td>
                      <td>{formatPercent(contrib.normWeight, 1)}</td>
                      <td>
                        <strong>+{contrib.contribution.toFixed(1)}%</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h4 style={{ fontSize: "var(--text-sm)", fontWeight: "600", color: "var(--text-primary)" }}>
                Key Strengths for this Project
              </h4>
              <ul style={{ paddingLeft: "1.25rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {selectedCandidate.strengths.map((str, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle2 size={14} color="var(--color-success)" style={{ flexShrink: 0 }} />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h4 style={{ fontSize: "var(--text-sm)", fontWeight: "600", color: "var(--text-primary)" }}>
                Tradeoffs & Workload Considerations
              </h4>
              <ul style={{ paddingLeft: "1.25rem", fontSize: "var(--text-xs)", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                {selectedCandidate.tradeoffs.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default MatchingPreview;
