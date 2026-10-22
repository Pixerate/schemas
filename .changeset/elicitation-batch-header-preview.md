---
"@pixerate/schemas": minor
---

Structured elicitation (`@pixerate/schemas/genui`):

- **Stricter validation:** `ElicitationRequestSchema` now requires 2–4 options for `single_select`, `multi_select` and `rank_priorities` questions (`ELICITATION_MIN_OPTIONS` / `ELICITATION_MAX_OPTIONS`). Option ids must also be unique within a question. `free_form` questions may still have no options. `@pixerate/genui-core` already enforces both rules in `validateElicitationRequest`, but a request with 0–1 or 5+ choice options, or with duplicate option ids, that used to parse will now be rejected. `ElicitationRequestSchema` is now a refined schema (`ZodEffects`), so `.shape` / `.extend()` are no longer available on it.
- New optional `header` on requests: a short chip label, at most 12 characters (`ELICITATION_HEADER_MAX_LENGTH`).
- New optional `preview` on options: content shown while the option is focused, such as a code snippet or a mockup. It is only valid on `single_select` questions. `ElicitationOptionSchema` is now `FormChoiceSchema` extended with `preview`; `FormChoiceSchema` itself is unchanged.
- New `ElicitationBatchSchema` (1–4 questions with unique ids, `ELICITATION_MAX_BATCH_QUESTIONS`) and `ElicitationBatchResponseSchema` (1–4 responses with unique `requestId`s). The single-question schemas keep working as before.
- Recommendations still use the existing `isRecommended` flag on options.

`ElicitationResponseSchema` is unchanged.
