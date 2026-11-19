// Generated from @pixerate/schemas insights contracts by scripts/gen-swift.mjs. Do not edit.
import Foundation

public enum FindingSeverity: String, Codable, Sendable, CaseIterable {
    case low = "low"
    case medium = "medium"
    case high = "high"
    case critical = "critical"
}

public enum FindingStatus: String, Codable, Sendable, CaseIterable {
    case `open` = "open"
    case acknowledged = "acknowledged"
    case resolved = "resolved"
    case dismissed = "dismissed"
}

public enum FindingUserSegment: String, Codable, Sendable, CaseIterable {
    case new = "new"
    case returning = "returning"
    case all = "all"
}

public enum FlowProgressResult: String, Codable, Sendable, CaseIterable {
    case succeeded = "succeeded"
    case exited = "exited"
    case abandoned = "abandoned"
    case inProgress = "in_progress"
}

public enum InsightsActorType: String, Codable, Sendable, CaseIterable {
    case human = "human"
    case agent = "agent"
}

public enum InteractionOutcome: String, Codable, Sendable, CaseIterable {
    case navigated = "navigated"
    case mutated = "mutated"
    case noOp = "no_op"
    case errored = "errored"
    case dismissed = "dismissed"
    case unknown = "unknown"
}

public enum SessionOutcome: String, Codable, Sendable, CaseIterable {
    case activated = "activated"
    case progressed = "progressed"
    case abandoned = "abandoned"
    case errored = "errored"
    case bounced = "bounced"
    case unknown = "unknown"
}

public enum SignalType: String, Codable, Sendable, CaseIterable {
    case hesitation = "hesitation"
    case loop = "loop"
    case rageClick = "rage_click"
    case error = "error"
    case backtrack = "backtrack"
    case abandonFlow = "abandon_flow"
    case deadEnd = "dead_end"
    case goalMismatch = "goal_mismatch"
}

public enum UserCohort: String, Codable, Sendable, CaseIterable {
    case new = "new"
    case returning = "returning"
}

public struct BaseIngestBatch: Codable, Sendable, Equatable {
    public var sessionId: String
    public var product: String
    public var actor: InsightsActor
    public var context: SessionContext?
    public var events: [InteractionEvent]
    public var snapshots: [StateSnapshot]
    public var signals: [Signal]
    public var ended: Bool
    public var sentAt: String?

    enum CodingKeys: String, CodingKey {
        case sessionId = "session_id"
        case product = "product"
        case actor = "actor"
        case context = "context"
        case events = "events"
        case snapshots = "snapshots"
        case signals = "signals"
        case ended = "ended"
        case sentAt = "sent_at"
    }

    public init(
        sessionId: String,
        product: String,
        actor: InsightsActor,
        context: SessionContext? = nil,
        events: [InteractionEvent] = [],
        snapshots: [StateSnapshot] = [],
        signals: [Signal] = [],
        ended: Bool = false,
        sentAt: String? = nil
    ) {
        self.sessionId = sessionId
        self.product = product
        self.actor = actor
        self.context = context
        self.events = events
        self.snapshots = snapshots
        self.signals = signals
        self.ended = ended
        self.sentAt = sentAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.sessionId = try container.decode(String.self, forKey: .sessionId)
        self.product = try container.decode(String.self, forKey: .product)
        self.actor = try container.decode(InsightsActor.self, forKey: .actor)
        self.context = try container.decodeIfPresent(SessionContext.self, forKey: .context)
        self.events = try container.decodeIfPresent([InteractionEvent].self, forKey: .events) ?? []
        self.snapshots = try container.decodeIfPresent([StateSnapshot].self, forKey: .snapshots) ?? []
        self.signals = try container.decodeIfPresent([Signal].self, forKey: .signals) ?? []
        self.ended = try container.decodeIfPresent(Bool.self, forKey: .ended) ?? false
        self.sentAt = try container.decodeIfPresent(String.self, forKey: .sentAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(sessionId, forKey: .sessionId)
        try container.encode(product, forKey: .product)
        try container.encode(actor, forKey: .actor)
        try container.encodeIfPresent(context, forKey: .context)
        try container.encode(events, forKey: .events)
        try container.encode(snapshots, forKey: .snapshots)
        try container.encode(signals, forKey: .signals)
        try container.encode(ended, forKey: .ended)
        try container.encodeIfPresent(sentAt, forKey: .sentAt)
    }
}

public struct Finding: Codable, Sendable, Equatable {
    public var id: String
    public var product: String
    public var title: String
    public var cohort: String
    public var userSegment: FindingUserSegment
    public var affectedShare: Double
    public var evidence: [String]
    public var severity: FindingSeverity
    public var suggestedFix: String
    public var status: FindingStatus
    public var flowId: String?
    public var createdAt: String?
    public var updatedAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case product = "product"
        case title = "title"
        case cohort = "cohort"
        case userSegment = "user_segment"
        case affectedShare = "affected_share"
        case evidence = "evidence"
        case severity = "severity"
        case suggestedFix = "suggested_fix"
        case status = "status"
        case flowId = "flow_id"
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }

    public init(
        id: String,
        product: String,
        title: String,
        cohort: String,
        userSegment: FindingUserSegment = .all,
        affectedShare: Double,
        evidence: [String],
        severity: FindingSeverity,
        suggestedFix: String,
        status: FindingStatus = .`open`,
        flowId: String? = nil,
        createdAt: String? = nil,
        updatedAt: String? = nil
    ) {
        self.id = id
        self.product = product
        self.title = title
        self.cohort = cohort
        self.userSegment = userSegment
        self.affectedShare = affectedShare
        self.evidence = evidence
        self.severity = severity
        self.suggestedFix = suggestedFix
        self.status = status
        self.flowId = flowId
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.product = try container.decode(String.self, forKey: .product)
        self.title = try container.decode(String.self, forKey: .title)
        self.cohort = try container.decode(String.self, forKey: .cohort)
        self.userSegment = try container.decodeIfPresent(FindingUserSegment.self, forKey: .userSegment) ?? .all
        self.affectedShare = try container.decode(Double.self, forKey: .affectedShare)
        self.evidence = try container.decode([String].self, forKey: .evidence)
        self.severity = try container.decode(FindingSeverity.self, forKey: .severity)
        self.suggestedFix = try container.decode(String.self, forKey: .suggestedFix)
        self.status = try container.decodeIfPresent(FindingStatus.self, forKey: .status) ?? .`open`
        self.flowId = try container.decodeIfPresent(String.self, forKey: .flowId)
        self.createdAt = try container.decodeIfPresent(String.self, forKey: .createdAt)
        self.updatedAt = try container.decodeIfPresent(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(product, forKey: .product)
        try container.encode(title, forKey: .title)
        try container.encode(cohort, forKey: .cohort)
        try container.encode(userSegment, forKey: .userSegment)
        try container.encode(affectedShare, forKey: .affectedShare)
        try container.encode(evidence, forKey: .evidence)
        try container.encode(severity, forKey: .severity)
        try container.encode(suggestedFix, forKey: .suggestedFix)
        try container.encode(status, forKey: .status)
        try container.encodeIfPresent(flowId, forKey: .flowId)
        try container.encodeIfPresent(createdAt, forKey: .createdAt)
        try container.encodeIfPresent(updatedAt, forKey: .updatedAt)
    }
}

public struct FlowExitSpec: Codable, Sendable, Equatable {
    public var milestone: String

    enum CodingKeys: String, CodingKey {
        case milestone = "milestone"
    }

    public init(
        milestone: String
    ) {
        self.milestone = milestone
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.milestone = try container.decode(String.self, forKey: .milestone)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(milestone, forKey: .milestone)
    }
}

public struct FlowMatcher: Codable, Sendable, Equatable {
    public var milestone: String?
    public var screen: String?

    enum CodingKeys: String, CodingKey {
        case milestone = "milestone"
        case screen = "screen"
    }

    public init(
        milestone: String? = nil,
        screen: String? = nil
    ) {
        self.milestone = milestone
        self.screen = screen
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.milestone = try container.decodeIfPresent(String.self, forKey: .milestone)
        self.screen = try container.decodeIfPresent(String.self, forKey: .screen)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(milestone, forKey: .milestone)
        try container.encodeIfPresent(screen, forKey: .screen)
    }
}

public struct FlowProgress: Codable, Sendable, Equatable {
    public var flowId: String
    public var flowVersion: Int
    public var entered: Bool
    public var stepsCompleted: [String]
    public var furthestStep: String?
    public var result: FlowProgressResult
    public var exit: String?
    public var durationMs: Double?

    enum CodingKeys: String, CodingKey {
        case flowId = "flow_id"
        case flowVersion = "flow_version"
        case entered = "entered"
        case stepsCompleted = "steps_completed"
        case furthestStep = "furthest_step"
        case result = "result"
        case exit = "exit"
        case durationMs = "duration_ms"
    }

    public init(
        flowId: String,
        flowVersion: Int,
        entered: Bool,
        stepsCompleted: [String] = [],
        furthestStep: String? = nil,
        result: FlowProgressResult,
        exit: String? = nil,
        durationMs: Double? = nil
    ) {
        self.flowId = flowId
        self.flowVersion = flowVersion
        self.entered = entered
        self.stepsCompleted = stepsCompleted
        self.furthestStep = furthestStep
        self.result = result
        self.exit = exit
        self.durationMs = durationMs
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.flowId = try container.decode(String.self, forKey: .flowId)
        self.flowVersion = try container.decode(Int.self, forKey: .flowVersion)
        self.entered = try container.decode(Bool.self, forKey: .entered)
        self.stepsCompleted = try container.decodeIfPresent([String].self, forKey: .stepsCompleted) ?? []
        self.furthestStep = try container.decodeIfPresent(String.self, forKey: .furthestStep)
        self.result = try container.decode(FlowProgressResult.self, forKey: .result)
        self.exit = try container.decodeIfPresent(String.self, forKey: .exit)
        self.durationMs = try container.decodeIfPresent(Double.self, forKey: .durationMs)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(flowId, forKey: .flowId)
        try container.encode(flowVersion, forKey: .flowVersion)
        try container.encode(entered, forKey: .entered)
        try container.encode(stepsCompleted, forKey: .stepsCompleted)
        try container.encodeIfPresent(furthestStep, forKey: .furthestStep)
        try container.encode(result, forKey: .result)
        try container.encodeIfPresent(exit, forKey: .exit)
        try container.encodeIfPresent(durationMs, forKey: .durationMs)
    }
}

public struct FlowSpec: Codable, Sendable, Equatable {
    public var id: String
    public var version: Int
    public var intent: String
    public var entry: FlowMatcher
    public var steps: [FlowStepSpec]
    public var success: FlowMatcher
    public var exits: [String: FlowExitSpec]?
    public var expectedDurationSec: Double?
    public var notes: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case version = "version"
        case intent = "intent"
        case entry = "entry"
        case steps = "steps"
        case success = "success"
        case exits = "exits"
        case expectedDurationSec = "expectedDurationSec"
        case notes = "notes"
    }

    public init(
        id: String,
        version: Int,
        intent: String,
        entry: FlowMatcher,
        steps: [FlowStepSpec],
        success: FlowMatcher,
        exits: [String: FlowExitSpec]? = nil,
        expectedDurationSec: Double? = nil,
        notes: String? = nil
    ) {
        self.id = id
        self.version = version
        self.intent = intent
        self.entry = entry
        self.steps = steps
        self.success = success
        self.exits = exits
        self.expectedDurationSec = expectedDurationSec
        self.notes = notes
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.version = try container.decode(Int.self, forKey: .version)
        self.intent = try container.decode(String.self, forKey: .intent)
        self.entry = try container.decode(FlowMatcher.self, forKey: .entry)
        self.steps = try container.decode([FlowStepSpec].self, forKey: .steps)
        self.success = try container.decode(FlowMatcher.self, forKey: .success)
        self.exits = try container.decodeIfPresent([String: FlowExitSpec].self, forKey: .exits)
        self.expectedDurationSec = try container.decodeIfPresent(Double.self, forKey: .expectedDurationSec)
        self.notes = try container.decodeIfPresent(String.self, forKey: .notes)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(version, forKey: .version)
        try container.encode(intent, forKey: .intent)
        try container.encode(entry, forKey: .entry)
        try container.encode(steps, forKey: .steps)
        try container.encode(success, forKey: .success)
        try container.encodeIfPresent(exits, forKey: .exits)
        try container.encodeIfPresent(expectedDurationSec, forKey: .expectedDurationSec)
        try container.encodeIfPresent(notes, forKey: .notes)
    }
}

public struct FlowStepSpec: Codable, Sendable, Equatable {
    public var id: String
    public var milestone: String?
    public var screen: String?
    public var optional: Bool?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case milestone = "milestone"
        case screen = "screen"
        case optional = "optional"
    }

    public init(
        id: String,
        milestone: String? = nil,
        screen: String? = nil,
        optional: Bool? = nil
    ) {
        self.id = id
        self.milestone = milestone
        self.screen = screen
        self.optional = optional
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.milestone = try container.decodeIfPresent(String.self, forKey: .milestone)
        self.screen = try container.decodeIfPresent(String.self, forKey: .screen)
        self.optional = try container.decodeIfPresent(Bool.self, forKey: .optional)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encodeIfPresent(milestone, forKey: .milestone)
        try container.encodeIfPresent(screen, forKey: .screen)
        try container.encodeIfPresent(optional, forKey: .optional)
    }
}

public struct FrictionPoint: Codable, Sendable, Equatable {
    public var screen: String
    public var type: SignalType
    public var `description`: String?
    public var flow: String?

    enum CodingKeys: String, CodingKey {
        case screen = "screen"
        case type = "type"
        case `description` = "description"
        case flow = "flow"
    }

    public init(
        screen: String,
        type: SignalType,
        `description`: String? = nil,
        flow: String? = nil
    ) {
        self.screen = screen
        self.type = type
        self.`description` = `description`
        self.flow = flow
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.screen = try container.decode(String.self, forKey: .screen)
        self.type = try container.decode(SignalType.self, forKey: .type)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.flow = try container.decodeIfPresent(String.self, forKey: .flow)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(screen, forKey: .screen)
        try container.encode(type, forKey: .type)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(flow, forKey: .flow)
    }
}

public typealias IngestBatch = BaseIngestBatch

public struct InsightsActor: Codable, Sendable, Equatable {
    public var type: InsightsActorType
    public var idHash: String

    enum CodingKeys: String, CodingKey {
        case type = "type"
        case idHash = "id_hash"
    }

    public init(
        type: InsightsActorType,
        idHash: String
    ) {
        self.type = type
        self.idHash = idHash
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.type = try container.decode(InsightsActorType.self, forKey: .type)
        self.idHash = try container.decode(String.self, forKey: .idHash)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(type, forKey: .type)
        try container.encode(idHash, forKey: .idHash)
    }
}

public enum InteractionEventAction: String, Codable, Sendable, CaseIterable {
    case click = "click"
    case submit = "submit"
    case navigate = "navigate"
    case inputBlur = "input_blur"
    case error = "error"
    case custom = "custom"
    case milestone = "milestone"
}

public struct InteractionEvent: Codable, Sendable, Equatable {
    public var sessionId: String
    public var actor: InsightsActor
    public var ts: String
    public var screen: String
    public var action: InteractionEventAction
    public var target: InteractionTarget?
    public var milestone: MilestonePayload?
    public var outcome: InteractionOutcome
    public var stateRef: String?
    public var flow: String?

    enum CodingKeys: String, CodingKey {
        case sessionId = "session_id"
        case actor = "actor"
        case ts = "ts"
        case screen = "screen"
        case action = "action"
        case target = "target"
        case milestone = "milestone"
        case outcome = "outcome"
        case stateRef = "state_ref"
        case flow = "flow"
    }

    public init(
        sessionId: String,
        actor: InsightsActor,
        ts: String,
        screen: String,
        action: InteractionEventAction,
        target: InteractionTarget? = nil,
        milestone: MilestonePayload? = nil,
        outcome: InteractionOutcome = .unknown,
        stateRef: String? = nil,
        flow: String? = nil
    ) {
        self.sessionId = sessionId
        self.actor = actor
        self.ts = ts
        self.screen = screen
        self.action = action
        self.target = target
        self.milestone = milestone
        self.outcome = outcome
        self.stateRef = stateRef
        self.flow = flow
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.sessionId = try container.decode(String.self, forKey: .sessionId)
        self.actor = try container.decode(InsightsActor.self, forKey: .actor)
        self.ts = try container.decode(String.self, forKey: .ts)
        self.screen = try container.decode(String.self, forKey: .screen)
        self.action = try container.decode(InteractionEventAction.self, forKey: .action)
        self.target = try container.decodeIfPresent(InteractionTarget.self, forKey: .target)
        self.milestone = try container.decodeIfPresent(MilestonePayload.self, forKey: .milestone)
        self.outcome = try container.decodeIfPresent(InteractionOutcome.self, forKey: .outcome) ?? .unknown
        self.stateRef = try container.decodeIfPresent(String.self, forKey: .stateRef)
        self.flow = try container.decodeIfPresent(String.self, forKey: .flow)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(sessionId, forKey: .sessionId)
        try container.encode(actor, forKey: .actor)
        try container.encode(ts, forKey: .ts)
        try container.encode(screen, forKey: .screen)
        try container.encode(action, forKey: .action)
        try container.encodeIfPresent(target, forKey: .target)
        try container.encodeIfPresent(milestone, forKey: .milestone)
        try container.encode(outcome, forKey: .outcome)
        try container.encodeIfPresent(stateRef, forKey: .stateRef)
        try container.encodeIfPresent(flow, forKey: .flow)
    }
}

public struct InteractionTarget: Codable, Sendable, Equatable {
    public var role: String
    public var name: String?
    public var pbId: String?

    enum CodingKeys: String, CodingKey {
        case role = "role"
        case name = "name"
        case pbId = "pbId"
    }

    public init(
        role: String,
        name: String? = nil,
        pbId: String? = nil
    ) {
        self.role = role
        self.name = name
        self.pbId = pbId
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.role = try container.decode(String.self, forKey: .role)
        self.name = try container.decodeIfPresent(String.self, forKey: .name)
        self.pbId = try container.decodeIfPresent(String.self, forKey: .pbId)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(role, forKey: .role)
        try container.encodeIfPresent(name, forKey: .name)
        try container.encodeIfPresent(pbId, forKey: .pbId)
    }
}

public struct MilestonePayload: Codable, Sendable, Equatable {
    public var name: String
    public var props: [String: JSONValue]?

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case props = "props"
    }

    public init(
        name: String,
        props: [String: JSONValue]? = nil
    ) {
        self.name = name
        self.props = props
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.props = try container.decodeIfPresent([String: JSONValue].self, forKey: .props)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(props, forKey: .props)
    }
}

public struct ProbeAnswer: Codable, Sendable, Equatable {
    public var question: String
    public var answer: String

    enum CodingKeys: String, CodingKey {
        case question = "question"
        case answer = "answer"
    }

    public init(
        question: String,
        answer: String
    ) {
        self.question = question
        self.answer = answer
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.question = try container.decode(String.self, forKey: .question)
        self.answer = try container.decode(String.self, forKey: .answer)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(question, forKey: .question)
        try container.encode(answer, forKey: .answer)
    }
}

public struct SessionContext: Codable, Sendable, Equatable {
    public var userCohort: UserCohort?
    public var accountAgeDays: Double?
    public var rolePreference: String?
    public var statedGoal: String?
    public var activeFlows: [String]?
    public var plan: String?
    public var teamIdHash: String?

    enum CodingKeys: String, CodingKey {
        case userCohort = "userCohort"
        case accountAgeDays = "accountAgeDays"
        case rolePreference = "rolePreference"
        case statedGoal = "statedGoal"
        case activeFlows = "activeFlows"
        case plan = "plan"
        case teamIdHash = "teamIdHash"
    }

    public init(
        userCohort: UserCohort? = nil,
        accountAgeDays: Double? = nil,
        rolePreference: String? = nil,
        statedGoal: String? = nil,
        activeFlows: [String]? = nil,
        plan: String? = nil,
        teamIdHash: String? = nil
    ) {
        self.userCohort = userCohort
        self.accountAgeDays = accountAgeDays
        self.rolePreference = rolePreference
        self.statedGoal = statedGoal
        self.activeFlows = activeFlows
        self.plan = plan
        self.teamIdHash = teamIdHash
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.userCohort = try container.decodeIfPresent(UserCohort.self, forKey: .userCohort)
        self.accountAgeDays = try container.decodeIfPresent(Double.self, forKey: .accountAgeDays)
        self.rolePreference = try container.decodeIfPresent(String.self, forKey: .rolePreference)
        self.statedGoal = try container.decodeIfPresent(String.self, forKey: .statedGoal)
        self.activeFlows = try container.decodeIfPresent([String].self, forKey: .activeFlows)
        self.plan = try container.decodeIfPresent(String.self, forKey: .plan)
        self.teamIdHash = try container.decodeIfPresent(String.self, forKey: .teamIdHash)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(userCohort, forKey: .userCohort)
        try container.encodeIfPresent(accountAgeDays, forKey: .accountAgeDays)
        try container.encodeIfPresent(rolePreference, forKey: .rolePreference)
        try container.encodeIfPresent(statedGoal, forKey: .statedGoal)
        try container.encodeIfPresent(activeFlows, forKey: .activeFlows)
        try container.encodeIfPresent(plan, forKey: .plan)
        try container.encodeIfPresent(teamIdHash, forKey: .teamIdHash)
    }
}

public struct SessionSummary: Codable, Sendable, Equatable {
    public var sessionId: String
    public var product: String
    public var actorType: InsightsActorType
    public var actorIdHash: String
    public var userCohort: UserCohort
    public var rolePreference: String?
    public var statedGoal: String?
    public var outcome: SessionOutcome
    public var narrative: String
    public var frictionPoints: [FrictionPoint]
    public var probeAnswers: [ProbeAnswer]
    public var flowProgress: [FlowProgress]?
    public var confidence: Double
    public var startedAt: String?
    public var endedAt: String?
    public var eventCount: Int
    public var signalCount: Int

    enum CodingKeys: String, CodingKey {
        case sessionId = "session_id"
        case product = "product"
        case actorType = "actor_type"
        case actorIdHash = "actor_id_hash"
        case userCohort = "user_cohort"
        case rolePreference = "role_preference"
        case statedGoal = "stated_goal"
        case outcome = "outcome"
        case narrative = "narrative"
        case frictionPoints = "friction_points"
        case probeAnswers = "probe_answers"
        case flowProgress = "flow_progress"
        case confidence = "confidence"
        case startedAt = "started_at"
        case endedAt = "ended_at"
        case eventCount = "event_count"
        case signalCount = "signal_count"
    }

    public init(
        sessionId: String,
        product: String,
        actorType: InsightsActorType,
        actorIdHash: String,
        userCohort: UserCohort = .returning,
        rolePreference: String? = nil,
        statedGoal: String? = nil,
        outcome: SessionOutcome,
        narrative: String,
        frictionPoints: [FrictionPoint] = [],
        probeAnswers: [ProbeAnswer] = [],
        flowProgress: [FlowProgress]? = nil,
        confidence: Double,
        startedAt: String? = nil,
        endedAt: String? = nil,
        eventCount: Int = 0,
        signalCount: Int = 0
    ) {
        self.sessionId = sessionId
        self.product = product
        self.actorType = actorType
        self.actorIdHash = actorIdHash
        self.userCohort = userCohort
        self.rolePreference = rolePreference
        self.statedGoal = statedGoal
        self.outcome = outcome
        self.narrative = narrative
        self.frictionPoints = frictionPoints
        self.probeAnswers = probeAnswers
        self.flowProgress = flowProgress
        self.confidence = confidence
        self.startedAt = startedAt
        self.endedAt = endedAt
        self.eventCount = eventCount
        self.signalCount = signalCount
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.sessionId = try container.decode(String.self, forKey: .sessionId)
        self.product = try container.decode(String.self, forKey: .product)
        self.actorType = try container.decode(InsightsActorType.self, forKey: .actorType)
        self.actorIdHash = try container.decode(String.self, forKey: .actorIdHash)
        self.userCohort = try container.decodeIfPresent(UserCohort.self, forKey: .userCohort) ?? .returning
        self.rolePreference = try container.decodeIfPresent(String.self, forKey: .rolePreference)
        self.statedGoal = try container.decodeIfPresent(String.self, forKey: .statedGoal)
        self.outcome = try container.decode(SessionOutcome.self, forKey: .outcome)
        self.narrative = try container.decode(String.self, forKey: .narrative)
        self.frictionPoints = try container.decodeIfPresent([FrictionPoint].self, forKey: .frictionPoints) ?? []
        self.probeAnswers = try container.decodeIfPresent([ProbeAnswer].self, forKey: .probeAnswers) ?? []
        self.flowProgress = try container.decodeIfPresent([FlowProgress].self, forKey: .flowProgress)
        self.confidence = try container.decode(Double.self, forKey: .confidence)
        self.startedAt = try container.decodeIfPresent(String.self, forKey: .startedAt)
        self.endedAt = try container.decodeIfPresent(String.self, forKey: .endedAt)
        self.eventCount = try container.decodeIfPresent(Int.self, forKey: .eventCount) ?? 0
        self.signalCount = try container.decodeIfPresent(Int.self, forKey: .signalCount) ?? 0
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(sessionId, forKey: .sessionId)
        try container.encode(product, forKey: .product)
        try container.encode(actorType, forKey: .actorType)
        try container.encode(actorIdHash, forKey: .actorIdHash)
        try container.encode(userCohort, forKey: .userCohort)
        try container.encodeIfPresent(rolePreference, forKey: .rolePreference)
        try container.encodeIfPresent(statedGoal, forKey: .statedGoal)
        try container.encode(outcome, forKey: .outcome)
        try container.encode(narrative, forKey: .narrative)
        try container.encode(frictionPoints, forKey: .frictionPoints)
        try container.encode(probeAnswers, forKey: .probeAnswers)
        try container.encodeIfPresent(flowProgress, forKey: .flowProgress)
        try container.encode(confidence, forKey: .confidence)
        try container.encodeIfPresent(startedAt, forKey: .startedAt)
        try container.encodeIfPresent(endedAt, forKey: .endedAt)
        try container.encode(eventCount, forKey: .eventCount)
        try container.encode(signalCount, forKey: .signalCount)
    }
}

public struct Signal: Codable, Sendable, Equatable {
    public var sessionId: String
    public var type: SignalType
    public var screen: String
    public var ts: String?
    public var durationMs: Double?
    public var count: Int?
    public var flow: String?
    public var detail: String?

    enum CodingKeys: String, CodingKey {
        case sessionId = "session_id"
        case type = "type"
        case screen = "screen"
        case ts = "ts"
        case durationMs = "duration_ms"
        case count = "count"
        case flow = "flow"
        case detail = "detail"
    }

    public init(
        sessionId: String,
        type: SignalType,
        screen: String,
        ts: String? = nil,
        durationMs: Double? = nil,
        count: Int? = nil,
        flow: String? = nil,
        detail: String? = nil
    ) {
        self.sessionId = sessionId
        self.type = type
        self.screen = screen
        self.ts = ts
        self.durationMs = durationMs
        self.count = count
        self.flow = flow
        self.detail = detail
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.sessionId = try container.decode(String.self, forKey: .sessionId)
        self.type = try container.decode(SignalType.self, forKey: .type)
        self.screen = try container.decode(String.self, forKey: .screen)
        self.ts = try container.decodeIfPresent(String.self, forKey: .ts)
        self.durationMs = try container.decodeIfPresent(Double.self, forKey: .durationMs)
        self.count = try container.decodeIfPresent(Int.self, forKey: .count)
        self.flow = try container.decodeIfPresent(String.self, forKey: .flow)
        self.detail = try container.decodeIfPresent(String.self, forKey: .detail)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(sessionId, forKey: .sessionId)
        try container.encode(type, forKey: .type)
        try container.encode(screen, forKey: .screen)
        try container.encodeIfPresent(ts, forKey: .ts)
        try container.encodeIfPresent(durationMs, forKey: .durationMs)
        try container.encodeIfPresent(count, forKey: .count)
        try container.encodeIfPresent(flow, forKey: .flow)
        try container.encodeIfPresent(detail, forKey: .detail)
    }
}

public struct StateSnapshot: Codable, Sendable, Equatable {
    public var stateRef: String
    public var ts: String?
    public var screen: String
    public var flags: [String]
    public var visible: [VisibleElement]
    public var errors: [String]

    enum CodingKeys: String, CodingKey {
        case stateRef = "state_ref"
        case ts = "ts"
        case screen = "screen"
        case flags = "flags"
        case visible = "visible"
        case errors = "errors"
    }

    public init(
        stateRef: String,
        ts: String? = nil,
        screen: String,
        flags: [String] = [],
        visible: [VisibleElement] = [],
        errors: [String] = []
    ) {
        self.stateRef = stateRef
        self.ts = ts
        self.screen = screen
        self.flags = flags
        self.visible = visible
        self.errors = errors
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.stateRef = try container.decode(String.self, forKey: .stateRef)
        self.ts = try container.decodeIfPresent(String.self, forKey: .ts)
        self.screen = try container.decode(String.self, forKey: .screen)
        self.flags = try container.decodeIfPresent([String].self, forKey: .flags) ?? []
        self.visible = try container.decodeIfPresent([VisibleElement].self, forKey: .visible) ?? []
        self.errors = try container.decodeIfPresent([String].self, forKey: .errors) ?? []
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(stateRef, forKey: .stateRef)
        try container.encodeIfPresent(ts, forKey: .ts)
        try container.encode(screen, forKey: .screen)
        try container.encode(flags, forKey: .flags)
        try container.encode(visible, forKey: .visible)
        try container.encode(errors, forKey: .errors)
    }
}

public struct VisibleElement: Codable, Sendable, Equatable {
    public var role: String
    public var name: String?

    enum CodingKeys: String, CodingKey {
        case role = "role"
        case name = "name"
    }

    public init(
        role: String,
        name: String? = nil
    ) {
        self.role = role
        self.name = name
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.role = try container.decode(String.self, forKey: .role)
        self.name = try container.decodeIfPresent(String.self, forKey: .name)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(role, forKey: .role)
        try container.encodeIfPresent(name, forKey: .name)
    }
}
