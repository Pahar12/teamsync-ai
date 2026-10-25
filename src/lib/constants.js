/**
 * Application Constants for TeamSync AI
 * Central configuration, matching engine default weights, role archetypes, and navigation.
 */

export const APP_CONFIG = {
  name: "TeamSync AI",
  tagline: "Student Project Team Formation & Contribution Intelligence",
  submissionDeadline: "2026-11-08",
  submissionDeadlineFormatted: "November 8, 2026",
  course: "B.Tech Computer Science and Engineering — Capstone Project",
  teamSizeDefault: 4,
  teamSizeMin: 2,
  teamSizeMax: 6,
};

/**
 * Top-level application navigation items
 */
export const NAV_ITEMS = [
  { label: "Overview", href: "/" },
  { label: "Matching Simulator", href: "/#matching-preview" },
  { label: "Features", href: "/#features" },
  { label: "Fairness & Ethics", href: "/#transparency" },
];

/**
 * Matching engine baseline weights (Sum = 1.00 or 100%)
 * These represent the initial proposed weights as defined in project requirements.
 * They are fully configurable and subject to normalization checks.
 */
export const DEFAULT_MATCHING_WEIGHTS = {
  skillCoverage: 0.40,      // 40%
  availabilityFit: 0.25,    // 25%
  interestAlignment: 0.15,  // 15%
  roleCoverage: 0.10,       // 10%
  workloadFit: 0.10,        // 10%
};

/**
 * Human-readable descriptions for each matching factor,
 * enabling transparent explanations for students and faculty.
 */
export const MATCHING_FACTOR_DESCRIPTIONS = {
  skillCoverage: {
    label: "Skill Coverage",
    weight: 0.40,
    description: "Matches technical skills against project requirements (e.g. Next.js, PostgreSQL, ML algorithms).",
    importance: "High",
  },
  availabilityFit: {
    label: "Availability Fit",
    weight: 0.25,
    description: "Evaluates overlapping free time slots and weekly committed hours for synchronous syncs.",
    importance: "High",
  },
  interestAlignment: {
    label: "Interest Alignment",
    weight: 0.15,
    description: "Aligns student academic domain interests (e.g. EdTech, Distributed Systems, AI) with the project domain.",
    importance: "Medium",
  },
  roleCoverage: {
    label: "Role Coverage",
    weight: 0.10,
    description: "Ensures diverse roles (Frontend, Backend, DevOps, Design) rather than 4 people competing for 1 role.",
    importance: "Medium",
  },
  workloadFit: {
    label: "Workload Fit",
    weight: 0.10,
    description: "Prevents overburdening students already enrolled in multiple heavy courses or existing projects.",
    importance: "Medium",
  },
};

/**
 * Recommended student role archetypes for B.Tech CSE project teams
 */
export const STUDENT_ROLES = [
  { id: "frontend", label: "Frontend Engineer", icon: "Layout" },
  { id: "backend", label: "Backend Engineer", icon: "Server" },
  { id: "fullstack", label: "Full-Stack Engineer", icon: "Layers" },
  { id: "aiml", label: "AI / ML Specialist", icon: "Cpu" },
  { id: "devops", label: "DevOps & Cloud", icon: "Cloud" },
  { id: "uiux", label: "UI / UX Designer", icon: "Palette" },
  { id: "qa", label: "QA & Testing", icon: "CheckSquare" },
];

/**
 * Common technical skills catalog
 */
export const COMMON_SKILLS = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "JavaScript", category: "Languages" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma ORM", category: "Database" },
  { name: "Python", category: "Languages" },
  { name: "Docker", category: "DevOps" },
  { name: "Git & GitHub", category: "Tools" },
  { name: "REST APIs", category: "Backend" },
];

/**
 * Task workflow statuses
 */
export const TASK_STATUSES = {
  BACKLOG: { id: "backlog", label: "Backlog", variant: "default" },
  IN_PROGRESS: { id: "in_progress", label: "In Progress", variant: "info" },
  REVIEW: { id: "review", label: "Under Review", variant: "warning" },
  COMPLETED: { id: "completed", label: "Completed", variant: "success" },
};
