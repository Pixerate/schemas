import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  ServiceAccountSchema,
  CreateServiceAccountInputSchema,
  ApiKeyLookupSchema,
  ApiKeyOwnerTypeSchema,
  ApiKeyStatusSchema,
  ApiKeySchema,
  PublicApiKeySchema,
  CreateApiKeyInputSchema,
  ActiveAgentTaskSchema,
  AgentDirectoryEntrySchema
} from "../dist/agent.js";
import * as rootExports from "../dist/index.js";

describe("Service Account & Agent Directory Schemas", () => {
  it("re-exports all schemas from root index", () => {
    assert.equal(rootExports.ServiceAccountSchema, ServiceAccountSchema);
    assert.equal(rootExports.CreateServiceAccountInputSchema, CreateServiceAccountInputSchema);
    assert.equal(rootExports.ApiKeyLookupSchema, ApiKeyLookupSchema);
    assert.equal(rootExports.ApiKeyOwnerTypeSchema, ApiKeyOwnerTypeSchema);
    assert.equal(rootExports.ApiKeyStatusSchema, ApiKeyStatusSchema);
    assert.equal(rootExports.ApiKeySchema, ApiKeySchema);
    assert.equal(rootExports.PublicApiKeySchema, PublicApiKeySchema);
    assert.equal(rootExports.CreateApiKeyInputSchema, CreateApiKeyInputSchema);
    assert.equal(rootExports.ActiveAgentTaskSchema, ActiveAgentTaskSchema);
    assert.equal(rootExports.AgentDirectoryEntrySchema, AgentDirectoryEntrySchema);
  });

  it("validates a valid ServiceAccount record", () => {
    const valid = {
      id: "sa_123",
      orgId: "org_1",
      name: "CI Runner",
      handle: "cirunner",
      description: "Automated runner",
      role: "Service Account",
      type: "virtual_user",
      avatarUrl: "https://example.com/avatar.png",
      colorName: "indigo",
      hexColor: "#4F46E5",
      keyPrefix: "pix_live_12345...abcd",
      hashedSecret: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      projectIds: ["*"],
      createdBy: "user_1",
      createdAt: "2026-10-17T00:00:00.000Z",
      updatedAt: "2026-10-17T00:00:00.000Z",
      lastUsedAt: null,
      status: "active",
      revokedAt: null
    };
    const parsed = ServiceAccountSchema.parse(valid);
    assert.equal(parsed.id, "sa_123");
    assert.equal(parsed.type, "virtual_user");
    assert.equal(parsed.status, "active");
  });

  it("rejects invalid ServiceAccount type or status", () => {
    assert.throws(() =>
      ServiceAccountSchema.parse({
        id: "sa_123",
        orgId: "org_1",
        name: "CI Runner",
        handle: "cirunner",
        role: "Service Account",
        type: "human_user",
        keyPrefix: "pix_live_...",
        hashedSecret: "hash",
        createdBy: "user_1",
        createdAt: "2026-10-17T00:00:00.000Z",
        updatedAt: "2026-10-17T00:00:00.000Z",
        status: "active"
      })
    );
  });

  it("validates CreateServiceAccountInputSchema and ApiKeyLookupSchema", () => {
    const input = CreateServiceAccountInputSchema.parse({
      name: "Local Runner",
      handle: "local-runner",
      role: "Executor"
    });
    assert.equal(input.name, "Local Runner");

    const lookup = ApiKeyLookupSchema.parse({
      serviceAccountId: "sa_123",
      orgId: "org_1",
      status: "revoked",
      createdAt: "2026-10-17T00:00:00.000Z"
    });
    assert.equal(lookup.status, "revoked");
  });

  it("validates ActiveAgentTaskSchema and AgentDirectoryEntrySchema", () => {
    const task = ActiveAgentTaskSchema.parse({
      taskId: "task_1",
      taskTitle: "Implement auth",
      statusText: "Working on: Implement auth",
      startedAt: "2026-10-17T00:00:00.000Z"
    });
    assert.equal(task.taskId, "task_1");

    const agent = AgentDirectoryEntrySchema.parse({
      id: "agent_1",
      orgId: "org_1",
      name: "Agent Violet",
      handle: "violet",
      colorName: "violet",
      hexColor: "#A52DD7",
      role: "Planner",
      description: "Plans tasks",
      currentStatus: "Working on: Implement auth",
      currentTaskId: "task_1",
      currentTaskTitle: "Implement auth",
      isEngaged: true,
      activeTasks: [task],
      lastSeen: 1700000000000,
      createdAt: "2026-10-17T00:00:00.000Z",
      updatedAt: "2026-10-17T00:00:00.000Z"
    });
    assert.equal(agent.name, "Agent Violet");
    assert.equal(agent.activeTasks?.length, 1);
  });

  it("validates ApiKeySchema, PublicApiKeySchema, and CreateApiKeyInputSchema", () => {
    const input = CreateApiKeyInputSchema.parse({
      name: "Agent Access Token",
      createdBy: "usr_admin",
      orgId: "org_1",
      teamId: "team_1",
      scopes: ["read", "write"],
      resourceIds: ["*"],
      expiresAt: "2027-01-01T00:00:00.000Z",
      metadata: { role: "agent" }
    });
    assert.equal(input.name, "Agent Access Token");

    const fullKey = ApiKeySchema.parse({
      id: "ak_1234567890",
      name: input.name,
      keyPrefix: "pix_live_Ab12...x9Zq",
      hashedSecret: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      ownerType: "user",
      ownerId: "usr_admin",
      orgId: input.orgId,
      teamId: input.teamId,
      createdBy: input.createdBy,
      scopes: input.scopes ?? [],
      resourceIds: input.resourceIds,
      status: "active",
      metadata: input.metadata,
      createdAt: "2026-10-27T00:00:00.000Z",
      updatedAt: "2026-10-27T00:00:00.000Z",
      expiresAt: input.expiresAt,
      lastUsedAt: null,
      revokedAt: null
    });
    assert.equal(fullKey.id, "ak_1234567890");
    assert.equal(fullKey.status, "active");

    const publicKey = PublicApiKeySchema.parse(fullKey);
    assert.equal(publicKey.id, fullKey.id);
    assert.equal("hashedSecret" in publicKey, false);
  });
});
