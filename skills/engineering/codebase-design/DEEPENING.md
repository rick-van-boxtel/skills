# Deepening an existing module

Trace the behavior and callers that make the current structure costly. Compare
keeping it with a concrete simpler arrangement. Preserve public contracts, error
behavior, ownership, and rollback needs.

Use direct calls for in-process behavior where possible. A current network or
external-service boundary may need an adapter to isolate transport or failure
handling, even with a single production implementation. Use a representative
local service or test double when appropriate; do not create extra ports just to
satisfy an adapter count.

Verify the changed behavior through its real caller. Keep tests that protect
separate failure classes, including focused unit tests and composition tests.
Delete only obsolete or duplicate tests after identifying which remaining check
covers their useful expectations. An integration test's existence alone is not
evidence that lower-level coverage is redundant.
