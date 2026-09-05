---
name: codebase-design
description: Assess a requested module interface or architecture change using current callers and constraints.
---

# Codebase Design

A deep module hides useful complexity behind a small interface. Assess depth by
what callers must understand, including invariants, errors, ordering, and runtime
costs. Use the project's own terminology; component, service, API, and boundary
remain useful words when they describe the actual system.

Start with the requested behavior and existing callers. Keep an abstraction when
removing it would move material complexity back into those callers. A real external
boundary can justify one adapter; a test double alone does not justify production
indirection. Generalize only for variation demonstrated by current requirements.

Prefer evidence about coupling, repeated invariants, or difficult changes over a
broad search for shallow modules. Small functions and direct calls can be the right
design. Do not refactor adjacent code solely to apply this vocabulary.

- For a selected refactor with external dependencies, see [DEEPENING.md](DEEPENING.md).
- When alternative interfaces would resolve a real design choice, see
  [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md).
