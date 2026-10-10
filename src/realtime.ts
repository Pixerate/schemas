import { z } from "zod";

/**
 * Realtime collaboration contracts used by @pixerate/realtime: presence, cursors,
 * indicators, record locks, activity, OT/CRDT, channels and grid events.
 *
 * Also available as the `@pixerate/schemas/realtime` entry point, which client bundles
 * should prefer: it doesn't pull in the rest of the schemas.
 */

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
  /**
   * Remove a listener registered with `on()`. Omitting `callback` removes every listener for
   * that type/event pair. Optional so existing adapters keep compiling.
   */
  off?(type: string, filter: { event: string }, callback?: (payload: any) => void): this;
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
