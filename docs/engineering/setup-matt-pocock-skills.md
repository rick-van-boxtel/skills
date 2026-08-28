## What it does

`setup-matt-pocock-skills` answers three questions about one repo: where issues live, how work types and readiness states map onto that tracker, and where the domain docs sit. It records the answers under `docs/agents/`.

Those files are the only thing that varies between repos. The skills read `docs/agents/issue-tracker.md` and `docs/agents/issue-workflow.json` at run time. The workflow file carries four work-type roles and six readiness roles, so changing tracker vocabulary never requires editing a skill.

It is a prompt-driven skill, not a deterministic script. It reads your `git remote`, your existing `CLAUDE.md`, your existing `CONTEXT.md`, proposes what it found, and waits for you to confirm before writing anything.

## When to reach for it

You invoke this by typing `/setup-matt-pocock-skills`; the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) won't reach for it on its own. It is deliberately marked non-invokable, so no other skill can fire it for you.

Reach for it once per repo, before the first use of any other engineering skill. If [triage](https://aihero.dev/skills-triage), [to-spec](https://aihero.dev/skills-to-spec), [to-tickets](https://aihero.dev/skills-to-tickets) or [wayfinder](https://aihero.dev/skills-wayfinder) start guessing where your issues go, or apply labels your tracker doesn't have, they have not been set up here yet. A repo already halfway through a project is a fine place to run it; the skill reads what is already there and no earlier work is wasted.

## Prerequisites

It writes into the repo you run it in:

| It writes | Where |
| --- | --- |
| `issue-tracker.md` | `docs/agents/` |
| `domain.md` | `docs/agents/` |
| `issue-workflow.json` | `docs/agents/`, only when the `triage` skill is installed |
| An `## Agent skills` block | whichever of `CLAUDE.md` / `AGENTS.md` already exists |

All of it is committed markdown. There is no user-level or global mode: the config lives in the repo, so every repo gets its own copy.

## The three decisions

It leads each section with the recommended answer, and skips whatever exploration already settled. Most runs are two confirmations and done.

| Decision | What it proposes | When it actually asks |
| --- | --- | --- |
| **Issue tracker** | the tracker named by repo instructions or the user, otherwise the strongest evidence | always: this is the one real choice |
| **Issue workflow** | four work types plus six readiness states, mapped onto tracker labels and statuses | only if the `triage` skill is installed |
| **Domain docs** | single-context: one `CONTEXT.md` plus `docs/adr/` at the root | only if it spots monorepo signals, and then it offers a multi-context `CONTEXT-MAP.md` |

The tracker options:

| Option | Where issues live | Needs |
| --- | --- | --- |
| **GitHub** | the repo's GitHub Issues | the `gh` CLI |
| **GitLab** | the repo's GitLab Issues | the `glab` CLI |
| **Linear** | Linear issues, projects, labels, statuses, and relations | a connected Linear integration |
| **Local markdown** | files under `.scratch/<feature>/` in this repo | nothing: no remote at all |
| **Other** | wherever you say | one paragraph from you describing the workflow |

The first four ship as templates in the skill and work out of the box. Linear may track issues while GitHub hosts code and pull requests; setup treats those as separate responsibilities. Local markdown is a first-class option, not a fallback.

"Other" is not a stub either. It is the reason Jira, Azure DevOps and Beads work: you describe the workflow, the skill records your prose in `docs/agents/issue-tracker.md`, and the downstream skills follow it.

## Common questions

**Do I have to use GitHub?**

No. GitHub, GitLab, Linear, and local markdown under `.scratch/` all ship as ready-made templates, and anything else works through the "other" path. A GitHub remote does not force GitHub Issues when the repo uses Linear for planning.

**Do I need to re-run it after updating the skills?**

Asked directly after v1.1, Matt said yes. The skill's own closing message is softer: it tells you re-running is only needed to switch trackers or start over. Both are defensible and the reason for the gap is real: the seed templates change between versions, so a `docs/agents/issue-tracker.md` written by an older release can go stale against the skills now reading it. If a downstream skill starts doing something the docs describe differently, re-running is the cheap fix.

**It wrote to `CLAUDE.md`, but I'm on Codex.**

Known gap, still open. The file-selection rule is "edit `CLAUDE.md` if it exists, else `AGENTS.md`": it checks which file exists, not which [harness](https://www.aihero.dev/ai-coding-dictionary/harness) is running. A repo with a `CLAUDE.md` left over from Claude Code will get its `## Agent skills` block somewhere Codex never reads. Two workarounds are in circulation: move the block to `AGENTS.md` by hand, or keep `AGENTS.md` canonical and make `CLAUDE.md` a one-line pointer at it. If neither file exists, the skill asks you which to create rather than picking, which has confused people who expected it to just decide.

**What happens when configured labels or statuses do not exist?**

Setup lists the live tracker vocabulary and compares it with every label and status in `issue-workflow.json`. It previews missing labels and asks before creating the exact names. Missing statuses are never silently substituted; if the integration cannot create them safely, setup asks you to add them or change the mapping.

**Can I configure the other skills' behaviour here ([grilling](https://www.aihero.dev/ai-coding-dictionary/grilling) cadence, question format, tone)?**

No. It configures three things: tracker, issue workflow, and doc layout. Preferences such as tone belong in your repository instructions, which every skill already reads.

**Can I keep the config in `~/.claude` instead of committing it to every repo?**

Not today. There is an open request for exactly this from someone running the skills across many repos, and no user-level mode exists. Every repo carries its own `docs/agents/`.

**Isn't it strange to have a skill that configures the other skills?**

One long-standing complaint says yes, in these words: *"having a skill to set up the other skill does not feel right to me: that means the LLM is configuring its own skills."* The trade is real and acknowledged: the alternative to a setup step is duplicating tracker instructions into every skill that touches issues. The output is inspectable, editable markdown, which is the mitigation: you can read every file it wrote and change it by hand, and day-to-day tweaks are exactly that, not another run.

## It's working if

- `docs/agents/issue-tracker.md` and `docs/agents/domain.md` exist, plus a validated `issue-workflow.json` if `triage` is installed.
- An `## Agent skills` section appears in the instruction file your harness actually reads, with a one-line summary pointing at each of those files.
- The configured tracker matches where you really plan work, even when code is hosted elsewhere.
- Every configured label and status was checked against the live tracker before setup completed.
- Afterwards, `/to-tickets` publishes without asking you where issues live, and `/triage` resolves roles rather than inventing labels.
- Nothing in the skill files themselves changed. If setup edited a `SKILL.md`, something went wrong.

## Where it fits

`setup-matt-pocock-skills` is the **run-once setup** for the engineering flow, the precondition everything else assumes rather than a step in the chain. Its neighbours are its readers: [triage](https://aihero.dev/skills-triage), which resolves the work-type and readiness roles written here; [to-spec](https://aihero.dev/skills-to-spec) and [to-tickets](https://aihero.dev/skills-to-tickets), which publish into the tracker named here; and [wayfinder](https://aihero.dev/skills-wayfinder), which reads the tracker file to know how maps and child [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) are stored. For which skill to reach for next, [ask-matt](https://aihero.dev/skills-ask-matt) routes the whole set.
