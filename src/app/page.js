import React from "react";
import { Navbar, Footer } from "@/components/layout";
import { MatchingPreview } from "@/components/matching/MatchingPreview/MatchingPreview";
import { Button, Badge } from "@/components/ui";
import {
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Layers,
  Kanban,
  FileCheck,
  GitBranch,
  BarChart3,
  Scale,
  ArrowRight,
} from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Top Application Navbar */}
      <Navbar />

      <main className={styles.main}>
        {/* ==================================================================
            1. HERO SECTION
            ================================================================== */}
        <section className={styles.hero} id="overview">
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <Sparkles size={14} />
                <span>B.Tech CSE Capstone Project • 2026 Submission</span>
              </div>

              <h1 className={styles.title}>
                Form Balanced Student Teams.{" "}
                <span className={styles.titleGradient}>
                  Prove Verifiable Contributions.
                </span>
              </h1>

              <p className={styles.subtitle}>
                An explainable intelligence platform that helps students assemble
                complementary project teams based on verified skills, weekly availability,
                and workload—while eliminating free-rider disputes through audit-ready contribution tracking.
              </p>

              <div className={styles.heroActions}>
                <a href="#matching-preview">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight size={16} />}>
                    Try Matching Simulator
                  </Button>
                </a>
                <a href="#features">
                  <Button size="lg" variant="outline">
                    Explore Platform Features
                  </Button>
                </a>
              </div>

              {/* Quick Hero Metrics */}
              <div className={styles.heroMetrics}>
                <div className={styles.metricCard}>
                  <span className={styles.metricValue}>5 Factors</span>
                  <span className={styles.metricLabel}>
                    Explainable Matching Model
                  </span>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricValue}>100%</span>
                  <span className={styles.metricLabel}>
                    Verifiable Deliverables & Git Evidence
                  </span>
                </div>
                <div className={styles.metricCard}>
                  <span className={styles.metricValue}>Transparent</span>
                  <span className={styles.metricLabel}>
                    Dispute & Audit Log History
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. PROBLEM VS SOLUTION
            ================================================================== */}
        <section className={styles.container} id="problem-solution">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPill}>The Academic Challenge</span>
            <h2 className={styles.sectionTitle}>
              Why Traditional Student Projects Fail
            </h2>
            <p className={styles.sectionSubtitle}>
              Undergraduate collaborative software engineering often breaks down due to
              structural friction, unfair workload distribution, and subjective grading.
            </p>
          </div>

          <div className={styles.comparisonGrid}>
            {/* The Classic Dilemma */}
            <div className={styles.problemCard}>
              <div className={styles.cardTop}>
                <span className={styles.problemBadge}>The Group Project Dilemma</span>
                <XCircle size={20} className={styles.pointIconDanger} />
              </div>

              <h3 className={styles.cardHeading}>
                Chaotic Formation & Free-Rider Dynamics
              </h3>

              <ul className={styles.pointsList}>
                <li className={styles.pointItem}>
                  <XCircle size={18} className={styles.pointIconDanger} />
                  <div>
                    <strong>Friend-Group Bias:</strong> Teams formed arbitrarily or by friendships,
                    leaving some groups with 4 frontend developers and zero backend or database leads.
                  </div>
                </li>
                <li className={styles.pointItem}>
                  <XCircle size={18} className={styles.pointIconDanger} />
                  <div>
                    <strong>The Free-Rider Dilemma:</strong> One or two committed students carry 90%
                    of the technical workload while inactive members receive identical project marks.
                  </div>
                </li>
                <li className={styles.pointItem}>
                  <XCircle size={18} className={styles.pointIconDanger} />
                  <div>
                    <strong>Subjective Viva Disputes:</strong> Inability to prove individual contribution
                    objectively during viva examinations, causing toxic peer conflicts and unfair grades.
                  </div>
                </li>
                <li className={styles.pointItem}>
                  <XCircle size={18} className={styles.pointIconDanger} />
                  <div>
                    <strong>Mismatched Schedules:</strong> Students enrolled in disparate course loads
                    unable to find overlapping synchronization windows, stalling sprint deadlines.
                  </div>
                </li>
              </ul>
            </div>

            {/* The TeamSync AI Solution */}
            <div className={styles.solutionCard}>
              <div className={styles.cardTop}>
                <span className={styles.solutionBadge}>The TeamSync AI Approach</span>
                <CheckCircle2 size={20} className={styles.pointIconSuccess} />
              </div>

              <h3 className={styles.cardHeading}>
                Explainable Matching & Verifiable Tracking
              </h3>

              <ul className={styles.pointsList}>
                <li className={styles.pointItem}>
                  <CheckCircle2 size={18} className={styles.pointIconSuccess} />
                  <div>
                    <strong>Multi-Dimensional Matching:</strong> Optimizes skill coverage (40%), availability fit (25%),
                    interest alignment (15%), role balance (10%), and workload fit (10%).
                  </div>
                </li>
                <li className={styles.pointItem}>
                  <CheckCircle2 size={18} className={styles.pointIconSuccess} />
                  <div>
                    <strong>Verifiable Contribution Intelligence:</strong> Every task links to concrete
                    evidence (pull requests, documentation, test suites), creating an immutable contribution audit.
                  </div>
                </li>
                <li className={styles.pointItem}>
                  <CheckCircle2 size={18} className={styles.pointIconSuccess} />
                  <div>
                    <strong>Transparent Dispute Protocol:</strong> Structured peer feedback, faculty review views,
                    and logged correction histories prevent unsubstantiated claims.
                  </div>
                </li>
                <li className={styles.pointItem}>
                  <CheckCircle2 size={18} className={styles.pointIconSuccess} />
                  <div>
                    <strong>Explainable Recommendations:</strong> Zero black-box AI scores. Every recommendation
                    details exact factor contributions and requires explicit human approval.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. CORE PLATFORM CAPABILITIES
            ================================================================== */}
        <section className={styles.container} id="features">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPill}>Modular Architecture</span>
            <h2 className={styles.sectionTitle}>
              End-to-End Capstone Project Lifecycle
            </h2>
            <p className={styles.sectionSubtitle}>
              From pre-semester skill discovery to final milestone viva defense,
              TeamSync AI provides structured support at every stage.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Users size={22} />
              </div>
              <h3 className={styles.featureTitle}>Balanced Team Formation</h3>
              <p className={styles.featureDesc}>
                Algorithmically analyzes student skill matrices, availability slots, and role preferences
                to recommend well-rounded engineering teams without skill deficits.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Kanban size={22} />
              </div>
              <h3 className={styles.featureTitle}>Task & Milestone Board</h3>
              <p className={styles.featureDesc}>
                Sprint milestones, task dependencies, deadlines, and progress states keep teammates aligned
                on what must be delivered and who owns each deliverable.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <FileCheck size={22} />
              </div>
              <h3 className={styles.featureTitle}>Verifiable Contribution Evidence</h3>
              <p className={styles.featureDesc}>
                Associates completed tasks with tangible proof (pull request URLs, design files, test coverage reports)
                rather than unsubstantiated self-reported activity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Layers size={22} />
              </div>
              <h3 className={styles.featureTitle}>Skill-Gap Identification</h3>
              <p className={styles.featureDesc}>
                Identifies missing technical requirements (e.g., missing PostgreSQL or DevOps capability)
                before development starts, enabling targeted member recruitment.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <BarChart3 size={22} />
              </div>
              <h3 className={styles.featureTitle}>Contribution Analytics</h3>
              <p className={styles.featureDesc}>
                Visualizes velocity, milestone completion rates, and individual workload balance to give
                students and faculty guides an objective view of sprint health.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Scale size={22} />
              </div>
              <h3 className={styles.featureTitle}>Dispute & Audit Protocol</h3>
              <p className={styles.featureDesc}>
                A structured mediation workflow where contribution disputes are logged, peer feedback is reviewed,
                and faculty advisors can intervene with complete audit history.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. MATCHING SIMULATOR PREVIEW (INTERACTIVE)
            ================================================================== */}
        <section className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPill}>Interactive Prototype</span>
            <h2 className={styles.sectionTitle}>
              Matching Engine & What-If Simulator
            </h2>
            <p className={styles.sectionSubtitle}>
              Experience how configurable weights alter recommendation rankings in real time.
              Click &quot;Explain Score&quot; to inspect the exact mathematical attribution behind any recommendation.
            </p>
          </div>

          <MatchingPreview />
        </section>

        {/* ==================================================================
            5. TRANSPARENCY & ETHICS SECTION
            ================================================================== */}
        <section className={styles.container} id="transparency">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPill}>Ethics & Governance</span>
            <h2 className={styles.sectionTitle}>
              Algorithmic Transparency & Fairness
            </h2>
            <p className={styles.sectionSubtitle}>
              We reject opaque black-box AI scores. TeamSync AI recommendations are assistive,
              deterministic, explainable, and governed by students and academic mentors.
            </p>
          </div>

          <div className={styles.transparencyBox}>
            <div className={styles.factorsGrid}>
              <div className={styles.factorCard}>
                <span className={styles.factorWeight}>40%</span>
                <span className={styles.factorName}>Skill Coverage</span>
                <p className={styles.factorDetail}>
                  Matches verified language, framework, and database competencies with project requirements.
                </p>
              </div>

              <div className={styles.factorCard}>
                <span className={styles.factorWeight}>25%</span>
                <span className={styles.factorName}>Availability Fit</span>
                <p className={styles.factorDetail}>
                  Calculates overlapping free hours to ensure team members have dedicated joint work blocks.
                </p>
              </div>

              <div className={styles.factorCard}>
                <span className={styles.factorWeight}>15%</span>
                <span className={styles.factorName}>Interest Alignment</span>
                <p className={styles.factorDetail}>
                  Considers domain enthusiasm (AI, Web, Cloud, Security) to maintain genuine project engagement.
                </p>
              </div>

              <div className={styles.factorCard}>
                <span className={styles.factorWeight}>10%</span>
                <span className={styles.factorName}>Role Coverage</span>
                <p className={styles.factorDetail}>
                  Prevents competing role conflicts by balancing Frontend, Backend, UI/UX, and QA roles.
                </p>
              </div>

              <div className={styles.factorCard}>
                <span className={styles.factorWeight}>10%</span>
                <span className={styles.factorName}>Workload Fit</span>
                <p className={styles.factorDetail}>
                  Takes current semester course load into account to prevent student burnout or uneven commitments.
                </p>
              </div>
            </div>

            <div className={styles.ethicsCallout}>
              <div className={styles.ethicsCalloutTitle}>
                <ShieldCheck size={20} />
                <span>Academic Integrity & Human-in-the-Loop Principle</span>
              </div>
              <p className={styles.ethicsCalloutText}>
                No algorithmic score is treated as an objective assessment of a student&apos;s human worth or potential.
                Scores exist solely as decision-support heuristics to help students identify compatibility strengths and
                potential scheduling bottlenecks before finalizing group partnerships. Final team creation, invitations,
                and milestone approvals always remain strictly under human control.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Application Footer */}
      <Footer />
    </div>
  );
}
