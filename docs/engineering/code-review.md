## What it does

`code-review` checks the requested changes for correctness, repository standards, and accepted requirements. It selects the actual scope, including staged, unstaged, and untracked work when requested, and returns one prioritized list of supported findings.

Repository policy determines reviewer count and convergence. The skill does not create separate agents merely to label one pass Standards and another Spec.

## When to reach for it

Type `/code-review`, or the agent can use it when you ask for a branch, PR, commit-range, or WIP review. For investigating a failure without a useful diff, use [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs).

## Common questions

**Does it inspect uncommitted work?**

Yes, when that is the requested scope. It distinguishes staged-only, unstaged-only, all uncommitted work, and a branch plus WIP. An empty comparison to HEAD does not hide edits still in the index or working tree.

**Do I need a fixed point or a separate specification?**

A referenced PR can supply its base, and a WIP review needs no branch comparison. The agent states its scope and asks only when ambiguity affects coverage. Without a separate spec, it uses accepted requirements and documented rules, reporting any material limitation.

**Will it spawn reviewers recursively?**

Repository review policy owns the agent topology. Without one, the skill reviews directly and uses bounded delegation only when useful and permitted. It verifies leads and does not open a second discovery loop to chase generic smells.

## It's working if

- The stated scope includes the work you asked to review.
- Each actionable finding explains a concrete trigger, impact, and supporting evidence.
- Duplicate observations are consolidated and subjective suggestions remain distinct.

## Where it fits

A standalone review or the review step of [implement](https://aihero.dev/skills-implement). [ask-matt](https://aihero.dev/skills-ask-matt) maps the surrounding workflow.
