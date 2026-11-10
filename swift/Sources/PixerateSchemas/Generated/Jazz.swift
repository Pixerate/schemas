// Generated from @pixerate/schemas jazz contracts by scripts/gen-swift.mjs. Do not edit.
import Foundation

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

public enum JazzEvidenceKind: String, Codable, Sendable, CaseIterable {
    case repo = "repo"
    case issue = "issue"
    case plan = "plan"
    case web = "web"
    case metric = "metric"
    case absence = "absence"
}

public enum JazzProposalKind: String, Codable, Sendable, CaseIterable {
    case newCapability = "new-capability"
    case followUp = "follow-up"
    case interop = "interop"
    case agentPath = "agent-path"
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
    case domain = "domain"
    case issue = "issue"
    case pullRequest = "pull-request"
    case file = "file"
    case capability = "capability"
    case other = "other"
}

public enum JazzTextFlavor: String, Codable, Sendable, CaseIterable {
    case commonmark = "commonmark"
    case gfm = "gfm"
    case slack = "slack"
}

public enum JazzTextGenre: String, Codable, Sendable, CaseIterable {
    case prose = "prose"
    case notes = "notes"
    case chat = "chat"
    case poem = "poem"
    case list = "list"
    case technical = "technical"
    case heading = "heading"
}

public enum JazzTextSuggestionKind: String, Codable, Sendable, CaseIterable {
    case list = "list"
    case heading = "heading"
    case math = "math"
    case title = "title"
    case alert = "alert"
    case quote = "quote"
}

public enum JazzTextVoiceId: String, Codable, Sendable, CaseIterable {
    case punctuate = "punctuate"
    case smartTypography = "smart-typography"
    case chat = "chat"
}

public enum JazzVerdict: String, Codable, Sendable, CaseIterable {
    case accepted = "accepted"
    case rejected = "rejected"
    case edited = "edited"
    case ignored = "ignored"
    case withdrawn = "withdrawn"
}

public struct JazzCapability: Codable, Sendable, Equatable {
    public var name: String
    public var summary: String?
    public var refs: [JazzEvidence]
    public var agentTools: [String]?

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case summary = "summary"
        case refs = "refs"
        case agentTools = "agentTools"
    }

    public init(
        name: String,
        summary: String? = nil,
        refs: [JazzEvidence],
        agentTools: [String]? = nil
    ) {
        self.name = name
        self.summary = summary
        self.refs = refs
        self.agentTools = agentTools
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
        self.refs = try container.decode([JazzEvidence].self, forKey: .refs)
        self.agentTools = try container.decodeIfPresent([String].self, forKey: .agentTools)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(summary, forKey: .summary)
        try container.encode(refs, forKey: .refs)
        try container.encodeIfPresent(agentTools, forKey: .agentTools)
    }
}

public struct JazzCapabilityIndex: Codable, Sendable, Equatable {
    public var domain: String
    public var builtAt: String
    public var revision: String?
    public var built: [JazzCapability]
    public var planned: [JazzCapability]

    enum CodingKeys: String, CodingKey {
        case domain = "domain"
        case builtAt = "builtAt"
        case revision = "revision"
        case built = "built"
        case planned = "planned"
    }

    public init(
        domain: String,
        builtAt: String,
        revision: String? = nil,
        built: [JazzCapability],
        planned: [JazzCapability]
    ) {
        self.domain = domain
        self.builtAt = builtAt
        self.revision = revision
        self.built = built
        self.planned = planned
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.domain = try container.decode(String.self, forKey: .domain)
        self.builtAt = try container.decode(String.self, forKey: .builtAt)
        self.revision = try container.decodeIfPresent(String.self, forKey: .revision)
        self.built = try container.decode([JazzCapability].self, forKey: .built)
        self.planned = try container.decode([JazzCapability].self, forKey: .planned)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(domain, forKey: .domain)
        try container.encode(builtAt, forKey: .builtAt)
        try container.encodeIfPresent(revision, forKey: .revision)
        try container.encode(built, forKey: .built)
        try container.encode(planned, forKey: .planned)
    }
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

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encodeIfPresent(name, forKey: .name)
    }
}

public struct JazzContext: Codable, Sendable, Equatable {
    public var sessionId: String
    public var agent: JazzContextAgent
    public var surface: String
    public var phrases: [JazzPhrase]
    public var selection: [String]
    public var documentSummary: String?
    public var riffs: [JazzRiffSummary]
    public var policy: JazzPolicy
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
        phrases: [JazzPhrase],
        selection: [String] = [],
        documentSummary: String? = nil,
        riffs: [JazzRiffSummary] = [],
        policy: JazzPolicy,
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
        self.phrases = try container.decode([JazzPhrase].self, forKey: .phrases)
        self.selection = try container.decodeIfPresent([String].self, forKey: .selection) ?? []
        self.documentSummary = try container.decodeIfPresent(String.self, forKey: .documentSummary)
        self.riffs = try container.decodeIfPresent([JazzRiffSummary].self, forKey: .riffs) ?? []
        self.policy = try container.decode(JazzPolicy.self, forKey: .policy)
        self.skills = try container.decodeIfPresent([String].self, forKey: .skills) ?? []
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(sessionId, forKey: .sessionId)
        try container.encode(agent, forKey: .agent)
        try container.encode(surface, forKey: .surface)
        try container.encode(phrases, forKey: .phrases)
        try container.encode(selection, forKey: .selection)
        try container.encodeIfPresent(documentSummary, forKey: .documentSummary)
        try container.encode(riffs, forKey: .riffs)
        try container.encode(policy, forKey: .policy)
        try container.encode(skills, forKey: .skills)
    }
}

public struct JazzDomain: Codable, Sendable, Equatable {
    public var id: String
    public var name: String
    public var paths: [String]
    public var docs: [String]
    public var skills: [String]
    public var labels: [String]

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
        case paths = "paths"
        case docs = "docs"
        case skills = "skills"
        case labels = "labels"
    }

    public init(
        id: String,
        name: String,
        paths: [String],
        docs: [String] = [],
        skills: [String] = [],
        labels: [String] = []
    ) {
        self.id = id
        self.name = name
        self.paths = paths
        self.docs = docs
        self.skills = skills
        self.labels = labels
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.paths = try container.decode([String].self, forKey: .paths)
        self.docs = try container.decodeIfPresent([String].self, forKey: .docs) ?? []
        self.skills = try container.decodeIfPresent([String].self, forKey: .skills) ?? []
        self.labels = try container.decodeIfPresent([String].self, forKey: .labels) ?? []
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encode(paths, forKey: .paths)
        try container.encode(docs, forKey: .docs)
        try container.encode(skills, forKey: .skills)
        try container.encode(labels, forKey: .labels)
    }
}

public struct JazzEvidence: Codable, Sendable, Equatable {
    public var kind: JazzEvidenceKind
    public var ref: String
    public var url: String?
    public var quote: String?
    public var scope: String?

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case ref = "ref"
        case url = "url"
        case quote = "quote"
        case scope = "scope"
    }

    public init(
        kind: JazzEvidenceKind,
        ref: String,
        url: String? = nil,
        quote: String? = nil,
        scope: String? = nil
    ) {
        self.kind = kind
        self.ref = ref
        self.url = url
        self.quote = quote
        self.scope = scope
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decode(JazzEvidenceKind.self, forKey: .kind)
        self.ref = try container.decode(String.self, forKey: .ref)
        self.url = try container.decodeIfPresent(String.self, forKey: .url)
        self.quote = try container.decodeIfPresent(String.self, forKey: .quote)
        self.scope = try container.decodeIfPresent(String.self, forKey: .scope)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encode(ref, forKey: .ref)
        try container.encodeIfPresent(url, forKey: .url)
        try container.encodeIfPresent(quote, forKey: .quote)
        try container.encodeIfPresent(scope, forKey: .scope)
    }
}

public struct JazzFeedback: Codable, Sendable, Equatable {
    public var riffId: String
    public var verdict: JazzVerdict
    public var at: String
    public var by: JazzOrigin
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
        verdict: JazzVerdict,
        at: String,
        by: JazzOrigin,
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
        self.verdict = try container.decode(JazzVerdict.self, forKey: .verdict)
        self.at = try container.decode(String.self, forKey: .at)
        self.by = try container.decode(JazzOrigin.self, forKey: .by)
        self.reason = try container.decodeIfPresent(String.self, forKey: .reason)
        self.editedFields = try container.decodeIfPresent([String].self, forKey: .editedFields)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(riffId, forKey: .riffId)
        try container.encode(verdict, forKey: .verdict)
        try container.encode(at, forKey: .at)
        try container.encode(by, forKey: .by)
        try container.encodeIfPresent(reason, forKey: .reason)
        try container.encodeIfPresent(editedFields, forKey: .editedFields)
    }
}

/// Any JSON value.
public typealias JazzJsonValue = JSONValue

public struct JazzObservation: Codable, Sendable, Equatable {
    public var id: String
    public var at: String
    public var surface: String
    public var origin: JazzOrigin
    public var action: JazzAction
    public var targets: [JazzTarget]
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
        origin: JazzOrigin,
        action: JazzAction,
        targets: [JazzTarget],
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
        self.origin = try container.decode(JazzOrigin.self, forKey: .origin)
        self.action = try container.decode(JazzAction.self, forKey: .action)
        self.targets = try container.decode([JazzTarget].self, forKey: .targets)
        self.fields = try container.decodeIfPresent([String].self, forKey: .fields)
        self.inGesture = try container.decodeIfPresent(Bool.self, forKey: .inGesture) ?? false
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(at, forKey: .at)
        try container.encode(surface, forKey: .surface)
        try container.encode(origin, forKey: .origin)
        try container.encode(action, forKey: .action)
        try container.encode(targets, forKey: .targets)
        try container.encodeIfPresent(fields, forKey: .fields)
        try container.encode(inGesture, forKey: .inGesture)
        try container.encodeIfPresent(summary, forKey: .summary)
    }
}

/// Pattern: `^(user|agent:.+)$`
public typealias JazzOrigin = String

public struct JazzPhrase: Codable, Sendable, Equatable {
    public var id: String
    public var surface: String
    public var startedAt: String
    public var endedAt: String
    public var observations: [JazzObservation]
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
        observations: [JazzObservation],
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
        self.observations = try container.decode([JazzObservation].self, forKey: .observations)
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(surface, forKey: .surface)
        try container.encode(startedAt, forKey: .startedAt)
        try container.encode(endedAt, forKey: .endedAt)
        try container.encode(observations, forKey: .observations)
        try container.encodeIfPresent(summary, forKey: .summary)
    }
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

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(idleMs, forKey: .idleMs)
        try container.encode(minGapMs, forKey: .minGapMs)
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

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(maxRiffsPerMinute, forKey: .maxRiffsPerMinute)
        try container.encode(maxPending, forKey: .maxPending)
        try container.encode(cooldownAfterRejectMs, forKey: .cooldownAfterRejectMs)
    }
}

public struct JazzPolicy: Codable, Sendable, Equatable {
    public var autonomy: JazzAutonomy
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
        autonomy: JazzAutonomy = .suggest,
        tempo: JazzPolicyTempo = SchemaDefault.decode(JazzPolicyTempo.self, json: "{}"),
        budget: JazzPolicyBudget = SchemaDefault.decode(JazzPolicyBudget.self, json: "{}"),
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
        self.autonomy = try container.decodeIfPresent(JazzAutonomy.self, forKey: .autonomy) ?? .suggest
        self.tempo = try container.decodeIfPresent(JazzPolicyTempo.self, forKey: .tempo) ?? SchemaDefault.decode(JazzPolicyTempo.self, json: "{}")
        self.budget = try container.decodeIfPresent(JazzPolicyBudget.self, forKey: .budget) ?? SchemaDefault.decode(JazzPolicyBudget.self, json: "{}")
        self.allowEditUserContent = try container.decodeIfPresent(Bool.self, forKey: .allowEditUserContent) ?? false
        self.strategies = try container.decodeIfPresent([String].self, forKey: .strategies)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(autonomy, forKey: .autonomy)
        try container.encode(tempo, forKey: .tempo)
        try container.encode(budget, forKey: .budget)
        try container.encode(allowEditUserContent, forKey: .allowEditUserContent)
        try container.encodeIfPresent(strategies, forKey: .strategies)
    }
}

public struct JazzProposalDraft: Codable, Sendable, Equatable {
    public var domain: String
    public var kind: JazzProposalKind
    public var title: String
    public var why: String
    public var today: String
    public var problemSpace: String?
    public var proposal: String
    public var effort: String
    public var risk: String?
    public var doneWhen: String?
    public var evidence: [JazzEvidence]

    enum CodingKeys: String, CodingKey {
        case domain = "domain"
        case kind = "kind"
        case title = "title"
        case why = "why"
        case today = "today"
        case problemSpace = "problemSpace"
        case proposal = "proposal"
        case effort = "effort"
        case risk = "risk"
        case doneWhen = "doneWhen"
        case evidence = "evidence"
    }

    public init(
        domain: String,
        kind: JazzProposalKind,
        title: String,
        why: String,
        today: String,
        problemSpace: String? = nil,
        proposal: String,
        effort: String,
        risk: String? = nil,
        doneWhen: String? = nil,
        evidence: [JazzEvidence]
    ) {
        self.domain = domain
        self.kind = kind
        self.title = title
        self.why = why
        self.today = today
        self.problemSpace = problemSpace
        self.proposal = proposal
        self.effort = effort
        self.risk = risk
        self.doneWhen = doneWhen
        self.evidence = evidence
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.domain = try container.decode(String.self, forKey: .domain)
        self.kind = try container.decode(JazzProposalKind.self, forKey: .kind)
        self.title = try container.decode(String.self, forKey: .title)
        self.why = try container.decode(String.self, forKey: .why)
        self.today = try container.decode(String.self, forKey: .today)
        self.problemSpace = try container.decodeIfPresent(String.self, forKey: .problemSpace)
        self.proposal = try container.decode(String.self, forKey: .proposal)
        self.effort = try container.decode(String.self, forKey: .effort)
        self.risk = try container.decodeIfPresent(String.self, forKey: .risk)
        self.doneWhen = try container.decodeIfPresent(String.self, forKey: .doneWhen)
        self.evidence = try container.decode([JazzEvidence].self, forKey: .evidence)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(domain, forKey: .domain)
        try container.encode(kind, forKey: .kind)
        try container.encode(title, forKey: .title)
        try container.encode(why, forKey: .why)
        try container.encode(today, forKey: .today)
        try container.encodeIfPresent(problemSpace, forKey: .problemSpace)
        try container.encode(proposal, forKey: .proposal)
        try container.encode(effort, forKey: .effort)
        try container.encodeIfPresent(risk, forKey: .risk)
        try container.encodeIfPresent(doneWhen, forKey: .doneWhen)
        try container.encode(evidence, forKey: .evidence)
    }
}

public enum JazzRiffMode: String, Codable, Sendable, CaseIterable {
    case suggest = "suggest"
    case assist = "assist"
}

public struct JazzRiff: Codable, Sendable, Equatable {
    public var id: String
    public var sessionId: String
    public var origin: JazzOrigin
    public var surface: String
    public var strategy: String
    public var intent: JazzRiffIntent
    public var title: String
    public var rationale: String?
    public var confidence: Double
    public var targets: [String]
    public var phraseId: String?
    public var toolCalls: [JazzToolCall]
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
        origin: JazzOrigin,
        surface: String,
        strategy: String,
        intent: JazzRiffIntent,
        title: String,
        rationale: String? = nil,
        confidence: Double,
        targets: [String] = [],
        phraseId: String? = nil,
        toolCalls: [JazzToolCall] = [],
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
        self.origin = try container.decode(JazzOrigin.self, forKey: .origin)
        self.surface = try container.decode(String.self, forKey: .surface)
        self.strategy = try container.decode(String.self, forKey: .strategy)
        self.intent = try container.decode(JazzRiffIntent.self, forKey: .intent)
        self.title = try container.decode(String.self, forKey: .title)
        self.rationale = try container.decodeIfPresent(String.self, forKey: .rationale)
        self.confidence = try container.decode(Double.self, forKey: .confidence)
        self.targets = try container.decodeIfPresent([String].self, forKey: .targets) ?? []
        self.phraseId = try container.decodeIfPresent(String.self, forKey: .phraseId)
        self.toolCalls = try container.decodeIfPresent([JazzToolCall].self, forKey: .toolCalls) ?? []
        self.mode = try container.decode(JazzRiffMode.self, forKey: .mode)
        self.proposalId = try container.decodeIfPresent(String.self, forKey: .proposalId)
        self.status = try container.decode(JazzRiffStatus.self, forKey: .status)
        self.idempotencyKey = try container.decodeIfPresent(String.self, forKey: .idempotencyKey)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decodeIfPresent(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(sessionId, forKey: .sessionId)
        try container.encode(origin, forKey: .origin)
        try container.encode(surface, forKey: .surface)
        try container.encode(strategy, forKey: .strategy)
        try container.encode(intent, forKey: .intent)
        try container.encode(title, forKey: .title)
        try container.encodeIfPresent(rationale, forKey: .rationale)
        try container.encode(confidence, forKey: .confidence)
        try container.encode(targets, forKey: .targets)
        try container.encodeIfPresent(phraseId, forKey: .phraseId)
        try container.encode(toolCalls, forKey: .toolCalls)
        try container.encode(mode, forKey: .mode)
        try container.encodeIfPresent(proposalId, forKey: .proposalId)
        try container.encode(status, forKey: .status)
        try container.encodeIfPresent(idempotencyKey, forKey: .idempotencyKey)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encodeIfPresent(updatedAt, forKey: .updatedAt)
    }
}

public struct JazzRiffSummary: Codable, Sendable, Equatable {
    public var id: String
    public var strategy: String
    public var intent: JazzRiffIntent
    public var title: String
    public var targets: [String]
    public var status: JazzRiffStatus

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
        intent: JazzRiffIntent,
        title: String,
        targets: [String] = [],
        status: JazzRiffStatus
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
        self.intent = try container.decode(JazzRiffIntent.self, forKey: .intent)
        self.title = try container.decode(String.self, forKey: .title)
        self.targets = try container.decodeIfPresent([String].self, forKey: .targets) ?? []
        self.status = try container.decode(JazzRiffStatus.self, forKey: .status)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(strategy, forKey: .strategy)
        try container.encode(intent, forKey: .intent)
        try container.encode(title, forKey: .title)
        try container.encode(targets, forKey: .targets)
        try container.encode(status, forKey: .status)
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

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(label, forKey: .label)
    }
}

public typealias JazzTextLeadRequest = TextLeadRequest

public typealias JazzTextLeadResponse = TextLeadResponse

public struct JazzTextRange: Codable, Sendable, Equatable {
    public var start: Int
    public var end: Int

    enum CodingKeys: String, CodingKey {
        case start = "start"
        case end = "end"
    }

    public init(
        start: Int,
        end: Int
    ) {
        self.start = start
        self.end = end
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.start = try container.decode(Int.self, forKey: .start)
        self.end = try container.decode(Int.self, forKey: .end)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(start, forKey: .start)
        try container.encode(end, forKey: .end)
    }
}

public struct JazzTextSuggestion: Codable, Sendable, Equatable {
    public var kind: JazzTextSuggestionKind
    public var range: JazzTextRange
    public var replacement: String
    public var why: String

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case range = "range"
        case replacement = "replacement"
        case why = "why"
    }

    public init(
        kind: JazzTextSuggestionKind,
        range: JazzTextRange,
        replacement: String,
        why: String
    ) {
        self.kind = kind
        self.range = range
        self.replacement = replacement
        self.why = why
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decode(JazzTextSuggestionKind.self, forKey: .kind)
        self.range = try container.decode(JazzTextRange.self, forKey: .range)
        self.replacement = try container.decode(String.self, forKey: .replacement)
        self.why = try container.decode(String.self, forKey: .why)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encode(range, forKey: .range)
        try container.encode(replacement, forKey: .replacement)
        try container.encode(why, forKey: .why)
    }
}

public struct JazzTextVoice: Codable, Sendable, Equatable {
    public var voice: JazzTextVoiceId
    public var strength: Double
    public var disabledRules: [String]?

    enum CodingKeys: String, CodingKey {
        case voice = "voice"
        case strength = "strength"
        case disabledRules = "disabledRules"
    }

    public init(
        voice: JazzTextVoiceId,
        strength: Double = 1,
        disabledRules: [String]? = nil
    ) {
        self.voice = voice
        self.strength = strength
        self.disabledRules = disabledRules
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.voice = try container.decode(JazzTextVoiceId.self, forKey: .voice)
        self.strength = try container.decodeIfPresent(Double.self, forKey: .strength) ?? 1
        self.disabledRules = try container.decodeIfPresent([String].self, forKey: .disabledRules)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(voice, forKey: .voice)
        try container.encode(strength, forKey: .strength)
        try container.encodeIfPresent(disabledRules, forKey: .disabledRules)
    }
}

public struct JazzTextVoiceState: Codable, Sendable, Equatable {
    public var voice: JazzTextVoiceId
    public var strength: Double
    public var kept: Int
    public var undone: Int
    public var rules: [String: JazzTextVoiceStats]

    enum CodingKeys: String, CodingKey {
        case voice = "voice"
        case strength = "strength"
        case kept = "kept"
        case undone = "undone"
        case rules = "rules"
    }

    public init(
        voice: JazzTextVoiceId,
        strength: Double = 1,
        kept: Int = 0,
        undone: Int = 0,
        rules: [String: JazzTextVoiceStats] = [:]
    ) {
        self.voice = voice
        self.strength = strength
        self.kept = kept
        self.undone = undone
        self.rules = rules
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.voice = try container.decode(JazzTextVoiceId.self, forKey: .voice)
        self.strength = try container.decodeIfPresent(Double.self, forKey: .strength) ?? 1
        self.kept = try container.decodeIfPresent(Int.self, forKey: .kept) ?? 0
        self.undone = try container.decodeIfPresent(Int.self, forKey: .undone) ?? 0
        self.rules = try container.decodeIfPresent([String: JazzTextVoiceStats].self, forKey: .rules) ?? [:]
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(voice, forKey: .voice)
        try container.encode(strength, forKey: .strength)
        try container.encode(kept, forKey: .kept)
        try container.encode(undone, forKey: .undone)
        try container.encode(rules, forKey: .rules)
    }
}

public struct JazzTextVoiceStats: Codable, Sendable, Equatable {
    public var kept: Int
    public var undone: Int

    enum CodingKeys: String, CodingKey {
        case kept = "kept"
        case undone = "undone"
    }

    public init(
        kept: Int = 0,
        undone: Int = 0
    ) {
        self.kept = kept
        self.undone = undone
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kept = try container.decodeIfPresent(Int.self, forKey: .kept) ?? 0
        self.undone = try container.decodeIfPresent(Int.self, forKey: .undone) ?? 0
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kept, forKey: .kept)
        try container.encode(undone, forKey: .undone)
    }
}

public struct JazzToolCall: Codable, Sendable, Equatable {
    public var name: String
    public var arguments: [String: JazzJsonValue]

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case arguments = "arguments"
    }

    public init(
        name: String,
        arguments: [String: JazzJsonValue] = [:]
    ) {
        self.name = name
        self.arguments = arguments
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.arguments = try container.decodeIfPresent([String: JazzJsonValue].self, forKey: .arguments) ?? [:]
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encode(arguments, forKey: .arguments)
    }
}

public struct TextLeadRequest: Codable, Sendable, Equatable {
    public var paragraph: String
    public var before: String?
    public var after: String?
    public var flavor: JazzTextFlavor
    public var voices: [JazzTextVoiceState]
    public var teamId: String?

    enum CodingKeys: String, CodingKey {
        case paragraph = "paragraph"
        case before = "before"
        case after = "after"
        case flavor = "flavor"
        case voices = "voices"
        case teamId = "teamId"
    }

    public init(
        paragraph: String,
        before: String? = nil,
        after: String? = nil,
        flavor: JazzTextFlavor = .gfm,
        voices: [JazzTextVoiceState] = [],
        teamId: String? = nil
    ) {
        self.paragraph = paragraph
        self.before = before
        self.after = after
        self.flavor = flavor
        self.voices = voices
        self.teamId = teamId
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.paragraph = try container.decode(String.self, forKey: .paragraph)
        self.before = try container.decodeIfPresent(String.self, forKey: .before)
        self.after = try container.decodeIfPresent(String.self, forKey: .after)
        self.flavor = try container.decodeIfPresent(JazzTextFlavor.self, forKey: .flavor) ?? .gfm
        self.voices = try container.decodeIfPresent([JazzTextVoiceState].self, forKey: .voices) ?? []
        self.teamId = try container.decodeIfPresent(String.self, forKey: .teamId)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(paragraph, forKey: .paragraph)
        try container.encodeIfPresent(before, forKey: .before)
        try container.encodeIfPresent(after, forKey: .after)
        try container.encode(flavor, forKey: .flavor)
        try container.encode(voices, forKey: .voices)
        try container.encodeIfPresent(teamId, forKey: .teamId)
    }
}

public struct TextLeadResponse: Codable, Sendable, Equatable {
    public var genre: JazzTextGenre
    public var palette: [JazzTextVoice]
    public var suggestions: [JazzTextSuggestion]
    public var why: String
    public var fuelBalance: Int?

    enum CodingKeys: String, CodingKey {
        case genre = "genre"
        case palette = "palette"
        case suggestions = "suggestions"
        case why = "why"
        case fuelBalance = "fuelBalance"
    }

    public init(
        genre: JazzTextGenre,
        palette: [JazzTextVoice],
        suggestions: [JazzTextSuggestion] = [],
        why: String,
        fuelBalance: Int? = nil
    ) {
        self.genre = genre
        self.palette = palette
        self.suggestions = suggestions
        self.why = why
        self.fuelBalance = fuelBalance
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.genre = try container.decode(JazzTextGenre.self, forKey: .genre)
        self.palette = try container.decode([JazzTextVoice].self, forKey: .palette)
        self.suggestions = try container.decodeIfPresent([JazzTextSuggestion].self, forKey: .suggestions) ?? []
        self.why = try container.decode(String.self, forKey: .why)
        self.fuelBalance = try container.decodeIfPresent(Int.self, forKey: .fuelBalance)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(genre, forKey: .genre)
        try container.encode(palette, forKey: .palette)
        try container.encode(suggestions, forKey: .suggestions)
        try container.encode(why, forKey: .why)
        try container.encodeIfPresent(fuelBalance, forKey: .fuelBalance)
    }
}
