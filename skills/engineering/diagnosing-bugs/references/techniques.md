# Diagnostic techniques

Choose a technique for the uncertainty it resolves. None is a required phase.

- **Intermittent failures:** pin clocks/seeds where appropriate, repeat the actual trigger, and report the observed reproduction rate. Use bounded stress only in an authorized isolated environment; do not flood a live service to raise the failure rate.
- **Regression between known revisions:** use a deterministic harness with Git bisection in an isolated checkout. Preserve the user's current work.
- **Differential behavior:** compare the same inputs across known versions or configurations to isolate the changed assumption.
- **Trace replay:** capture only the redacted request or event facts needed, then replay them through the relevant local path. Preserve the distinction between a replay and live evidence.
- **Targeted instrumentation:** inspect a debugger state or add a uniquely tagged log at the boundary that distinguishes hypotheses. Remove temporary logs after verification.
- **Performance:** compare representative measurements or profiles under controlled conditions. Avoid changing worker counts, timeout budgets, or data shape just to make a failing check pass.
- **Manual-only interaction:** the existing `../scripts/hitl-loop.template.sh` template can structure a necessary human reproduction. Leave authentication to the user and capture observations, never credentials. Prefer agent-runnable evidence when available.
