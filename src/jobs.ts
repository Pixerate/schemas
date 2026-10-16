import { z } from 'zod';

export const CombineImagePromptsSchema = z.object({
  fusionId: z.string().or(z.number()),
  fidelity: z.string().optional(),
});
export type CombineImagePromptsParams = z.infer<typeof CombineImagePromptsSchema>;

export const ApplyEditsSchema = z.object({
  editId: z.string().or(z.number()),
});
export type ApplyEditsParams = z.infer<typeof ApplyEditsSchema>;

export const GenerateElementSchema = z.object({
  category: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  sourceGenerationId: z.number(),
  fidelity: z.string().optional(),
  bbox: z.array(z.number()).or(z.string()).optional(),
  sourceElementId: z.string().or(z.number()).optional(),
});
export type GenerateElementParams = z.infer<typeof GenerateElementSchema>;

export const PromptToImageSchema = z.object({
  prompt: z.string(),
});
export type PromptToImageParams = z.infer<typeof PromptToImageSchema>;

export const BasicImageSchema = z.object({
  title: z.string(),
  variantPrompt: z.string().optional(),
  category: z.string().optional(),
  fidelity: z.string().optional(),
});
export type BasicImageParams = z.infer<typeof BasicImageSchema>;

export const BasicVariantSchema = z.object({
  title: z.string(),
  objectId: z.number().nullable().optional(),
  variantId: z.number().nullable().optional(),
  fidelity: z.string().optional(),
  promptChanges: z.string().optional(),
  category: z.string().optional(),
  seed: z.number().nullable().optional(),
  editableProperties: z.record(z.any()).nullable().optional(),
  generationsToIncorporate: z.array(z.any()).nullable().optional(),
});
export type BasicVariantParams = z.infer<typeof BasicVariantSchema>;

export const BasicIterationSchema = z.object({
  sourceGenerationId: z.number().nullable().optional(),
  changes: z.record(z.any()).nullable().optional(),
  category: z.string().optional(),
});
export type BasicIterationParams = z.infer<typeof BasicIterationSchema>;

export const CreatePropertiesSchema = z.object({
  variantId: z.number(),
});
export type CreatePropertiesParams = z.infer<typeof CreatePropertiesSchema>;

export const CreateLayersSchema = z.object({
  generationId: z.number(),
  imagePath: z.string().optional(),
  objectCategory: z.string().optional(),
});
export type CreateLayersParams = z.infer<typeof CreateLayersSchema>;

export const ImageToGenerationSchema = z.object({
  imageId: z.number(),
});
export type ImageToGenerationParams = z.infer<typeof ImageToGenerationSchema>;

export const VideoToGenerationSchema = z.object({
  videoId: z.number(),
});
export type VideoToGenerationParams = z.infer<typeof VideoToGenerationSchema>;

export const CreateIdeasSchema = z.object({
  text: z.string().optional(),
  imageUrl: z.string().optional(),
  maxIdeas: z.number().optional(),
  sourcenodeId: z.string().or(z.number()).optional(),
  fidelity: z.string().optional(),
  method: z.string().optional(),
});
export type CreateIdeasParams = z.infer<typeof CreateIdeasSchema>;

export const PromptToVideoSchema = z.object({
  prompt: z.string(),
  aspectRatio: z.enum(['16:9', '9:16']).optional(),
  durationSeconds: z.union([z.literal(4), z.literal(6), z.literal(8)]).optional(),
});
export type PromptToVideoParams = z.infer<typeof PromptToVideoSchema>;

// Empty params schemas for tasks that only require record id
export const EmptyParamsSchema = z.object({}).optional();
export type EmptyParams = z.infer<typeof EmptyParamsSchema>;

// Unified Schema mapped by process name
export const JobSchemaMap = {
  combine_image_prompts: CombineImagePromptsSchema,
  update_missing_variant_properties: EmptyParamsSchema,
  update_missing_variant_tags: EmptyParamsSchema,
  apply_edits: ApplyEditsSchema,
  generate_element: GenerateElementSchema,
  prompt_to_image: PromptToImageSchema,
  prompt_to_video: PromptToVideoSchema,
  basic_image: BasicImageSchema,
  basic_variant: BasicVariantSchema,
  basic_iteration: BasicIterationSchema,
  create_properties: CreatePropertiesSchema,
  create_layers: CreateLayersSchema,
  image_to_generation: ImageToGenerationSchema,
  video_to_generation: VideoToGenerationSchema,
  create_ideas: CreateIdeasSchema,
};

export type JobType = keyof typeof JobSchemaMap;

// Discriminated union representing any valid queued task
export const QueueJobSchema = z.discriminatedUnion('process', [
  z.object({ process: z.literal('combine_image_prompts'), params: CombineImagePromptsSchema }),
  z.object({ process: z.literal('update_missing_variant_properties'), params: EmptyParamsSchema }),
  z.object({ process: z.literal('update_missing_variant_tags'), params: EmptyParamsSchema }),
  z.object({ process: z.literal('apply_edits'), params: ApplyEditsSchema }),
  z.object({ process: z.literal('generate_element'), params: GenerateElementSchema }),
  z.object({ process: z.literal('prompt_to_image'), params: PromptToImageSchema }),
  z.object({ process: z.literal('prompt_to_video'), params: PromptToVideoSchema }),
  z.object({ process: z.literal('basic_image'), params: BasicImageSchema }),
  z.object({ process: z.literal('basic_variant'), params: BasicVariantSchema }),
  z.object({ process: z.literal('basic_iteration'), params: BasicIterationSchema }),
  z.object({ process: z.literal('create_properties'), params: CreatePropertiesSchema }),
  z.object({ process: z.literal('create_layers'), params: CreateLayersSchema }),
  z.object({ process: z.literal('image_to_generation'), params: ImageToGenerationSchema }),
  z.object({ process: z.literal('video_to_generation'), params: VideoToGenerationSchema }),
  z.object({ process: z.literal('create_ideas'), params: CreateIdeasSchema }),
]);

export type QueueJob = z.infer<typeof QueueJobSchema>;
