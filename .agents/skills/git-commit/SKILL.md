---
name: git-commit
description: Use this skill for anything related to crafting commits: writing or polishing commit messages, splitting a dirty worktree into clean commits, deciding what to stage together, grouping or separating changes into reviewable commit units, sanity-checking a proposed commit split, or turning staged/unstaged changes into focused commits. Trigger even when the user says "don't commit yet" -- planning commit structure and drafting messages counts. Key signals: "commit message", "commit", "stage", "worktree", "what belongs together", "backport", "cherry-pick", combined with intent to organize or describe changes. Do NOT trigger for changelogs, release notes, PR titles, branch names, general git Q&A, merge conflicts, or history rewriting (squash, rebase, amend) unless the request is specifically about structuring or wording new commits.
compatibility: opencode
---

## What I do

- Turn the user's commit intent into one or more focused, reviewable commits.
- Keep staging decisions aligned with the requested scope.
- Prefer commit boundaries that are easy to cherry-pick independently later.
- Write commit messages that explain the change clearly and, when useful, the reason behind it.

## When to use me

Use this for commit-related work, including:

- Preparing a commit from a dirty working tree
- Splitting mixed changes into separate commits
- Deciding which files or hunks belong together
- Writing or revising a commit message without creating the commit yet

## Workflow

1. Infer the intended commit scope from the conversation.
2. Separate relevant changes from unrelated ones.
3. Decide whether the work belongs in one commit or several.
4. If more than one coherent change exists, propose an explicit commit structure instead of collapsing them together.
5. Draft the planned commit message for each proposed commit.
6. Ask the user to confirm the proposed commit structure before creating any commit.
7. Read the message style reference before finalizing the commit message text.
8. Create commits only after the user has asked for a commit and approved the structure.

Read `references/commit-message-style.md` when drafting the message.
Read `references/commit-examples.md` when you want examples that match this skill's style.

## Scope policy

- Infer intended scope from conversation context first.
- Include only files relevant to that scope.
- Ignore unrelated files by default.
- If relevance is unclear, treat the change as unrelated unless the user explicitly includes it.

## Commit grouping policy

- One commit equals one coherent purpose.
- Separate refactor or preparation work from behavior changes.
- Separate rename, cleanup, formatting, and mechanical refactors from feature or bug-fix commits when they can stand on their own.
- Avoid mixing formatting-only changes with functional changes.
- Prefer splits that remain useful when cherry-picking onto another branch.
- If one part is likely to be reused, backported, or reverted independently, give it its own commit.
- If a refactor could reasonably be reviewed on its own, propose it as a separate commit.
- Prefer more, smaller commits when uncertainty remains.

## Approval policy

- Always show the proposed commit structure before creating commits.
- Treat approval by intent, not only exact wording, but only after the structure has been shown.
- Accept clear confirmations such as `approve`, `go ahead`, `looks good`, `ja`, or `passt`.
- If the structure has not been shown yet, stay in planning mode even if the user already said "commit it" earlier.
- If approval is ambiguous, stay in planning mode and ask one focused clarifying question.
- If the user asks only for a commit message, do not commit anything.

## Safety

- Never invent tickets, scope, or unstated intent.
- Never use Conventional Commit prefixes unless the project explicitly requires them.
- Never commit mixed concerns just to reduce the number of commits.
- Never skip the structure-confirmation step when creating one or more commits from a working tree.
- Stop and ask for guidance if clean hunk isolation is not possible.

## Output expectations

- When planning commits, present a short commit plan first: what each commit is for, what it includes, and the draft message.
- Mention cherry-pick value when it helps justify why a change should live in its own commit.
- When drafting a commit message with a body, wrap body lines to 100 characters or fewer.
- Draft complete commit messages in the plan; avoid placeholder text such as `<bug area>` or `<subject>`.
- If the exact wording is still uncertain, write the most specific truthful message you can from the known diff instead of leaving a template marker.
- Treat line wrapping, commit separation, and approval flow as first-class requirements rather than nice-to-have style details.
