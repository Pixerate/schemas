---
"@pixerate/schemas": minor
---

Add text lead v2 for Swash, with jazz on the server (Pixerate/schemas#87): `JazzTextLeadV2Request` (observations of what changed since the last turn, per-rule `JazzTextRuleStats`, batched feedback and a `tier`), `JazzTextLeadV2Response` (suggested `JazzTextEdit`s with an id, `kind`, UTF-16 range, replacement or structural action, confidence, `why` and `assist`/`suggest` mode, plus `genre` and the server-only `holdBack`, `why` and `fuelBalance`) and the free feedback call `JazzTextFeedbackRequest` / `JazzTextFeedbackResponse` (`POST /api/agent/text-feedback`). `JAZZ_TEXT_ON_DEVICE_EDIT_KINDS` and `JAZZ_TEXT_SERVER_ONLY_FIELDS` mark what an on-device answer fills in. Also generated into Swift. The v1 `JazzTextLeadRequest` / `JazzTextLeadResponse` are deprecated but unchanged.
