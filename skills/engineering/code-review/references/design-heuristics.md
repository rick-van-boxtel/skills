# Design heuristics

Use these as questions for a requested maintainability review, not automatic blockers or instructions to refactor unrelated code. Repository conventions and concrete behavior outrank generic preferences.

- Do names reveal the domain role and effect?
- Does repeated logic represent the same invariant, or only superficially similar code?
- Would moving behavior reduce coupling between the actual callers and their data?
- Do recurring parameter groups represent a useful existing domain concept?
- Would an abstraction remove demonstrated duplication, or introduce speculative flexibility?
- Does a wrapper hide meaningful complexity or merely rename another interface?
- Are changes scattered because one responsibility has no clear owner?

Describe the maintenance impact and current evidence. Do not turn a naming or abstraction preference into a correctness finding without a written rule or observable defect.
