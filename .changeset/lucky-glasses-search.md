---
---

Fix release tagging: commit the version bump before `changeset publish` so git tags point at the release commit, and fail the release job if pushing the commit or tags fails. CI-only; no schema changes.
