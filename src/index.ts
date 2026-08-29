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

export const VideoOverlayStyleSchema = z.enum([
  "neubrutalist",
  "neubrutalist-dark",
  "badge",
  "meme",
  "custom",
  "none"
]);
export type VideoOverlayStyle = z.infer<typeof VideoOverlayStyleSchema>;

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

export const VideoWatermarkSchema = z.object({
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
export type VideoWatermark = z.infer<typeof VideoWatermarkSchema>;

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

export const VideoTextOverlaySchema = z.object({
  text: z.string(),
  style: VideoOverlayStyleSchema.optional(),
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
  badgePosition: z.enum(["top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"]).optional(),
  watermark: z.union([z.string(), VideoWatermarkSchema]).optional()
});
export type VideoTextOverlay = z.infer<typeof VideoTextOverlaySchema>;

export const SocialVideoGenerationSchema = z.object({
  prompt: z.string(),
  audioPrompt: z.string().optional(),
  aspectRatio: VideoAspectRatioSchema.optional(),
  durationSeconds: z.number().int().optional(),
  hook: z.union([z.string(), VideoTextOverlaySchema]).optional(),
  watermark: z.union([z.string(), VideoWatermarkSchema]).optional()
});
export type SocialVideoGenerationPayload = z.infer<typeof SocialVideoGenerationSchema>;

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

export const ImageTextOverlaySchema = VideoTextOverlaySchema;
export type ImageTextOverlay = z.infer<typeof ImageTextOverlaySchema>;

export const ImageWatermarkSchema = VideoWatermarkSchema;
export type ImageWatermark = z.infer<typeof ImageWatermarkSchema>;

export const ImageCompositingSchema = z.object({
  textOverlay: ImageTextOverlaySchema.optional(),
  watermark: ImageWatermarkSchema.optional(),
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

// --- Multi-Platform UI Component Synthesis ---
export const ComponentPropDefinitionSchema = z.object({
  name: z.string(),
  type: z.string(),
  default: z.string().optional(),
  description: z.string().optional()
});
export type ComponentPropDefinition = z.infer<typeof ComponentPropDefinitionSchema>;

export const ComponentSynthesisSchema = z.object({
  svelte5: z.string().describe("Synthesized Svelte 5 component implementation using runes"),
  reactTsx: z.string().describe("Synthesized React 19 TSX component implementation"),
  webComponent: z.string().describe("Synthesized WebComponent custom element implementation"),
  usageDocs: z.string().describe("Markdown documentation detailing props and usage patterns"),
  propsSummary: z.array(ComponentPropDefinitionSchema).describe("List of prop definitions and types"),
  supportedThemes: z.enum(["default", "light-and-dark"]).describe("Color theme support classification"),
  previewHtml: z.string().optional().describe("Self-contained interactive preview HTML harness")
});
export type ComponentSynthesisPayload = z.infer<typeof ComponentSynthesisSchema>;

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



