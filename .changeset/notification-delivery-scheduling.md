---
"@pixerate/schemas": minor
---

Add optional scheduling fields to `NotificationDeliveryRecordSchema` (`recipientId`, `attempts`, `lastAttemptAt`, `nextAttemptAt`, `deferredReason`) and a new `NotificationDeferredReasonSchema` (`retry` | `quiet_hours` | `digest`). These let `@pixerate/notifications` queue retries, hold emails during quiet hours, and batch email digests. All fields are optional, so existing records stay valid.
