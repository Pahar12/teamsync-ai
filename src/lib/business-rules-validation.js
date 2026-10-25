import { z } from "zod";

const DAY_OF_WEEK_VALUES = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const TEAM_LIFECYCLE_STATUS = ["ACTIVE", "ARCHIVED"];
const MEMBERSHIP_STATUS = ["ACTIVE", "INACTIVE", "LEFT", "REMOVED"];

const TRANSITION_ALLOWLIST = {
  ACTIVE: new Set(["INACTIVE", "LEFT", "REMOVED"]),
  INACTIVE: new Set(["ACTIVE", "LEFT", "REMOVED"]),
  LEFT: new Set([]),
  REMOVED: new Set([]),
};

export const availabilitySlotSchema = z
  .object({
    dayOfWeek: z.enum(DAY_OF_WEEK_VALUES),
    startHour: z.number().int().min(0).max(24),
    endHour: z.number().int().min(0).max(24),
  })
  .superRefine((slot, ctx) => {
    if (slot.endHour <= slot.startHour) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endHour"],
        message: "endHour must be greater than startHour; overnight slots are unsupported in MVP",
      });
    }
  });

export const projectTeamSizeSchema = z
  .object({
    minTeamSize: z.number().int().min(1),
    maxTeamSize: z.number().int().min(1),
  })
  .superRefine((value, ctx) => {
    if (value.maxTeamSize < value.minTeamSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxTeamSize"],
        message: "maxTeamSize must be greater than or equal to minTeamSize",
      });
    }
  });

export function validateMembershipState(memberships) {
  const errors = [];

  if (!Array.isArray(memberships)) {
    return {
      isValid: false,
      errors: ["Memberships must be provided as an array"],
    };
  }

  const activeMembershipByUser = new Set();
  let activeLeadCount = 0;

  for (const membership of memberships) {
    const status = membership?.status;
    const userId = membership?.userId;

    if (!MEMBERSHIP_STATUS.includes(status)) {
      errors.push(`Invalid membership status: ${status}`);
      continue;
    }

    if (status === "ACTIVE") {
      if (!userId) {
        errors.push("Active membership must include userId");
      } else if (activeMembershipByUser.has(userId)) {
        errors.push(`Duplicate active membership detected for userId ${userId}`);
      } else {
        activeMembershipByUser.add(userId);
      }

      if (membership?.isLead === true) {
        activeLeadCount += 1;
      }
    }
  }

  if (activeLeadCount > 1) {
    errors.push("A team cannot have more than one active lead");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateMembershipTransition({
  actorUserId,
  actorRole,
  actorIsLead,
  membership,
  nextStatus,
}) {
  const errors = [];

  if (!membership || !MEMBERSHIP_STATUS.includes(membership.status)) {
    errors.push("Current membership state is invalid");
  }

  if (!MEMBERSHIP_STATUS.includes(nextStatus)) {
    errors.push(`Unsupported membership transition target: ${nextStatus}`);
  }

  const canTransition = membership
    && MEMBERSHIP_STATUS.includes(membership.status)
    && MEMBERSHIP_STATUS.includes(nextStatus)
    && TRANSITION_ALLOWLIST[membership.status]?.has(nextStatus);

  if (!canTransition) {
    errors.push(`Transition from ${membership?.status} to ${nextStatus} is not allowed`);
  }

  const isSelfService = actorUserId && membership?.userId && actorUserId === membership.userId;
  const isLeadOrAdmin = actorRole === "ADMIN" || actorIsLead === true;

  if (nextStatus === "LEFT") {
    if (!isSelfService && !isLeadOrAdmin) {
      errors.push("Only the member, team lead, or admin can set status to LEFT");
    }
  } else if (!isLeadOrAdmin) {
    errors.push("Only team lead or admin can perform this membership transition");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateTeamLifecycleTransition({
  currentStatus,
  nextStatus,
  projectId,
  teamProjectId,
  projectActiveTeamId,
  teamId,
}) {
  const errors = [];

  if (!TEAM_LIFECYCLE_STATUS.includes(currentStatus)) {
    errors.push(`Invalid current team status: ${currentStatus}`);
  }

  if (!TEAM_LIFECYCLE_STATUS.includes(nextStatus)) {
    errors.push(`Invalid next team status: ${nextStatus}`);
  }

  if (!projectId || !teamProjectId || projectId !== teamProjectId) {
    errors.push("Active team update is invalid: team must belong to the same project");
  }

  if (nextStatus === "ACTIVE" && projectActiveTeamId && projectActiveTeamId !== teamId) {
    errors.push("Cannot activate this team while another activeTeamId is set on the project");
  }

  if (currentStatus === "ACTIVE" && nextStatus === "ARCHIVED" && projectActiveTeamId === teamId) {
    errors.push("Archiving active team requires clearing or switching project.activeTeamId in the same transaction");
  }

  const requiresTransaction =
    currentStatus !== nextStatus
    || (nextStatus === "ACTIVE" && projectActiveTeamId !== teamId)
    || (nextStatus === "ARCHIVED" && projectActiveTeamId === teamId);

  return {
    isValid: errors.length === 0,
    requiresTransaction,
    errors,
  };
}

export function validateTaskDependencyGraph({
  edges,
  existingEdges = [],
}) {
  const errors = [];

  if (!Array.isArray(edges)) {
    return {
      isValid: false,
      hasCycle: false,
      errors: ["Edges must be provided as an array"],
      requiresTransaction: true,
      notes: [
        "Use a SERIALIZABLE transaction or row-level locking to protect concurrent dependency updates.",
      ],
    };
  }

  const combined = [...existingEdges, ...edges];
  const edgeKeySet = new Set();

  for (const edge of combined) {
    const taskId = edge?.taskId;
    const dependsOnTaskId = edge?.dependsOnTaskId;

    if (!taskId || !dependsOnTaskId) {
      errors.push("Dependency edges must include taskId and dependsOnTaskId");
      continue;
    }

    if (taskId === dependsOnTaskId) {
      errors.push(`Task ${taskId} cannot depend on itself`);
    }

    const key = `${taskId}->${dependsOnTaskId}`;
    if (edgeKeySet.has(key)) {
      errors.push(`Duplicate dependency edge detected: ${key}`);
    } else {
      edgeKeySet.add(key);
    }
  }

  const graph = new Map();
  for (const edge of combined) {
    if (!edge?.taskId || !edge?.dependsOnTaskId) {
      continue;
    }

    if (!graph.has(edge.taskId)) {
      graph.set(edge.taskId, new Set());
    }
    graph.get(edge.taskId).add(edge.dependsOnTaskId);
  }

  const visiting = new Set();
  const visited = new Set();

  function hasCycleFrom(node) {
    if (visiting.has(node)) {
      return true;
    }
    if (visited.has(node)) {
      return false;
    }

    visiting.add(node);
    const neighbors = graph.get(node) || new Set();

    for (const neighbor of neighbors) {
      if (hasCycleFrom(neighbor)) {
        return true;
      }
    }

    visiting.delete(node);
    visited.add(node);
    return false;
  }

  let hasCycle = false;
  for (const node of graph.keys()) {
    if (hasCycleFrom(node)) {
      hasCycle = true;
      break;
    }
  }

  if (hasCycle) {
    errors.push("Circular dependency detected in task graph");
  }

  return {
    isValid: errors.length === 0,
    hasCycle,
    errors,
    requiresTransaction: true,
    notes: [
      "Cycle checks must execute in the same transaction that inserts dependency edges.",
      "Use SERIALIZABLE isolation or explicit locking to prevent race conditions from concurrent edge inserts.",
    ],
  };
}
