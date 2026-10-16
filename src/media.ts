import { z } from "zod";
import { AspectRatioSchema } from "./common.js";

/**
 * Media processing contracts used by @pixerate/media-core: text overlays and watermarks,
 * transcoding, video and image compositing, audio mixing, subtitles, visualizers, Ken Burns
 * motion, ducking and normalization, media probing, vector tracing, perceptual hashing and
 * document generation.
 *
 * Also available as the `@pixerate/schemas/media` entry point, which client bundles
 * should prefer: it doesn't pull in the rest of the schemas.
 */

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
