import { z } from "zod";

/**
 * Agent runtime contracts used by @pixerate/agent-core: agent tools, environments, configs and
 * interactions, plus website crawling and caching.
 *
 * Also available as the `@pixerate/schemas/agent` entry point, which client bundles
 * should prefer: it doesn't pull in the rest of the schemas.
 */

// --- Agentic Interactions ---
export const AgentToolTypeSchema = z.enum(["code_execution", "google_search", "url_context", "file_search", "custom"]);
export type AgentToolType = z.infer<typeof AgentToolTypeSchema>;

export const AgentDocumentAttachmentSchema = z.object({
  data: z.string().optional(),
  uri: z.string().optional(),
  mimeType: z.string(),
  fileName: z.string().optional()
});
export type AgentDocumentAttachment = z.infer<typeof AgentDocumentAttachmentSchema>;

export const AgentToolSchema = z.object({
  type: z.string(),
  config: z.record(z.any()).optional()
});
export type AgentTool = z.infer<typeof AgentToolSchema>;

export const AgentNetworkTransformRuleSchema = z.object({
  key: z.string(),
  value: z.string()
});
export type AgentNetworkTransformRule = z.infer<typeof AgentNetworkTransformRuleSchema>;

export const AgentNetworkAllowlistRuleSchema = z.object({
  domain: z.string(),
  transform: z.array(AgentNetworkTransformRuleSchema).optional()
});
export type AgentNetworkAllowlistRule = z.infer<typeof AgentNetworkAllowlistRuleSchema>;

export const AgentEnvironmentSchema = z.object({
  type: z.enum(["remote", "local"]).optional(),
  network: z.object({
    allowlist: z.array(AgentNetworkAllowlistRuleSchema).optional()
  }).optional()
});
export type AgentEnvironment = z.infer<typeof AgentEnvironmentSchema>;

export const AgentConfigSchema = z.object({
  type: z.string().optional(),
  model: z.string().optional(),
  options: z.record(z.any()).optional()
});
export type AgentConfig = z.infer<typeof AgentConfigSchema>;

export const AgentInteractionStatusSchema = z.enum([
  "queued",
  "in_progress",
  "completed",
  "failed",
  "cancelled"
]);
export type AgentInteractionStatus = z.infer<typeof AgentInteractionStatusSchema>;

export const AgentInteractionRequestSchema = z.object({
  agent: z.string().default("antigravity-preview-05-2026"),
  input: z.string(),
  systemInstruction: z.string().optional(),
  background: z.boolean().default(true),
  tools: z.array(AgentToolSchema).optional(),
  agentConfig: AgentConfigSchema.optional(),
  environment: AgentEnvironmentSchema.optional(),
  documents: z.array(AgentDocumentAttachmentSchema).optional(),
  coachingRules: z.array(z.string()).optional()
});
export type AgentInteractionRequest = z.infer<typeof AgentInteractionRequestSchema>;

export const AgentInteractionResultSchema = z.object({
  id: z.string(),
  agent: z.string(),
  status: AgentInteractionStatusSchema,
  outputText: z.string().optional(),
  error: z.string().optional(),
  latencyMs: z.number().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});
export type AgentInteractionResult = z.infer<typeof AgentInteractionResultSchema>;

// --- Website Crawling & Caching ---
// ============================================================================

export const WebsiteCrawlScopeSchema = z.object({
  /** Seed URL to begin crawling from */
  url: z.string(),
  /**
   * Maximum link depth from the seed URL.
   * - 0: Crawls only the seed page.
   * - 1: Crawls the seed page plus direct internal links.
   * - 2+: Recursively crawls up to the specified link depth.
   * @default 1
   */
  maxDepth: z.number().int().min(0).max(10).optional().default(1),
  /** Maximum total pages to crawl and cache (default 25) */
  maxPages: z.number().int().min(1).max(500).optional().default(25),
  /** If true, only follows links within the same origin/host (default true) */
  sameDomainOnly: z.boolean().optional().default(true),
  /** If true, allows following links across subdomains of the seed domain (default false) */
  allowSubdomains: z.boolean().optional().default(false),
  /** Restricts crawling to URLs starting with this path prefix (e.g. "/docs") */
  pathPrefix: z.string().optional(),
  /** Only crawl URLs matching this regular expression (source string). */
  urlMatchPattern: z.string().optional(),
  /** Skip URLs matching this regular expression (source string). */
  urlExcludePattern: z.string().optional(),
  /** Whether to download and cache images (default true) */
  includeImages: z.boolean().optional().default(true),
  /** Maximum number of images to download per page (default 15) */
  maxImagesPerPage: z.number().int().optional().default(15),
  /** Maximum allowed size in bytes per image (default 5MB) */
  maxImageBytes: z.number().int().optional().default(5 * 1024 * 1024),
  /** Maximum allowed size in bytes per HTML page (default 5MB) */
  maxPageBytes: z.number().int().optional().default(5 * 1024 * 1024),
  /** Allowed MIME types for images to download */
  allowedImageTypes: z.array(z.string()).optional(),
  /** Identifier or namespace for the cache. Defaults to sanitized hostname and path. */
  cacheId: z.string().optional(),
  /** Cache time-to-live in milliseconds (default 24 hours) */
  ttlMs: z.number().optional(),
  /** If true, bypasses existing cache and forces a fresh crawl */
  forceRefresh: z.boolean().optional().default(false),
  /** HTTP request timeout in milliseconds (default 15000ms) */
  requestTimeoutMs: z.number().optional().default(15000),
  /** Custom User-Agent header */
  userAgent: z.string().optional()
});
export type WebsiteCrawlScope = z.infer<typeof WebsiteCrawlScopeSchema>;

export const CachedPageSchema = z.object({
  url: z.string(),
  path: z.string(),
  title: z.string(),
  markdown: z.string(),
  textLength: z.number().nonnegative(),
  links: z.array(z.string()),
  imageAssetIds: z.array(z.string()),
  fetchedAt: z.union([z.string(), z.date()]),
  expiresAt: z.union([z.string(), z.date()]).optional(),
  hasInjectionWarning: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional()
});
export type CachedPage = z.infer<typeof CachedPageSchema>;

export const CachedPageSummarySchema = z.object({
  url: z.string(),
  path: z.string(),
  title: z.string(),
  textLength: z.number().nonnegative(),
  imageCount: z.number().nonnegative(),
  fetchedAt: z.union([z.string(), z.date()])
});
export type CachedPageSummary = z.infer<typeof CachedPageSummarySchema>;

export const WebsiteCacheSummarySchema = z.object({
  cacheId: z.string(),
  seedUrl: z.string(),
  pagesCount: z.number().nonnegative(),
  imagesCount: z.number().nonnegative(),
  pages: z.array(CachedPageSummarySchema),
  isFromCache: z.boolean(),
  cachedAt: z.union([z.string(), z.date()])
});
export type WebsiteCacheSummary = z.infer<typeof WebsiteCacheSummarySchema>;

export const CachedPageSearchResultSchema = z.object({
  url: z.string(),
  path: z.string(),
  title: z.string(),
  snippet: z.string(),
  matchScore: z.number()
});
export type CachedPageSearchResult = z.infer<typeof CachedPageSearchResultSchema>;

// --- Service Accounts & Agent Directory ---
// ============================================================================

export const ServiceAccountSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string(),
  handle: z.string(),
  description: z.string().optional(),
  role: z.string(),
  type: z.literal("virtual_user"),
  avatarUrl: z.string().optional(),
  colorName: z.string().optional(),
  hexColor: z.string().optional(),
  keyPrefix: z.string(),
  hashedSecret: z.string(),
  projectIds: z.array(z.string()).optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastUsedAt: z.string().nullable().optional(),
  status: z.enum(["active", "revoked"]),
  revokedAt: z.string().nullable().optional()
});
export type ServiceAccount = z.infer<typeof ServiceAccountSchema>;

export const CreateServiceAccountInputSchema = z.object({
  name: z.string(),
  handle: z.string().optional(),
  description: z.string().optional(),
  role: z.string().optional(),
  projectIds: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
  colorName: z.string().optional(),
  hexColor: z.string().optional(),
  avatarUrl: z.string().optional()
});
export type CreateServiceAccountInput = z.infer<typeof CreateServiceAccountInputSchema>;

export const ApiKeyLookupSchema = z.object({
  serviceAccountId: z.string(),
  orgId: z.string(),
  status: z.enum(["active", "revoked"]),
  createdAt: z.string()
});
export type ApiKeyLookup = z.infer<typeof ApiKeyLookupSchema>;

export const ActiveAgentTaskSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  statusText: z.string().optional(),
  startedAt: z.string()
});
export type ActiveAgentTask = z.infer<typeof ActiveAgentTaskSchema>;

export const AgentDirectoryEntrySchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string(),
  handle: z.string().optional(),
  colorName: z.string(),
  hexColor: z.string(),
  avatarUrl: z.string().optional(),
  role: z.string().optional(),
  description: z.string().optional(),
  currentStatus: z.string().optional(),
  currentTaskId: z.string().nullable().optional(),
  currentTaskTitle: z.string().nullable().optional(),
  isEngaged: z.boolean().optional(),
  activeTasks: z.array(ActiveAgentTaskSchema).optional(),
  lastSeen: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type AgentDirectoryEntry = z.infer<typeof AgentDirectoryEntrySchema>;

// --- Agent Workspace & Change Tracking ---
// ============================================================================

export const AgentDiffStatsSchema = z.object({
  added: z.number().int().nonnegative(),
  removed: z.number().int().nonnegative()
});
export type AgentDiffStats = z.infer<typeof AgentDiffStatsSchema>;

export const AgentFileChangeKindSchema = z.enum(["created", "modified", "deleted"]);
export type AgentFileChangeKind = z.infer<typeof AgentFileChangeKindSchema>;

export const AgentFileChangeSchema = z.object({
  path: z.string(),
  kind: AgentFileChangeKindSchema,
  before: z.string().optional(),
  after: z.string().optional(),
  diff: z.string(),
  stats: AgentDiffStatsSchema
});
export type AgentFileChange = z.infer<typeof AgentFileChangeSchema>;

export const AgentWorkspaceEntryTypeSchema = z.enum(["file", "directory"]);
export type AgentWorkspaceEntryType = z.infer<typeof AgentWorkspaceEntryTypeSchema>;

export const AgentWorkspaceEntrySchema = z.object({
  path: z.string(),
  type: AgentWorkspaceEntryTypeSchema,
  size: z.number().int().nonnegative().optional()
});
export type AgentWorkspaceEntry = z.infer<typeof AgentWorkspaceEntrySchema>;

// --- Agent Approvals & Human-in-the-Loop ---
// ============================================================================

export const AgentRiskLevelSchema = z.enum(["low", "medium", "high", "critical"]);
export type AgentRiskLevel = z.infer<typeof AgentRiskLevelSchema>;

export const AgentApprovalRequestSchema = z.object({
  toolCallId: z.string(),
  toolName: z.string(),
  parameters: z.record(z.unknown()),
  riskLevel: AgentRiskLevelSchema,
  riskReason: z.string().optional()
});
export type AgentApprovalRequest = z.infer<typeof AgentApprovalRequestSchema>;

export const AgentApprovalResponseSchema = z.object({
  toolCallId: z.string(),
  status: z.enum(["approved", "denied", "modified"]),
  modifiedParameters: z.record(z.unknown()).optional(),
  feedback: z.string().optional()
});
export type AgentApprovalResponse = z.infer<typeof AgentApprovalResponseSchema>;

// ============================================================================
