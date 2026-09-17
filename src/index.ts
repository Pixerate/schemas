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

export const VideoResolutionSchema = z.enum(["360p", "720p", "1080p", "4k", "360P", "720P", "1080P", "4K"]);
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

export const VideoAttachmentSchema = z.union([
  z.string(),
  z.object({
    bytesBase64Encoded: z.string().optional(),
    data: z.any().optional(),
    mimeType: z.string().optional(),
    url: z.string().optional()
  })
]);
export type VideoAttachment = z.infer<typeof VideoAttachmentSchema>;

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
  lowCost: z.boolean().optional(),
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
  position: z.union([z.string(), z.object({ x: z.number().optional(), y: z.number().optional() })]).optional(),
  padding: z.number().optional(),
  scale: z.number().optional(),
  opacity: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
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
  subtitles: z.lazy(() => SubtitleBurnOptionsSchema).optional(),
  visualizer: z.lazy(() => AudioVisualizerOptionsSchema).optional(),
  kenBurns: z.lazy(() => KenBurnsOptionsSchema).optional(),
  ducking: z.lazy(() => AudioDuckingOptionsSchema).optional(),
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

// --- Image Compositing & Advanced Distortions ---
export const Point2DSchema = z.tuple([z.number(), z.number()]);
export type Point2D = z.infer<typeof Point2DSchema>;

export const PerspectiveQuadSchema = z.tuple([
  Point2DSchema,
  Point2DSchema,
  Point2DSchema,
  Point2DSchema
]);
export type PerspectiveQuad = z.infer<typeof PerspectiveQuadSchema>;

export const PerspectiveWarpSchema = z.object({
  srcQuad: PerspectiveQuadSchema.optional(),
  dstQuad: PerspectiveQuadSchema,
  resample: z.enum(["ewa", "bicubic", "bilinear", "point"]).optional().default("ewa"),
  background: z.string().optional()
});
export type PerspectiveWarp = z.infer<typeof PerspectiveWarpSchema>;

export const DisplacementMapSchema = z.object({
  mapImage: z.string().describe("Path, URL, or base64 data URI of the displacement map image"),
  xScale: z.number().describe("Horizontal displacement scale in pixels"),
  yScale: z.number().describe("Vertical displacement scale in pixels")
});
export type DisplacementMap = z.infer<typeof DisplacementMapSchema>;

export const ArcDistortSchema = z.object({
  angle: z.number().describe("Arc angle in degrees (e.g. 60, 180, 360)"),
  rotation: z.number().optional().default(0).describe("Starting angle rotation in degrees"),
  radius: z.number().optional().describe("Top radius in pixels"),
  background: z.string().optional()
});
export type ArcDistort = z.infer<typeof ArcDistortSchema>;

export const AutoFitCaptionSchema = z.object({
  text: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  font: z.string().optional(),
  textColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  gravity: z.enum(["NorthWest", "North", "NorthEast", "West", "Center", "East", "SouthWest", "South", "SouthEast"]).optional().default("Center"),
  position: z.object({
    x: z.number().optional(),
    y: z.number().optional()
  }).optional()
});
export type AutoFitCaption = z.infer<typeof AutoFitCaptionSchema>;

export const AnimatedGifCompositeSchema = z.object({
  delayMs: z.number().int().positive().optional(),
  loop: z.number().int().min(0).optional().default(0),
  dither: z.enum(["FloydSteinberg", "Riemersma", "None"]).optional().default("FloydSteinberg"),
  coalesce: z.boolean().optional().default(true)
});
export type AnimatedGifComposite = z.infer<typeof AnimatedGifCompositeSchema>;

export const ImageOverlayOptionsSchema = z.object({
  x: z.union([z.number(), z.string()]).optional(),
  y: z.union([z.number(), z.string()]).optional(),
  position: z.union([z.string(), z.object({ x: z.number().optional(), y: z.number().optional() })]).optional(),
  padding: z.number().optional(),
  scale: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  gravity: z.enum(["northwest", "north", "northeast", "west", "center", "east", "southwest", "south", "southeast"]).optional(),
  blend: z.enum(["over", "in", "out", "atop", "xor", "multiply", "screen", "overlay", "darken", "lighten"]).optional(),
  opacity: z.number().optional()
});
export type ImageOverlayOptions = z.infer<typeof ImageOverlayOptionsSchema>;

export const ImagePipelineSchema = z.object({
  fit: z.object({
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    aspectRatio: AspectRatioSchema.optional(),
    fit: z.enum(["cover", "contain", "fill", "inside", "outside"]).optional(),
    background: z.string().optional()
  }).optional(),
  textOverlay: TextOverlaySchema.optional(),
  watermark: z.union([WatermarkSchema, z.string()]).optional(),
  imageOverlays: z.array(z.object({
    image: z.string(),
    options: ImageOverlayOptionsSchema.optional()
  })).optional(),
  perspectiveWarp: PerspectiveWarpSchema.optional(),
  displacementMap: DisplacementMapSchema.optional(),
  arcDistort: ArcDistortSchema.optional(),
  autoFitCaption: AutoFitCaptionSchema.optional(),
  animatedGif: AnimatedGifCompositeSchema.optional(),
  traceVector: z.lazy(() => VectorTraceOptionsSchema).optional(),
  output: z.object({
    format: z.enum(["png", "jpeg", "webp", "avif", "gif", "svg"]).optional(),
    quality: z.number().int().min(1).max(100).optional()
  }).optional()
});
export type ImagePipeline = z.infer<typeof ImagePipelineSchema>;

export const ImageCompositingSchema = z.object({
  textOverlay: TextOverlaySchema.optional(),
  watermark: WatermarkSchema.optional(),
  fit: z.enum(["cover", "contain", "fill", "inside", "outside"]).optional(),
  targetWidth: z.number().int().optional(),
  targetHeight: z.number().int().optional(),
  format: z.enum(["png", "jpeg", "webp", "avif", "gif", "svg"]).optional(),
  quality: z.number().int().min(1).max(100).optional(),
  perspectiveWarp: PerspectiveWarpSchema.optional(),
  displacementMap: DisplacementMapSchema.optional(),
  arcDistort: ArcDistortSchema.optional(),
  autoFitCaption: AutoFitCaptionSchema.optional(),
  animatedGif: AnimatedGifCompositeSchema.optional(),
  traceVector: z.lazy(() => VectorTraceOptionsSchema).optional()
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

export const InternalComponentDependencySchema = z.object({
  type: z.literal("surreal"),
  componentTypeId: z.string().describe("Slug of target component type (e.g. 'button')"),
  aestheticId: z.string().optional().describe("Aesthetic style ID (e.g. 'glassmorphism')"),
  variantId: z.string().optional().describe("Variant ID (e.g. 'glass-action-button')"),
  versionRange: z.string().default("^1.0.0").describe("Semver range required"),
  importedAs: z.string().describe("Local identifier name (e.g. 'Button')")
});
export type InternalComponentDependency = z.infer<typeof InternalComponentDependencySchema>;

export const ExternalPackageDependencySchema = z.object({
  type: z.literal("npm"),
  packageName: z.string().describe("NPM package name (e.g. 'bits-ui', '@radix-ui/react-dialog')"),
  versionRange: z.string().default("^1.0.0").describe("Semver range (e.g. '^1.0.0', '^1.1.2')"),
  isPeerDependency: z.boolean().default(false),
  importSpecifiers: z.array(z.string()).optional()
});
export type ExternalPackageDependency = z.infer<typeof ExternalPackageDependencySchema>;

export const ComponentDependencySchema = z.discriminatedUnion("type", [
  InternalComponentDependencySchema,
  ExternalPackageDependencySchema
]);
export type ComponentDependency = z.infer<typeof ComponentDependencySchema>;

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
  dependencies: z
    .object({
      svelte: z.array(ComponentDependencySchema).default([]),
      react: z.array(ComponentDependencySchema).default([]),
      webcomponent: z.array(ComponentDependencySchema).default([])
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
  dependencies: z
    .object({
      svelte: z.array(ComponentDependencySchema).default([]),
      react: z.array(ComponentDependencySchema).default([]),
      webcomponent: z.array(ComponentDependencySchema).default([])
    })
    .optional(),
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
  dependencies: z.array(ComponentDependencySchema).default([]),
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
export type UIGenerationOptionsPayload = z.input<typeof UIGenerationOptionsSchema>;


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
export const ServiceClientSchema = z.enum(["pixerate", "slopmachine", "social", "surrealui", "surreal-ui", "symphonia", "flair", "operative", "uchiage", "unknown"]);
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
  examples?: string[];
  suggestions?: string[];
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

export const BaseFormControlSchema = z.object({
  id: z.string(),
  type: FormControlTypeSchema,
  label: z.string(),
  description: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
  examples: z.array(z.string()).optional(),
  suggestions: z.array(z.string()).optional(),
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
  condition: ConditionSchema.optional()
});

export const FormControlSchema: z.ZodType<FormControl> = BaseFormControlSchema.extend({
  itemControls: z.array(BaseFormControlSchema).optional(),
  controls: z.array(BaseFormControlSchema).optional()
});

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

// --- Subtitles & Captions ---
export const SubtitleFormatSchema = z.enum(["srt", "vtt", "ass"]);
export type SubtitleFormat = z.infer<typeof SubtitleFormatSchema>;

export const SubtitleBurnOptionsSchema = z.object({
  subtitlePath: z.string().optional(),
  subtitleContent: z.string().optional(),
  format: SubtitleFormatSchema.optional(),
  fontSize: z.number().optional(),
  fontName: z.string().optional(),
  fontColor: z.string().optional(),
  primaryColor: z.string().optional(),
  outlineColor: z.string().optional(),
  outlineWidth: z.number().optional(),
  alignment: z.number().int().optional(),
  marginV: z.number().int().optional(),
  karaoke: z.boolean().optional()
});
export type SubtitleBurnOptions = z.infer<typeof SubtitleBurnOptionsSchema>;

// --- Audio Visualizers ---
export const AudioVisualizerTypeSchema = z.enum(["waves", "spectrum", "bars"]);
export type AudioVisualizerType = z.infer<typeof AudioVisualizerTypeSchema>;

export const AudioVisualizerOptionsSchema = z.object({
  type: AudioVisualizerTypeSchema.optional().default("waves"),
  width: z.number().int().positive().optional().default(1280),
  height: z.number().int().positive().optional().default(720),
  fps: z.number().int().positive().optional().default(30),
  colors: z.string().optional(),
  mode: z.enum(["point", "line", "p2p", "cline"]).optional(),
  scale: z.enum(["lin", "sqrt", "cbrt", "log"]).optional(),
  background: z.string().optional(),
  crf: z.number().optional(),
  preset: z.string().optional()
});
export type AudioVisualizerOptions = z.input<typeof AudioVisualizerOptionsSchema>;


// --- Ken Burns Motion ---
export const KenBurnsOptionsSchema = z.object({
  durationSeconds: z.number().positive().optional().default(5),
  fps: z.number().int().positive().optional().default(30),
  width: z.number().int().positive().optional().default(1920),
  height: z.number().int().positive().optional().default(1080),
  direction: z.enum(["in", "out"]).optional(),
  zoomDirection: z.enum(["in", "out", "none"]).optional().default("in"),
  zoomSpeed: z.number().optional(),
  pan: z.enum(["center", "left-to-right", "right-to-left", "top-to-bottom", "bottom-to-top"]).optional(),
  panDirection: z.enum(["top-to-bottom", "bottom-to-top", "left-to-right", "right-to-left", "center", "none"]).optional().default("center"),
  maxZoom: z.number().min(1).max(3).optional().default(1.2)
});
export type KenBurnsOptions = z.input<typeof KenBurnsOptionsSchema>;

// --- Audio Ducking, Mastering & Normalization ---
export const AudioDuckingOptionsSchema = z.object({
  duckingDb: z.number().optional().default(14),
  attackMs: z.number().optional().default(20),
  releaseMs: z.number().optional().default(250),
  threshold: z.number().optional().default(0.125),
  crf: z.number().optional(),
  preset: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional()
});
export type AudioDuckingOptions = z.input<typeof AudioDuckingOptionsSchema>;

export const AudioNormalizationOptionsSchema = z.object({
  targetLufs: z.number().optional().default(-14),
  truePeak: z.number().optional().default(-1.5),
  loudnessRange: z.number().optional().default(11),
  audioCodec: z.string().optional().default("aac"),
  bitrate: z.string().optional()
});
export type AudioNormalizationOptions = z.input<typeof AudioNormalizationOptionsSchema>;

export const AudioSilenceTrimOptionsSchema = z.object({
  silenceThresholdDb: z.number().optional().default(-50),
  minSilenceDuration: z.number().optional().default(0.5),
  startThresholdDb: z.number().optional(),
  startDurationSeconds: z.number().optional(),
  stopThresholdDb: z.number().optional(),
  stopDurationSeconds: z.number().optional(),
  trimBeginning: z.boolean().optional(),
  trimEnding: z.boolean().optional()
});
export type AudioSilenceTrimOptions = z.input<typeof AudioSilenceTrimOptionsSchema>;

// --- Media Probing ---
export const MediaProbeResultSchema = z.object({
  format: z.string().optional(),
  durationSeconds: z.number().optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  fps: z.number().optional(),
  framerate: z.number().optional(),
  bitrate: z.number().optional(),
  aspectRatio: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional(),
  audioChannels: z.number().int().optional(),
  sampleRate: z.number().int().optional(),
  audioSampleRate: z.number().int().optional(),
  sizeBytes: z.number().int().optional(),
  streams: z.array(z.record(z.unknown())).optional()
});
export type MediaProbeResult = z.infer<typeof MediaProbeResultSchema>;

// --- Vector Tracing & Perceptual Hashing ---
export const VectorTraceOptionsSchema = z.object({
  engine: z.enum(["vtracer", "potrace"]).optional(),
  colorMode: z.enum(["color", "binary"]).optional().default("color"),
  hierarchical: z.enum(["stacked", "cutout"]).optional().default("stacked"),
  filterSpeckle: z.number().int().min(0).optional().default(4),
  colorPrecision: z.number().optional(),
  layerDifference: z.number().optional(),
  cornerThreshold: z.number().int().min(0).max(180).optional().default(60),
  lengthThreshold: z.number().optional(),
  segmentLength: z.number().min(0).optional().default(4),
  maxIterations: z.number().optional(),
  spliceThreshold: z.number().int().min(0).max(180).optional().default(45),
  pathPrecision: z.number().optional(),
  turnPolicy: z.enum(["black", "white", "left", "right", "minority", "majority"]).optional(),
  turdSize: z.number().optional(),
  alphamax: z.number().optional(),
  opticurve: z.boolean().optional(),
  opttolerance: z.number().optional(),
  scale: z.number().positive().optional().default(1)
});
export type VectorTraceOptions = z.input<typeof VectorTraceOptionsSchema>;

export const PerceptualHashAlgorithmSchema = z.enum(["ahash", "dhash"]);
export type PerceptualHashAlgorithm = z.infer<typeof PerceptualHashAlgorithmSchema>;

export const PerceptualHashOptionsSchema = z.object({
  algorithm: PerceptualHashAlgorithmSchema.optional().default("dhash"),
  method: PerceptualHashAlgorithmSchema.optional(),
  hashSize: z.number().int().min(8).max(64).optional().default(8)
});
export type PerceptualHashOptions = z.input<typeof PerceptualHashOptionsSchema>;

// --- Document Generation ---
export const DocumentGenerationOptionsSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  pageSize: z.enum(["A4", "A3", "A5", "LETTER", "LEGAL"]).optional().default("A4"),
  margins: z.object({
    top: z.number(),
    bottom: z.number(),
    left: z.number(),
    right: z.number()
  }).optional(),
  enableSyntaxHighlighting: z.boolean().optional().default(true),
  theme: z.enum(["light", "dark", "corporate", "minimal"]).optional().default("light")
});
export type DocumentGenerationOptions = z.input<typeof DocumentGenerationOptionsSchema>;

// ============================================================================
// --- Realtime Collaboration & Synchronization Schemas ---
// ============================================================================

// --- Presence & Cursors ---
export const PresenceColorSchema = z.enum([
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose"
]);
export type PresenceColor = z.infer<typeof PresenceColorSchema>;

export const PresenceStatusSchema = z.enum([
  "online",
  "idle",
  "away",
  "busy",
  "offline",
  "planning",
  "thinking",
  "executing_tool",
  "waiting_for_input",
  "waiting_for_agent",
  "streaming",
  "paused",
  "error"
]);
export type PresenceStatus = z.infer<typeof PresenceStatusSchema>;

export const ActorTypeSchema = z.enum(["human", "agent", "system"]);
export type ActorType = z.infer<typeof ActorTypeSchema>;

export const AgentActorMetadataSchema = z.object({
  role: z.string().optional(),
  parentAgentId: z.string().optional(),
  runId: z.string().optional(),
  currentTask: z.string().optional()
});
export type AgentActorMetadata = z.infer<typeof AgentActorMetadataSchema>;

export const PresenceUserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  email: z.string().optional(),
  avatarUrl: z.string().optional(),
  actorType: ActorTypeSchema.optional(),
  color: PresenceColorSchema.optional().default("blue"),
  status: PresenceStatusSchema.optional().default("online"),
  agent: AgentActorMetadataSchema.optional(),
  lastSeen: z.number().int().positive().optional().default(() => Date.now()),
  metadata: z.record(z.unknown()).optional().default({})
});
export type PresenceUser = z.infer<typeof PresenceUserSchema>;

export const ViewportTransformSchema = z.object({
  zoom: z.number().default(1),
  panX: z.number().default(0),
  panY: z.number().default(0)
});
export type ViewportTransform = z.infer<typeof ViewportTransformSchema>;

export const CursorPositionSchema = z.object({
  userId: z.string(),
  x: z.number(),
  y: z.number(),
  lastUpdate: z.number().int().positive().default(() => Date.now()),
  username: z.string().optional(),
  avatarUrl: z.string().optional(),
  color: PresenceColorSchema.optional(),
  viewport: ViewportTransformSchema.optional()
});
export type CursorPosition = z.infer<typeof CursorPositionSchema>;

export const PresenceStateSchema = z.object({
  roomId: z.string(),
  presences: z.record(PresenceUserSchema).default({}),
  cursors: z.record(CursorPositionSchema).default({})
});
export type PresenceState = z.infer<typeof PresenceStateSchema>;

export interface PresenceJoinEvent {
  key: string;
  newPresences: PresenceUser[];
}

export interface PresenceLeaveEvent {
  key: string;
  leftPresences: PresenceUser[];
}

export interface CursorUpdateEvent {
  userId: string;
  x: number;
  y: number;
  username?: string;
  avatarUrl?: string;
  color?: PresenceColor;
  viewport?: ViewportTransform;
  lastUpdate: number;
}

export interface PresenceHeartbeat {
  userId: string;
  timestamp: number;
  status: PresenceStatus;
}

// --- Viewing & Typing Indicators ---
export const ViewingIndicatorSchema = z.object({
  userId: z.string(),
  resourceId: z.string(),
  resourceType: z.enum(["board", "document", "item", "node", "canvas", "page", "field"]).default("board"),
  username: z.string().optional(),
  avatarUrl: z.string().optional(),
  color: PresenceColorSchema.optional(),
  lastSeen: z.number().int().positive().default(() => Date.now())
});
export type ViewingIndicator = z.infer<typeof ViewingIndicatorSchema>;

export const TypingIndicatorSchema = z.object({
  userId: z.string(),
  resourceId: z.string(),
  fieldName: z.string().optional(),
  username: z.string().optional(),
  avatarUrl: z.string().optional(),
  color: PresenceColorSchema.optional(),
  isTyping: z.boolean().default(true),
  timestamp: z.number().int().positive().default(() => Date.now())
});
export type TypingIndicator = z.infer<typeof TypingIndicatorSchema>;

export const FieldPresenceSchema = z.object({
  fieldId: z.string(),
  focusedBy: z.array(PresenceUserSchema).default([]),
  typingUsers: z.array(TypingIndicatorSchema).default([])
});
export type FieldPresence = z.infer<typeof FieldPresenceSchema>;

export interface ViewingChangeEvent {
  resourceId: string;
  resourceType: string;
  viewers: ViewingIndicator[];
}

export interface TypingChangeEvent {
  resourceId: string;
  fieldName?: string;
  typingUsers: TypingIndicator[];
}


// --- Record Locking & Claiming ---
export const LockStatusSchema = z.enum(["unlocked", "locked", "expired", "claimed"]);
export type LockStatus = z.infer<typeof LockStatusSchema>;

export const RecordLockInfoSchema = z.object({
  userId: z.string(),
  username: z.string().optional(),
  clientId: z.string().optional(),
  avatarUrl: z.string().optional()
});
export type RecordLockInfo = z.infer<typeof RecordLockInfoSchema>;

export const RecordLockSchema = z.object({
  id: z.string(),
  resourceId: z.string(),
  resourceType: z.string().default("record"),
  lockedBy: RecordLockInfoSchema,
  lockedAt: z.number().int().positive(),
  expiresAt: z.number().int().positive(),
  leaseDurationSeconds: z.number().int().positive().default(60),
  status: LockStatusSchema.default("locked"),
  metadata: z.record(z.unknown()).optional().default({})
});
export type RecordLock = z.infer<typeof RecordLockSchema>;

export const LockClaimRequestSchema = z.object({
  resourceId: z.string(),
  resourceType: z.string().default("record"),
  userId: z.string(),
  username: z.string().optional(),
  clientId: z.string().optional(),
  avatarUrl: z.string().optional(),
  leaseDurationSeconds: z.number().int().positive().optional().default(60),
  force: z.boolean().optional().default(false),
  metadata: z.record(z.unknown()).optional().default({})
});
export type LockClaimRequest = z.infer<typeof LockClaimRequestSchema>;

export const LockReleaseRequestSchema = z.object({
  resourceId: z.string(),
  resourceType: z.string().default("record"),
  userId: z.string(),
  clientId: z.string().optional(),
  force: z.boolean().optional().default(false)
});
export type LockReleaseRequest = z.infer<typeof LockReleaseRequestSchema>;

export const LockHeartbeatRequestSchema = z.object({
  resourceId: z.string(),
  resourceType: z.string().default("record"),
  userId: z.string(),
  clientId: z.string().optional(),
  leaseDurationSeconds: z.number().int().positive().optional().default(60)
});
export type LockHeartbeatRequest = z.infer<typeof LockHeartbeatRequestSchema>;

export interface LockAcquisitionResult {
  success: boolean;
  acquired?: boolean;
  lock?: RecordLock;
  conflict?: RecordLock;
  existingLock?: RecordLock;
  reason?: "already_locked" | "unauthorized" | "channel_error" | "network_error";
  error?: string;
}

export interface LockChangeEvent {
  resourceId: string;
  resourceType: string;
  status: LockStatus;
  lock?: RecordLock;
}


// --- Activity Stream ---
export const ActivityActionTypeSchema = z.enum([
  "join",
  "leave",
  "create",
  "update",
  "delete",
  "lock",
  "unlock",
  "claim",
  "comment",
  "generate",
  "star",
  "unstar",
  "custom",
  "agent:thought",
  "agent:plan_updated",
  "agent:tool_start",
  "agent:tool_end",
  "agent:approval_requested",
  "agent:approval_resolved",
  "agent:error"
]);
export type ActivityActionType = z.infer<typeof ActivityActionTypeSchema>;

export const ActivityActorSchema = z.object({
  userId: z.string(),
  username: z.string().optional(),
  avatarUrl: z.string().optional(),
  actorType: ActorTypeSchema.optional(),
  role: z.string().optional(),
  color: PresenceColorSchema.optional()
});
export type ActivityActor = z.infer<typeof ActivityActorSchema>;

export const ActivityEventSchema = z.object({
  id: z.string(),
  roomId: z.string().optional(),
  entityId: z.string().optional(),
  entityType: z.string().optional(),
  action: ActivityActionTypeSchema,
  actor: ActivityActorSchema,
  title: z.string().optional(),
  description: z.string().optional(),
  payload: z.record(z.unknown()).optional(),
  timestamp: z.number().int().positive().default(() => Date.now()),
  metadata: z.record(z.unknown()).optional()
});
export type ActivityEvent = z.infer<typeof ActivityEventSchema>;

export const ActivityStreamFilterSchema = z.object({
  roomId: z.string().optional(),
  entityId: z.string().optional(),
  entityType: z.string().optional(),
  actorId: z.string().optional(),
  action: z.union([ActivityActionTypeSchema, z.array(ActivityActionTypeSchema)]).optional(),
  since: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional().default(50)
});
export type ActivityStreamFilter = z.infer<typeof ActivityStreamFilterSchema>;

export interface ActivitySubscriptionOptions {
  roomId?: string;
  entityId?: string;
  limit?: number;
  since?: number;
}

// --- Operational Transformation (OT) & CRDT ---
export const OTTextOpTypeSchema = z.enum(["retain", "insert", "delete"]);
export type OTTextOpType = z.infer<typeof OTTextOpTypeSchema>;

export const OTTextOpSchema = z.object({
  type: OTTextOpTypeSchema,
  count: z.number().int().nonnegative().optional(),
  text: z.string().optional(),
  attributes: z.record(z.unknown()).optional()
});
export type OTTextOp = z.infer<typeof OTTextOpSchema>;

export const OTJsonOpTypeSchema = z.enum(["set", "delete", "insert", "move", "replace"]);
export type OTJsonOpType = z.infer<typeof OTJsonOpTypeSchema>;

export const OTJsonOpSchema = z.object({
  path: z.array(z.union([z.string(), z.number()])),
  type: OTJsonOpTypeSchema,
  value: z.unknown().optional(),
  prevValue: z.unknown().optional()
});
export type OTJsonOp = z.infer<typeof OTJsonOpSchema>;

export const OTOperationSchema = z.object({
  id: z.string(),
  docId: z.string(),
  revision: z.number().int().nonnegative(),
  authorId: z.string(),
  textOps: z.array(OTTextOpSchema).optional(),
  jsonOps: z.array(OTJsonOpSchema).optional(),
  timestamp: z.number().int().positive().default(() => Date.now()),
  metadata: z.record(z.unknown()).optional().default({})
});
export type OTOperation = z.infer<typeof OTOperationSchema>;

export const OTRevisionSchema = z.object({
  docId: z.string(),
  revision: z.number().int().nonnegative(),
  snapshot: z.unknown(),
  appliedOps: z.array(OTOperationSchema).default([]),
  updatedAt: z.number().int().positive().default(() => Date.now())
});
export type OTRevision = z.infer<typeof OTRevisionSchema>;

export const CRDTSnapshotSchema = z.object({
  docId: z.string(),
  vectorClock: z.record(z.number().int().nonnegative()).default({}),
  state: z.record(z.unknown()).default({}),
  updatedAt: z.number().int().positive().default(() => Date.now())
});
export type CRDTSnapshot = z.infer<typeof CRDTSnapshotSchema>;

export interface OTTransformResult {
  op1Prime: OTTextOp[];
  op2Prime: OTTextOp[];
}

export interface VectorClock {
  [clientOrUserId: string]: number;
}

// --- Realtime Channels & Subscriptions ---
export type Topic = string;

export enum REALTIME_SUBSCRIBE_STATES {
  SUBSCRIBED = "SUBSCRIBED",
  CLOSED = "CLOSED",
  TIMED_OUT = "TIMED_OUT",
  CHANNEL_ERROR = "CHANNEL_ERROR"
}

export type ChannelCallback = (status: REALTIME_SUBSCRIBE_STATES, error?: Error) => void;

export interface RealtimeMessage<T = unknown> {
  type: string;
  event: string;
  payload: T;
}

export interface IRealtimeChannel {
  topic: string;
  state: "joined" | "joining" | "closed";
  on(type: string, filter: { event: string }, callback: (payload: any) => void): this;
  subscribe(callback?: ChannelCallback): this;
  unsubscribe(): Promise<"ok" | "error">;
  track(presence: any): void;
  untrack(): void;
  presenceState(): Record<string, any[]>;
  send(message: RealtimeMessage): Promise<void>;
}

export interface RealtimeHandlerConfig {
  inactiveTabTimeoutSeconds?: number;
  autoReconnect?: boolean;
  heartbeatIntervalMs?: number;
}

// --- Collaborative Grid / Canvas Events ---
export interface RemoteCellPresence {
  rowId: string;
  colId: string;
  user: PresenceUser;
  isEditing?: boolean;
  draftValue?: string;
  focusedAt: number;
}

export interface GridCellSelectEvent {
  rowId: string;
  colId: string;
  user: PresenceUser;
}

export interface GridCellEditStartEvent {
  rowId: string;
  colId: string;
  user: PresenceUser;
  initialValue?: string;
}

export interface GridCellDraftEvent {
  rowId: string;
  colId: string;
  userId: string;
  draftValue: string;
}

export interface GridCellBlurEvent {
  rowId: string;
  colId: string;
  userId: string;
}

export type GridOTOp =
  | { type: "set_cell"; rowId: string; colId: string; raw: string; prevRaw?: string }
  | { type: "batch_cells"; cells: Array<{ rowId: string; colId: string; raw: string }> }
  | { type: "insert_col"; index: number; column: any }
  | { type: "delete_col"; colId: string }
  | { type: "insert_row"; index: number; row: any }
  | { type: "delete_row"; rowId: string };


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

export const NotificationDeliveryRecordSchema = z.object({
  id: z.string(),
  notificationId: z.string(),
  channel: NotificationChannelSchema,
  state: NotificationDeliveryStateSchema,
  error: z.string().optional(),
  sentAt: z.union([z.string(), z.number(), z.date()]).optional(),
  deliveredAt: z.union([z.string(), z.number(), z.date()]).optional()
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
// --- Ephemeral Interactive UI Blocks ---
// ============================================================================

export const StatItemSchema = z.object({
  icon: z.string().optional(),
  label: z.string().min(1),
  value: z.string().min(1),
  delta: z.string().optional(),
  tone: z.enum(["up", "down", "neutral"]).optional()
});
export type StatItem = z.infer<typeof StatItemSchema>;

export const StatsBlockSchema = z.object({
  kind: z.literal("stats"),
  items: z.array(StatItemSchema).min(1)
});
export type StatsBlockData = z.infer<typeof StatsBlockSchema>;

export const CalloutBlockSchema = z.object({
  kind: z.literal("callout"),
  severity: z.enum(["risk", "opportunity", "info", "success"]),
  title: z.string().min(1),
  body: z.string().optional()
});
export type CalloutBlockData = z.infer<typeof CalloutBlockSchema>;

export const ActionItemSchema = z.object({
  icon: z.string().optional(),
  text: z.string().min(1),
  owner: z.string().optional(),
  due: z.string().optional()
});
export type ActionItem = z.infer<typeof ActionItemSchema>;

export const ActionsBlockSchema = z.object({
  kind: z.literal("actions"),
  title: z.string().optional(),
  items: z.array(ActionItemSchema).min(1)
});
export type ActionsBlockData = z.infer<typeof ActionsBlockSchema>;

export const ChartSeriesSchema = z.object({
  name: z.string(),
  data: z.array(z.number()),
  color: z.string().optional()
});
export type ChartSeries = z.infer<typeof ChartSeriesSchema>;

export const ChartDrilldownSchema = z.object({
  title: z.string().optional(),
  details: z.record(z.unknown()).optional(),
  followUps: z.array(z.string()).optional()
});
export type ChartDrilldown = z.infer<typeof ChartDrilldownSchema>;

export const ChartBlockSchema = z.object({
  kind: z.literal("chart"),
  chartType: z.enum(["bar", "line", "pie", "radar", "area"]),
  title: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  series: z.array(ChartSeriesSchema),
  drilldown: ChartDrilldownSchema.optional(),
  followUps: z.array(z.string()).optional()
});
export type ChartBlockData = z.infer<typeof ChartBlockSchema>;

export interface TreeNode {
  id: string;
  label?: string;
  name?: string;
  type?: string;
  subtitle?: string;
  role?: string;
  icon?: string;
  badge?: string;
  badgeTone?: "success" | "warning" | "error" | "info" | "gray";
  status?: string;
  data?: Record<string, unknown>;
  children?: TreeNode[];
}

export const TreeNodeSchema: z.ZodType<TreeNode> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    label: z.string().optional(),
    name: z.string().optional(),
    type: z.string().optional(),
    subtitle: z.string().optional(),
    role: z.string().optional(),
    icon: z.string().optional(),
    badge: z.string().optional(),
    badgeTone: z.enum(["success", "warning", "error", "info", "gray"]).optional(),
    status: z.string().optional(),
    data: z.record(z.unknown()).optional(),
    children: z.array(z.lazy(() => TreeNodeSchema)).optional()
  })
);

export const TreeEdgeSchema = z.object({
  from: z.string().optional(),
  source: z.string().optional(),
  to: z.string().optional(),
  target: z.string().optional(),
  label: z.string().optional(),
  style: z.enum(["solid", "dashed", "dotted"]).optional()
});
export type TreeEdge = z.infer<typeof TreeEdgeSchema>;

export const TreeBlockSchema = z.object({
  kind: z.enum(["tree", "node-diagram", "node_diagram", "orgchart"]).default("tree"),
  title: z.string().optional(),
  description: z.string().optional(),
  layout: z.enum(["hierarchical", "radial", "flow", "horizontal", "vertical"]).optional(),
  root: TreeNodeSchema.optional(),
  nodes: z.array(TreeNodeSchema).optional(),
  edges: z.array(TreeEdgeSchema).default([]),
  company: z.string().optional(),
  people: z.array(TreeNodeSchema).optional(),
  reports: z.array(TreeEdgeSchema).optional()
});
export type TreeBlockData = z.infer<typeof TreeBlockSchema>;

export const NodeDiagramBlockSchema = TreeBlockSchema;
export type NodeDiagramBlockData = TreeBlockData;

export const OrgChartBlockSchema = TreeBlockSchema;
export type OrgChartBlockData = TreeBlockData;
export const OrgChartPersonSchema = TreeNodeSchema;
export type OrgChartPerson = TreeNode;
export const OrgChartReportSchema = TreeEdgeSchema;
export type OrgChartReport = TreeEdge;

export const BUILT_IN_EPHEMERAL_LANGS = [
  "stats",
  "callout",
  "actions",
  "chart",
  "tree",
  "node-diagram"
] as const;
export type BuiltInEphemeralLang = (typeof BUILT_IN_EPHEMERAL_LANGS)[number];

export type BuiltInEphemeralBlockData =
  | StatsBlockData
  | CalloutBlockData
  | ActionsBlockData
  | ChartBlockData
  | TreeBlockData;

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
// --- Website Crawling & Caching ---
// ============================================================================

export const WebsiteCrawlScopeSchema = z.object({
  url: z.string(),
  maxDepth: z.number().int().min(0).max(10).optional().default(1),
  maxPages: z.number().int().min(1).max(500).optional().default(25),
  sameDomainOnly: z.boolean().optional().default(true),
  allowSubdomains: z.boolean().optional().default(false),
  pathPrefix: z.string().optional(),
  includeImages: z.boolean().optional().default(true),
  maxImagesPerPage: z.number().int().optional().default(15),
  maxImageBytes: z.number().int().optional().default(5 * 1024 * 1024),
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
  metadata: z.record(z.unknown()).optional()
});
export type SocialPostPayload = z.infer<typeof SocialPostPayloadSchema>;

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
  squareImage: z.string().optional(),
  squareImageAlt: z.string().optional(),
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



