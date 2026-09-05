## What it does

`tdd` implements one behavior slice at a time with a red-green-refactor loop. The agent chooses the cheapest meaningful production-facing test boundary and simplifies after the first passing result, following the repository's implementation policy.

## When to reach for it

Type `/tdd`, or the agent can use it for a requested test-first implementation. A request for an integration test alone does not require adopting a separate TDD process. For a complete spec or ticket, [implement](https://aihero.dev/skills-implement) coordinates the work.

## Common questions

**Must I approve every test seam?**

No. The agent states a routine existing boundary and proceeds. It asks when intended behavior or a consequential interface decision is unresolved, not merely because a test file is new.

**When does refactoring happen?**

After green, within the current behavior slice. A repository's RED/GREEN/CUT policy can define the exact simplification step. Required controls and accepted behavior remain intact.

**What if a unit test cannot reproduce the real bug?**

Use a meaningful integration or production-facing boundary. If no correct seam exists, report the limitation and use the repository's permitted deterministic evidence rather than writing a shallow passing test.

## It's working if

- A focused test first fails for the requested behavior, then passes after the fix.
- Its expected result is independent of the implementation.
- Simplification happens without adding speculative production abstractions.

## Where it fits

A standalone test-first loop or part of [implement](https://aihero.dev/skills-implement). [codebase-design](https://aihero.dev/skills-codebase-design) helps when a real interface needs design; [ask-matt](https://aihero.dev/skills-ask-matt) maps the set.
