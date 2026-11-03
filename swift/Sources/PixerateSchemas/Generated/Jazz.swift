// Generated from @pixerate/schemas jazz contracts. Do not edit.
import Foundation

public typealias JazzOrigin = String
public typealias JazzJsonValue = JSONValue

public enum JazzAction: String, Codable, Sendable, CaseIterable {
    case add = "add"
    case remove = "remove"
    case edit = "edit"
    case select = "select"
    case undo = "undo"
    case redo = "redo"
    case revert = "revert"
}

public enum JazzAutonomy: String, Codable, Sendable, CaseIterable {
    case off = "off"
    case suggest = "suggest"
    case assist = "assist"
}

public enum JazzRiffIntent: String, Codable, Sendable, CaseIterable {
    case add = "add"
    case annotate = "annotate"
    case connect = "connect"
    case vary = "vary"
    case suggest = "suggest"
}

public enum JazzRiffStatus: String, Codable, Sendable, CaseIterable {
    case proposed = "proposed"
    case applied = "applied"
    case accepted = "accepted"
    case rejected = "rejected"
    case edited = "edited"
    case ignored = "ignored"
    case withdrawn = "withdrawn"
}

public enum JazzTargetKind: String, Codable, Sendable, CaseIterable {
    case node = "node"
    case edge = "edge"
    case layer = "layer"
    case text = "text"
    case cell = "cell"
    case other = "other"
}

public enum JazzVerdict: String, Codable, Sendable, CaseIterable {
    case accepted = "accepted"
    case rejected = "rejected"
    case edited = "edited"
    case ignored = "ignored"
    case withdrawn = "withdrawn"
}

public struct JazzContextAgent: Codable, Sendable, Equatable {
    public var id: String
    public var name: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
    }

    public init(
        id: String,
        name: String? = nil
    ) {
        self.id = id
        self.name = name
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decodeIfPresent(String.self, forKey: .name)
    }
}

public enum JazzContextPhrasesItemObservationsItemAction: String, Codable, Sendable, CaseIterable {
    case add = "add"
    case remove = "remove"
    case edit = "edit"
    case select = "select"
    case undo = "undo"
    case redo = "redo"
    case revert = "revert"
}

public enum JazzContextPhrasesItemObservationsItemTargetsItemKind: String, Codable, Sendable, CaseIterable {
    case node = "node"
    case edge = "edge"
    case layer = "layer"
    case text = "text"
    case cell = "cell"
    case other = "other"
}

public struct JazzContextPhrasesItemObservationsItemTargetsItem: Codable, Sendable, Equatable {
    public var id: String
    public var kind: JazzContextPhrasesItemObservationsItemTargetsItemKind
    public var type: String?
    public var label: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case kind = "kind"
        case type = "type"
        case label = "label"
    }

    public init(
        id: String,
        kind: JazzContextPhrasesItemObservationsItemTargetsItemKind = .node,
        type: String? = nil,
        label: String? = nil
    ) {
        self.id = id
        self.kind = kind
        self.type = type
        self.label = label
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.kind = try container.decodeIfPresent(JazzContextPhrasesItemObservationsItemTargetsItemKind.self, forKey: .kind) ?? .node
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
    }
}

public struct JazzContextPhrasesItemObservationsItem: Codable, Sendable, Equatable {
    public var id: String
    public var at: String
    public var surface: String
    public var origin: String
    public var action: JazzContextPhrasesItemObservationsItemAction
    public var targets: [JazzContextPhrasesItemObservationsItemTargetsItem]
    public var fields: [String]?
    public var inGesture: Bool
    public var summary: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case at = "at"
        case surface = "surface"
        case origin = "origin"
        case action = "action"
        case targets = "targets"
        case fields = "fields"
        case inGesture = "inGesture"
        case summary = "summary"
    }

    public init(
        id: String,
        at: String,
        surface: String,
        origin: String,
        action: JazzContextPhrasesItemObservationsItemAction,
        targets: [JazzContextPhrasesItemObservationsItemTargetsItem],
        fields: [String]? = nil,
        inGesture: Bool = false,
        summary: String? = nil
    ) {
        self.id = id
        self.at = at
        self.surface = surface
        self.origin = origin
        self.action = action
        self.targets = targets
        self.fields = fields
        self.inGesture = inGesture
        self.summary = summary
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.at = try container.decode(String.self, forKey: .at)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.origin = try container.decode(String.self, forKey: .origin)
        self.action = try container.decode(JazzContextPhrasesItemObservationsItemAction.self, forKey: .action)
        self.targets = try container.decode([JazzContextPhrasesItemObservationsItemTargetsItem].self, forKey: .targets)
        self.fields = try container.decodeIfPresent([String].self, forKey: .fields)
        self.inGesture = try container.decodeIfPresent(Bool.self, forKey: .inGesture) ?? false
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
    }
}

public struct JazzContextPhrasesItem: Codable, Sendable, Equatable {
    public var id: String
    public var surface: String
    public var startedAt: String
    public var endedAt: String
    public var observations: [JazzContextPhrasesItemObservationsItem]
    public var summary: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case surface = "surface"
        case startedAt = "startedAt"
        case endedAt = "endedAt"
        case observations = "observations"
        case summary = "summary"
    }

    public init(
        id: String,
        surface: String,
        startedAt: String,
        endedAt: String,
        observations: [JazzContextPhrasesItemObservationsItem],
        summary: String? = nil
    ) {
        self.id = id
        self.surface = surface
        self.startedAt = startedAt
        self.endedAt = endedAt
        self.observations = observations
        self.summary = summary
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.startedAt = try container.decode(String.self, forKey: .startedAt)
        self.endedAt = try container.decode(String.self, forKey: .endedAt)
        self.observations = try container.decode([JazzContextPhrasesItemObservationsItem].self, forKey: .observations)
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
    }
}

public enum JazzContextRiffsItemIntent: String, Codable, Sendable, CaseIterable {
    case add = "add"
    case annotate = "annotate"
    case connect = "connect"
    case vary = "vary"
    case suggest = "suggest"
}

public enum JazzContextRiffsItemStatus: String, Codable, Sendable, CaseIterable {
    case proposed = "proposed"
    case applied = "applied"
    case accepted = "accepted"
    case rejected = "rejected"
    case edited = "edited"
    case ignored = "ignored"
    case withdrawn = "withdrawn"
}

public struct JazzContextRiffsItem: Codable, Sendable, Equatable {
    public var id: String
    public var strategy: String
    public var intent: JazzContextRiffsItemIntent
    public var title: String
    public var targets: [String]
    public var status: JazzContextRiffsItemStatus

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case strategy = "strategy"
        case intent = "intent"
        case title = "title"
        case targets = "targets"
        case status = "status"
    }

    public init(
        id: String,
        strategy: String,
        intent: JazzContextRiffsItemIntent,
        title: String,
        targets: [String] = [],
        status: JazzContextRiffsItemStatus
    ) {
        self.id = id
        self.strategy = strategy
        self.intent = intent
        self.title = title
        self.targets = targets
        self.status = status
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.strategy = try container.decode(String.self, forKey: .strategy)
        self.intent = try container.decode(JazzContextRiffsItemIntent.self, forKey: .intent)
        self.title = try container.decode(String.self, forKey: .title)
        self.targets = try container.decodeIfPresent([String].self, forKey: .targets) ?? []
        self.status = try container.decode(JazzContextRiffsItemStatus.self, forKey: .status)
    }
}

public enum JazzContextPolicyAutonomy: String, Codable, Sendable, CaseIterable {
    case off = "off"
    case suggest = "suggest"
    case assist = "assist"
}

public struct JazzContextPolicyTempo: Codable, Sendable, Equatable {
    public var idleMs: Int
    public var minGapMs: Int

    enum CodingKeys: String, CodingKey {
        case idleMs = "idleMs"
        case minGapMs = "minGapMs"
    }

    public init(
        idleMs: Int = 1500,
        minGapMs: Int = 8000
    ) {
        self.idleMs = idleMs
        self.minGapMs = minGapMs
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.idleMs = try container.decodeIfPresent(Int.self, forKey: .idleMs) ?? 1500
        self.minGapMs = try container.decodeIfPresent(Int.self, forKey: .minGapMs) ?? 8000
    }
}

public struct JazzContextPolicyBudget: Codable, Sendable, Equatable {
    public var maxRiffsPerMinute: Int
    public var maxPending: Int
    public var cooldownAfterRejectMs: Int

    enum CodingKeys: String, CodingKey {
        case maxRiffsPerMinute = "maxRiffsPerMinute"
        case maxPending = "maxPending"
        case cooldownAfterRejectMs = "cooldownAfterRejectMs"
    }

    public init(
        maxRiffsPerMinute: Int = 3,
        maxPending: Int = 3,
        cooldownAfterRejectMs: Int = 30000
    ) {
        self.maxRiffsPerMinute = maxRiffsPerMinute
        self.maxPending = maxPending
        self.cooldownAfterRejectMs = cooldownAfterRejectMs
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.maxRiffsPerMinute = try container.decodeIfPresent(Int.self, forKey: .maxRiffsPerMinute) ?? 3
        self.maxPending = try container.decodeIfPresent(Int.self, forKey: .maxPending) ?? 3
        self.cooldownAfterRejectMs = try container.decodeIfPresent(Int.self, forKey: .cooldownAfterRejectMs) ?? 30000
    }
}

public struct JazzContextPolicy: Codable, Sendable, Equatable {
    public var autonomy: JazzContextPolicyAutonomy
    public var tempo: JazzContextPolicyTempo
    public var budget: JazzContextPolicyBudget
    public var allowEditUserContent: Bool
    public var strategies: [String]?

    enum CodingKeys: String, CodingKey {
        case autonomy = "autonomy"
        case tempo = "tempo"
        case budget = "budget"
        case allowEditUserContent = "allowEditUserContent"
        case strategies = "strategies"
    }

    public init(
        autonomy: JazzContextPolicyAutonomy = .suggest,
        tempo: JazzContextPolicyTempo = JazzContextPolicyTempo(),
        budget: JazzContextPolicyBudget = JazzContextPolicyBudget(),
        allowEditUserContent: Bool = false,
        strategies: [String]? = nil
    ) {
        self.autonomy = autonomy
        self.tempo = tempo
        self.budget = budget
        self.allowEditUserContent = allowEditUserContent
        self.strategies = strategies
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.autonomy = try container.decodeIfPresent(JazzContextPolicyAutonomy.self, forKey: .autonomy) ?? .suggest
        self.tempo = try container.decodeIfPresent(JazzContextPolicyTempo.self, forKey: .tempo) ?? JazzContextPolicyTempo()
        self.budget = try container.decodeIfPresent(JazzContextPolicyBudget.self, forKey: .budget) ?? JazzContextPolicyBudget()
        self.allowEditUserContent = try container.decodeIfPresent(Bool.self, forKey: .allowEditUserContent) ?? false
        self.strategies = try container.decodeIfPresent([String].self, forKey: .strategies)
    }
}

public struct JazzContext: Codable, Sendable, Equatable {
    public var sessionId: String
    public var agent: JazzContextAgent
    public var surface: String
    public var phrases: [JazzContextPhrasesItem]
    public var selection: [String]
    public var documentSummary: String?
    public var riffs: [JazzContextRiffsItem]
    public var policy: JazzContextPolicy
    public var skills: [String]

    enum CodingKeys: String, CodingKey {
        case sessionId = "sessionId"
        case agent = "agent"
        case surface = "surface"
        case phrases = "phrases"
        case selection = "selection"
        case documentSummary = "documentSummary"
        case riffs = "riffs"
        case policy = "policy"
        case skills = "skills"
    }

    public init(
        sessionId: String,
        agent: JazzContextAgent,
        surface: String,
        phrases: [JazzContextPhrasesItem],
        selection: [String] = [],
        documentSummary: String? = nil,
        riffs: [JazzContextRiffsItem] = [],
        policy: JazzContextPolicy,
        skills: [String] = []
    ) {
        self.sessionId = sessionId
        self.agent = agent
        self.surface = surface
        self.phrases = phrases
        self.selection = selection
        self.documentSummary = documentSummary
        self.riffs = riffs
        self.policy = policy
        self.skills = skills
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.sessionId = try container.decode(String.self, forKey: .sessionId)
        self.agent = try container.decode(JazzContextAgent.self, forKey: .agent)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.phrases = try container.decode([JazzContextPhrasesItem].self, forKey: .phrases)
        self.selection = try container.decodeIfPresent([String].self, forKey: .selection) ?? []
        self.documentSummary = try container.decodeIfPresent(String.self, forKey: .documentSummary)
        self.riffs = try container.decodeIfPresent([JazzContextRiffsItem].self, forKey: .riffs) ?? []
        self.policy = try container.decode(JazzContextPolicy.self, forKey: .policy)
        self.skills = try container.decodeIfPresent([String].self, forKey: .skills) ?? []
    }
}

public enum JazzFeedbackVerdict: String, Codable, Sendable, CaseIterable {
    case accepted = "accepted"
    case rejected = "rejected"
    case edited = "edited"
    case ignored = "ignored"
    case withdrawn = "withdrawn"
}

public struct JazzFeedback: Codable, Sendable, Equatable {
    public var riffId: String
    public var verdict: JazzFeedbackVerdict
    public var at: String
    public var by: String
    public var reason: String?
    public var editedFields: [String]?

    enum CodingKeys: String, CodingKey {
        case riffId = "riffId"
        case verdict = "verdict"
        case at = "at"
        case by = "by"
        case reason = "reason"
        case editedFields = "editedFields"
    }

    public init(
        riffId: String,
        verdict: JazzFeedbackVerdict,
        at: String,
        by: String,
        reason: String? = nil,
        editedFields: [String]? = nil
    ) {
        self.riffId = riffId
        self.verdict = verdict
        self.at = at
        self.by = by
        self.reason = reason
        self.editedFields = editedFields
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.riffId = try container.decode(String.self, forKey: .riffId)
        self.verdict = try container.decode(JazzFeedbackVerdict.self, forKey: .verdict)
        self.at = try container.decode(String.self, forKey: .at)
        self.by = try container.decode(String.self, forKey: .by)
        self.reason = try container.decodeIfPresent(String.self, forKey: .reason)
        self.editedFields = try container.decodeIfPresent([String].self, forKey: .editedFields)
    }
}

public enum JazzObservationAction: String, Codable, Sendable, CaseIterable {
    case add = "add"
    case remove = "remove"
    case edit = "edit"
    case select = "select"
    case undo = "undo"
    case redo = "redo"
    case revert = "revert"
}

public enum JazzObservationTargetsItemKind: String, Codable, Sendable, CaseIterable {
    case node = "node"
    case edge = "edge"
    case layer = "layer"
    case text = "text"
    case cell = "cell"
    case other = "other"
}

public struct JazzObservationTargetsItem: Codable, Sendable, Equatable {
    public var id: String
    public var kind: JazzObservationTargetsItemKind
    public var type: String?
    public var label: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case kind = "kind"
        case type = "type"
        case label = "label"
    }

    public init(
        id: String,
        kind: JazzObservationTargetsItemKind = .node,
        type: String? = nil,
        label: String? = nil
    ) {
        self.id = id
        self.kind = kind
        self.type = type
        self.label = label
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.kind = try container.decodeIfPresent(JazzObservationTargetsItemKind.self, forKey: .kind) ?? .node
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
    }
}

public struct JazzObservation: Codable, Sendable, Equatable {
    public var id: String
    public var at: String
    public var surface: String
    public var origin: String
    public var action: JazzObservationAction
    public var targets: [JazzObservationTargetsItem]
    public var fields: [String]?
    public var inGesture: Bool
    public var summary: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case at = "at"
        case surface = "surface"
        case origin = "origin"
        case action = "action"
        case targets = "targets"
        case fields = "fields"
        case inGesture = "inGesture"
        case summary = "summary"
    }

    public init(
        id: String,
        at: String,
        surface: String,
        origin: String,
        action: JazzObservationAction,
        targets: [JazzObservationTargetsItem],
        fields: [String]? = nil,
        inGesture: Bool = false,
        summary: String? = nil
    ) {
        self.id = id
        self.at = at
        self.surface = surface
        self.origin = origin
        self.action = action
        self.targets = targets
        self.fields = fields
        self.inGesture = inGesture
        self.summary = summary
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.at = try container.decode(String.self, forKey: .at)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.origin = try container.decode(String.self, forKey: .origin)
        self.action = try container.decode(JazzObservationAction.self, forKey: .action)
        self.targets = try container.decode([JazzObservationTargetsItem].self, forKey: .targets)
        self.fields = try container.decodeIfPresent([String].self, forKey: .fields)
        self.inGesture = try container.decodeIfPresent(Bool.self, forKey: .inGesture) ?? false
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
    }
}

public enum JazzPhraseObservationsItemAction: String, Codable, Sendable, CaseIterable {
    case add = "add"
    case remove = "remove"
    case edit = "edit"
    case select = "select"
    case undo = "undo"
    case redo = "redo"
    case revert = "revert"
}

public enum JazzPhraseObservationsItemTargetsItemKind: String, Codable, Sendable, CaseIterable {
    case node = "node"
    case edge = "edge"
    case layer = "layer"
    case text = "text"
    case cell = "cell"
    case other = "other"
}

public struct JazzPhraseObservationsItemTargetsItem: Codable, Sendable, Equatable {
    public var id: String
    public var kind: JazzPhraseObservationsItemTargetsItemKind
    public var type: String?
    public var label: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case kind = "kind"
        case type = "type"
        case label = "label"
    }

    public init(
        id: String,
        kind: JazzPhraseObservationsItemTargetsItemKind = .node,
        type: String? = nil,
        label: String? = nil
    ) {
        self.id = id
        self.kind = kind
        self.type = type
        self.label = label
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.kind = try container.decodeIfPresent(JazzPhraseObservationsItemTargetsItemKind.self, forKey: .kind) ?? .node
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
    }
}

public struct JazzPhraseObservationsItem: Codable, Sendable, Equatable {
    public var id: String
    public var at: String
    public var surface: String
    public var origin: String
    public var action: JazzPhraseObservationsItemAction
    public var targets: [JazzPhraseObservationsItemTargetsItem]
    public var fields: [String]?
    public var inGesture: Bool
    public var summary: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case at = "at"
        case surface = "surface"
        case origin = "origin"
        case action = "action"
        case targets = "targets"
        case fields = "fields"
        case inGesture = "inGesture"
        case summary = "summary"
    }

    public init(
        id: String,
        at: String,
        surface: String,
        origin: String,
        action: JazzPhraseObservationsItemAction,
        targets: [JazzPhraseObservationsItemTargetsItem],
        fields: [String]? = nil,
        inGesture: Bool = false,
        summary: String? = nil
    ) {
        self.id = id
        self.at = at
        self.surface = surface
        self.origin = origin
        self.action = action
        self.targets = targets
        self.fields = fields
        self.inGesture = inGesture
        self.summary = summary
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.at = try container.decode(String.self, forKey: .at)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.origin = try container.decode(String.self, forKey: .origin)
        self.action = try container.decode(JazzPhraseObservationsItemAction.self, forKey: .action)
        self.targets = try container.decode([JazzPhraseObservationsItemTargetsItem].self, forKey: .targets)
        self.fields = try container.decodeIfPresent([String].self, forKey: .fields)
        self.inGesture = try container.decodeIfPresent(Bool.self, forKey: .inGesture) ?? false
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
    }
}

public struct JazzPhrase: Codable, Sendable, Equatable {
    public var id: String
    public var surface: String
    public var startedAt: String
    public var endedAt: String
    public var observations: [JazzPhraseObservationsItem]
    public var summary: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case surface = "surface"
        case startedAt = "startedAt"
        case endedAt = "endedAt"
        case observations = "observations"
        case summary = "summary"
    }

    public init(
        id: String,
        surface: String,
        startedAt: String,
        endedAt: String,
        observations: [JazzPhraseObservationsItem],
        summary: String? = nil
    ) {
        self.id = id
        self.surface = surface
        self.startedAt = startedAt
        self.endedAt = endedAt
        self.observations = observations
        self.summary = summary
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.startedAt = try container.decode(String.self, forKey: .startedAt)
        self.endedAt = try container.decode(String.self, forKey: .endedAt)
        self.observations = try container.decode([JazzPhraseObservationsItem].self, forKey: .observations)
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
    }
}

public enum JazzPolicyAutonomy: String, Codable, Sendable, CaseIterable {
    case off = "off"
    case suggest = "suggest"
    case assist = "assist"
}

public struct JazzPolicyTempo: Codable, Sendable, Equatable {
    public var idleMs: Int
    public var minGapMs: Int

    enum CodingKeys: String, CodingKey {
        case idleMs = "idleMs"
        case minGapMs = "minGapMs"
    }

    public init(
        idleMs: Int = 1500,
        minGapMs: Int = 8000
    ) {
        self.idleMs = idleMs
        self.minGapMs = minGapMs
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.idleMs = try container.decodeIfPresent(Int.self, forKey: .idleMs) ?? 1500
        self.minGapMs = try container.decodeIfPresent(Int.self, forKey: .minGapMs) ?? 8000
    }
}

public struct JazzPolicyBudget: Codable, Sendable, Equatable {
    public var maxRiffsPerMinute: Int
    public var maxPending: Int
    public var cooldownAfterRejectMs: Int

    enum CodingKeys: String, CodingKey {
        case maxRiffsPerMinute = "maxRiffsPerMinute"
        case maxPending = "maxPending"
        case cooldownAfterRejectMs = "cooldownAfterRejectMs"
    }

    public init(
        maxRiffsPerMinute: Int = 3,
        maxPending: Int = 3,
        cooldownAfterRejectMs: Int = 30000
    ) {
        self.maxRiffsPerMinute = maxRiffsPerMinute
        self.maxPending = maxPending
        self.cooldownAfterRejectMs = cooldownAfterRejectMs
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.maxRiffsPerMinute = try container.decodeIfPresent(Int.self, forKey: .maxRiffsPerMinute) ?? 3
        self.maxPending = try container.decodeIfPresent(Int.self, forKey: .maxPending) ?? 3
        self.cooldownAfterRejectMs = try container.decodeIfPresent(Int.self, forKey: .cooldownAfterRejectMs) ?? 30000
    }
}

public struct JazzPolicy: Codable, Sendable, Equatable {
    public var autonomy: JazzPolicyAutonomy
    public var tempo: JazzPolicyTempo
    public var budget: JazzPolicyBudget
    public var allowEditUserContent: Bool
    public var strategies: [String]?

    enum CodingKeys: String, CodingKey {
        case autonomy = "autonomy"
        case tempo = "tempo"
        case budget = "budget"
        case allowEditUserContent = "allowEditUserContent"
        case strategies = "strategies"
    }

    public init(
        autonomy: JazzPolicyAutonomy = .suggest,
        tempo: JazzPolicyTempo = JazzPolicyTempo(),
        budget: JazzPolicyBudget = JazzPolicyBudget(),
        allowEditUserContent: Bool = false,
        strategies: [String]? = nil
    ) {
        self.autonomy = autonomy
        self.tempo = tempo
        self.budget = budget
        self.allowEditUserContent = allowEditUserContent
        self.strategies = strategies
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.autonomy = try container.decodeIfPresent(JazzPolicyAutonomy.self, forKey: .autonomy) ?? .suggest
        self.tempo = try container.decodeIfPresent(JazzPolicyTempo.self, forKey: .tempo) ?? JazzPolicyTempo()
        self.budget = try container.decodeIfPresent(JazzPolicyBudget.self, forKey: .budget) ?? JazzPolicyBudget()
        self.allowEditUserContent = try container.decodeIfPresent(Bool.self, forKey: .allowEditUserContent) ?? false
        self.strategies = try container.decodeIfPresent([String].self, forKey: .strategies)
    }
}

public struct JazzRiffToolCallsItem: Codable, Sendable, Equatable {
    public var name: String
    public var arguments: [String: JSONValue]

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case arguments = "arguments"
    }

    public init(
        name: String,
        arguments: [String: JSONValue] = [:]
    ) {
        self.name = name
        self.arguments = arguments
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.arguments = try container.decodeIfPresent([String: JSONValue].self, forKey: .arguments) ?? [:]
    }
}

public enum JazzRiffMode: String, Codable, Sendable, CaseIterable {
    case suggest = "suggest"
    case assist = "assist"
}

public struct JazzRiff: Codable, Sendable, Equatable {
    public var id: String
    public var sessionId: String
    public var origin: String
    public var surface: String
    public var strategy: String
    public var intent: JazzRiffIntent
    public var title: String
    public var rationale: String?
    public var confidence: Double
    public var targets: [String]
    public var phraseId: String?
    public var toolCalls: [JazzRiffToolCallsItem]
    public var mode: JazzRiffMode
    public var proposalId: String?
    public var status: JazzRiffStatus
    public var idempotencyKey: String?
    public var createdAt: String
    public var updatedAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case sessionId = "sessionId"
        case origin = "origin"
        case surface = "surface"
        case strategy = "strategy"
        case intent = "intent"
        case title = "title"
        case rationale = "rationale"
        case confidence = "confidence"
        case targets = "targets"
        case phraseId = "phraseId"
        case toolCalls = "toolCalls"
        case mode = "mode"
        case proposalId = "proposalId"
        case status = "status"
        case idempotencyKey = "idempotencyKey"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
    }

    public init(
        id: String,
        sessionId: String,
        origin: String,
        surface: String,
        strategy: String,
        intent: JazzRiffIntent,
        title: String,
        rationale: String? = nil,
        confidence: Double,
        targets: [String] = [],
        phraseId: String? = nil,
        toolCalls: [JazzRiffToolCallsItem] = [],
        mode: JazzRiffMode,
        proposalId: String? = nil,
        status: JazzRiffStatus,
        idempotencyKey: String? = nil,
        createdAt: String,
        updatedAt: String? = nil
    ) {
        self.id = id
        self.sessionId = sessionId
        self.origin = origin
        self.surface = surface
        self.strategy = strategy
        self.intent = intent
        self.title = title
        self.rationale = rationale
        self.confidence = confidence
        self.targets = targets
        self.phraseId = phraseId
        self.toolCalls = toolCalls
        self.mode = mode
        self.proposalId = proposalId
        self.status = status
        self.idempotencyKey = idempotencyKey
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.sessionId = try container.decode(String.self, forKey: .sessionId)
        self.origin = try container.decode(String.self, forKey: .origin)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.strategy = try container.decode(String.self, forKey: .strategy)
        self.intent = try container.decode(JazzRiffIntent.self, forKey: .intent)
        self.title = try container.decode(String.self, forKey: .title)
        self.rationale = try container.decodeIfPresent(String.self, forKey: .rationale)
        self.confidence = try container.decode(Double.self, forKey: .confidence)
        self.targets = try container.decodeIfPresent([String].self, forKey: .targets) ?? []
        self.phraseId = try container.decodeIfPresent(String.self, forKey: .phraseId)
        self.toolCalls = try container.decodeIfPresent([JazzRiffToolCallsItem].self, forKey: .toolCalls) ?? []
        self.mode = try container.decode(JazzRiffMode.self, forKey: .mode)
        self.proposalId = try container.decodeIfPresent(String.self, forKey: .proposalId)
        self.status = try container.decode(JazzRiffStatus.self, forKey: .status)
        self.idempotencyKey = try container.decodeIfPresent(String.self, forKey: .idempotencyKey)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decodeIfPresent(String.self, forKey: .updatedAt)
    }
}

public enum JazzRiffSummaryIntent: String, Codable, Sendable, CaseIterable {
    case add = "add"
    case annotate = "annotate"
    case connect = "connect"
    case vary = "vary"
    case suggest = "suggest"
}

public enum JazzRiffSummaryStatus: String, Codable, Sendable, CaseIterable {
    case proposed = "proposed"
    case applied = "applied"
    case accepted = "accepted"
    case rejected = "rejected"
    case edited = "edited"
    case ignored = "ignored"
    case withdrawn = "withdrawn"
}

public struct JazzRiffSummary: Codable, Sendable, Equatable {
    public var id: String
    public var strategy: String
    public var intent: JazzRiffSummaryIntent
    public var title: String
    public var targets: [String]
    public var status: JazzRiffSummaryStatus

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case strategy = "strategy"
        case intent = "intent"
        case title = "title"
        case targets = "targets"
        case status = "status"
    }

    public init(
        id: String,
        strategy: String,
        intent: JazzRiffSummaryIntent,
        title: String,
        targets: [String] = [],
        status: JazzRiffSummaryStatus
    ) {
        self.id = id
        self.strategy = strategy
        self.intent = intent
        self.title = title
        self.targets = targets
        self.status = status
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.strategy = try container.decode(String.self, forKey: .strategy)
        self.intent = try container.decode(JazzRiffSummaryIntent.self, forKey: .intent)
        self.title = try container.decode(String.self, forKey: .title)
        self.targets = try container.decodeIfPresent([String].self, forKey: .targets) ?? []
        self.status = try container.decode(JazzRiffSummaryStatus.self, forKey: .status)
    }
}

public struct JazzTarget: Codable, Sendable, Equatable {
    public var id: String
    public var kind: JazzTargetKind
    public var type: String?
    public var label: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case kind = "kind"
        case type = "type"
        case label = "label"
    }

    public init(
        id: String,
        kind: JazzTargetKind = .node,
        type: String? = nil,
        label: String? = nil
    ) {
        self.id = id
        self.kind = kind
        self.type = type
        self.label = label
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.kind = try container.decodeIfPresent(JazzTargetKind.self, forKey: .kind) ?? .node
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
    }
}

public struct JazzToolCall: Codable, Sendable, Equatable {
    public var name: String
    public var arguments: [String: JSONValue]

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case arguments = "arguments"
    }

    public init(
        name: String,
        arguments: [String: JSONValue] = [:]
    ) {
        self.name = name
        self.arguments = arguments
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.arguments = try container.decodeIfPresent([String: JSONValue].self, forKey: .arguments) ?? [:]
    }
}

