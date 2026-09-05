---
name: domain-modeling
description: Clarify or update domain terminology and durable architectural decisions when requested.
---

# Domain Modeling

Resolve domain distinctions that affect the requested behavior. Read the relevant
glossary and ADRs, or follow `CONTEXT-MAP.md` when the project has multiple contexts.
Reading vocabulary alone does not require this workflow.

Use code and concrete scenarios to identify consequential ambiguities. Ask when
different meanings change behavior; ordinary wording differences need not interrupt
work. Follow established product language and do not silently override an ADR.

Capture settled terms when documentation updates are authorized, using the
repository's format or [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md). Keep speculative
ideas and implementation notes out of the glossary. Batch related edits when useful.
Create a document only when there is durable content to record.

An ADR earns its place when a decision is costly to reverse, surprising without
context, and the result of a real tradeoff. Use [ADR-FORMAT.md](ADR-FORMAT.md) when
recording one. A design discussion does not automatically require an ADR.
