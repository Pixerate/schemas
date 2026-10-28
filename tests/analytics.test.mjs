import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  AnalyticsEventSchema,
  AnalyticsEventNameSchema,
  AnalyticsItemTypeSchema,
  AnalyticsMediaTypeSchema,
  AnalyticsEcommerceItemSchema,
  AnalyticsUserPropertiesSchema,
  BaseAnalyticsEventSchema,
  BaseAnalyticsUserPropertiesSchema,
  SignUpEventSchema,
  LoginEventSchema,
  JoinWaitlistEventSchema,
  WaitlistApprovedEventSchema,
  OnboardedEventSchema,
  TutorialBeginEventSchema,
  OnboardingStepEventSchema,
  OnboardingMilestoneEventSchema,
  TutorialCompleteEventSchema,
  CreateItemEventSchema,
  GenerateEventSchema,
  RunAgentEventSchema,
  SaveVersionEventSchema,
  PublishEventSchema,
  ShareEventSchema,
  InviteMemberEventSchema,
  JoinTeamEventSchema,
  SubmitFeedbackEventSchema,
  BeginCheckoutEventSchema,
  PurchaseEventSchema,
  PageViewEventSchema
} from "../dist/analytics.js";
import * as rootExports from "../dist/index.js";

describe("Analytics Schemas & PII Guard", () => {
  it("re-exports all analytics schemas from root index", () => {
    assert.equal(rootExports.AnalyticsEventSchema, AnalyticsEventSchema);
    assert.equal(rootExports.AnalyticsEventNameSchema, AnalyticsEventNameSchema);
    assert.equal(rootExports.AnalyticsItemTypeSchema, AnalyticsItemTypeSchema);
    assert.equal(rootExports.AnalyticsMediaTypeSchema, AnalyticsMediaTypeSchema);
    assert.equal(rootExports.AnalyticsEcommerceItemSchema, AnalyticsEcommerceItemSchema);
    assert.equal(rootExports.AnalyticsUserPropertiesSchema, AnalyticsUserPropertiesSchema);
    assert.equal(rootExports.BaseAnalyticsEventSchema, BaseAnalyticsEventSchema);
    assert.equal(rootExports.BaseAnalyticsUserPropertiesSchema, BaseAnalyticsUserPropertiesSchema);
    assert.equal(rootExports.SignUpEventSchema, SignUpEventSchema);
    assert.equal(rootExports.LoginEventSchema, LoginEventSchema);
    assert.equal(rootExports.JoinWaitlistEventSchema, JoinWaitlistEventSchema);
    assert.equal(rootExports.WaitlistApprovedEventSchema, WaitlistApprovedEventSchema);
    assert.equal(rootExports.OnboardedEventSchema, OnboardedEventSchema);
    assert.equal(rootExports.TutorialBeginEventSchema, TutorialBeginEventSchema);
    assert.equal(rootExports.OnboardingStepEventSchema, OnboardingStepEventSchema);
    assert.equal(rootExports.OnboardingMilestoneEventSchema, OnboardingMilestoneEventSchema);
    assert.equal(rootExports.TutorialCompleteEventSchema, TutorialCompleteEventSchema);
    assert.equal(rootExports.CreateItemEventSchema, CreateItemEventSchema);
    assert.equal(rootExports.GenerateEventSchema, GenerateEventSchema);
    assert.equal(rootExports.RunAgentEventSchema, RunAgentEventSchema);
    assert.equal(rootExports.SaveVersionEventSchema, SaveVersionEventSchema);
    assert.equal(rootExports.PublishEventSchema, PublishEventSchema);
    assert.equal(rootExports.ShareEventSchema, ShareEventSchema);
    assert.equal(rootExports.InviteMemberEventSchema, InviteMemberEventSchema);
    assert.equal(rootExports.JoinTeamEventSchema, JoinTeamEventSchema);
    assert.equal(rootExports.SubmitFeedbackEventSchema, SubmitFeedbackEventSchema);
    assert.equal(rootExports.BeginCheckoutEventSchema, BeginCheckoutEventSchema);
    assert.equal(rootExports.PurchaseEventSchema, PurchaseEventSchema);
    assert.equal(rootExports.PageViewEventSchema, PageViewEventSchema);
  });

  describe("Event Catalogue - Valid and Invalid Cases per Event", () => {
    // 1. sign_up
    it("validates sign_up event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "sign_up", params: { method: "google" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "sign_up" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "sign_up", params: { method: 123 } }));
    });

    // 2. login
    it("validates login event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "login", params: { method: "password" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "login" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "login", params: { method: 123 } }));
    });

    // 3. join_waitlist
    it("validates join_waitlist event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "join_waitlist", params: { source: "twitter", role_preference: "creator" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "join_waitlist" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "join_waitlist", params: { source: 123 } }));
    });

    // 4. waitlist_approved
    it("validates waitlist_approved event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "waitlist_approved", params: { role_preference: "designer" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "waitlist_approved" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "waitlist_approved", params: { role_preference: 123 } }));
    });

    // 5. onboarded
    it("validates onboarded event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "onboarded", params: { role_preference: "developer" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "onboarded" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "onboarded", params: { role_preference: 123 } }));
    });

    // 6. tutorial_begin
    it("validates tutorial_begin event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "tutorial_begin", params: { tutorial_id: "intro_101" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "tutorial_begin" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "tutorial_begin", params: { tutorial_id: 123 } }));
    });

    // 7. onboarding_step
    it("validates onboarding_step event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "onboarding_step", params: { step: "connect_wallet", skipped: false } }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "onboarding_step", params: { skipped: true } }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "onboarding_step" }));
    });

    // 8. onboarding_milestone
    it("validates onboarding_milestone event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "onboarding_milestone", params: { milestone: "first_silo" } }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "onboarding_milestone", params: {} }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "onboarding_milestone" }));
    });

    // 9. tutorial_complete
    it("validates tutorial_complete event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "tutorial_complete", params: { tutorial_id: "intro_101" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "tutorial_complete" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "tutorial_complete", params: { tutorial_id: 123 } }));
    });

    // 10. create_item
    it("validates create_item event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "create_item", params: { item_type: "silo" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "create_item", params: { item_type: "composition" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "create_item", params: { item_type: "workflow" } }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "create_item", params: { item_type: "unknown_item" } }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "create_item" }));
    });

    // 11. generate
    it("validates generate event", () => {
      assert.ok(AnalyticsEventSchema.parse({
        name: "generate",
        params: { model: "gemini-3.8-flash", media_type: "image", success: true, is_first: true }
      }));
      assert.throws(() => AnalyticsEventSchema.parse({
        name: "generate",
        params: { model: "gemini-3.8-flash", media_type: "audio", success: true }
      }));
      assert.throws(() => AnalyticsEventSchema.parse({
        name: "generate",
        params: { model: "gemini-3.8-flash", media_type: "image" }
      }));
    });

    // 12. run_agent
    it("validates run_agent event", () => {
      assert.ok(AnalyticsEventSchema.parse({
        name: "run_agent",
        params: { agent: "researcher", workflow: "audit", success: true }
      }));
      assert.ok(AnalyticsEventSchema.parse({ name: "run_agent" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "run_agent", params: { success: "yes" } }));
    });

    // 13. save_version
    it("validates save_version event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "save_version", params: { item_type: "exploration", version_number: 2 } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "save_version" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "save_version", params: { version_number: "v2" } }));
    });

    // 14. publish
    it("validates publish event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "publish", params: { item_type: "deliverable", method: "embed" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "publish" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "publish", params: { item_type: "invalid_type" } }));
    });

    // 15. share
    it("validates share event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "share", params: { item_type: "board", method: "link" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "share" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "share", params: { item_type: "invalid_type" } }));
    });

    // 16. invite_member
    it("validates invite_member event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "invite_member", params: { role: "admin", team_id_hash: "abcd1234" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "invite_member" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "invite_member", params: { role: 123 } }));
    });

    // 17. join_team
    it("validates join_team event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "join_team", params: { role: "member", team_id_hash: "abcd1234" } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "join_team" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "join_team", params: { role: 123 } }));
    });

    // 18. submit_feedback
    it("validates submit_feedback event", () => {
      assert.ok(AnalyticsEventSchema.parse({ name: "submit_feedback", params: { category: "ux", rating: 5 } }));
      assert.ok(AnalyticsEventSchema.parse({ name: "submit_feedback" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "submit_feedback", params: { rating: "high" } }));
    });

    // 19. begin_checkout
    it("validates begin_checkout event", () => {
      assert.ok(AnalyticsEventSchema.parse({
        name: "begin_checkout",
        params: { value: 19.99, currency: "USD", items: [{ item_id: "fuel_tier_1", price: 19.99, quantity: 1 }] }
      }));
      assert.ok(AnalyticsEventSchema.parse({ name: "begin_checkout" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "begin_checkout", params: { value: "nineteen" } }));
    });

    // 20. purchase
    it("validates purchase event", () => {
      assert.ok(AnalyticsEventSchema.parse({
        name: "purchase",
        params: {
          value: 49.99,
          currency: "USD",
          transaction_id: "txn_12345",
          items: [{ item_id: "fuel_pack_2", item_name: "Pro Fuel", price: 49.99, quantity: 1 }]
        }
      }));
      assert.throws(() => AnalyticsEventSchema.parse({
        name: "purchase",
        params: { currency: "USD", transaction_id: "txn_12345" }
      }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "purchase" }));
    });

    // 21. page_view
    it("validates page_view event", () => {
      assert.ok(AnalyticsEventSchema.parse({
        name: "page_view",
        params: { page_location: "https://pixerate.com/auth", page_title: "Sign in", page_path: "/auth" }
      }));
      assert.ok(AnalyticsEventSchema.parse({ name: "page_view" }));
      assert.throws(() => AnalyticsEventSchema.parse({ name: "page_view", params: { page_location: 123 } }));
    });
  });

  describe("GA4 Constraints & Limits", () => {
    it("rejects event when parameters exceed 25 keys", () => {
      const overLimitParams = {};
      for (let i = 0; i < 26; i++) {
        overLimitParams[`p_${i}`] = "val";
      }
      assert.throws(() => AnalyticsEventSchema.parse({ name: "sign_up", params: overLimitParams }), /more than 25 parameters/);
    });

    it("rejects param names exceeding 40 characters", () => {
      const longKey = "a".repeat(41);
      assert.throws(() => AnalyticsEventSchema.parse({ name: "sign_up", params: { [longKey]: "val" } }), /exceeds 40 characters/);
    });

    it("rejects string param values exceeding 100 characters", () => {
      const longVal = "a".repeat(101);
      assert.throws(() => AnalyticsEventSchema.parse({ name: "sign_up", params: { method: longVal } }), /exceeds 100 characters/);
    });
  });

  describe("PII Guards in Event Params", () => {
    it("rejects email key in event params", () => {
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "sign_up", params: { email: "user@example.com" } }),
        /PII key 'email' is not allowed/
      );
    });

    it("rejects name key in event params", () => {
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "login", params: { name: "Alice" } }),
        /PII key 'name' is not allowed/
      );
    });

    it("rejects phone and phone_number keys in event params", () => {
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "login", params: { phone: "555-1234" } }),
        /PII key 'phone' is not allowed/
      );
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "login", params: { phone_number: "555-1234" } }),
        /PII key 'phone_number' is not allowed/
      );
    });

    it("rejects string values that look like email addresses in params", () => {
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "onboarding_step", params: { step: "user@example.com" } }),
        /PII detected.*email address/
      );
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "submit_feedback", params: { category: "contact me at bob@pixerate.com" } }),
        /PII detected.*email address/
      );
    });

    it("rejects string values that look like email addresses in ecommerce items", () => {
      assert.throws(
        () => AnalyticsEventSchema.parse({
          name: "purchase",
          params: {
            value: 10,
            currency: "USD",
            transaction_id: "tx_1",
            items: [{ item_id: "item_1", item_name: "buyer@example.com" }]
          }
        }),
        /PII detected.*email address/
      );
    });

    it("rejects unhashed team_id and org_id in params", () => {
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "invite_member", params: { team_id: "team_123" } }),
        /IDs for teams and orgs must be hashed/
      );
      assert.throws(
        () => AnalyticsEventSchema.parse({ name: "join_team", params: { org_id: "org_123" } }),
        /IDs for teams and orgs must be hashed/
      );
    });

    it("allows hashed team_id_hash and org_id_hash in params", () => {
      const parsed = AnalyticsEventSchema.parse({
        name: "invite_member",
        params: { team_id_hash: "e3b0c44298fc", org_id_hash: "a1b2c3d4e5f6" }
      });
      assert.equal(parsed.name, "invite_member");
    });
  });

  describe("AnalyticsUserPropertiesSchema", () => {
    it("validates valid user properties", () => {
      const props = {
        app: "pixerate",
        plan: "pro",
        role_preference: "creator",
        waitlist_status: "approved",
        team_id_hash: "a1b2c3d4",
        org_id_hash: "e5f6a7b8"
      };
      assert.deepEqual(AnalyticsUserPropertiesSchema.parse(props), props);
    });

    it("rejects invalid app client name", () => {
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "invalid_app" }));
    });

    it("rejects PII keys in user properties", () => {
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", email: "user@example.com" }), /PII key 'email'/);
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", name: "Alice" }), /PII key 'name'/);
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", phone: "123456" }), /PII key 'phone'/);
    });

    it("rejects unhashed team_id or org_id in user properties", () => {
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", team_id: "raw_id" }), /IDs for teams and orgs must be hashed/);
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", org_id: "raw_id" }), /IDs for teams and orgs must be hashed/);
    });

    it("rejects string values looking like email addresses in user properties", () => {
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", plan: "user@example.com" }), /PII detected/);
    });

    it("rejects property names exceeding 24 characters", () => {
      const longKey = "a".repeat(25);
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", [longKey]: "val" }), /exceeds 24 characters/);
    });

    it("rejects property string values exceeding 36 characters", () => {
      const longVal = "a".repeat(37);
      assert.throws(() => AnalyticsUserPropertiesSchema.parse({ app: "pixerate", plan: longVal }), /exceeds 36 characters/);
    });
  });

  describe("AnalyticsItemTypeSchema", () => {
    it("accepts all core objects across Slop Machine, Pixerate, and Uchiage", () => {
      const expected = [
        "silo", "bucket", "pipeline", "template",
        "exploration", "composition", "fusion", "edit", "board", "pitch", "deliverable",
        "organization", "project", "task", "agent", "workflow"
      ];
      for (const item of expected) {
        assert.equal(AnalyticsItemTypeSchema.parse(item), item);
      }
    });

    it("rejects unknown item types", () => {
      assert.throws(() => AnalyticsItemTypeSchema.parse("invalid_item"));
    });
  });
});
