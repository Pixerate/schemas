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
  url: z.string(),
  maxDepth: z.number().int().min(0).max(10).optional().default(1),
  maxPages: z.number().int().min(1).max(500).optional().default(25),
  sameDomainOnly: z.boolean().optional().default(true),
  allowSubdomains: z.boolean().optional().default(false),
  pathPrefix: z.string().optional(),
  /** Only crawl URLs matching this regular expression (source string). */
  urlMatchPattern: z.string().optional(),
  /** Skip URLs matching this regular expression (source string). */
  urlExcludePattern: z.string().optional(),
  includeImages: z.boolean().optional().default(true),
  maxImagesPerPage: z.number().int().optional().default(15),
  maxImageBytes: z.number().int().optional().default(5 * 1024 * 1024),
  maxPageBytes: z.number().int().optional().default(5 * 1024 * 1024),
  allowedImageTypes: z.array(z.string()).optional(),
  cacheId: z.string().optional(),
  ttlMs: z.number().optional(),
  forceRefresh: z.boolean().optional().default(false),
  requestTimeoutMs: z.number().optional().default(15000),
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

// ============================================================================
