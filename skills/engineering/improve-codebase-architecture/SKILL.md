---
name: improve-codebase-architecture
description: Audit a requested area for concrete architectural friction and worthwhile simplification.
disable-model-invocation: true
---

# Improve Codebase Architecture

Inspect the requested area and its callers for demonstrated coupling, duplicated
invariants, or changes made difficult by the current structure. If no area is
named, recent changes can help select a useful scope. Read relevant domain terms
and ADRs rather than requiring a full repository survey.

Report supported candidates with affected paths, the concrete problem, the
smallest useful change, and its tradeoffs. A finding needs more than a generic
preference for deep modules. It is valid to find no worthwhile refactor.

Use prose or a compact diagram by default. For a requested HTML report, see
[HTML-REPORT.md](HTML-REPORT.md) as an optional scaffold; keep the result readable
without network access. A report does not require an interview or implementation.

When the user requests deeper design work, use the available codebase-design skill
for a consequential interface choice, or grilling for an explicitly requested
interview. Follow existing authorization for implementation; do not force a new
session, specification, or ticket merely to continue.
