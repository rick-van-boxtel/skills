## What it does

`diagnosing-bugs` establishes a useful feedback signal for a persistent, intermittent, or performance failure. Code inspection and provisional hypotheses help construct that signal; a reproduction is not a prerequisite for beginning useful investigation.

## When to reach for it

Type `/diagnosing-bugs`, or the agent can use it when a bug needs targeted investigation beyond an obvious local fix. It complements the repository's verification policy instead of imposing another release process.

## Common questions

**Does every bug need multiple hypotheses and a minimized harness?**

No. One supported cause can be enough. Competing hypotheses, minimization, bisection, and trace replay are tools for uncertainty, not a fixed itinerary.

**What if production is unavailable?**

The agent can inspect relevant code and run a representative local probe. It distinguishes those observations from live verification and identifies the exact remaining evidence needed before claiming success.

**Will it start an architecture refactor after fixing the bug?**

Only if the requested fix needs it. Otherwise architectural follow-ups remain separate from completing the supported correction.

## It's working if

- The evidence matches the user's symptom rather than a nearby failure.
- Each probe helps distinguish a cause or verify the correction.
- Temporary instrumentation is removed and unavailable verification is disclosed.

## Where it fits

A standalone diagnostic workflow. Use [tdd](https://aihero.dev/skills-tdd) for focused test-first implementation and [ask-matt](https://aihero.dev/skills-ask-matt) for the wider map.
