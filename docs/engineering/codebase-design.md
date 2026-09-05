## What it does

Assess an interface against current callers and constraints. A real boundary can justify one adapter; architecture does not need extra implementations to satisfy a quota.

## When to reach for it

Type `/codebase-design` when you want a consequential interface or architecture decision. It may also be selected when the requested task fits.

## Common questions

**Do I need two adapters or to delete unit tests?**

No. A single real boundary can earn an adapter. Preserve tests that protect distinct failures; remove only obsolete or demonstrated duplicate coverage.

## It's working if

The proposed interface reduces actual caller complexity without speculative flexibility.

## Where it fits

Use it for a selected design question; architecture surveys can use [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture). For the available skills, see [ask-matt](https://aihero.dev/skills-ask-matt).
