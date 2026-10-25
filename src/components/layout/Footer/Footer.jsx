import React from "react";
import { APP_CONFIG } from "@/lib/constants";
import { Users, ShieldCheck, GraduationCap } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} id="about">
      <div className={styles.container}>
        <div className={styles.topGrid}>
          {/* Project Details */}
          <div className={styles.projectInfo}>
            <div className={styles.brand}>
              <Users size={20} className={styles.brandIcon} />
              <span>{APP_CONFIG.name}</span>
            </div>
            <p className={styles.description}>
              An explainable student team formation and contribution intelligence
              platform designed to solve free-rider dynamics, workload imbalances,
              and opaque project grading in undergraduate collaborative engineering.
            </p>
            <div className={styles.contextBadge}>
              <GraduationCap size={16} />
              <span>
                {APP_CONFIG.course} • Deadline: {APP_CONFIG.submissionDeadlineFormatted}
              </span>
            </div>
          </div>

          {/* Platform Sections */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Navigation</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#overview" className={styles.link}>
                  Overview & Problem
                </a>
              </li>
              <li>
                <a href="#matching-preview" className={styles.link}>
                  Matching Simulator
                </a>
              </li>
              <li>
                <a href="#problem-solution" className={styles.link}>
                  Problem vs Solution
                </a>
              </li>
              <li>
                <a href="#features" className={styles.link}>
                  Platform Capabilities
                </a>
              </li>
              <li>
                <a href="#transparency" className={styles.link}>
                  Algorithm Transparency
                </a>
              </li>
            </ul>
          </div>

          {/* Ethics & Viva Note */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Academic Principles</h4>
            <div className={styles.ethicsCard}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontWeight: "600", color: "var(--text-primary)" }}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>Explainable Decisions</span>
              </div>
              <p>
                All team match recommendations calculate clear mathematical
                attributions across skill coverage, availability overlap, and workload fit.
                Scores are assistive tools—students and advisors maintain full control over final selections.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className={styles.bottomRow}>
          <span>
            © 2026 TeamSync AI. Developed for B.Tech CSE Final Year Capstone.
          </span>
          <span>
            JavaScript • React 19 • Next.js 16 • CSS Modules • Vitest
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
