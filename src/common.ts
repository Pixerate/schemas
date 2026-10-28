import { z } from "zod";

/**
 * Basic contracts shared by the root entry and the grouped entry points (aspect ratios,
 * resolutions, frame and attachment inputs). Grouped modules import these from here, never
 * from ./index.ts, which re-exports them and would create an import cycle.
 */

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

// --- Service Client ---
export const ServiceClientSchema = z.enum([
  "pixerate",
  "slopmachine",
  "social",
  "surrealui",
  "surreal-ui",
  "symphonia",
  "flair",
  "operative",
  "uchiage",
  "unknown"
]);
export type ServiceClient = z.infer<typeof ServiceClientSchema>;

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
