## What it does

Implement a requested behavior test-first through its real caller. Tests protect observable failures without creating architecture only for testing.

## When to reach for it

Type `/tdd` when you want a requested test-first implementation. It may also be selected when the requested task fits.

## Common questions

**Are internal mocks and multiple assertions forbidden?**

No. Judge whether the test exercises the actual contract. Several assertions or a focused double can protect a coherent behavior; preserve composition coverage where needed.

## It's working if

A meaningful failing test passes after the smallest useful implementation.

## Where it fits

Use it for test-first work; the repository owns release and verification requirements. For the available skills, see [ask-matt](https://aihero.dev/skills-ask-matt).
