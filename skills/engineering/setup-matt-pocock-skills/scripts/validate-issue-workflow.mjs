#!/usr/bin/env node

import { resolve } from "node:path";
import {
  loadIssueWorkflow,
  requiredTrackerLabels,
  requiredTrackerStatuses,
  validateIssueWorkflow,
} from "./issue-workflow.mjs";

const configPath = resolve(
  process.cwd(),
  process.argv[2] ?? "docs/agents/issue-workflow.json",
);

try {
  const config = validateIssueWorkflow(await loadIssueWorkflow(configPath));
  console.log(`Issue workflow is valid: ${configPath}`);
  console.log(`Required labels: ${requiredTrackerLabels(config).join(", ")}`);
  console.log(`Required statuses: ${requiredTrackerStatuses(config).join(", ")}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
