# TeamSync AI

**Explainable student team formation and collaboration insights for academic projects.**

TeamSync AI is a web application designed to help students form balanced project teams based on skills, interests, availability, role requirements, and workload. It aims to make team formation more transparent while supporting collaboration through project management and evidence-based contribution tracking.

The project is being developed as a full-stack application using Next.js, React, PostgreSQL, Prisma ORM, and Better Auth.

> **Development status:** Active development. The database foundation, initial Prisma migration, authentication integration, and validation tests are in place. Features listed in the roadmap are planned or under development unless explicitly marked as implemented.

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [How Matching Works](#how-matching-works)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Development Commands](#development-commands)
- [Testing](#testing)
- [Project Roadmap](#project-roadmap)
- [Security and Privacy](#security-and-privacy)
- [Contributing](#contributing)
- [License](#license)

## Overview

Forming a good student project team involves more than grouping people randomly or choosing only students with similar skills. A successful team needs complementary abilities, compatible schedules, clear responsibilities, and a reasonable distribution of work.

TeamSync AI aims to address these challenges through explainable team-matching recommendations and structured collaboration workflows.

The system is designed to support students, project teams, faculty members, and administrators while keeping important decisions transparent and subject to appropriate human oversight.

## Problem Statement

Traditional student team formation can lead to:

- Uneven distribution of technical skills and responsibilities.
- Scheduling conflicts and incompatible availability.
- Teams with overlapping skills but missing critical capabilities.
- Unclear task ownership and project progress.
- Difficulty reviewing individual contributions fairly.
- Limited visibility into how team recommendations are generated.

TeamSync AI aims to bring team formation, project coordination, and contribution evidence into one application.

## Key Features

The following describes the intended product scope. Availability depends on implementation progress.

### 1. Student Profiles

- Maintain student information and project preferences.
- Record skills and proficiency levels.
- Specify interests, preferred roles, and availability.
- Use profile information to support team recommendations.

### 2. Explainable Team Matching

- Evaluate candidates against project requirements.
- Consider skill coverage, availability, interest alignment, role balance, and workload fit.
- Present understandable score breakdowns and matching explanations.
- Highlight missing skills and potential scheduling or workload conflicts.
- Keep final team-selection decisions under human control.

### 3. Project and Team Management

- Create projects and define requirements.
- Organize students into project teams.
- Manage membership and invitations.
- Assign responsibilities and coordinate project work.

### 4. Tasks and Milestones

- Organize work into milestones and tasks.
- Assign tasks to team members.
- Track task status and deadlines.
- Support task dependencies and project-progress visibility.

### 5. Evidence-Based Contribution Tracking

- Associate contribution evidence with project work.
- Support evidence review and verification.
- Record disputes and review decisions.
- Maintain an audit trail for important actions.

Contribution records are intended to support transparent collaboration reviews, not to automatically determine a student's worth or academic grade.

### 6. Role-Based Access

The database defines three system roles:

- **STUDENT:** Student-facing functionality.
- **FACULTY:** Faculty-facing functionality, subject to implemented permissions.
- **ADMIN:** Administrative functionality, subject to implemented permissions.

Access restrictions must be enforced on the server, not just by hiding frontend controls.

## How Matching Works

TeamSync AI uses a weighted matching model intended to balance complementary skills and practical collaboration constraints.

| Matching dimension | Weight |
|---|---:|
| Skill coverage | 40% |
| Availability compatibility | 25% |
| Interest alignment | 15% |
| Role balance | 10% |
| Workload fit | 10% |
| **Total** | **100%** |

The intended overall score is:

`Matching Score = 0.40S + 0.25A + 0.15I + 0.10R + 0.10W`

Where:

- `S` = normalized skill-coverage score.
- `A` = availability-compatibility score.
- `I` = interest-alignment score.
- `R` = role-balance score.
- `W` = workload-fit score.

Each component must use a documented, consistent scale before these weights can be combined meaningfully. The exact normalization, hard constraints, and handling of missing data must be defined by the matching implementation.

The weights represent the intended design, not a claim that the model has been empirically validated.

Recommendations should explain why a candidate or team scores well, identify weaknesses, and allow authorized users to make the final decision.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router, React |
| Language | JavaScript / JSX |
| Styling | CSS and CSS Modules |
| Backend | Next.js server-side functionality and Route Handlers |
| Database | PostgreSQL |
| ORM | Prisma ORM 7 |
| Authentication | Better Auth |
| Validation | Zod and project-specific validation modules |
| Testing | Vitest and React Testing Library |
| Code quality | ESLint |
| Version control | Git and GitHub |

Versions and dependencies are maintained in `package.json` and `package-lock.json`.

## Project Architecture

The repository follows a Next.js application structure.

```text
teamsync-ai/
├── __tests__/                 # Automated tests
├── prisma/
│   ├── migrations/            # Database migrations
│   └── schema.prisma          # Database models
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   └── api/
│   │       └── auth/          # Better Auth API handler
│   ├── components/            # Reusable UI components
│   └── lib/
│       ├── auth.js            # Better Auth configuration
│       ├── prisma.js          # Prisma client setup
│       ├── business-rules-validation.js
│       └── matching-validation.js
├── prisma7.config.ts          # Prisma CLI configuration
├── package.json
├── package-lock.json
└── README.md
```

Additional application components and modules may be added as implementation progresses.

## Getting Started

### Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/) — use a version compatible with the project's Next.js requirements.
- npm, included with Node.js.
- [PostgreSQL](https://www.postgresql.org/download/) — a running database instance.
- [Git](https://git-scm.com/).

### 1. Clone the repository

```bash
git clone https://github.com/Pahar12/teamsync-ai.git
cd teamsync-ai
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create local environment files based on the configuration described below. Never commit real credentials or secret values.

### 4. Create the development database

Create a PostgreSQL database named `teamsync_ai`, or configure a different database name in your local connection string.

Ensure your PostgreSQL server is running before proceeding.

### 5. Apply database migrations

```bash
npx prisma migrate deploy
```

This applies committed migrations to the configured database without creating a new migration.

For local development, when you intentionally change the Prisma schema and need to generate a new migration, use:

```bash
npx prisma migrate dev --name describe_your_change
```

Review generated migrations before committing them. Do not use destructive database commands on a shared or production database.

### 6. Generate the Prisma client

```bash
npx prisma generate
```

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application may expose only a subset of the planned product features while development continues.

## Environment Variables

Create `.env.local` for local application configuration and use the database URL expected by the Prisma configuration. Keep all secret values private.

Example template:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/teamsync_ai"
BETTER_AUTH_SECRET="REPLACE_WITH_A_SECURE_RANDOM_SECRET"
BETTER_AUTH_URL="http://localhost:3000"
```

Replace the database placeholders with your local PostgreSQL credentials.

Generate a strong authentication secret using a secure random generator. Do not reuse the example value or commit your actual secret.

Important:

- Do not share `.env` or `.env.local` with teammates.
- Do not commit database passwords, authentication secrets, access tokens, or production credentials.
- Give each teammate their own local configuration.
- Configure production secrets using the deployment platform's secret-management settings.
- Verify that environment files are excluded by `.gitignore`.

## Database Setup

The Prisma schema contains the initial domain models for users, student profiles, skills, interests, projects, teams, memberships, invitations, milestones, tasks, task dependencies, contribution evidence, reviews, disputes, comments, and audit logs.

Better Auth's persistence models are also included for sessions, accounts, and verification records.

The initial database migration is stored in:

`prisma/migrations/20261025153855_init/migration.sql`

Useful database commands:

```bash
# Validate the Prisma schema
npx prisma validate

# Generate the Prisma client
npx prisma generate

# Check migration status
npx prisma migrate status

# Apply committed migrations
npx prisma migrate deploy
```

Avoid editing an already-applied migration as a way to change the schema. Create a new migration for subsequent schema changes.

## Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npx prisma validate` | Validate the Prisma schema |
| `npx prisma migrate status` | Check migration status |
| `npx prisma generate` | Generate the Prisma client |

## Testing

The project uses Vitest and React Testing Library for automated testing.

Run the existing test suite with:

```bash
npm run lint
npm run test
npx prisma validate
npx prisma migrate status
npm run build
```

The initial validation suite covers matching-related and business-rule validation, alongside frontend component and utility tests.

At the initial foundation milestone, 63 automated tests passed across 10 test files. This is a historical baseline, not a guarantee that every subsequent revision or feature passes.

As development continues, add tests for:

- Authentication and session handling.
- Server-side authorization and role restrictions.
- Student profile validation.
- Matching calculations and edge cases.
- Project and team membership permissions.
- Invitations, tasks, and dependencies.
- Contribution evidence, reviews, and disputes.
- API error handling and end-to-end user journeys.

## Project Roadmap

- [x] Initial Next.js application foundation.
- [x] Initial Prisma schema and PostgreSQL migration.
- [x] Better Auth configuration and authentication API handler.
- [x] Initial business-rule and matching validation tests.
- [ ] Complete authentication UI and session verification.
- [ ] Implement protected routes and server-side authorization.
- [ ] Complete student profile management.
- [ ] Connect explainable matching to database-backed profiles.
- [ ] Implement project, team, and invitation workflows.
- [ ] Implement task and milestone management.
- [ ] Implement evidence-based contribution reviews and disputes.
- [ ] Complete role-specific dashboards.
- [ ] Add integration and end-to-end testing.
- [ ] Document deployment and production configuration.

Checkboxes indicate the state of the initial foundation milestone; review the repository before treating any feature as production-ready.

## Security and Privacy

Security is an essential part of TeamSync AI.

- Enforce authorization on the server for protected operations.
- Never trust role values supplied by the client.
- Validate incoming data before persisting it.
- Keep credentials and secrets out of source control.
- Apply database migrations deliberately and review schema changes.
- Restrict access to private project, team, and contribution records.
- Record important review and administrative actions.
- Treat contribution metrics as explainable supporting information rather than unquestionable judgments.

Production readiness requires additional security review, testing, monitoring, and deployment configuration.

## Contributing

Team contributions are welcome during development.

### Recommended workflow

1. Sync your local `main` branch.
2. Create a feature branch.
3. Implement one clearly defined task.
4. Run the relevant tests and lint checks.
5. Commit your changes with a descriptive message.
6. Open a pull request for review.
7. Merge only after review and required checks pass.

Example:

```bash
git switch main
git pull origin main
git switch -c feat/student-profile
```

After making and testing your changes:

```bash
git add <your-changed-files>
git commit -m "feat: implement student profile management"
git push -u origin feat/student-profile
```

Replace the example branch and commit message with the feature you actually implement. Do not commit environment files or unrelated changes.

Coordinate shared Prisma schema changes with the team before creating migrations to reduce conflicts.

## License

No license has been specified yet. Until a license is added to the repository, don't assume that others have permission to redistribute or reuse the project's code.

---

**TeamSync AI** — building more balanced teams and more transparent collaboration for student projects.
