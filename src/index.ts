import { z } from "zod";
import {
  AspectRatioSchema,
  VideoAspectRatioSchema,
  VideoResolutionSchema,
  VideoFrameImageSchema,
  VideoAttachmentSchema,
  ServiceClientSchema,
  type ServiceClient
} from "./common.js";
import { TextOverlaySchema, WatermarkSchema } from "./media.js";

// --- Fidelity ---
export const FidelitySchema = z.enum(["outline", "blocked", "shaded", "polished"]);
export type Fidelity = z.infer<typeof FidelitySchema>;

// --- Aspect Ratios, Resolutions & Media Inputs (see ./common.ts) ---
export * from "./common.js";

// --- Video Generation & Social Clip Schemas ---
export const VideoGenerationSchema = z.object({
  prompt: z.string(),
  aspectRatio: VideoAspectRatioSchema.optional(),
  durationSeconds: z.number().int().optional(),
  generateAudio: z.boolean().optional(),
  modelName: z.string().optional(),
  lowCost: z.boolean().optional(),
  resolution: VideoResolutionSchema.optional(),
  fps: z.number().optional(),
  isMultimedia: z.boolean().optional(),
  multimedia: z.boolean().optional(),
  firstFrame: VideoFrameImageSchema.optional(),
  lastFrame: VideoFrameImageSchema.optional(),
  image: VideoAttachmentSchema.optional(),
  images: z.array(VideoAttachmentSchema).optional(),
  attachments: z.array(VideoAttachmentSchema).optional()
});
export type VideoGenerationPayload = z.infer<typeof VideoGenerationSchema>;

// --- Video Upscaling ---
export const VideoUpscaleSchema = z.object({
  video: z.string().optional(),
  mimeType: z.string().optional(),
  prompt: z.string().optional(),
  targetResolution: z.enum(["1080p", "4k", "1080P", "4K"]).default("1080p"),
  modelName: z.string().optional()
});
export type VideoUpscalePayload = z.infer<typeof VideoUpscaleSchema>;

export const SocialVideoGenerationSchema = z.object({
  prompt: z.string(),
  audioPrompt: z.string().optional(),
  aspectRatio: VideoAspectRatioSchema.optional(),
  durationSeconds: z.number().int().optional(),
  lowCost: z.boolean().optional(),
  hook: z.union([z.string(), TextOverlaySchema]).optional(),
  watermark: z.union([z.string(), WatermarkSchema]).optional()
});
export type SocialVideoGenerationPayload = z.infer<typeof SocialVideoGenerationSchema>;

// --- Media processing: transcoding, compositing, audio, subtitles, probing, documents (see ./media.ts) ---
export * from "./media.js";

// --- Image Generation ---
export const ImageGenerationSchema = z.object({
  prompt: z.string(),
  aspectRatio: AspectRatioSchema.optional(),
  seed: z.number().int().optional(),
  fidelity: FidelitySchema.optional()
});
export type ImageGenerationPayload = z.infer<typeof ImageGenerationSchema>;

// --- Image Transformation & Compositing ---
export const ImageTransformationSchema = z.object({
  prompt: z.string(),
  changes: z.string(),
  aspectRatio: AspectRatioSchema.optional(),
  seed: z.number().int().optional()
});
export type ImageTransformationPayload = z.infer<typeof ImageTransformationSchema>;

// --- Video Analysis ---
export const VideoAnalysisCategorySchema = z.enum([
  "Scenes",
  "Environments",
  "Things",
  "Creatures",
  "People",
  "Clothes",
  "Shapes",
  "Effects",
  "Uploads"
]);
export type VideoAnalysisCategory = z.infer<typeof VideoAnalysisCategorySchema>;

export const VideoAnalysisSchema = z.object({
  title: z.string(),
  prompt: z.string(),
  category: VideoAnalysisCategorySchema,
  fidelity: FidelitySchema
});
export type VideoAnalysisPayload = z.infer<typeof VideoAnalysisSchema>;

// --- Video Modification ---
export const VideoModificationSchema = z.object({
  prompt: z.string(),
  changes: z.string().optional(),
  aspectRatio: VideoAspectRatioSchema.optional(),
  durationSeconds: z.number().optional(),
  resolution: VideoResolutionSchema.optional(),
  task: z.enum(["modify", "extend"]).optional(),
  previousInteractionId: z.string().optional(),
  seed: z.number().int().optional()
});
export type VideoModificationPayload = z.infer<typeof VideoModificationSchema>;

// --- Code Generation ---
export const CodeGenerationSchema = z.object({
  prompt: z.string(),
  language: z.string()
});
export type CodeGenerationPayload = z.infer<typeof CodeGenerationSchema>;

// --- Generative UI: components, design tokens, UI generation, forms and ephemeral blocks (see ./genui.ts) ---
export * from "./genui.js";

// --- JSON Generation ---
export const JsonGenerationSchema = z.object({
  prompt: z.string(),
  schema: z.record(z.any()).optional()
});
export type JsonGenerationPayload = z.infer<typeof JsonGenerationSchema>;

// --- Agent runtime: agentic interactions and website crawling & caching (see ./agent.ts) ---
export * from "./agent.js";

// --- Queue / Media Jobs ---
export const QueueJobTypeSchema = z.enum(["text", "image", "video", "analysis", "audio", "agent", "code", "component", "upscale"]);
export type QueueJobType = z.infer<typeof QueueJobTypeSchema>;

export const QueueJobStatusSchema = z.enum(["queued", "processing", "completed", "failed"]);
export type QueueJobStatus = z.infer<typeof QueueJobStatusSchema>;

export const QueueJobSchema = z.object({
  id: z.string(),
  type: QueueJobTypeSchema,
  status: QueueJobStatusSchema,
  client: ServiceClientSchema.optional(),
  payload: z.record(z.any()).optional(),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional()
});
export type QueueJob = z.infer<typeof QueueJobSchema>;

// --- Realtime Collaboration & Synchronization Schemas (see ./realtime.ts) ---
export * from "./realtime.js";

// --- Queue Job Schemas (see ./jobs.ts) ---
export * from "./jobs.js";

// --- Auth & Identity ---
export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  photoURL: z.string().url().optional().nullable(),
  emailVerified: z.boolean().default(false),
  provider: z.string().default("password"),
  createdAt: z.union([z.string(), z.number(), z.date()]).optional(),
  metadata: z.record(z.unknown()).optional().default({})
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

// --- User Profile & Preferences ---
export const UserPreferencesSchema = z.record(z.unknown()).default({});
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  displayName: z.string().default(""),
  photoURL: z.string().url().optional().nullable(),
  email: z.string().email().optional(),
  defaultOrgId: z.string().optional(),
  defaultTeamId: z.string().optional(),
  orgIds: z.array(z.string()).default([]),
  teamIds: z.array(z.string()).default([]),
  preferences: UserPreferencesSchema,
  onboarding: z.object({
    completed: z.boolean().default(false),
    rolePreference: z.string().optional(),
    milestones: z.array(z.string()).default([]),
    skipped: z.boolean().default(false)
  }).optional(),
  createdAt: z.union([z.string(), z.number(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.number(), z.date()]).optional()
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

// --- Roles & Permissions ---
export const TeamRoleSchema = z.enum(["owner", "admin", "editor", "viewer", "member"]);
export type TeamRole = z.infer<typeof TeamRoleSchema>;

// --- Organization ---
export const OrgMemberSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  userId: z.string(),
  email: z.string().email(),
  role: TeamRoleSchema.default("member"),
  status: z.enum(["active", "invited", "suspended"]).default("active"),
  teamIds: z.array(z.string()).default([]),
  joinedAt: z.union([z.string(), z.number(), z.date()]).optional(),
  invitedBy: z.string().optional()
});
export type OrgMember = z.infer<typeof OrgMemberSchema>;

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  ownerId: z.string(),
  memberIds: z.array(z.string()).default([]),
  planId: z.string().default("free"),
  fuelBalance: z.number().default(0),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripeSubscriptionStatus: z.string().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  billingPeriodStart: z.union([z.string(), z.number(), z.date()]).optional(),
  billingPeriodEnd: z.union([z.string(), z.number(), z.date()]).optional(),
  metadata: z.record(z.unknown()).optional().default({}),
  createdAt: z.union([z.string(), z.number(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.number(), z.date()]).optional()
});
export type Organization = z.infer<typeof OrganizationSchema>;

// --- Team & Team Members ---
export const TeamMemberDocSchema = z.object({
  role: TeamRoleSchema.default("member"),
  status: z.enum(["active", "invited", "suspended"]).default("active"),
  email: z.string().email().optional(),
  joinedAt: z.union([z.string(), z.number(), z.date()]).optional(),
  invitedBy: z.string().optional()
});
export type TeamMemberDoc = z.infer<typeof TeamMemberDocSchema>;

export const TeamMemberSchema = TeamMemberDocSchema.extend({
  id: z.string(),
  userId: z.string(),
  teamId: z.string(),
  displayName: z.string().optional(),
  photoURL: z.string().url().optional().nullable()
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const TeamSchema = z.object({
  id: z.string(),
  orgId: z.string().optional(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  ownerId: z.string(),
  memberIds: z.array(z.string()).default([]),
  planId: z.string().optional().default("free"),
  fuelBalance: z.number().optional().default(0),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripeSubscriptionStatus: z.string().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  billingPeriodStart: z.union([z.string(), z.number(), z.date()]).optional(),
  billingPeriodEnd: z.union([z.string(), z.number(), z.date()]).optional(),
  metadata: z.record(z.unknown()).optional().default({}),
  createdAt: z.union([z.string(), z.number(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.number(), z.date()]).optional()
});
export type Team = z.infer<typeof TeamSchema>;

// --- Invites ---
export const InviteTargetTypeSchema = z.enum(["organization", "team"]);
export type InviteTargetType = z.infer<typeof InviteTargetTypeSchema>;

export const InviteStatusSchema = z.enum(["pending", "accepted", "revoked", "expired"]);
export type InviteStatus = z.infer<typeof InviteStatusSchema>;

export const InviteSchema = z.object({
  id: z.string(),
  token: z.string(),
  targetType: InviteTargetTypeSchema,
  targetId: z.string(),
  email: z.string().email().optional().nullable(),
  role: TeamRoleSchema.default("member"),
  invitedBy: z.string(),
  status: InviteStatusSchema.default("pending"),
  maxUses: z.number().int().positive().default(1),
  useCount: z.number().int().nonnegative().default(0),
  acceptedBy: z.array(z.string()).default([]),
  expiresAt: z.union([z.string(), z.number(), z.date()]),
  metadata: z.record(z.unknown()).optional().default({}),
  createdAt: z.union([z.string(), z.number(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.number(), z.date()]).optional()
});
export type Invite = z.infer<typeof InviteSchema>;

// --- Waitlist ---
export const WaitlistStatusSchema = z.enum(["pending", "approved", "rejected", "onboarded"]);
export type WaitlistStatus = z.infer<typeof WaitlistStatusSchema>;

export const WaitlistEntrySchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  status: WaitlistStatusSchema.default("pending"),
  referralCode: z.string().optional(),
  referredBy: z.string().optional(),
  referralCount: z.number().int().nonnegative().default(0),
  position: z.number().int().positive().optional(),
  priorityScore: z.number().default(0),
  metadata: z.record(z.unknown()).optional().default({}),
  approvedAt: z.union([z.string(), z.number(), z.date()]).optional(),
  onboardedAt: z.union([z.string(), z.number(), z.date()]).optional(),
  createdAt: z.union([z.string(), z.number(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.number(), z.date()]).optional()
});
export type WaitlistEntry = z.infer<typeof WaitlistEntrySchema>;

// --- Fuel & Quotas ---
export const FuelTransactionTypeSchema = z.enum([
  "usage",
  "consumption",
  "top_up",
  "topup",
  "proration",
  "adjustment",
  "allocation",
  "bonus",
  "refund"
]);
export type FuelTransactionType = z.infer<typeof FuelTransactionTypeSchema>;

export const FuelTransactionSchema = z.object({
  id: z.string(),
  orgId: z.string().optional(),
  teamId: z.string().optional(),
  targetType: z.enum(["organization", "team", "user"]).optional(),
  targetId: z.string().optional(),
  userId: z.string().optional().nullable(),
  amount: z.number(),
  balanceAfter: z.number().optional(),
  type: FuelTransactionTypeSchema,
  reason: z.string().optional(),
  description: z.string().optional(),
  resultType: z.string().optional(),
  resultId: z.string().optional(),
  client: z.string().optional().default("unknown"),
  metadata: z.record(z.unknown()).optional().default({}),
  createdAt: z.union([z.string(), z.number(), z.date()]).default(() => new Date())
});
export type FuelTransaction = z.infer<typeof FuelTransactionSchema>;

export const FuelPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  monthlyAllocation: z.number().nonnegative().optional(),
  monthlyFuel: z.number().nonnegative().optional(),
  allowRollover: z.boolean().optional().default(false),
  rolloverFuel: z.boolean().optional().default(false),
  maxRolloverFuel: z.number().nonnegative().optional(),
  maxTeamMembers: z.number().int().positive().optional(),
  priceMonthlyCents: z.number().int().nonnegative().optional(),
  features: z.array(z.string()).default([]),
  stripePriceId: z.string().optional(),
  rateLimits: z.record(z.number()).optional()
});
export type FuelPlan = z.infer<typeof FuelPlanSchema>;

export const FuelCostMapSchema = z.record(z.number().nonnegative());
export type FuelCostMap = z.infer<typeof FuelCostMapSchema>;

// --- Notifications & Messaging Schemas ---
export const NotificationChannelSchema = z.enum(["in_app", "email", "web_push", "webhook", "sms"]);
export type NotificationChannel = z.infer<typeof NotificationChannelSchema>;

export const NotificationPrioritySchema = z.enum(["low", "normal", "high", "urgent"]);
export type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;

export const NotificationCategorySchema = z.enum([
  "mention",
  "reply",
  "team_invite",
  "fuel_alert",
  "system",
  "job_completed",
  "job_failed",
  "custom"
]);
export type NotificationCategory = z.infer<typeof NotificationCategorySchema>;

export const NotificationStatusSchema = z.enum(["unread", "read", "archived"]);
export type NotificationStatus = z.infer<typeof NotificationStatusSchema>;

export const NotificationDeliveryStateSchema = z.enum(["pending", "sent", "delivered", "failed", "skipped"]);
export type NotificationDeliveryState = z.infer<typeof NotificationDeliveryStateSchema>;

export const NotificationActorSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  avatarUrl: z.string().optional(),
  type: z.enum(["user", "agent", "system"]).optional().default("user")
});
export type NotificationActor = z.infer<typeof NotificationActorSchema>;

export const NotificationSchema = z.object({
  id: z.string(),
  recipientId: z.string(),
  recipientEmail: z.string().optional(),
  title: z.string(),
  body: z.string(),
  richContent: z.string().optional(),
  category: NotificationCategorySchema.default("system"),
  priority: NotificationPrioritySchema.default("normal"),
  channels: z.array(NotificationChannelSchema).default(["in_app"]),
  status: NotificationStatusSchema.default("unread"),
  actor: NotificationActorSchema.optional(),
  targetType: z.string().optional(),
  targetId: z.string().optional(),
  actionUrl: z.string().optional(),
  metadata: z.record(z.unknown()).optional().default({}),
  createdAt: z.union([z.string(), z.number(), z.date()]).default(() => new Date().toISOString()),
  readAt: z.union([z.string(), z.number(), z.date()]).optional(),
  archivedAt: z.union([z.string(), z.number(), z.date()]).optional()
});
export type Notification = z.infer<typeof NotificationSchema>;

/** Why a `pending` delivery is waiting: a scheduled retry, the recipient's quiet hours, or an email digest. */
export const NotificationDeferredReasonSchema = z.enum(["retry", "quiet_hours", "digest"]);
export type NotificationDeferredReason = z.infer<typeof NotificationDeferredReasonSchema>;

export const NotificationDeliveryRecordSchema = z.object({
  id: z.string(),
  notificationId: z.string(),
  channel: NotificationChannelSchema,
  state: NotificationDeliveryStateSchema,
  error: z.string().optional(),
  sentAt: z.union([z.string(), z.number(), z.date()]).optional(),
  deliveredAt: z.union([z.string(), z.number(), z.date()]).optional(),
  /** Recipient of the notification, so pending deliveries can be grouped (digests) and queried per user. */
  recipientId: z.string().optional(),
  /** Delivery attempts made so far, including the first. */
  attempts: z.number().int().nonnegative().optional(),
  lastAttemptAt: z.union([z.string(), z.number(), z.date()]).optional(),
  /** When a `pending` delivery becomes due (next retry, end of quiet hours, or digest send time). */
  nextAttemptAt: z.union([z.string(), z.number(), z.date()]).optional(),
  deferredReason: NotificationDeferredReasonSchema.optional()
});
export type NotificationDeliveryRecord = z.infer<typeof NotificationDeliveryRecordSchema>;

export const ChannelPreferencesSchema = z.object({
  in_app: z.boolean().default(true),
  email: z.boolean().default(true),
  web_push: z.boolean().default(false),
  webhook: z.boolean().default(false)
});
export type ChannelPreferences = z.infer<typeof ChannelPreferencesSchema>;

export const NotificationPreferencesSchema = z.object({
  userId: z.string(),
  channels: z.record(NotificationCategorySchema, ChannelPreferencesSchema).optional().default({}),
  emailDigest: z.enum(["instant", "hourly", "daily", "weekly", "never"]).default("instant"),
  quietHours: z.object({
    enabled: z.boolean().default(false),
    startHourUtc: z.number().int().min(0).max(23).default(22),
    endHourUtc: z.number().int().min(0).max(23).default(8)
  }).optional(),
  updatedAt: z.union([z.string(), z.number(), z.date()]).default(() => new Date().toISOString())
});
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;

export const EmailAttachmentSchema = z.object({
  filename: z.string(),
  content: z.union([z.string(), z.instanceof(Uint8Array)]),
  contentType: z.string().optional()
});
export type EmailAttachment = z.infer<typeof EmailAttachmentSchema>;

export const EmailMessageSchema = z.object({
  to: z.union([z.string(), z.array(z.string())]),
  from: z.string().optional(),
  cc: z.union([z.string(), z.array(z.string())]).optional(),
  bcc: z.union([z.string(), z.array(z.string())]).optional(),
  subject: z.string(),
  text: z.string().optional(),
  html: z.string().optional(),
  replyTo: z.string().optional(),
  headers: z.record(z.string()).optional(),
  templateId: z.string().optional(),
  templateVariables: z.record(z.unknown()).optional(),
  attachments: z.array(EmailAttachmentSchema).optional()
});
export type EmailMessage = z.infer<typeof EmailMessageSchema>;

export const TaskUnreadSummarySchema = z.object({
  mentions: z.number().nonnegative().default(0),
  replies: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0)
});
export type TaskUnreadSummary = z.infer<typeof TaskUnreadSummarySchema>;

// ============================================================================
// --- Audio Diarization ---
// ============================================================================

export const AudioDiarizationWordSchema = z.object({
  word: z.string(),
  startOffset: z.union([z.string(), z.number()]).optional(),
  endOffset: z.union([z.string(), z.number()]).optional()
});
export type AudioDiarizationWord = z.infer<typeof AudioDiarizationWordSchema>;

export const AudioDiarizationSegmentSchema = z.object({
  speaker: z.string().describe("Speaker identifier (e.g. Speaker 1, Speaker 2)"),
  text: z.string().describe("Spoken segment text"),
  startOffset: z.union([z.string(), z.number()]).optional().describe("Start timestamp of the segment"),
  endOffset: z.union([z.string(), z.number()]).optional().describe("End timestamp of the segment"),
  words: z.array(AudioDiarizationWordSchema).optional().describe("Word-level timestamps for words in this segment")
});
export type AudioDiarizationSegment = z.infer<typeof AudioDiarizationSegmentSchema>;

export const AudioDiarizationSchema = z.object({
  transcript: z.string().describe("Full combined transcript text"),
  speakers: z.array(z.string()).describe("List of unique speaker names or identifiers"),
  segments: z.array(AudioDiarizationSegmentSchema).describe("Ordered chronological segments of speech by speaker with timestamps")
});
export type AudioDiarization = z.infer<typeof AudioDiarizationSchema>;

// ============================================================================
// --- Social Media Publishing (Circus) ---
// ============================================================================

export const SocialPlatformSchema = z.enum(["bluesky", "twitter", "linkedin", "tiktok", "instagram"]);
export type SocialPlatform = z.infer<typeof SocialPlatformSchema>;

export const SocialMediaTypeSchema = z.enum(["image", "video"]);
export type SocialMediaType = z.infer<typeof SocialMediaTypeSchema>;

export const SocialPostPayloadSchema = z.object({
  text: z.string(),
  mediaPath: z.string().optional(),
  mediaType: SocialMediaTypeSchema.optional(),
  tags: z.array(z.string()).optional(),
  /** Accessibility description for the attached media, where the platform supports it. */
  altText: z.string().optional(),
  metadata: z.record(z.unknown()).optional()
});
export type SocialPostPayload = z.infer<typeof SocialPostPayloadSchema>;

/**
 * How a platform measures post length: JS-style characters, user-perceived graphemes
 * (Bluesky), or weighted counting where URLs and some scripts cost more (X/Twitter).
 */
export const SocialTextLengthUnitSchema = z.enum(["characters", "graphemes", "weighted"]);
export type SocialTextLengthUnit = z.infer<typeof SocialTextLengthUnitSchema>;

/** Engagement counters a provider can read back for a published post. */
export const SocialMetricFieldSchema = z.enum([
  "views",
  "impressions",
  "likes",
  "comments",
  "shares",
  "quotes",
  "saves",
  "clicks"
]);
export type SocialMetricField = z.infer<typeof SocialMetricFieldSchema>;

/**
 * Describes which parts of `SocialPostPayload` a provider honours and the limits it enforces,
 * so orchestrators can adapt content per platform instead of discovering limits by failure.
 */
export const SocialProviderCapabilitiesSchema = z.object({
  platform: SocialPlatformSchema,
  text: z.object({
    maxLength: z.number().int().positive(),
    unit: SocialTextLengthUnitSchema
  }),
  media: z.object({
    /** Media types this provider can publish. Empty when the provider is text-only. */
    types: z.array(SocialMediaTypeSchema),
    /** Whether a post must include media (e.g. TikTok, Instagram). */
    required: z.boolean(),
    maxItems: z.number().int().nonnegative(),
    maxImageBytes: z.number().int().positive().optional(),
    maxVideoBytes: z.number().int().positive().optional(),
    altText: z.boolean()
  }),
  tags: z.object({
    supported: z.boolean(),
    maxCount: z.number().int().nonnegative().optional()
  }),
  /** Whether the provider exposes replying to an existing post. */
  replies: z.boolean(),
  /** Whether `PublishResult.url` is populated on success. */
  returnsUrl: z.boolean(),
  /**
   * Metric fields the provider can read back for published posts. Omitted or empty when the
   * provider cannot read metrics. Only these fields are comparable across posts.
   */
  metrics: z.array(SocialMetricFieldSchema).optional()
});
export type SocialProviderCapabilities = z.infer<typeof SocialProviderCapabilitiesSchema>;

export const SocialPublishResultSchema = z.object({
  success: z.boolean(),
  platform: z.string(),
  id: z.string().optional(),
  url: z.string().optional(),
  timestamp: z.string(),
  rawResponse: z.unknown().optional()
});
export type SocialPublishResult = z.infer<typeof SocialPublishResultSchema>;
export const PublishResultSchema = SocialPublishResultSchema;
export type PublishResult = SocialPublishResult;

/**
 * Who can see a published post and whether the platform is distributing it. `under_review` and
 * `restricted` (e.g. TikTok "not eligible for For You") mean the post is live but its reach is held back.
 */
export const SocialPostVisibilitySchema = z.enum([
  "public",
  "friends",
  "private",
  "under_review",
  "restricted",
  "removed",
  "unknown"
]);
export type SocialPostVisibility = z.infer<typeof SocialPostVisibilitySchema>;

/**
 * Engagement metrics for one published post, as read back from the platform. A counter is
 * omitted when the platform does not report it, so a missing value is never the same as 0.
 */
export const SocialPostMetricsSchema = z.object({
  platform: SocialPlatformSchema,
  /** The platform's post id, in the same form as `PublishResult.id` where the provider returns one. */
  id: z.string(),
  url: z.string().optional(),
  /** Post text or caption as the platform shows it, for matching posts published without an id. */
  text: z.string().optional(),
  publishedAt: z.string().optional(),
  visibility: SocialPostVisibilitySchema.optional(),
  /** The platform's own status wording (e.g. "Under review"), kept when it explains `visibility`. */
  statusLabel: z.string().optional(),
  views: z.number().int().nonnegative().optional(),
  impressions: z.number().int().nonnegative().optional(),
  likes: z.number().int().nonnegative().optional(),
  comments: z.number().int().nonnegative().optional(),
  /** Reposts, reshares or shares. */
  shares: z.number().int().nonnegative().optional(),
  quotes: z.number().int().nonnegative().optional(),
  /** Saves, bookmarks or favourites. */
  saves: z.number().int().nonnegative().optional(),
  clicks: z.number().int().nonnegative().optional(),
  /** When these metrics were read (ISO 8601). */
  fetchedAt: z.string(),
  rawResponse: z.unknown().optional()
});
export type SocialPostMetrics = z.infer<typeof SocialPostMetricsSchema>;

export const SocialSessionStatusSchema = z.object({
  authenticated: z.boolean(),
  platform: z.string(),
  username: z.string().optional(),
  expiresAt: z.string().optional(),
  requiresInteraction: z.boolean().optional()
});
export type SocialSessionStatus = z.infer<typeof SocialSessionStatusSchema>;
export const SessionStatusSchema = SocialSessionStatusSchema;
export type SessionStatus = SocialSessionStatus;

// ============================================================================
// --- Marketing, SEO & Attribution ---
// ============================================================================

export const UtmParamsSchema = z.object({
  source: z.string().optional(),
  medium: z.string().optional(),
  campaign: z.string().optional(),
  term: z.string().optional(),
  content: z.string().optional(),
  ref: z.string().optional()
}).catchall(z.string().optional());
export type UtmParams = z.infer<typeof UtmParamsSchema>;

export const MetaConfigSchema = z.object({
  title: z.string().optional(),
  titleTemplate: z.string().optional(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  siteName: z.string().optional(),
  site: z.string().optional(),
  siteUrl: z.string().optional(),
  url: z.string().optional(),
  canonicalUrl: z.string().optional(),
  mainImage: z.string().optional(),
  mainImageAlt: z.string().optional(),
  /** Pixel width of `mainImage` (emitted as og:image:width). */
  mainImageWidth: z.number().int().positive().optional(),
  /** Pixel height of `mainImage` (emitted as og:image:height). */
  mainImageHeight: z.number().int().positive().optional(),
  squareImage: z.string().optional(),
  squareImageAlt: z.string().optional(),
  /** Pixel width of `squareImage`. */
  squareImageWidth: z.number().int().positive().optional(),
  /** Pixel height of `squareImage`. */
  squareImageHeight: z.number().int().positive().optional(),
  ogType: z.enum(["website", "article", "profile", "product"]).optional(),
  ogLanguage: z.string().optional(),
  twitterCard: z.enum(["summary", "summary_large_image", "app", "player"]).optional(),
  twitterHandle: z.string().optional(),
  article: z.boolean().optional(),
  datePublished: z.string().optional(),
  lastUpdated: z.string().optional(),
  authors: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  noindex: z.boolean().optional(),
  nofollow: z.boolean().optional()
});
export type MetaConfig = z.infer<typeof MetaConfigSchema>;

export const LlmsLinkSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional()
});
export type LlmsLink = z.infer<typeof LlmsLinkSchema>;

export const LlmsSectionSchema = z.object({
  title: z.string(),
  links: z.array(LlmsLinkSchema)
});
export type LlmsSection = z.infer<typeof LlmsSectionSchema>;

export const LlmsTxtConfigSchema = z.object({
  title: z.string(),
  summary: z.string(),
  notes: z.array(z.string()).optional(),
  sections: z.array(LlmsSectionSchema).optional(),
  optionalSections: z.array(LlmsSectionSchema).optional()
});
export type LlmsTxtConfig = z.infer<typeof LlmsTxtConfigSchema>;

export const LlmsDocumentContentSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  markdown: z.string()
});
export type LlmsDocumentContent = z.infer<typeof LlmsDocumentContentSchema>;

export const LlmsFullTxtConfigSchema = z.object({
  title: z.string(),
  summary: z.string(),
  documents: z.array(LlmsDocumentContentSchema)
});
export type LlmsFullTxtConfig = z.infer<typeof LlmsFullTxtConfigSchema>;

// --- Product Analytics Schemas (see ./analytics.ts) ---
export * from "./analytics.js";


