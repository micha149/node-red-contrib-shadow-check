## Commit message examples

Use these examples as style guidance, not rigid templates.

**Example 1**

Subject: Improve slide review guidance for migrated chapters

Body:
Make the review step check include chains and referenced assets so migrated topics are less
likely to render correctly in isolation but fail in the full deck.

**Example 2**

Subject: Split trainer profile data from slide layout updates

Body:
Keep the content refresh separate from the presentation changes so the trainer data can be
reviewed and reverted independently.

**Example 3**

Subject: Add Git commit skill for isolated staging and message drafting

Body:
Bring commit planning and message rules into a single skill so commit-related prompts trigger one
clear workflow instead of two overlapping ones.

**Example 4**

Subject: Clarify ticket trailer usage in commit message reference

Body:
Avoid guessed issue references by limiting trailers to tickets that are explicitly known from the
task context.

**Example 5**

Commit plan:
1. Extract helper rename into its own refactor commit
2. Keep behavior changes in a follow-up commit

Ask first:
I would split this into two commits so the refactor stays reviewable on its
own. Does this structure look right before I commit?

Commit 1 subject: Rename commit helper to match staging workflow

Commit 1 body:
Make the mechanical rename standalone so later behavior changes stay easy to
review and revert.

Commit 2 subject: Enforce structure approval before creating commits

Commit 2 body:
Prevent direct commits after analysis so users can confirm the proposed split
before anything is written to Git history.

**Example 6**

Commit plan:
1. Move reusable lint fix into its own commit
2. Keep feature work separate

Ask first:
I would separate the lint cleanup from the feature change so the cleanup can
be cherry-picked or reverted on its own. Does that split work for you?

Commit 1 subject: Isolate shared lint cleanup from feature changes

Commit 1 body:
Keep the mechanical cleanup separate so other branches can cherry-pick it
without bringing along unrelated behavior changes.

Commit 2 subject: Add approval gate before creating planned commits
