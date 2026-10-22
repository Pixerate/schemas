import { z } from "zod";

/**
 * Generative UI contracts used by @pixerate/genui-core: multi-platform components, design
 * tokens, UI component generation, generative forms and ephemeral interactive UI blocks.
 *
 * Also available as the `@pixerate/schemas/genui` entry point, which client bundles
 * should prefer: it doesn't pull in the rest of the schemas.
 */

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

// Flat map of scalar settings. A concrete type keeps the JSON Schema bounded:
// `z.any()` becomes `{}`, which leaves Gemini's constrained decoding unbounded
// and stalls generation when the schema is sent as `responseJsonSchema`.
export const FormConfigValueSchema = z.union([z.string(), z.number(), z.boolean()]);
export type FormConfigValue = z.infer<typeof FormConfigValueSchema>;

export const FormConfigSchema = z.record(FormConfigValueSchema);
export type FormConfig = z.infer<typeof FormConfigSchema>;

/**
 * Coerces a stored `config` of any older shape into a `FormConfig`.
 * Scalars are kept, nulls are dropped, nested values are JSON-encoded, and a
 * non-object config is wrapped as `{ value }`.
 */
export function normalizeFormConfig(value: unknown): FormConfig | undefined {
  if (value === undefined || value === null) return undefined;
  const toScalar = (entry: unknown): FormConfigValue | undefined => {
    if (entry === undefined || entry === null) return undefined;
    if (typeof entry === "string" || typeof entry === "boolean") return entry;
    if (typeof entry === "number") return Number.isFinite(entry) ? entry : String(entry);
    return JSON.stringify(entry);
  };
  if (typeof value !== "object" || Array.isArray(value)) {
    const scalar = toScalar(value);
    return scalar === undefined ? undefined : { value: scalar };
  }
  const config: FormConfig = {};
  for (const [key, entry] of Object.entries(value)) {
    const scalar = toScalar(entry);
    if (scalar !== undefined) config[key] = scalar;
  }
  return config;
}

const OptionalFormConfigSchema = z.preprocess(normalizeFormConfig, FormConfigSchema.optional());

export const FormValidatorSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  fields: z.array(z.string()).optional(),
  severity: z.union([z.enum(["error", "warning"]), z.string()]).optional(),
  type: z.string().optional(),
  config: OptionalFormConfigSchema
});
export type FormValidator = z.infer<typeof FormValidatorSchema>;

export const FormHandoffActionSchema = z.object({
  id: z.string().optional(),
  label: z.string().optional(),
  destination: z.string().optional(),
  condition: z.union([ConditionSchema, z.string()]).optional(),
  payloadFields: z.array(z.string()).optional(),
  type: z.string().optional(),
  config: OptionalFormConfigSchema
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

export const ProposalItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  rationale: z.string().optional(),
  status: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  estimatedHours: z.number().optional()
});
export type ProposalItem = z.infer<typeof ProposalItemSchema>;

export const ProposalsBlockSchema = z.object({
  kind: z.enum(["proposals", "followup", "follow-up"]).default("proposals"),
  title: z.string().optional(),
  description: z.string().optional(),
  items: z.array(ProposalItemSchema).min(1)
});
export type ProposalsBlockData = z.infer<typeof ProposalsBlockSchema>;

/**
 * A selectable choice with a stable id. Used by form questions (`FormQuestion.choices`) and,
 * as the same contract, by structured elicitation (`ElicitationOption`, which adds `preview`).
 */
export const FormChoiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  isRecommended: z.boolean().optional()
});
export type FormChoice = z.infer<typeof FormChoiceSchema>;

export const FormQuestionSchema = z.object({
  id: z.string().optional(),
  label: z.string().optional(),
  question: z.string().optional(),
  /** `rank`: order every choice; the submitted value is the list of choice ids in rank order. */
  type: z.enum(["text", "textarea", "radio", "select", "checkbox", "rank"]).optional(),
  /** Plain string choices. Prefer `choices` when the answer needs stable ids or descriptions. */
  options: z.array(z.string()).optional(),
  /** Choices with stable ids. When present, hosts submit choice ids instead of labels. */
  choices: z.array(FormChoiceSchema).optional(),
  /** Allow a free-text answer alongside (or instead of) the listed choices. */
  allowCustom: z.boolean().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  defaultValue: z.any().optional()
});
export type FormQuestion = z.infer<typeof FormQuestionSchema>;

export const FormBlockSchema = z.object({
  kind: z.enum(["form", "clarification", "question"]).default("form"),
  title: z.string().optional(),
  description: z.string().optional(),
  questions: z.array(FormQuestionSchema).optional(),
  fields: z.array(FormQuestionSchema).optional(),
  submitLabel: z.string().optional()
});
export type FormBlockData = z.infer<typeof FormBlockSchema>;

// --- Structured Elicitation ---
// A structured clarification question an agent asks instead of an open-ended one. It's a
// one-question form: hosts can render it as a `clarification` form block (see
// `elicitationToFormBlock` in @pixerate/genui-core), and its options are `FormChoice`s.
// Mark the recommended option with `isRecommended` and list it first. Hosts supply their own
// "Other" entry when `allowCustomResponse` is set, so don't add one to `options`.

export const ElicitationQuestionTypeSchema = z.enum(["single_select", "multi_select", "free_form", "rank_priorities"]);
export type ElicitationQuestionType = z.infer<typeof ElicitationQuestionTypeSchema>;

/** Fewest and most options a choice question (anything but `free_form`) may offer. */
export const ELICITATION_MIN_OPTIONS = 2;
export const ELICITATION_MAX_OPTIONS = 4;
/** Most questions in one `ElicitationBatch`. */
export const ELICITATION_MAX_BATCH_QUESTIONS = 4;
/** Longest `header` chip label. */
export const ELICITATION_HEADER_MAX_LENGTH = 12;

export const ElicitationOptionSchema = FormChoiceSchema.extend({
  /**
   * Content shown while the option is focused, such as a code snippet or a mockup.
   * Only valid on `single_select` questions.
   */
  preview: z.string().optional()
});
export type ElicitationOption = z.infer<typeof ElicitationOptionSchema>;

function addDuplicateIssues(ids: string[], path: string, label: string, ctx: z.RefinementCtx) {
  const seen = new Set<string>();
  ids.forEach((id, index) => {
    if (seen.has(id)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path, index], message: `Duplicate ${label} "${id}".` });
    }
    seen.add(id);
  });
}

export const ElicitationRequestSchema = z
  .object({
    id: z.string(),
    question: z.string(),
    /** Short chip label for the question, e.g. "Auth method". */
    header: z.string().max(ELICITATION_HEADER_MAX_LENGTH).optional(),
    type: ElicitationQuestionTypeSchema,
    /**
     * `ELICITATION_MIN_OPTIONS`–`ELICITATION_MAX_OPTIONS` options with unique ids; `free_form`
     * may have none.
     */
    options: z.array(ElicitationOptionSchema),
    contextRationale: z.string().optional(),
    allowCustomResponse: z.boolean().optional()
  })
  .superRefine((request, ctx) => {
    if (request.type !== "free_form") {
      const count = request.options.length;
      if (count < ELICITATION_MIN_OPTIONS || count > ELICITATION_MAX_OPTIONS) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["options"],
          message: `A ${request.type} question must offer ${ELICITATION_MIN_OPTIONS} to ${ELICITATION_MAX_OPTIONS} options (got ${count}).`
        });
      }
    }
    addDuplicateIssues(request.options.map((o) => o.id), "options", "option id", ctx);
    if (request.type !== "single_select") {
      request.options.forEach((option, index) => {
        if (option.preview !== undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["options", index, "preview"],
            message: "Option previews are only valid on single_select questions."
          });
        }
      });
    }
  });
export type ElicitationRequest = z.infer<typeof ElicitationRequestSchema>;

export const ElicitationResponseSchema = z.object({
  requestId: z.string(),
  selectedOptionIds: z.array(z.string()).optional(),
  customText: z.string().optional(),
  rankings: z.array(z.string()).optional()
});
export type ElicitationResponse = z.infer<typeof ElicitationResponseSchema>;

/** Several related questions asked together, answered with one `ElicitationBatchResponse`. */
export const ElicitationBatchSchema = z
  .object({
    id: z.string(),
    questions: z.array(ElicitationRequestSchema).min(1).max(ELICITATION_MAX_BATCH_QUESTIONS)
  })
  .superRefine((batch, ctx) => {
    addDuplicateIssues(batch.questions.map((q) => q.id), "questions", "question id", ctx);
  });
export type ElicitationBatch = z.infer<typeof ElicitationBatchSchema>;

/** One `ElicitationResponse` per answered question, keyed by `requestId`. */
export const ElicitationBatchResponseSchema = z
  .object({
    batchId: z.string(),
    responses: z.array(ElicitationResponseSchema).min(1).max(ELICITATION_MAX_BATCH_QUESTIONS)
  })
  .superRefine((response, ctx) => {
    addDuplicateIssues(response.responses.map((r) => r.requestId), "responses", "requestId", ctx);
  });
export type ElicitationBatchResponse = z.infer<typeof ElicitationBatchResponseSchema>;

export const BUILT_IN_EPHEMERAL_LANGS = [
  "stats",
  "callout",
  "actions",
  "chart",
  "tree",
  "node-diagram",
  "proposals",
  "followup",
  "form",
  "clarification",
  "question"
] as const;
export type BuiltInEphemeralLang = (typeof BUILT_IN_EPHEMERAL_LANGS)[number];

export type BuiltInEphemeralBlockData =
  | StatsBlockData
  | CalloutBlockData
  | ActionsBlockData
  | ChartBlockData
  | TreeBlockData
  | ProposalsBlockData
  | FormBlockData;

// --- SVG and Animated SVG Generation ---
export const SvgStyleArchetypeSchema = z.enum([
  "minimalist",
  "neubrutalist",
  "skeuomorphic",
  "flat",
  "custom",
  "prompt-driven"
]);
export type SvgStyleArchetype = z.infer<typeof SvgStyleArchetypeSchema>;

export const SvgReferenceArtifactSchema = z.object({
  type: z.enum(["image", "video", "document"]).describe("Reference artifact type"),
  url: z.string().describe("Asset URL or data URL"),
  mimeType: z.string().optional().describe("MIME type if known"),
  description: z.string().optional().describe("Contextual description or role of this reference")
});
export type SvgReferenceArtifact = z.infer<typeof SvgReferenceArtifactSchema>;

export const SvgPaletteTokensSchema = z.object({
  canvasBg: z.string().optional().describe("Canvas background color (default transparent)"),
  chassis: z.string().optional().describe("Main body / subject color"),
  stroke: z.string().optional().describe("Primary stroke color"),
  accent1: z.string().optional().describe("Primary accent color"),
  accent2: z.string().optional().describe("Secondary accent color"),
  shadow: z.string().optional().describe("Shadow color with opacity"),
  custom: z.record(z.string()).optional().describe("Additional custom CSS color variables")
});
export type SvgPaletteTokens = z.infer<typeof SvgPaletteTokensSchema>;

export const KineticBlueprintSchema = z.object({
  title: z.string().optional().describe("Title of the kinetic illustration"),
  loopDurationMs: z.number().positive().describe("Harmonic time base loop duration in milliseconds (e.g. 2400, 3600, 4800)"),
  motionPersonality: z.string().describe("Motion personality (e.g. bouncy, snappy, smooth, mechanical, organic)"),
  styleArchetype: SvgStyleArchetypeSchema.optional().describe("Visual style archetype derived from references or prompt"),
  palette: SvgPaletteTokensSchema.describe("Palette color tokens for adaptive theming"),
  primaryAnchor: z.string().describe("Primary anchor animation cycle (e.g. idle breathing, floating, or rotating cycle)"),
  secondaryMechanics: z.array(z.string()).optional().describe("Secondary mechanics (e.g. conveyors, gears, fluid flow)"),
  eventActions: z.array(z.string()).optional().describe("Event actions (e.g. droplets, sparks, pulses with delays)"),
  ambientParticles: z.array(z.string()).optional().describe("Ambient particles drifting with staggered offsets")
});
export type KineticBlueprint = z.infer<typeof KineticBlueprintSchema>;

export const SvgValidationCheckSchema = z.object({
  selfContained: z.boolean().describe("Whether the SVG contains no external url() or scripts"),
  responsive: z.boolean().describe("Whether viewBox is defined with width/height 100%"),
  stackingOrderValid: z.boolean().describe("Whether foreground and labels sit at the end of the DOM"),
  transformIsolated: z.boolean().describe("Whether animated elements separate coordinate translate from keyframe motion"),
  boundaryClamped: z.boolean().describe("Whether moving elements stay within canvas bounds"),
  dualThemeVerified: z.boolean().describe("Whether dark mode media query and CSS custom properties are properly defined")
});
export type SvgValidationCheck = z.infer<typeof SvgValidationCheckSchema>;

export const VisualQAAuditSchema = z.object({
  passed: z.boolean().describe("Whether visual QA passed all criteria"),
  checks: SvgValidationCheckSchema.optional(),
  frameSlicesCount: z.number().int().nonnegative().optional().describe("Number of frame slices captured and audited"),
  issues: z.array(z.string()).default([]).describe("Issues detected during static or multimodal visual audit"),
  recommendations: z.array(z.string()).default([]).describe("Refinement suggestions applied or needed")
});
export type VisualQAAudit = z.infer<typeof VisualQAAuditSchema>;

export const SvgGenerationOptionsSchema = z.object({
  prompt: z.string().describe("User prompt describing the SVG subject, style, and motion"),
  animated: z.boolean().optional().default(true).describe("Whether to generate an animated SVG or static SVG"),
  currentSvg: z.string().optional().describe("Existing SVG for iterative modification"),
  archetype: SvgStyleArchetypeSchema.optional().describe("Preferred stylistic archetype"),
  viewBox: z.string().optional().default("0 0 512 512").describe("SVG viewBox dimensions"),
  loopDurationMs: z.number().optional().describe("Target loop duration in ms (default 3600ms)"),
  references: z.array(SvgReferenceArtifactSchema).optional().describe("Reference artifacts (video/image/document)"),
  visualQA: z.boolean().optional().default(true).describe("Whether to run the visual QA audit loop"),
  maxRetries: z.number().int().nonnegative().optional().default(2).describe("Maximum retries for visual/code refinement"),
  systemPrompt: z.string().optional().describe("Custom system prompt override"),
  temperature: z.number().optional().describe("Model temperature")
});
export type SvgGenerationOptionsPayload = z.input<typeof SvgGenerationOptionsSchema>;

export const SvgGenerationResultSchema = z.object({
  svg: z.string().describe("Clean, self-contained SVG markup"),
  animated: z.boolean().describe("Whether the SVG is animated"),
  viewBox: z.string().describe("ViewBox of the generated SVG"),
  blueprint: KineticBlueprintSchema.optional().describe("Kinetic blueprint generated for animated SVG"),
  qaAudit: VisualQAAuditSchema.optional().describe("Visual QA audit results"),
  rawOutput: z.string().optional().describe("Raw LLM output")
});
export type SvgGenerationResult = z.infer<typeof SvgGenerationResultSchema>;

