---
name: diagnosing-bugs
description: Diagnose a persistent, intermittent, or performance bug using targeted evidence and a reproducible feedback signal.
---

# Diagnosing Bugs

Identify the cause of the user's reported symptom and verify the correction through the affected production path. Use the repository's risk, implementation, and release workflow; this skill adds diagnostic techniques, not another mandatory set of gates.

## Establish useful evidence

Inspect the relevant code, callers, logs, requests, and recent changes to understand the symptom. Form provisional hypotheses as needed to construct a reproduction. Prefer one focused test, command, browser interaction, or measurement that distinguishes the reported failure from success.

Verify that the signal reaches the actual failure pattern. Tighten or minimize it when that will distinguish causes or make iteration reliable; complete minimization is not a prerequisite for investigating an obvious defect. For a performance issue, record a representative baseline before changing code.

When competing causes remain plausible, state their distinguishing predictions and test the most informative one. One well-supported hypothesis may be enough; generate alternatives when evidence contradicts it rather than filling a fixed quota.

## Adapt to uncertainty

For difficult cases, read [diagnostic techniques](references/techniques.md) for bisection, differential checks, trace replay, and intermittent failures. Do not impose those techniques on a routine reproducible defect.

If the original environment is unavailable, continue with useful static inspection or a representative local probe. Distinguish verified facts from hypotheses and state what remains unverified. Request only the missing access or redacted evidence that materially blocks the next step; do not claim the original failure is fixed without sufficient evidence.

## Fix and verify

Add a regression first when a meaningful boundary exercises the real bug pattern. Fix the supported cause, rerun that regression and the original scenario, and follow the repository's affected checks. If no correct seam exists, document the limitation and use the closest truthful evidence instead of a shallow test.

Remove temporary instrumentation and disposable harnesses once their useful evidence is preserved. State the cause, changed behavior, verification, and remaining limitations. Keep architecture follow-ups separate unless the requested fix actually requires them.

## Private data and external effects

Use environment-held credentials without printing them. Redact secrets from commands, logs, requests, and artifacts before presenting or saving evidence. Treat real-data requests and production instrumentation according to existing authorization; a diagnostic plan does not grant permission for external mutations.
