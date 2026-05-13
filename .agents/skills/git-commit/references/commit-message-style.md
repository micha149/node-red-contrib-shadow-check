## Commit message style

Use this reference when writing or reviewing a commit message for `git-commit`.

## Format

- Subject: imperative mood, uppercase start, no trailing period, ideally 80 characters or fewer
- Body: optional; include it only when it adds meaningful rationale or explains a non-obvious decision
- Body focus: explain why the change exists, not a checklist of what changed
- Body width: wrap lines at 100 characters or fewer
- Trailer format: `Issue: <ticket>` on its own line
- Tickets: include only ticket IDs that are known from the conversation or repository context

## Do

- Keep the subject short, specific, and scoped to the actual change
- Use concrete project language instead of generic phrasing
- Mention the motivation when it helps a future reader understand the commit
- Omit the body when the subject already says enough and no extra rationale is needed
- Re-wrap the final message before committing so the body actually respects the line limit
- Draft complete prose, not template fragments, when proposing commit messages to the user

## Do not

- Do not use vague subjects such as `Update files` or `Fix stuff`
- Do not restate the diff line by line in the body
- Do not add a ticket trailer for a guessed or invented ID
- Do not use a long bullet checklist as the commit body
- Do not add Conventional Commit prefixes unless the project explicitly expects them
- Do not leave body paragraphs unwrapped just because they were drafted in prose first
- Do not leave placeholders such as `<subject>`, `<bug area>`, or `TBD` in a proposed final message
