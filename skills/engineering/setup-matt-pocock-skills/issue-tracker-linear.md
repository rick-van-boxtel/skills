# Issue tracker: Linear

Issues, specs, and project planning for this repo live in Linear. Use the connected Linear integration for all issue operations. GitHub remains the code host and pull request surface only.

## Scope

- **Workspace:** `REPLACE_WITH_LINEAR_WORKSPACE`
- **Team:** `REPLACE_WITH_LINEAR_TEAM`
- **Default project:** `REPLACE_WITH_LINEAR_PROJECT_OR_NONE`

## Conventions

- Create, read, update, comment on, and search issues through Linear.
- Apply exactly one work-type label from `docs/agents/issue-workflow.json`.
- Resolve triage readiness through the configured Linear status and optional qualifier label.
- Use Linear projects for grouped delivery and Linear `blockedBy`, `blocks`, and `relatedTo` relations for dependency edges.
- A ticket is on the frontier when all `blockedBy` issues are complete and its configured readiness is `ready-for-agent`.
- Move claimed work to `In Progress`, reviewable work to `In Review`, and completed work to `Done`, using the configured execution status names.
- Never create or update GitHub Issues as a side effect of Linear issue work.

## When a skill says "publish to the issue tracker"

Create a Linear issue in the configured team and project. Apply one configured work type and resolve `ready-for-agent` through the configured status and optional qualifier label.

## When a skill says "fetch the relevant ticket"

Read the Linear issue by identifier or URL, including its comments and relations.

## Pull requests

Pull requests stay on GitHub. Link the Linear issue in the branch or pull request, but do not duplicate the issue or its workflow labels on GitHub.
