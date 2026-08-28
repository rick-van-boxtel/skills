---
name: setup-matt-pocock-skills
description: "Configure this repo for the engineering skills: set up its issue tracker, issue workflow roles, and domain doc layout. Run once before first use of the other engineering skills."
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Scaffold the per-repo configuration that the engineering skills assume:

- **Issue tracker**: where issues live and which native projects and relations express delivery structure
- **Issue workflow**: repository-configured work types and readiness states
- **Domain docs**: where `CONTEXT.md` and ADRs live, and the consumer rules for reading them

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config`: is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root: does either exist? Is there already an `## Agent skills` section in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/`: does this skill's prior output already exist?
- `docs/agents/issue-workflow.json`: does a valid work-type and readiness mapping already exist?
- `.scratch/`: a sign that a local-markdown issue tracker convention is already in use
- Is the `triage` skill installed? (a `triage` skill folder alongside this one, or `triage` in your available skills.) This decides whether Section B runs at all.
- Monorepo signals: a `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, or a populated `packages/*` with its own `src/`. These are present only in a genuinely large multi-package repo; their absence means single-context, which is almost every repo.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order. One section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches; skip the section entirely when exploration already settled it (Section B when `triage` isn't installed, Section C when there's no monorepo).

**Section A: Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `to-tickets`, `triage`, and `to-spec` read from and write to it. They need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Do not infer the issue tracker from the Git remote when repository instructions or the user name a tracker. A GitHub code remote and Linear issue tracker are a supported and common split. Otherwise propose the tracker with the strongest evidence, and offer:

- **GitHub**: issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab**: issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Linear**: issues, projects, statuses, labels, and relations live in Linear; GitHub may still host code and pull requests
- **Local markdown**: issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Azure DevOps, etc.): ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

Record the choice in `docs/agents/issue-tracker.md`. The GitHub and GitLab templates carry a "PRs as a request surface" flag, defaulted **off**. Leave it off and don't raise it: a user who wants external PRs in the triage queue can flip the flag in the file later.

**Section B: Issue workflow.** Skip this section entirely if the `triage` skill isn't installed, since an uninstalled skill needs no triage workflow.

Generate `docs/agents/issue-workflow.json`. The canonical semantic roles are fixed, while their tracker representation is repository configuration:

- Work types: `bug`, `feature`, `improvement`, `documentation`
- Readiness states: `needs-triage`, `needs-information`, `needs-evidence`, `ready-for-agent`, `ready-for-human`, `not-planned`

For Linear, start from [issue-workflow-linear.json](./issue-workflow-linear.json). Work types are Linear labels. Readiness is a Linear status plus an optional qualifier label. A qualifier is required when several semantic readiness roles share one Linear status, such as several kinds of waiting work in `Backlog`. `Todo` normally represents `ready-for-agent`; `Canceled` normally represents `not-planned`. Execution statuses such as `In Progress`, `In Review`, and `Done` sit after triage and are configured separately.

Ask one question: whether to keep the recommended mapping. If the user changes it, collect all overrides in one pass. Never introduce `enhancement` as a hidden fallback or required label.

Validate the generated file with `node <setup-skill>/scripts/validate-issue-workflow.mjs docs/agents/issue-workflow.json`. Then verify live tracker drift:

1. List the configured tracker's labels and statuses.
2. Compare them with every non-null label and status in the generated mapping.
3. Report missing labels and statuses without mutating the tracker.
4. Offer one explicit create action for missing labels. Show the exact names first and create them only after the user approves. Never create approximate names or duplicate case variants.
5. If statuses are missing and the integration cannot create team statuses safely, stop and tell the user which exact statuses to add or which mapping to change. Do not silently substitute a different status.

**Section C: Domain docs.** Default to **single-context** (one `CONTEXT.md` + `docs/adr/` at the repo root). This fits almost every repo; write it without asking.

Offer **multi-context** (a root `CONTEXT-MAP.md` pointing to per-context `CONTEXT.md` files) only when exploration found monorepo signals. Then confirm which layout they want.

### 3. Confirm and edit

Show the user a draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` is being edited (see step 4 for selection rules)
- The contents of `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, and `docs/agents/issue-workflow.json` (the last only when `triage` is installed)

Let them edit before writing.

### 4. Write

**Pick the file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask the user which one to create; don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa); always edit the one that's already there.

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Issue workflow

[one-line summary of the configured work types and readiness states]. See `docs/agents/issue-workflow.json`.

### Domain docs

[one-line summary of layout: "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

Include the `### Issue workflow` sub-block, and write `docs/agents/issue-workflow.json`, only when `triage` is installed and Section B ran. When it isn't, both are omitted. If a legacy `docs/agents/triage-labels.md` exists, replace references to it and remove it only after the new workflow file validates.

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./issue-tracker-github.md): GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md): GitLab issue tracker
- [issue-tracker-linear.md](./issue-tracker-linear.md): Linear issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md): local-markdown issue tracker
- [issue-workflow-linear.json](./issue-workflow-linear.json): Linear work-type and readiness mapping (only if `triage` is installed)
- [domain.md](./domain.md): domain doc consumer rules + layout

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using the user's description.

### 5. Done

Tell the user the setup is complete, which live labels and statuses were verified, and which engineering skills will now read from these files. Mention they can edit `docs/agents/issue-workflow.json` directly and rerun the validator later; re-running this skill is only necessary if they want to switch trackers or regenerate the workflow.
