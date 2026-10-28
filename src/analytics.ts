import { z } from "zod";
import { ServiceClientSchema, type ServiceClient } from "./common.js";

/**
 * Product Analytics Schemas
 *
 * Canonical schemas for cross-app product analytics across Slop Machine, Pixerate, and Uchiage.
 * Enforces GA4 limits and strict PII guards.
 */

// --- PII & GA4 Validation Helpers ---

const PII_KEYS = new Set([
  "email",
  "name",
  "phone",
  "first_name",
  "last_name",
  "full_name",
  "phone_number",
  "user_name",
  "username",
  "telephone",
  "mobile"
]);

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;

function isPiiKey(key: string): boolean {
  const lower = key.toLowerCase();
  if (lower.includes("email") || lower.includes("phone")) {
    return true;
  }
  return PII_KEYS.has(lower);
}

function isUnhashedIdKey(key: string): boolean {
  const lower = key.toLowerCase();
  return lower === "team_id" || lower === "org_id";
}

function validateParamValue(
  value: unknown,
  path: (string | number)[],
  ctx: z.RefinementCtx
): void {
  if (typeof value === "string") {
    if (value.length > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Parameter value at '${path.join(".")}' exceeds 100 characters (${value.length} > 100)`,
        path
      });
    }
    if (EMAIL_REGEX.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `PII detected: string value at '${path.join(".")}' looks like an email address`,
        path
      });
    }
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => {
      validateParamValue(item, [...path, index], ctx);
    });
  } else if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    for (const [k, v] of entries) {
      if (k.length > 40) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Parameter name '${k}' at '${path.join(".")}' exceeds 40 characters`,
          path: [...path, k]
        });
      }
      if (isUnhashedIdKey(k)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `IDs for teams and orgs must be hashed: use '${k}_hash' instead of '${k}'`,
          path: [...path, k]
        });
      } else if (isPiiKey(k)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `PII key '${k}' is not allowed`,
          path: [...path, k]
        });
      }
      validateParamValue(v, [...path, k], ctx);
    }
  }
}

function validateEventParams(
  params: Record<string, unknown> | undefined,
  ctx: z.RefinementCtx
): void {
  if (!params) return;

  const entries = Object.entries(params);
  if (entries.length > 25) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Event cannot have more than 25 parameters (got ${entries.length})`,
      path: ["params"]
    });
  }

  for (const [key, value] of entries) {
    if (key.length > 40) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Parameter name '${key}' exceeds 40 characters`,
        path: ["params", key]
      });
    }

    if (isUnhashedIdKey(key)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `IDs for teams and orgs must be hashed: use '${key}_hash' instead of '${key}'`,
        path: ["params", key]
      });
    } else if (isPiiKey(key)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `PII key '${key}' is not allowed`,
        path: ["params", key]
      });
    }

    validateParamValue(value, ["params", key], ctx);
  }
}

function validateUserProperties(
  props: Record<string, unknown>,
  ctx: z.RefinementCtx
): void {
  const entries = Object.entries(props);

  for (const [key, value] of entries) {
    if (key.length > 24) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `User property name '${key}' exceeds 24 characters`,
        path: [key]
      });
    }

    if (isUnhashedIdKey(key)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `IDs for teams and orgs must be hashed: use '${key}_hash' instead of '${key}'`,
        path: [key]
      });
    } else if (isPiiKey(key)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `PII key '${key}' is not allowed`,
        path: [key]
      });
    }

    if (typeof value === "string") {
      if (value.length > 36) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `User property '${key}' value exceeds 36 characters (${value.length} > 36)`,
          path: [key]
        });
      }
      if (EMAIL_REGEX.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `PII detected: string value at '${key}' looks like an email address`,
          path: [key]
        });
      }
    }
  }
}

// --- Item Types ---

export const AnalyticsItemTypeSchema = z.enum([
  // Slop Machine core objects
  "silo",
  "bucket",
  "pipeline",
  "template",
  // Pixerate core objects
  "exploration",
  "composition",
  "fusion",
  "edit",
  "board",
  "pitch",
  "deliverable",
  // Uchiage core objects
  "organization",
  "project",
  "task",
  "agent",
  "workflow"
]);
export type AnalyticsItemType = z.infer<typeof AnalyticsItemTypeSchema>;

// --- Media Types ---

export const AnalyticsMediaTypeSchema = z.enum(["image", "video", "text"]);
export type AnalyticsMediaType = z.infer<typeof AnalyticsMediaTypeSchema>;

// --- Ecommerce Item ---

export const AnalyticsEcommerceItemSchema = z.object({
  item_id: z.string().max(100),
  item_name: z.string().max(100).optional(),
  item_category: z.string().max(100).optional(),
  price: z.number().optional(),
  quantity: z.number().int().optional()
}).passthrough();
export type AnalyticsEcommerceItem = z.infer<typeof AnalyticsEcommerceItemSchema>;

// --- Event Names ---

export const AnalyticsEventNameSchema = z.enum([
  "sign_up",
  "login",
  "join_waitlist",
  "waitlist_approved",
  "onboarded",
  "tutorial_begin",
  "onboarding_step",
  "onboarding_milestone",
  "tutorial_complete",
  "create_item",
  "generate",
  "run_agent",
  "save_version",
  "publish",
  "share",
  "invite_member",
  "join_team",
  "submit_feedback",
  "begin_checkout",
  "purchase",
  "page_view"
]);
export type AnalyticsEventName = z.infer<typeof AnalyticsEventNameSchema>;

// --- Individual Event Schemas ---

export const SignUpEventSchema = z.object({
  name: z.literal("sign_up"),
  params: z.object({
    method: z.string().max(100).optional()
  }).passthrough().optional()
});
export type SignUpEvent = z.infer<typeof SignUpEventSchema>;

export const LoginEventSchema = z.object({
  name: z.literal("login"),
  params: z.object({
    method: z.string().max(100).optional()
  }).passthrough().optional()
});
export type LoginEvent = z.infer<typeof LoginEventSchema>;

export const JoinWaitlistEventSchema = z.object({
  name: z.literal("join_waitlist"),
  params: z.object({
    source: z.string().max(100).optional(),
    role_preference: z.string().max(100).optional()
  }).passthrough().optional()
});
export type JoinWaitlistEvent = z.infer<typeof JoinWaitlistEventSchema>;

export const WaitlistApprovedEventSchema = z.object({
  name: z.literal("waitlist_approved"),
  params: z.object({
    role_preference: z.string().max(100).optional()
  }).passthrough().optional()
});
export type WaitlistApprovedEvent = z.infer<typeof WaitlistApprovedEventSchema>;

export const OnboardedEventSchema = z.object({
  name: z.literal("onboarded"),
  params: z.object({
    role_preference: z.string().max(100).optional()
  }).passthrough().optional()
});
export type OnboardedEvent = z.infer<typeof OnboardedEventSchema>;

export const TutorialBeginEventSchema = z.object({
  name: z.literal("tutorial_begin"),
  params: z.object({
    tutorial_id: z.string().max(100).optional()
  }).passthrough().optional()
});
export type TutorialBeginEvent = z.infer<typeof TutorialBeginEventSchema>;

export const OnboardingStepEventSchema = z.object({
  name: z.literal("onboarding_step"),
  params: z.object({
    step: z.string().max(100),
    skipped: z.boolean().optional()
  }).passthrough()
});
export type OnboardingStepEvent = z.infer<typeof OnboardingStepEventSchema>;

export const OnboardingMilestoneEventSchema = z.object({
  name: z.literal("onboarding_milestone"),
  params: z.object({
    milestone: z.string().max(100)
  }).passthrough()
});
export type OnboardingMilestoneEvent = z.infer<typeof OnboardingMilestoneEventSchema>;

export const TutorialCompleteEventSchema = z.object({
  name: z.literal("tutorial_complete"),
  params: z.object({
    tutorial_id: z.string().max(100).optional()
  }).passthrough().optional()
});
export type TutorialCompleteEvent = z.infer<typeof TutorialCompleteEventSchema>;

export const CreateItemEventSchema = z.object({
  name: z.literal("create_item"),
  params: z.object({
    item_type: AnalyticsItemTypeSchema
  }).passthrough()
});
export type CreateItemEvent = z.infer<typeof CreateItemEventSchema>;

export const GenerateEventSchema = z.object({
  name: z.literal("generate"),
  params: z.object({
    model: z.string().max(100),
    media_type: AnalyticsMediaTypeSchema,
    success: z.boolean(),
    is_first: z.boolean().optional()
  }).passthrough()
});
export type GenerateEvent = z.infer<typeof GenerateEventSchema>;

export const RunAgentEventSchema = z.object({
  name: z.literal("run_agent"),
  params: z.object({
    agent: z.string().max(100).optional(),
    workflow: z.string().max(100).optional(),
    success: z.boolean().optional()
  }).passthrough().optional()
});
export type RunAgentEvent = z.infer<typeof RunAgentEventSchema>;

export const SaveVersionEventSchema = z.object({
  name: z.literal("save_version"),
  params: z.object({
    item_type: AnalyticsItemTypeSchema.optional(),
    version_number: z.number().int().optional()
  }).passthrough().optional()
});
export type SaveVersionEvent = z.infer<typeof SaveVersionEventSchema>;

export const PublishEventSchema = z.object({
  name: z.literal("publish"),
  params: z.object({
    item_type: AnalyticsItemTypeSchema.optional(),
    method: z.string().max(100).optional()
  }).passthrough().optional()
});
export type PublishEvent = z.infer<typeof PublishEventSchema>;

export const ShareEventSchema = z.object({
  name: z.literal("share"),
  params: z.object({
    item_type: AnalyticsItemTypeSchema.optional(),
    method: z.string().max(100).optional()
  }).passthrough().optional()
});
export type ShareEvent = z.infer<typeof ShareEventSchema>;

export const InviteMemberEventSchema = z.object({
  name: z.literal("invite_member"),
  params: z.object({
    role: z.string().max(100).optional(),
    team_id_hash: z.string().max(36).optional(),
    org_id_hash: z.string().max(36).optional()
  }).passthrough().optional()
});
export type InviteMemberEvent = z.infer<typeof InviteMemberEventSchema>;

export const JoinTeamEventSchema = z.object({
  name: z.literal("join_team"),
  params: z.object({
    role: z.string().max(100).optional(),
    team_id_hash: z.string().max(36).optional(),
    org_id_hash: z.string().max(36).optional()
  }).passthrough().optional()
});
export type JoinTeamEvent = z.infer<typeof JoinTeamEventSchema>;

export const SubmitFeedbackEventSchema = z.object({
  name: z.literal("submit_feedback"),
  params: z.object({
    category: z.string().max(100).optional(),
    rating: z.number().optional()
  }).passthrough().optional()
});
export type SubmitFeedbackEvent = z.infer<typeof SubmitFeedbackEventSchema>;

export const BeginCheckoutEventSchema = z.object({
  name: z.literal("begin_checkout"),
  params: z.object({
    value: z.number().optional(),
    currency: z.string().max(100).optional(),
    items: z.array(AnalyticsEcommerceItemSchema).optional()
  }).passthrough().optional()
});
export type BeginCheckoutEvent = z.infer<typeof BeginCheckoutEventSchema>;

export const PurchaseEventSchema = z.object({
  name: z.literal("purchase"),
  params: z.object({
    value: z.number(),
    currency: z.string().max(100),
    transaction_id: z.string().max(100),
    items: z.array(AnalyticsEcommerceItemSchema).optional()
  }).passthrough()
});
export type PurchaseEvent = z.infer<typeof PurchaseEventSchema>;

export const PageViewEventSchema = z.object({
  name: z.literal("page_view"),
  params: z.object({
    page_location: z.string().max(100).optional(),
    page_title: z.string().max(100).optional(),
    page_path: z.string().max(100).optional()
  }).passthrough().optional()
});
export type PageViewEvent = z.infer<typeof PageViewEventSchema>;

// --- Discriminated Union of All Events ---

export const BaseAnalyticsEventSchema = z.discriminatedUnion("name", [
  SignUpEventSchema,
  LoginEventSchema,
  JoinWaitlistEventSchema,
  WaitlistApprovedEventSchema,
  OnboardedEventSchema,
  TutorialBeginEventSchema,
  OnboardingStepEventSchema,
  OnboardingMilestoneEventSchema,
  TutorialCompleteEventSchema,
  CreateItemEventSchema,
  GenerateEventSchema,
  RunAgentEventSchema,
  SaveVersionEventSchema,
  PublishEventSchema,
  ShareEventSchema,
  InviteMemberEventSchema,
  JoinTeamEventSchema,
  SubmitFeedbackEventSchema,
  BeginCheckoutEventSchema,
  PurchaseEventSchema,
  PageViewEventSchema
]);

export const AnalyticsEventSchema = BaseAnalyticsEventSchema.superRefine((event, ctx) => {
  validateEventParams(event.params, ctx);
});

export type AnalyticsEvent = z.infer<typeof BaseAnalyticsEventSchema>;

// --- User Properties ---

export const BaseAnalyticsUserPropertiesSchema = z.object({
  app: ServiceClientSchema,
  plan: z.string().max(36).optional(),
  role_preference: z.string().max(36).optional(),
  waitlist_status: z.string().max(36).optional(),
  team_id_hash: z.string().max(36).optional(),
  org_id_hash: z.string().max(36).optional()
}).passthrough();

export const AnalyticsUserPropertiesSchema = BaseAnalyticsUserPropertiesSchema.superRefine((props, ctx) => {
  validateUserProperties(props, ctx);
});

export type AnalyticsUserProperties = z.infer<typeof BaseAnalyticsUserPropertiesSchema>;
