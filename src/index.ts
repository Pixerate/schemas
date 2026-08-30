import { z } from "zod";

// --- Fidelity ---
export const FidelitySchema = z.enum(["outline", "blocked", "shaded", "polished"]);
export type Fidelity = z.infer<typeof FidelitySchema>;

// --- Aspect Ratios ---
export const AspectRatioSchema = z.enum([
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9"
]);
export type AspectRatio = z.infer<typeof AspectRatioSchema>;

export const VideoAspectRatioSchema = z.enum(["9:16", "16:9"]);
export type VideoAspectRatio = z.infer<typeof VideoAspectRatioSchema>;

export const VideoResolutionSchema = z.enum(["720p", "1080p", "4k", "720P", "1080P", "4K"]);
export type VideoResolution = z.infer<typeof VideoResolutionSchema>;

export const VideoFrameImageSchema = z.union([
  z.string(),
  z.object({
    bytesBase64Encoded: z.string().optional(),
    data: z.string().optional(),
    mimeType: z.string().optional()
  })
]);
export type VideoFrameImage = z.infer<typeof VideoFrameImageSchema>;

// --- Video Generation & Social Clip Schemas ---
export const VideoGenerationSchema = z.object({
  prompt: z.string(),
  aspectRatio: VideoAspectRatioSchema.optional(),
  durationSeconds: z.number().int().optional(),
  generateAudio: z.boolean().optional(),
  modelName: z.string().optional(),
  resolution: VideoResolutionSchema.optional(),
  fps: z.number().optional(),
  isMultimedia: z.boolean().optional(),
  multimedia: z.boolean().optional(),
  firstFrame: VideoFrameImageSchema.optional(),
  lastFrame: VideoFrameImageSchema.optional()
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

export const TextOverlayStyleSchema = z.enum([
  "neubrutalist",
  "neubrutalist-dark",
  "badge",
  "meme",
  "custom",
  "none"
]);
export type TextOverlayStyle = z.infer<typeof TextOverlayStyleSchema>;
export const VideoOverlayStyleSchema = TextOverlayStyleSchema;
export type VideoOverlayStyle = TextOverlayStyle;

export const WatermarkPositionSchema = z.union([
  z.enum([
    "bottom-right",
    "bottom-left",
    "top-right",
    "top-left",
    "center"
  ]),
  z.object({
    x: z.union([z.number(), z.string()]).optional(),
    y: z.union([z.number(), z.string()]).optional()
  })
]);
export type WatermarkPosition = z.infer<typeof WatermarkPositionSchema>;

export const WatermarkSchema = z.object({
  text: z.string().optional(),
  imagePath: z.string().optional(),
  font: z.string().optional(),
  fontPath: z.string().optional(),
  position: WatermarkPositionSchema.optional(),
  color: z.string().optional(),
  strokeColor: z.string().optional(),
  strokeWidth: z.number().optional(),
  fontSize: z.number().optional(),
  transparentBg: z.boolean().optional(),
  opacity: z.number().optional(),
  marginRight: z.number().optional(),
  marginBottom: z.number().optional(),
  marginLeft: z.number().optional(),
  marginTop: z.number().optional()
});
export type Watermark = z.infer<typeof WatermarkSchema>;
export const VideoWatermarkSchema = WatermarkSchema;
export type VideoWatermark = Watermark;
export const ImageWatermarkSchema = WatermarkSchema;
export type ImageWatermark = Watermark;

export const TextOverlayPositionSchema = z.union([
  z.enum(["top", "center", "bottom"]),
  z.object({
    x: z.union([z.number(), z.string()]).optional(),
    y: z.union([z.number(), z.string()]).optional()
  })
]);
export type TextOverlayPosition = z.infer<typeof TextOverlayPositionSchema>;

export const TextAlignmentSchema = z.enum(["left", "center", "right"]);
export type TextAlignment = z.infer<typeof TextAlignmentSchema>;

export const DropShadowSchema = z.object({
  dx: z.number().optional(),
  dy: z.number().optional(),
  blur: z.number().optional(),
  color: z.string().optional(),
  opacity: z.number().optional()
});
export type DropShadow = z.infer<typeof DropShadowSchema>;

export const TextOverlaySchema = z.object({
  text: z.string(),
  style: TextOverlayStyleSchema.optional(),
  font: z.string().optional(),
  fontPath: z.string().optional(),
  position: TextOverlayPositionSchema.optional(),
  alignment: TextAlignmentSchema.optional(),
  fontSize: z.number().optional(),
  lineHeight: z.number().optional(),
  letterSpacing: z.number().optional(),
  textColor: z.string().optional(),
  textTransform: z.enum(["uppercase", "lowercase", "capitalize", "none"]).optional(),
  strokeColor: z.string().optional(),
  strokeWidth: z.number().optional(),
  shadow: z.union([z.boolean(), DropShadowSchema]).optional(),
  containerBgColor: z.string().optional(),
  containerBorderColor: z.string().optional(),
  containerBorderWidth: z.number().optional(),
  containerBorderRadius: z.number().optional(),
  paddingX: z.number().optional(),
  paddingY: z.number().optional(),
  maxCharsPerLine: z.number().optional(),
  badgeTag: z.string().optional(),
  badgeBgColor: z.string().optional(),
  badgeTextColor: z.string().optional(),
  badgeFont: z.string().optional(),
  badgeFontSize: z.number().optional(),
  badgePosition: z.enum(["top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"]).optional(),
  watermark: z.union([z.string(), WatermarkSchema]).optional()
});
export type TextOverlay = z.infer<typeof TextOverlaySchema>;
export const VideoTextOverlaySchema = TextOverlaySchema;
export type VideoTextOverlay = TextOverlay;
export const ImageTextOverlaySchema = TextOverlaySchema;
export type ImageTextOverlay = TextOverlay;

export const SocialVideoGenerationSchema = z.object({
  prompt: z.string(),
  audioPrompt: z.string().optional(),
  aspectRatio: VideoAspectRatioSchema.optional(),
  durationSeconds: z.number().int().optional(),
  hook: z.union([z.string(), TextOverlaySchema]).optional(),
  watermark: z.union([z.string(), WatermarkSchema]).optional()
});
export type SocialVideoGenerationPayload = z.infer<typeof SocialVideoGenerationSchema>;

// --- Video Transcoding & Compression ---
export const VideoTranscodeSchema = z.object({
  crf: z.number().min(0).max(51).optional(),
  preset: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional()
});
export type VideoTranscodePayload = z.infer<typeof VideoTranscodeSchema>;
export const VideoCompressionSchema = VideoTranscodeSchema;
export type VideoCompressionPayload = VideoTranscodePayload;

// --- Video Compositing ---
export const VideoOverlayOptionsSchema = z.object({
  x: z.union([z.number(), z.string()]).optional(),
  y: z.union([z.number(), z.string()]).optional(),
  crf: z.number().optional(),
  preset: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional()
});
export type VideoOverlayOptions = z.infer<typeof VideoOverlayOptionsSchema>;

export const VideoScaleAndPadSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  fit: z.enum(["contain", "cover", "fill"]).optional(),
  background: z.string().optional(),
  crf: z.number().optional(),
  preset: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional()
});
export type VideoScaleAndPad = z.infer<typeof VideoScaleAndPadSchema>;

export const AudioMixTrackSchema = z.object({
  path: z.string(),
  volume: z.number().min(0).max(1).optional(),
  delayMs: z.number().optional()
});
export type AudioMixTrack = z.infer<typeof AudioMixTrackSchema>;

export const AudioMixOptionsSchema = z.object({
  tracks: z.array(AudioMixTrackSchema),
  videoVolume: z.number().optional(),
  crf: z.number().optional(),
  preset: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional()
});
export type AudioMixOptions = z.infer<typeof AudioMixOptionsSchema>;

export const VideoPipelineSchema = z.object({
  scaleAndPad: VideoScaleAndPadSchema.optional(),
  textOverlay: TextOverlaySchema.optional(),
  watermark: z.union([WatermarkSchema, z.string()]).optional(),
  imageOverlays: z.array(z.object({
    imagePath: z.string(),
    options: VideoOverlayOptionsSchema.optional()
  })).optional(),
  audioMix: AudioMixOptionsSchema.optional(),
  compress: VideoTranscodeSchema.optional()
});
export type VideoPipeline = z.infer<typeof VideoPipelineSchema>;

export const VideoCompositingSchema = VideoPipelineSchema;
export type VideoCompositingPayload = z.infer<typeof VideoCompositingSchema>;

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

export const ImageCompositingSchema = z.object({
  textOverlay: TextOverlaySchema.optional(),
  watermark: WatermarkSchema.optional(),
  fit: z.enum(["cover", "contain", "fill", "inside", "outside"]).optional(),
  targetWidth: z.number().int().optional(),
  targetHeight: z.number().int().optional(),
  format: z.enum(["png", "jpeg", "webp", "avif"]).optional(),
  quality: z.number().int().min(1).max(100).optional()
});
export type ImageCompositingPayload = z.infer<typeof ImageCompositingSchema>;

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

// --- Code Generation ---
export const CodeGenerationSchema = z.object({
  prompt: z.string(),
  language: z.string()
});
export type CodeGenerationPayload = z.infer<typeof CodeGenerationSchema>;

// --- Surreal UI & Multi-Platform Component Domain Schemas ---
export const PlatformLanguageSchema = z.enum(["svelte", "react", "webcomponent"]);
export type PlatformLanguage = z.infer<typeof PlatformLanguageSchema>;

export const ThemeSupportSchema = z.enum(["default", "light-and-dark"]);
export type ThemeSupport = z.infer<typeof ThemeSupportSchema>;

export const ComponentPropDocSchema = z.object({
  name: z.string(),
  type: z.string(),
  default: z.string().optional(),
  description: z.string()
});
export type ComponentPropDoc = z.infer<typeof ComponentPropDocSchema>;

// Backward compatibility alias
export const ComponentPropDefinitionSchema = ComponentPropDocSchema;
export type ComponentPropDefinition = ComponentPropDoc;

export const ComponentDocsSchema = z.object({
  usage: z.string().describe("Usage instructions and import examples"),
  props: z.array(ComponentPropDocSchema).describe("List of prop definitions and types"),
  notes: z.string().optional().describe("Additional usage or architectural notes")
});
export type ComponentDocs = z.infer<typeof ComponentDocsSchema>;

export const PreviewHarnessSchema = z.object({
  driverCode: z
    .string()
    .describe(
      "Complete, runnable preview driver code harness demonstrating usage of the component with snippets/children or mock props"
    ),
  mockProps: z.record(z.any()).describe("JSON map of realistic mock prop values passed to the component"),
  wrapperClass: z.string().optional().describe("Tailwind CSS class string for wrapping the preview container")
});
export type PreviewHarness = z.infer<typeof PreviewHarnessSchema>;

export const GenerateHarnessOptionsSchema = z.object({
  code: z.string(),
  language: PlatformLanguageSchema,
  componentName: z.string(),
  docsProps: z.array(ComponentPropDocSchema).optional()
});
export type GenerateHarnessOptions = z.infer<typeof GenerateHarnessOptionsSchema>;

export const ComponentSynthesisSchema = z.object({
  title: z.string().describe("Title of the synthesized component"),
  description: z.string().describe("Detailed description of the component"),
  tags: z.array(z.string()).describe("Keywords and categorization tags"),
  platforms: z.object({
    svelte: z
      .string()
      .describe("Self-contained Svelte 5 component with runes ($props, $state, onclick, snippets, etc.)"),
    react: z.string().describe("Self-contained React 19 TSX component with all subcomponents defined and exported"),
    webcomponent: z
      .string()
      .describe("Self-contained WebComponent custom element extending HTMLElement")
  }),
  harnesses: z
    .object({
      svelte: PreviewHarnessSchema,
      react: PreviewHarnessSchema,
      webcomponent: PreviewHarnessSchema
    })
    .optional(),
  docs: ComponentDocsSchema
});
export type ComponentSynthesisPayload = z.infer<typeof ComponentSynthesisSchema>;

export const ComponentTransformationResultSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  platforms: z.record(PlatformLanguageSchema, z.string()),
  harnesses: z.record(PlatformLanguageSchema, PreviewHarnessSchema),
  docs: ComponentDocsSchema,
  detectedLanguage: PlatformLanguageSchema,
  themeSupport: ThemeSupportSchema
});
export type ComponentTransformationResult = z.infer<typeof ComponentTransformationResultSchema>;

export const ComponentPackageSchema = z.object({
  language: PlatformLanguageSchema,
  code: z.string().describe("Formatted code bundle with trimmed leading whitespace"),
  docs: ComponentDocsSchema,
  screenshot: z.string().describe("Data URI or URL of actual rendered component"),
  themeSupport: ThemeSupportSchema,
  tags: z.array(z.string()),
  previewHarness: PreviewHarnessSchema.optional()
});
export type ComponentPackage = z.infer<typeof ComponentPackageSchema>;

export const UIComponentTypeSchema = z.object({
  id: z.string().describe("Slug, e.g., 'button'"),
  name: z.string().describe("e.g. 'Button'"),
  description: z.string().describe("Official description e.g. from Shadcn documentation"),
  tags: z.array(z.string()).describe("Freeform tags e.g. ['form', 'action']"),
  createdAt: z.string().describe("ISO timestamp"),
  updatedAt: z.string().describe("ISO timestamp")
});
export type UIComponentType = z.infer<typeof UIComponentTypeSchema>;

export const ComponentVariantSchema = z.object({
  id: z.string().describe("Slug, e.g., 'glass-card' or 'glassmorphism'"),
  componentTypeId: z.string().describe("References UIComponentType.id"),
  name: z.string().describe("e.g. 'Glass Action Button'"),
  aestheticId: z.string().describe("Style aesthetic, e.g. 'glassmorphism', 'neubrutalism', 'minimalist', 'modern', 'shadcn'"),
  recommendedThemeId: z.string().optional().describe("Optional recommended theme ID (e.g., 'shadcn-zinc', 'tokyo-night')"),
  description: z.string().optional().describe("Style & business logic description"),
  imageUrl: z.string().optional().describe("Optional image URL"),
  image: z.string().optional(),
  screenshot: z.string().optional(),
  createdAt: z.string().describe("ISO timestamp"),
  updatedAt: z.string().describe("ISO timestamp")
});
export type ComponentVariant = z.infer<typeof ComponentVariantSchema>;

export const AestheticSchema = ComponentVariantSchema;
export type Aesthetic = ComponentVariant;

export const ComponentVersionSchema = z.object({
  id: z.string().describe("Unique version ID e.g. 'button-glass-action-button-v1.0.0'"),
  componentTypeId: z.string().describe("References UIComponentType.id"),
  variantId: z.string().describe("References ComponentVariant.id"),
  aestheticId: z.string().describe("References Aesthetic style e.g. 'glassmorphism'"),
  version: z.string().describe("Semver e.g. '1.0.0'"),
  changelogNote: z.string(),
  createdBy: z.string(),
  createdAt: z.string().describe("ISO timestamp"),
  packages: z.record(PlatformLanguageSchema, ComponentPackageSchema)
});
export type ComponentVersion = z.infer<typeof ComponentVersionSchema>;

export const ActivityActionSchema = z.enum([
  "CREATED",
  "UPDATED",
  "REVERTED",
  "PACKAGE_GENERATED",
  "DELETED"
]);
export type ActivityAction = z.infer<typeof ActivityActionSchema>;

export const ActivityLogSchema = z.object({
  id: z.string(),
  componentTypeId: z.string(),
  componentTypeName: z.string(),
  variantId: z.string().optional(),
  aestheticId: z.string(),
  action: ActivityActionSchema,
  version: z.string(),
  details: z.string(),
  timestamp: z.string()
});
export type ActivityLog = z.infer<typeof ActivityLogSchema>;

export const IngestionInputSchema = z.object({
  codeBundle: z.string().describe("Raw code bundle provided"),
  css: z.string().optional().describe("Optional raw CSS or CSS bundle to extract and inline"),
  componentTypeId: z.string().describe("Slug or Name of UI Component Type (e.g., 'button')"),
  variantName: z.string().describe("Mandatory Variant Name text input (e.g., 'Glass Action Button')"),
  variantId: z.string().optional().describe("Optional custom slug or ID for variant"),
  aestheticId: z.string().optional().describe("Dropdown value for aesthetic style (e.g., 'glassmorphism', 'neubrutalism', 'minimalist', 'modern', 'shadcn')"),
  recommendedThemeId: z.string().optional().describe("Optional recommended theme ID"),
  componentTypeName: z.string().optional().describe("Optional display name if creating new component type"),
  componentTypeDescription: z.string().optional().describe("Optional description if creating new component type"),
  variantDescription: z.string().optional().describe("Optional description if creating new variant"),
  aestheticName: z.string().optional().describe("Optional display name for aesthetic"),
  aestheticDescription: z.string().optional().describe("Optional description if creating new aesthetic"),
  sourcePlatform: PlatformLanguageSchema.optional().describe("Optional source platform - detected automatically if omitted"),
  changelogNote: z.string().optional(),
  tags: z.array(z.string()).optional()
});
export type IngestionInput = z.infer<typeof IngestionInputSchema>;

// --- Design Tokens & Theme Schemas ---
export const ThemeColorsSchema = z.object({
  primary: z.string(),
  primaryForeground: z.string().optional(),
  secondary: z.string().optional(),
  secondaryForeground: z.string().optional(),
  accent: z.string().optional(),
  accentForeground: z.string().optional(),
  background: z.string(),
  foreground: z.string(),
  surface: z.string().optional(),
  surfaceForeground: z.string().optional(),
  muted: z.string().optional(),
  mutedForeground: z.string().optional(),
  destructive: z.string().optional(),
  destructiveForeground: z.string().optional(),
  border: z.string().optional(),
  ring: z.string().optional(),
  customProperties: z.record(z.string()).optional()
});
export type ThemeColors = z.infer<typeof ThemeColorsSchema>;

export const ThemeTypographyTokensSchema = z.object({
  fontSans: z.string().optional(),
  fontMono: z.string().optional(),
  fontHeading: z.string().optional(),
  fontImports: z.array(z.string()).optional(),
  fontCss: z.string().optional(),
  fontSize: z.record(z.string()).optional(),
  fontWeight: z.record(z.string()).optional()
});
export type ThemeTypographyTokens = z.infer<typeof ThemeTypographyTokensSchema>;

export const ThemeTokensSchema = z.object({
  colors: z.object({
    light: ThemeColorsSchema,
    dark: ThemeColorsSchema.partial().optional()
  }),
  typography: ThemeTypographyTokensSchema.optional(),
  radii: z.record(z.string().optional()).optional(),
  spacing: z.record(z.string()).optional(),
  paddings: z.record(z.string()).optional(),
  shadows: z.record(z.string()).optional()
});
export type ThemeTokens = z.infer<typeof ThemeTokensSchema>;

export const ThemeSchema = z.object({
  id: z.string().describe("e.g. 'shadcn-zinc', 'tokyo-night', 'glassmorphism-cyber'"),
  name: z.string().describe("e.g. 'Shadcn Zinc Modern'"),
  description: z.string().optional(),
  tokens: ThemeTokensSchema,
  supportsDarkMode: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  createdAt: z.string().describe("ISO timestamp"),
  updatedAt: z.string().describe("ISO timestamp")
});
export type Theme = z.infer<typeof ThemeSchema>;

export const ThemeIngestionInputSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  tokens: ThemeTokensSchema.optional(),
  rawCss: z.string().optional(),
  supportsDarkMode: z.boolean().optional(),
  isSystem: z.boolean().optional()
});
export type ThemeIngestionInput = z.infer<typeof ThemeIngestionInputSchema>;

// --- UI Component Generation ---
export const UIGenerationOptionsSchema = z.object({
  prompt: z.string().describe("User prompt or instruction for component generation/modification"),
  currentCode: z.string().optional().describe("Existing component code for iterative modification"),
  platform: PlatformLanguageSchema.optional().default("svelte").describe("Target component platform language"),
  theme: z.string().optional().describe("Theme identifier or token reference"),
  systemPrompt: z.string().optional().describe("Custom or override system prompt"),
  maxRetries: z.number().int().nonnegative().optional().default(3).describe("Maximum retry attempts for iterative auto-repair validation"),
  temperature: z.number().optional().describe("Model temperature")
});
export type UIGenerationOptionsPayload = z.infer<typeof UIGenerationOptionsSchema>;

export const UIExtractionResultSchema = z.object({
  code: z.string().describe("Clean extracted component code without markdown fences"),
  postamble: z.string().optional().describe("Conversational explanation or summary after the code block"),
  rawText: z.string().optional().describe("Complete raw output from the model")
});
export type UIExtractionResult = z.infer<typeof UIExtractionResultSchema>;

export const UIValidationResultSchema = z.object({
  valid: z.boolean().describe("Whether the component passed syntax and linter validation"),
  error: z.string().optional().describe("Error output from validation if failed"),
  errors: z.array(z.string()).optional().describe("List of parsed validation errors"),
  formattedCode: z.string().optional().describe("Prettier-formatted component code if available")
});
export type UIValidationResult = z.infer<typeof UIValidationResultSchema>;

export const UIGenerationResultSchema = z.object({
  code: z.string().describe("Final validated component code"),
  postamble: z.string().optional().describe("Conversational explanation or summary"),
  rawText: z.string().optional().describe("Complete raw model output"),
  isValid: z.boolean().optional().describe("Whether the final code passed validation"),
  validationAttempts: z.number().int().optional().describe("Total number of generation/repair attempts"),
  validationError: z.string().optional().describe("Validation error if still failing after max retries")
});
export type UIGenerationResult = z.infer<typeof UIGenerationResultSchema>;

// --- JSON Generation ---
export const JsonGenerationSchema = z.object({
  prompt: z.string(),
  schema: z.record(z.any()).optional()
});
export type JsonGenerationPayload = z.infer<typeof JsonGenerationSchema>;

// --- Service Client ---
export const ServiceClientSchema = z.enum(["pixerate", "slopmachine", "social", "surrealui", "surreal-ui", "symphonia", "flair", "operative", "unknown"]);
export type ServiceClient = z.infer<typeof ServiceClientSchema>;

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

// --- Generative Forms Schemas ---
export const ConditionOperatorSchema = z.enum([
  "equals",
  "notEquals",
  "not_equals",
  "includes",
  "contains",
  "greaterThan",
  "greater_than",
  "lessThan",
  "less_than",
  "exists"
]);
export type ConditionOperator = z.infer<typeof ConditionOperatorSchema>;

export const ConditionSchema = z.object({
  field: z.string().optional(),
  fieldId: z.string().optional(),
  operator: ConditionOperatorSchema,
  value: z.union([z.string(), z.number(), z.boolean()]).optional()
});
export type Condition = z.infer<typeof ConditionSchema>;

export const ControlValidationSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  message: z.string().optional(),
  unit: z.string().optional()
});
export type ControlValidation = z.infer<typeof ControlValidationSchema>;

export const FormOptionSchema = z.object({
  label: z.string(),
  value: z.string()
});
export type FormOption = z.infer<typeof FormOptionSchema>;

export const ReferenceDataSourceSchema = z.enum(["companies", "users"]);
export type ReferenceDataSource = z.infer<typeof ReferenceDataSourceSchema>;

export const FormControlTypeSchema = z.enum([
  "text",
  "textarea",
  "number",
  "select",
  "multiselect",
  "radio",
  "checkbox",
  "date",
  "file",
  "company",
  "user",
  "slider",
  "computed",
  "repeater"
]);
export type FormControlType = z.infer<typeof FormControlTypeSchema>;

export type FormControl = {
  id: string;
  type: FormControlType;
  label: string;
  description?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  options?: FormOption[];
  dataSource?: ReferenceDataSource;
  validation?: ControlValidation;
  pattern?: string;
  min?: number;
  max?: number;
  step?: number;
  minItems?: number;
  maxItems?: number;
  formula?: string;
  computed?: { formula?: string };
  visibleWhen?: Condition;
  condition?: Condition;
  itemControls?: FormControl[];
  controls?: FormControl[];
};

export const FormControlSchema: z.ZodType<FormControl> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: FormControlTypeSchema,
    label: z.string(),
    description: z.string().optional(),
    helperText: z.string().optional(),
    placeholder: z.string().optional(),
    required: z.boolean().optional(),
    defaultValue: z.any().optional(),
    options: z.array(FormOptionSchema).optional(),
    dataSource: ReferenceDataSourceSchema.optional(),
    validation: ControlValidationSchema.optional(),
    pattern: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional(),
    minItems: z.number().optional(),
    maxItems: z.number().optional(),
    formula: z.string().optional(),
    computed: z.object({ formula: z.string().optional() }).optional(),
    visibleWhen: ConditionSchema.optional(),
    condition: ConditionSchema.optional(),
    itemControls: z.array(FormControlSchema).optional(),
    controls: z.array(FormControlSchema).optional()
  })
);

export const FormSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  controls: z.array(FormControlSchema),
  visibleWhen: ConditionSchema.optional(),
  condition: ConditionSchema.optional()
});
export type FormSection = z.infer<typeof FormSectionSchema>;

export const FormStageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  sections: z.array(FormSectionSchema),
  gate: z.string().optional()
});
export type FormStage = z.infer<typeof FormStageSchema>;

export const DecisionGateKindSchema = z.enum(["approval", "review", "decision"]);
export type DecisionGateKind = z.infer<typeof DecisionGateKindSchema>;

export const DecisionGateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  stageId: z.string(),
  kind: DecisionGateKindSchema.optional(),
  trigger: z.string().optional(),
  requiredAction: z.string().optional(),
  consequence: z.string().optional(),
  condition: z.union([ConditionSchema, z.string()]).optional(),
  blocking: z.boolean(),
  reviewerRole: z.string().optional()
});
export type DecisionGate = z.infer<typeof DecisionGateSchema>;

export const ScoringRuleSchema = z.object({
  field: z.string(),
  optionPoints: z.record(z.number()).optional(),
  ranges: z.array(
    z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      points: z.number()
    })
  ).optional(),
  multiplier: z.number().optional(),
  truePoints: z.number().optional(),
  falsePoints: z.number().optional()
});
export type ScoringRule = z.infer<typeof ScoringRuleSchema>;

export const ScoringDimensionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  weight: z.number().optional(),
  rules: z.array(ScoringRuleSchema)
});
export type ScoringDimension = z.infer<typeof ScoringDimensionSchema>;

export const ScoreBandSchema = z.object({
  id: z.string(),
  label: z.string(),
  min: z.number(),
  max: z.number().optional()
});
export type ScoreBand = z.infer<typeof ScoreBandSchema>;

export const ScoringConfigSchema = z.object({
  description: z.string().optional(),
  dimensions: z.array(ScoringDimensionSchema),
  bands: z.array(ScoreBandSchema).optional()
});
export type ScoringConfig = z.infer<typeof ScoringConfigSchema>;

export const DimensionScoreSchema = z.object({
  dimensionId: z.string(),
  label: z.string(),
  points: z.number(),
  weight: z.number(),
  weighted: z.number()
});
export type DimensionScore = z.infer<typeof DimensionScoreSchema>;

export const SubmissionScoreSchema = z.object({
  total: z.number(),
  dimensions: z.array(DimensionScoreSchema),
  band: z.object({ id: z.string(), label: z.string() }).optional(),
  calculatedAt: z.string(),
  schemaVersion: z.union([z.string(), z.number()])
});
export type SubmissionScore = z.infer<typeof SubmissionScoreSchema>;

export const FormValidatorSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  fields: z.array(z.string()).optional(),
  severity: z.union([z.enum(["error", "warning"]), z.string()]).optional(),
  type: z.string().optional(),
  config: z.any().optional()
});
export type FormValidator = z.infer<typeof FormValidatorSchema>;

export const FormHandoffActionSchema = z.object({
  id: z.string().optional(),
  label: z.string().optional(),
  destination: z.string().optional(),
  condition: z.union([ConditionSchema, z.string()]).optional(),
  payloadFields: z.array(z.string()).optional(),
  type: z.string().optional(),
  config: z.any().optional()
});
export type FormHandoffAction = z.infer<typeof FormHandoffActionSchema>;

export const FormReviewMetaSchema = z.object({
  humanReviewRequired: z.boolean(),
  reviewAreas: z.array(z.string())
});
export type FormReviewMeta = z.infer<typeof FormReviewMetaSchema>;

export const TechnicalFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  version: z.union([z.string(), z.number()]),
  stages: z.array(FormStageSchema),
  decisionGates: z.array(DecisionGateSchema).optional(),
  validators: z.array(FormValidatorSchema).optional(),
  handoffActions: z.array(FormHandoffActionSchema).optional(),
  review: FormReviewMetaSchema.optional(),
  reviewMetadata: z.object({
    approvers: z.array(z.string()),
    requirements: z.array(z.string())
  }).optional(),
  scoring: ScoringConfigSchema.optional()
});
export type TechnicalSchema = z.infer<typeof TechnicalFormSchema>;

export const SemanticReviewStatusSchema = z.enum(["pass", "flagged", "unavailable"]);
export type SemanticReviewStatus = z.infer<typeof SemanticReviewStatusSchema>;

export const SemanticReviewIssueSchema = z.object({
  id: z.string(),
  severity: z.enum(["warning", "error"]),
  message: z.string(),
  fieldId: z.string().optional(),
  fieldLabel: z.string().optional(),
  suggestion: z.string().optional()
});
export type SemanticReviewIssue = z.infer<typeof SemanticReviewIssueSchema>;

export const SemanticReviewResultSchema = z.object({
  status: SemanticReviewStatusSchema,
  summary: z.string().optional(),
  issues: z.array(SemanticReviewIssueSchema)
});
export type SemanticReviewResult = z.infer<typeof SemanticReviewResultSchema>;

export const FormSubmissionPayloadSchema = z.object({
  id: z.string().optional(),
  answers: z.record(z.any()),
  stageReviews: z.array(z.any()).optional(),
  gateDecisions: z.array(z.any()).optional(),
  submittedAt: z.string().optional(),
  score: SubmissionScoreSchema.optional()
});
export type FormSubmissionPayload = z.infer<typeof FormSubmissionPayloadSchema>;

const formJsonCondition = {
  type: "object",
  properties: {
    field: { type: "string" },
    fieldId: { type: "string" },
    operator: {
      enum: [
        "equals",
        "notEquals",
        "not_equals",
        "includes",
        "contains",
        "greaterThan",
        "greater_than",
        "lessThan",
        "less_than",
        "exists",
      ],
    },
    value: { type: ["string", "number", "boolean"] },
  },
  required: ["operator"],
} as const;

const formJsonControl = {
  type: "object",
  properties: {
    id: { type: "string" },
    type: {
      enum: [
        "text",
        "textarea",
        "number",
        "select",
        "multiselect",
        "radio",
        "checkbox",
        "date",
        "file",
        "company",
        "user",
        "slider",
        "computed",
        "repeater",
      ],
    },
    label: { type: "string" },
    description: { type: "string" },
    helperText: { type: "string" },
    placeholder: { type: "string" },
    required: { type: "boolean" },
    defaultValue: {},
    options: {
      type: "array",
      items: {
        type: "object",
        properties: { label: { type: "string" }, value: { type: "string" } },
        required: ["label", "value"],
      },
    },
    dataSource: { enum: ["companies", "users"] },
    validation: {
      type: "object",
      properties: {
        min: { type: "number" },
        max: { type: "number" },
        minLength: { type: "number" },
        maxLength: { type: "number" },
        pattern: { type: "string" },
        message: { type: "string" },
        unit: { type: "string" },
      },
    },
    pattern: { type: "string" },
    min: { type: "number" },
    max: { type: "number" },
    step: { type: "number" },
    minItems: { type: "number" },
    maxItems: { type: "number" },
    formula: { type: "string" },
    computed: { type: "object", properties: { formula: { type: "string" } } },
    visibleWhen: formJsonCondition,
    condition: formJsonCondition,
    itemControls: { type: "array", items: { $ref: "#/$defs/control" } },
    controls: { type: "array", items: { $ref: "#/$defs/control" } },
  },
  required: ["id", "type", "label"],
} as const;

/** Canonical Generative Forms contract, JSON Schema draft 2020-12, version 1. */
export const FORM_SCHEMA_JSON_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://workspace.local/schemas/generative-forms/form-schema-v1.json",
  type: "object",
  $defs: { control: formJsonControl },
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    version: { type: ["string", "number"] },
    stages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          gate: { type: "string" },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                controls: { type: "array", items: { $ref: "#/$defs/control" } },
                visibleWhen: formJsonCondition,
                condition: formJsonCondition,
              },
              required: ["id", "title", "controls"],
            },
          },
        },
        required: ["id", "title", "sections"],
      },
    },
    decisionGates: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          stageId: { type: "string" },
          kind: { enum: ["approval", "review", "decision"] },
          trigger: { type: "string" },
          requiredAction: { type: "string" },
          consequence: { type: "string" },
          condition: { anyOf: [formJsonCondition, { type: "string" }] },
          blocking: { type: "boolean" },
          reviewerRole: { type: "string" },
        },
        required: ["id", "title", "stageId", "blocking"],
      },
    },
    validators: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          description: { type: "string" },
          fields: { type: "array", items: { type: "string" } },
          severity: { type: "string" },
          type: { type: "string" },
          config: {},
        },
        required: ["id"],
      },
    },
    handoffActions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          destination: { type: "string" },
          condition: { anyOf: [formJsonCondition, { type: "string" }] },
          payloadFields: { type: "array", items: { type: "string" } },
          type: { type: "string" },
          config: {},
        },
      },
    },
    review: {
      type: "object",
      properties: {
        humanReviewRequired: { type: "boolean" },
        reviewAreas: { type: "array", items: { type: "string" } },
      },
      required: ["humanReviewRequired", "reviewAreas"],
    },
    reviewMetadata: {
      type: "object",
      properties: {
        approvers: { type: "array", items: { type: "string" } },
        requirements: { type: "array", items: { type: "string" } },
      },
      required: ["approvers", "requirements"],
    },
    scoring: {
      type: "object",
      properties: {
        description: { type: "string" },
        dimensions: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              label: { type: "string" },
              description: { type: "string" },
              weight: { type: "number" },
              rules: {
                type: "array",
                minItems: 1,
                items: {
                  type: "object",
                  properties: {
                    field: { type: "string" },
                    optionPoints: {
                      type: "object",
                      additionalProperties: { type: "number" },
                    },
                    ranges: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          min: { type: "number" },
                          max: { type: "number" },
                          points: { type: "number" },
                        },
                        required: ["points"],
                      },
                    },
                    multiplier: { type: "number" },
                    truePoints: { type: "number" },
                    falsePoints: { type: "number" },
                  },
                  required: ["field"],
                },
              },
            },
            required: ["id", "label", "rules"],
          },
        },
        bands: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              label: { type: "string" },
              min: { type: "number" },
              max: { type: "number" },
            },
            required: ["id", "label", "min"],
          },
        },
      },
      required: ["dimensions"],
    },
  },
  required: ["version", "stages"],
} as const;



