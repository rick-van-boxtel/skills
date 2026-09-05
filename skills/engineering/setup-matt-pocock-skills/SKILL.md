---
name: setup-matt-pocock-skills
description: Configure a repository's tracker and domain-document routes when setup is explicitly requested.
disable-model-invocation: true
---

# Repository skill setup

Inspect existing entry points, tracker instructions, `issue-workflow.json`, and
domain-document layout. Preserve working configuration and local conventions.
A GitHub remote does not imply GitHub Issues; Linear may own the work.

Resolve missing material choices from the request and existing evidence. Present
the concrete proposed configuration and ask only for unresolved choices. Honor
prior approval instead of asking again for each section.

Use only the templates needed for the selected tracker:

- [GitHub](issue-tracker-github.md), [GitLab](issue-tracker-gitlab.md),
  [Linear](issue-tracker-linear.md), or [local Markdown](issue-tracker-local.md).
- When configuring triage, use [Linear workflow defaults](issue-workflow-linear.json)
  or the chosen tracker's actual mappings. Preserve an existing workflow when triage
  is not installed; do not install additional skills as a side effect.
- For domain-document routes, use [domain.md](domain.md). Default to a single context
  unless existing boundaries justify multiple contexts.

Follow the repository's entry-point layout. If `AGENTS.md` and `CLAUDE.md` must
match, edit both identically; avoid adding duplicate routing sections. When no
entry point exists, resolve the intended harness before creating one.

Validate a created or changed workflow with:

```bash
node <setup-skill>/scripts/validate-issue-workflow.mjs docs/agents/issue-workflow.json
```

Compare configured labels and statuses with live tracker state when access exists.
Report exact missing names. Creating labels or changing tracker configuration
requires authorization for that action; no approximate substitutes or hidden
`enhancement` label dependency. Missing access leaves live validation unverified,
but does not prevent preparing a local configuration.

Report the changed files, validator result, live-state checks, and any remaining
material choice or authorized action.
