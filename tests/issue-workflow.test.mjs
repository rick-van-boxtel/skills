import assert from "node:assert/strict";
import test from "node:test";

import {
  requiredTrackerLabels,
  resolveIssueWorkflow,
  validateIssueWorkflow,
} from "../skills/engineering/setup-matt-pocock-skills/scripts/issue-workflow.mjs";

const customLinearWorkflow = {
  version: 1,
  tracker: "linear",
  team: "Example Team",
  workTypes: {
    bug: { label: "Defect" },
    feature: { label: "Capability" },
    improvement: { label: "Refinement" },
    documentation: { label: "Docs" },
  },
  readinessStates: {
    "needs-triage": { status: "Backlog", label: "Needs Sorting" },
    "needs-information": { status: "Backlog", label: "Needs Context" },
    "needs-evidence": { status: "Backlog", label: "Awaiting Proof" },
    "ready-for-agent": { status: "Todo", label: null },
    "ready-for-human": { status: "Backlog", label: "Human Decision" },
    "not-planned": { status: "Canceled", label: null },
  },
};

test("custom mappings resolve a documentation issue waiting for evidence", () => {
  const config = validateIssueWorkflow(customLinearWorkflow);
  assert.deepEqual(
    resolveIssueWorkflow(config, {
      labels: ["Docs", "Awaiting Proof"],
      status: "Backlog",
    }),
    { workType: "documentation", readinessState: "needs-evidence" },
  );
});

test("ready-for-agent resolves through the configured Linear status", () => {
  assert.deepEqual(
    resolveIssueWorkflow(customLinearWorkflow, {
      labels: ["Capability"],
      status: "Todo",
    }),
    { workType: "feature", readinessState: "ready-for-agent" },
  );
});

test("exactly one work type is required", () => {
  assert.throws(
    () =>
      resolveIssueWorkflow(customLinearWorkflow, {
        labels: ["Defect", "Capability"],
        status: "Todo",
      }),
    /exactly one work type, found 2/,
  );
});

test("the workflow has no enhancement label dependency", () => {
  assert.equal(
    requiredTrackerLabels(customLinearWorkflow).some(
      (label) => label.toLowerCase() === "enhancement",
    ),
    false,
  );

  const invalid = structuredClone(customLinearWorkflow);
  invalid.workTypes.improvement.label = "enhancement";
  assert.throws(
    () => validateIssueWorkflow(invalid),
    /enhancement is not a supported work-type dependency/,
  );
});
