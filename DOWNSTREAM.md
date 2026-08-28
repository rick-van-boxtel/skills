# Downstream maintenance

This repository is the maintained Sorare workflow fork of [mattpocock/skills](https://github.com/mattpocock/skills). The `upstream` Git remote must point there; `origin` points at `rick-van-boxtel/skills`.

## Synchronize upstream

1. Fetch `upstream/main` and `origin/main`.
2. Create a `codex/upstream-sync-YYYY-MM-DD` branch from the latest `origin/main`.
3. Merge `upstream/main` without discarding downstream Linear workflow changes.
4. Resolve conflicts by preserving upstream behavior and the contracts in `tests/issue-workflow.test.mjs`.
5. Run `npm ci`, `npm test`, `npm run check-plugin-version`, and `npm run validate:issue-workflow -- <fixture-or-repository-config>`.
6. Review the diff for accidental `enhancement` dependencies or GitHub Issues workflow assumptions in the configured path.
7. Push the branch, review it, and merge it into the fork's `main`.
8. Refresh installed skills from the new fork commit and rerun the installed-copy smoke check.

The fork was first synchronized from upstream commit `6654f6b` on 2026-08-28. The fetch, ancestry check, and workflow contract passed before downstream customization began.
