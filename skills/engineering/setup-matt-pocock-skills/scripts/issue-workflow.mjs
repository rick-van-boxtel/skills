import { readFile } from "node:fs/promises";

export const REQUIRED_WORK_TYPES = [
  "bug",
  "feature",
  "improvement",
  "documentation",
];

export const REQUIRED_READINESS_STATES = [
  "needs-triage",
  "needs-information",
  "needs-evidence",
  "ready-for-agent",
  "ready-for-human",
  "not-planned",
];

export async function loadIssueWorkflow(path) {
  const source = await readFile(path, "utf8");
  return JSON.parse(source);
}

function assertExactRoles(actual, expected, section) {
  const actualRoles = Object.keys(actual ?? {}).sort();
  const expectedRoles = [...expected].sort();

  if (JSON.stringify(actualRoles) !== JSON.stringify(expectedRoles)) {
    throw new Error(
      `${section} must contain exactly: ${expectedRoles.join(", ")}`,
    );
  }
}

function assertNonEmptyString(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${field} must be a non-empty string`);
  }
}

export function validateIssueWorkflow(config) {
  if (config?.version !== 1) {
    throw new Error("version must be 1");
  }

  assertNonEmptyString(config.tracker, "tracker");
  assertExactRoles(config.workTypes, REQUIRED_WORK_TYPES, "workTypes");
  assertExactRoles(
    config.readinessStates,
    REQUIRED_READINESS_STATES,
    "readinessStates",
  );

  const workTypeLabels = new Set();
  for (const [role, mapping] of Object.entries(config.workTypes)) {
    assertNonEmptyString(mapping?.label, `workTypes.${role}.label`);
    const normalized = mapping.label.trim().toLowerCase();
    if (normalized === "enhancement") {
      throw new Error("enhancement is not a supported work-type dependency");
    }
    if (workTypeLabels.has(normalized)) {
      throw new Error(`work type label ${mapping.label} is mapped more than once`);
    }
    workTypeLabels.add(normalized);
  }

  const readinessSelectors = new Set();
  for (const [role, mapping] of Object.entries(config.readinessStates)) {
    assertNonEmptyString(mapping?.status, `readinessStates.${role}.status`);
    if (mapping.label !== null && mapping.label !== undefined) {
      assertNonEmptyString(mapping.label, `readinessStates.${role}.label`);
    }
    const selector = `${mapping.status.trim().toLowerCase()}::${
      mapping.label?.trim().toLowerCase() ?? ""
    }`;
    if (readinessSelectors.has(selector)) {
      throw new Error(
        `readiness selector ${mapping.status}/${mapping.label ?? "no label"} is mapped more than once`,
      );
    }
    readinessSelectors.add(selector);
  }

  return config;
}

export function requiredTrackerLabels(config) {
  validateIssueWorkflow(config);
  return [
    ...Object.values(config.workTypes).map(({ label }) => label),
    ...Object.values(config.readinessStates)
      .map(({ label }) => label)
      .filter(Boolean),
  ];
}

export function requiredTrackerStatuses(config) {
  validateIssueWorkflow(config);
  return [
    ...new Set(
      Object.values(config.readinessStates).map(({ status }) => status),
    ),
  ];
}

export function resolveIssueWorkflow(config, issue) {
  validateIssueWorkflow(config);
  const labels = new Set((issue.labels ?? []).map((label) => label.toLowerCase()));

  const workTypes = Object.entries(config.workTypes)
    .filter(([, mapping]) => labels.has(mapping.label.toLowerCase()))
    .map(([role]) => role);

  const readinessStates = Object.entries(config.readinessStates)
    .filter(([, mapping]) => {
      if (mapping.status.toLowerCase() !== issue.status.toLowerCase()) return false;
      return mapping.label ? labels.has(mapping.label.toLowerCase()) : true;
    })
    .filter(([role, mapping], _index, matches) => {
      if (mapping.label) return true;
      return !matches.some(
        ([otherRole, otherMapping]) => otherRole !== role && otherMapping.label,
      );
    })
    .map(([role]) => role);

  if (workTypes.length !== 1) {
    throw new Error(`issue must resolve to exactly one work type, found ${workTypes.length}`);
  }
  if (readinessStates.length !== 1) {
    throw new Error(
      `issue must resolve to exactly one readiness state, found ${readinessStates.length}`,
    );
  }

  return { workType: workTypes[0], readinessState: readinessStates[0] };
}
