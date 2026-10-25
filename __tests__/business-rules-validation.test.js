import { describe, it, expect } from "vitest";
import {
  availabilitySlotSchema,
  projectTeamSizeSchema,
  validateMembershipState,
  validateMembershipTransition,
  validateTeamLifecycleTransition,
  validateTaskDependencyGraph,
} from "../src/lib/business-rules-validation";

describe("Business Rule Validation Contracts", () => {
  describe("Availability slots", () => {
    it("accepts valid same-day slot in [0,24] bounds", () => {
      const parsed = availabilitySlotSchema.safeParse({
        dayOfWeek: "MONDAY",
        startHour: 9,
        endHour: 12,
      });
      expect(parsed.success).toBe(true);
    });

    it("rejects overnight or reversed slots", () => {
      const parsed = availabilitySlotSchema.safeParse({
        dayOfWeek: "MONDAY",
        startHour: 22,
        endHour: 2,
      });
      expect(parsed.success).toBe(false);
    });

    it("rejects non-integer hours and out-of-bound values", () => {
      const parsed = availabilitySlotSchema.safeParse({
        dayOfWeek: "MONDAY",
        startHour: -1,
        endHour: 9.5,
      });
      expect(parsed.success).toBe(false);
    });
  });

  describe("Team size", () => {
    it("accepts consistent min/max team size", () => {
      const parsed = projectTeamSizeSchema.safeParse({
        minTeamSize: 3,
        maxTeamSize: 5,
      });
      expect(parsed.success).toBe(true);
    });

    it("rejects maxTeamSize smaller than minTeamSize", () => {
      const parsed = projectTeamSizeSchema.safeParse({
        minTeamSize: 5,
        maxTeamSize: 3,
      });
      expect(parsed.success).toBe(false);
    });
  });

  describe("Membership state and transitions", () => {
    it("rejects duplicate active membership and multiple active leads", () => {
      const result = validateMembershipState([
        { userId: "u1", status: "ACTIVE", isLead: true },
        { userId: "u1", status: "ACTIVE", isLead: false },
        { userId: "u2", status: "ACTIVE", isLead: true },
      ]);

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes("Duplicate active membership"))).toBe(true);
      expect(result.errors.some((e) => e.includes("more than one active lead"))).toBe(true);
    });

    it("allows self-service leave but blocks unauthorized removal", () => {
      const leaveResult = validateMembershipTransition({
        actorUserId: "u1",
        actorRole: "STUDENT",
        actorIsLead: false,
        membership: { userId: "u1", status: "ACTIVE" },
        nextStatus: "LEFT",
      });
      expect(leaveResult.isValid).toBe(true);

      const removeResult = validateMembershipTransition({
        actorUserId: "u1",
        actorRole: "STUDENT",
        actorIsLead: false,
        membership: { userId: "u2", status: "ACTIVE" },
        nextStatus: "REMOVED",
      });
      expect(removeResult.isValid).toBe(false);
    });
  });

  describe("Team lifecycle transitions", () => {
    it("requires team-project consistency and transaction for activation", () => {
      const ok = validateTeamLifecycleTransition({
        currentStatus: "ARCHIVED",
        nextStatus: "ACTIVE",
        projectId: "p1",
        teamProjectId: "p1",
        projectActiveTeamId: null,
        teamId: "t2",
      });
      expect(ok.isValid).toBe(true);
      expect(ok.requiresTransaction).toBe(true);

      const mismatch = validateTeamLifecycleTransition({
        currentStatus: "ARCHIVED",
        nextStatus: "ACTIVE",
        projectId: "p1",
        teamProjectId: "p2",
        projectActiveTeamId: null,
        teamId: "t2",
      });
      expect(mismatch.isValid).toBe(false);
    });

    it("blocks activation when another active team is already set", () => {
      const result = validateTeamLifecycleTransition({
        currentStatus: "ARCHIVED",
        nextStatus: "ACTIVE",
        projectId: "p1",
        teamProjectId: "p1",
        projectActiveTeamId: "t1",
        teamId: "t2",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes("another activeTeamId"))).toBe(true);
    });
  });

  describe("Task dependencies", () => {
    it("rejects self-dependency, duplicates, and cycles", () => {
      const result = validateTaskDependencyGraph({
        existingEdges: [{ taskId: "A", dependsOnTaskId: "B" }],
        edges: [
          { taskId: "A", dependsOnTaskId: "B" },
          { taskId: "C", dependsOnTaskId: "C" },
          { taskId: "B", dependsOnTaskId: "A" },
        ],
      });

      expect(result.isValid).toBe(false);
      expect(result.hasCycle).toBe(true);
      expect(result.errors.some((e) => e.includes("Duplicate dependency edge"))).toBe(true);
      expect(result.errors.some((e) => e.includes("cannot depend on itself"))).toBe(true);
      expect(result.errors.some((e) => e.includes("Circular dependency"))).toBe(true);
      expect(result.requiresTransaction).toBe(true);
    });

    it("accepts acyclic dependency graph", () => {
      const result = validateTaskDependencyGraph({
        edges: [
          { taskId: "A", dependsOnTaskId: "B" },
          { taskId: "B", dependsOnTaskId: "C" },
        ],
      });

      expect(result.isValid).toBe(true);
      expect(result.hasCycle).toBe(false);
    });
  });
});
