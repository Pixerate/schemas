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

// --- Audio Mixing & Processing ---
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

export const AudioMixSchema = z.object({
  inputPath: z.string(),
  tracks: z.array(AudioMixTrackSchema),
  videoVolume: z.number().optional(),
  outputPath: z.string().optional(),
  crf: z.number().optional(),
  preset: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional()
});
export type AudioMixPayload = z.infer<typeof AudioMixSchema>;

export const VideoImageOverlaySchema = z.object({
  imagePath: z.string().optional(),
  allowRuntimeAttachments: z.boolean().optional(),
  position: TextOverlayPositionSchema.optional(),
  x: z.union([z.number(), z.string()]).optional(),
  y: z.union([z.number(), z.string()]).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  opacity: z.number().min(0).max(1).optional(),
  options: VideoOverlayOptionsSchema.optional()
});
export type VideoImageOverlay = z.infer<typeof VideoImageOverlaySchema>;
export const VideoGraphicOverlaySchema = VideoImageOverlaySchema;
export type VideoGraphicOverlay = VideoImageOverlay;

export const VideoTextCompositeSchema = z.object({
  inputVideoPath: z.string(),
  outputPath: z.string().optional(),
  textOverlay: TextOverlaySchema,
  crf: z.number().optional(),
  preset: z.string().optional(),
  videoCodec: z.string().optional(),
  audioCodec: z.string().optional()
});
export type VideoTextCompositePayload = z.infer<typeof VideoTextCompositeSchema>;

export const VideoImageCompositeSchema = z.object({
  inputVideoPath: z.string(),
  overlayImagePath: z.string(),
  outputPath: z.string().optional(),
  options: VideoOverlayOptionsSchema.optional()
});
export type VideoImageCompositePayload = z.infer<typeof VideoImageCompositeSchema>;

export const VideoCompositingLayerTypeSchema = z.enum(["text", "graphic"]);
export type VideoCompositingLayerType = z.infer<typeof VideoCompositingLayerTypeSchema>;

export const VideoPipelineSchema = z.object({
  scaleAndPad: VideoScaleAndPadSchema.optional(),
  textOverlay: TextOverlaySchema.optional(),
  watermark: z.union([WatermarkSchema, z.string()]).optional(),
  imageOverlays: z.array(z.object({
    imagePath: z.string(),
    options: VideoOverlayOptionsSchema.optional()
  })).optional(),
  subtitles: z.lazy(() => SubtitleBurnOptionsSchema).optional(),
  kenBurns: z.lazy(() => KenBurnsOptionsSchema).optional(),
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

// --- Generative UI: components, design tokens, UI generation, forms and ephemeral blocks (see ./genui.ts) ---
export * from "./genui.js";

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


export const AudioVisualizerSchema = z.object({
  audioPath: z.string(),
  outputPath: z.string().optional(),
  options: AudioVisualizerOptionsSchema.optional()
});
export type AudioVisualizerPayload = z.infer<typeof AudioVisualizerSchema>;

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

export const AudioDuckingSchema = z.object({
  voicePath: z.string(),
  musicPath: z.string(),
  outputPath: z.string().optional(),
  options: AudioDuckingOptionsSchema.optional()
});
export type AudioDuckingPayload = z.infer<typeof AudioDuckingSchema>;

export const AudioNormalizationOptionsSchema = z.object({
  targetLufs: z.number().optional().default(-14),
  truePeak: z.number().optional().default(-1.5),
  loudnessRange: z.number().optional().default(11),
  audioCodec: z.string().optional().default("aac"),
  bitrate: z.string().optional()
});
export type AudioNormalizationOptions = z.input<typeof AudioNormalizationOptionsSchema>;

export const AudioNormalizationSchema = z.object({
  inputPath: z.string(),
  outputPath: z.string().optional(),
  options: AudioNormalizationOptionsSchema.optional()
});
export type AudioNormalizationPayload = z.infer<typeof AudioNormalizationSchema>;

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

// --- Realtime Collaboration & Synchronization Schemas (see ./realtime.ts) ---
export * from "./realtime.js";

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



