---
name: tdd
description: Implement a requested behavior test-first with a focused red-green-refactor loop.
---

# Test-Driven Development

Build one meaningful behavior slice at a time through its real caller or public boundary. Repository implementation and verification policy takes precedence, including RED/GREEN/CUT or other immediate simplification steps.

## Choose the test boundary

Inspect the relevant caller, accepted behavior, and existing tests. Choose the cheapest boundary that can detect the actual failure, and state that choice in the existing plan or update. Do not request approval for routine test placement. Ask when intended behavior or a consequential interface decision remains unresolved.

Use the relevant domain vocabulary and ADRs when they affect the change. Consult the available codebase-design skill only when the interface itself needs design work; do not create production abstractions just to make a test convenient.

## Red, green, refactor

1. Write one test with an expectation independent of the implementation. Run it and confirm it fails for the intended reason.
2. Make the smallest production change that satisfies the behavior. Confirm the test passes.
3. Simplify the changed code and tests while preserving behavior and required controls. Rerun affected checks, then move to the next slice.

Follow the repository's release gates. Broaden verification when new changes, failures, or unresolved risks justify it; do not rerun unchanged checks just to complete a ritual.

## Test value

Tests should protect a distinct observable failure, survive internal refactors, and exercise the real behavior. Avoid assertions that recalculate the implementation, shallow tests that miss the production call pattern, and tests of incidental private structure. Multiple layers are useful only when they cover different failure classes.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for boundary guidance. If no meaningful test seam exists, report the limitation and use the repository's permitted deterministic reproduction or static evidence. Do not fabricate a passing regression or expand the architecture without a real caller need.
