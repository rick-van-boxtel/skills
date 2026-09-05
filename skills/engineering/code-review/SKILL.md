---
name: code-review
description: Review a branch, PR, commit range, or uncommitted changes against repository standards and the accepted requirements.
---

# Code Review

Review the requested changes for concrete correctness, specification, and repository-rule defects. Repository review policy owns reviewer count, delegation, arbitration, and convergence. Without such a policy, review directly; delegate a bounded question only when it adds independent evidence and the harness permits it. Standards and specification are perspectives, not mandatory separate agents.

## Resolve the scope

Inspect repository status first. Use the user's scope, or infer it from the referenced PR, branch, or visible uncommitted work. State the chosen scope; ask only when plausible alternatives would materially change the review.

- **PR or branch:** resolve its actual base and record the merge-base and reviewed HEAD. Compare that merge-base to HEAD.
- **Changes since an exact commit:** compare that commit directly to HEAD unless the user asked for a merge-base comparison.
- **Staged only:** `git diff --cached`.
- **Unstaged tracked changes only:** `git diff`.
- **All uncommitted work:** `git diff HEAD` plus `git ls-files --others --exclude-standard`; inspect the listed untracked files in scope without adding them to Git. Staged and unstaged changes to the same file are reviewed as the net working-tree result.
- **Branch plus WIP:** compare the resolved branch merge-base to the working tree and inspect in-scope untracked files separately.

Resolve refs before reviewing. An empty committed diff does not imply an empty WIP diff. On an unborn branch, inspect staged additions and untracked files directly rather than requiring HEAD. Preserve work and do not switch branches to perform a review.

## Find the requirements and rules

Use the user's accepted requirements, the PR or issue linked to the change, and relevant repository instructions. Follow the configured tracker for identifiers such as `SOR-123`; historical `#123` references may name GitHub history. Read only relevant standards and decisions.

If no specification is available, review correctness and documented rules, state the limitation, and ask only if intended behavior is necessary to judge a finding. Missing tracker setup does not authorize configuring the repository or prevent an otherwise useful review.

## Assess and report

Trace changed behavior through its real callers and contracts. Support findings with a reproduction, exact static evidence, or a specific accepted requirement. Use [design heuristics](references/design-heuristics.md) only when maintainability review is requested or a concrete design problem needs that lens.

Treat reviewer output as leads to verify. Follow the repository's existing bounded review process; do not create a second review tree or reopen resolved scope through a generic smell scan. Do not duplicate checks already covered by reliable tooling unless their coverage is in question.

Return a deduplicated, prioritized finding list. Each finding names the affected file/line, concrete trigger and impact, and standards/specification evidence where relevant. Label subjective suggestions separately. If no actionable defect is found, say so and state material coverage limits. Reviews do not authorize implementation, publication, or broader configuration changes.
