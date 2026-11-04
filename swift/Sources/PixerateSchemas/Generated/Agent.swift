// Generated from @pixerate/schemas agent contracts by scripts/gen-swift.mjs. Do not edit.
import Foundation

public enum AgentFileChangeKind: String, Codable, Sendable, CaseIterable {
    case created = "created"
    case modified = "modified"
    case deleted = "deleted"
}

public enum AgentInteractionStatus: String, Codable, Sendable, CaseIterable {
    case queued = "queued"
    case inProgress = "in_progress"
    case completed = "completed"
    case failed = "failed"
    case cancelled = "cancelled"
}

public enum AgentRiskLevel: String, Codable, Sendable, CaseIterable {
    case low = "low"
    case medium = "medium"
    case high = "high"
    case critical = "critical"
}

public enum AgentToolType: String, Codable, Sendable, CaseIterable {
    case codeExecution = "code_execution"
    case googleSearch = "google_search"
    case urlContext = "url_context"
    case fileSearch = "file_search"
    case custom = "custom"
}

public enum AgentWorkspaceEntryType: String, Codable, Sendable, CaseIterable {
    case file = "file"
    case directory = "directory"
}

public enum ApiKeyOwnerType: String, Codable, Sendable, CaseIterable {
    case user = "user"
    case serviceAccount = "service_account"
    case team = "team"
    case organization = "organization"
}

public enum ApiKeyStatus: String, Codable, Sendable, CaseIterable {
    case active = "active"
    case revoked = "revoked"
}

public struct ActiveAgentTask: Codable, Sendable, Equatable {
    public var taskId: String
    public var taskTitle: String
    public var statusText: String?
    public var startedAt: String

    enum CodingKeys: String, CodingKey {
        case taskId = "taskId"
        case taskTitle = "taskTitle"
        case statusText = "statusText"
        case startedAt = "startedAt"
    }

    public init(
        taskId: String,
        taskTitle: String,
        statusText: String? = nil,
        startedAt: String
    ) {
        self.taskId = taskId
        self.taskTitle = taskTitle
        self.statusText = statusText
        self.startedAt = startedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.taskId = try container.decode(String.self, forKey: .taskId)
        self.taskTitle = try container.decode(String.self, forKey: .taskTitle)
        self.statusText = try container.decodeIfPresent(String.self, forKey: .statusText)
        self.startedAt = try container.decode(String.self, forKey: .startedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(taskId, forKey: .taskId)
        try container.encode(taskTitle, forKey: .taskTitle)
        try container.encodeIfPresent(statusText, forKey: .statusText)
        try container.encode(startedAt, forKey: .startedAt)
    }
}

public struct AgentApprovalRequest: Codable, Sendable, Equatable {
    public var toolCallId: String
    public var toolName: String
    public var parameters: [String: JSONValue]
    public var riskLevel: AgentRiskLevel
    public var riskReason: String?

    enum CodingKeys: String, CodingKey {
        case toolCallId = "toolCallId"
        case toolName = "toolName"
        case parameters = "parameters"
        case riskLevel = "riskLevel"
        case riskReason = "riskReason"
    }

    public init(
        toolCallId: String,
        toolName: String,
        parameters: [String: JSONValue],
        riskLevel: AgentRiskLevel,
        riskReason: String? = nil
    ) {
        self.toolCallId = toolCallId
        self.toolName = toolName
        self.parameters = parameters
        self.riskLevel = riskLevel
        self.riskReason = riskReason
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.toolCallId = try container.decode(String.self, forKey: .toolCallId)
        self.toolName = try container.decode(String.self, forKey: .toolName)
        self.parameters = try container.decode([String: JSONValue].self, forKey: .parameters)
        self.riskLevel = try container.decode(AgentRiskLevel.self, forKey: .riskLevel)
        self.riskReason = try container.decodeIfPresent(String.self, forKey: .riskReason)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(toolCallId, forKey: .toolCallId)
        try container.encode(toolName, forKey: .toolName)
        try container.encode(parameters, forKey: .parameters)
        try container.encode(riskLevel, forKey: .riskLevel)
        try container.encodeIfPresent(riskReason, forKey: .riskReason)
    }
}

public enum AgentApprovalResponseStatus: String, Codable, Sendable, CaseIterable {
    case approved = "approved"
    case denied = "denied"
    case modified = "modified"
}

public struct AgentApprovalResponse: Codable, Sendable, Equatable {
    public var toolCallId: String
    public var status: AgentApprovalResponseStatus
    public var modifiedParameters: [String: JSONValue]?
    public var feedback: String?

    enum CodingKeys: String, CodingKey {
        case toolCallId = "toolCallId"
        case status = "status"
        case modifiedParameters = "modifiedParameters"
        case feedback = "feedback"
    }

    public init(
        toolCallId: String,
        status: AgentApprovalResponseStatus,
        modifiedParameters: [String: JSONValue]? = nil,
        feedback: String? = nil
    ) {
        self.toolCallId = toolCallId
        self.status = status
        self.modifiedParameters = modifiedParameters
        self.feedback = feedback
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.toolCallId = try container.decode(String.self, forKey: .toolCallId)
        self.status = try container.decode(AgentApprovalResponseStatus.self, forKey: .status)
        self.modifiedParameters = try container.decodeIfPresent([String: JSONValue].self, forKey: .modifiedParameters)
        self.feedback = try container.decodeIfPresent(String.self, forKey: .feedback)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(toolCallId, forKey: .toolCallId)
        try container.encode(status, forKey: .status)
        try container.encodeIfPresent(modifiedParameters, forKey: .modifiedParameters)
        try container.encodeIfPresent(feedback, forKey: .feedback)
    }
}

public struct AgentConfig: Codable, Sendable, Equatable {
    public var type: String?
    public var model: String?
    public var options: [String: JSONValue]?

    enum CodingKeys: String, CodingKey {
        case type = "type"
        case model = "model"
        case options = "options"
    }

    public init(
        type: String? = nil,
        model: String? = nil,
        options: [String: JSONValue]? = nil
    ) {
        self.type = type
        self.model = model
        self.options = options
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.model = try container.decodeIfPresent(String.self, forKey: .model)
        self.options = try container.decodeIfPresent([String: JSONValue].self, forKey: .options)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(model, forKey: .model)
        try container.encodeIfPresent(options, forKey: .options)
    }
}

public struct AgentDiffStats: Codable, Sendable, Equatable {
    public var added: Int
    public var removed: Int

    enum CodingKeys: String, CodingKey {
        case added = "added"
        case removed = "removed"
    }

    public init(
        added: Int,
        removed: Int
    ) {
        self.added = added
        self.removed = removed
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.added = try container.decode(Int.self, forKey: .added)
        self.removed = try container.decode(Int.self, forKey: .removed)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(added, forKey: .added)
        try container.encode(removed, forKey: .removed)
    }
}

public struct AgentDirectoryEntry: Codable, Sendable, Equatable {
    public var id: String
    public var orgId: String
    public var name: String
    public var handle: String?
    public var colorName: String
    public var hexColor: String
    public var avatarUrl: String?
    public var role: String?
    public var `description`: String?
    public var currentStatus: String?
    public var currentTaskId: String?
    public var currentTaskTitle: String?
    public var isEngaged: Bool?
    public var activeTasks: [ActiveAgentTask]?
    public var lastSeen: Double?
    public var createdAt: String
    public var updatedAt: String

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case orgId = "orgId"
        case name = "name"
        case handle = "handle"
        case colorName = "colorName"
        case hexColor = "hexColor"
        case avatarUrl = "avatarUrl"
        case role = "role"
        case `description` = "description"
        case currentStatus = "currentStatus"
        case currentTaskId = "currentTaskId"
        case currentTaskTitle = "currentTaskTitle"
        case isEngaged = "isEngaged"
        case activeTasks = "activeTasks"
        case lastSeen = "lastSeen"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
    }

    public init(
        id: String,
        orgId: String,
        name: String,
        handle: String? = nil,
        colorName: String,
        hexColor: String,
        avatarUrl: String? = nil,
        role: String? = nil,
        `description`: String? = nil,
        currentStatus: String? = nil,
        currentTaskId: String? = nil,
        currentTaskTitle: String? = nil,
        isEngaged: Bool? = nil,
        activeTasks: [ActiveAgentTask]? = nil,
        lastSeen: Double? = nil,
        createdAt: String,
        updatedAt: String
    ) {
        self.id = id
        self.orgId = orgId
        self.name = name
        self.handle = handle
        self.colorName = colorName
        self.hexColor = hexColor
        self.avatarUrl = avatarUrl
        self.role = role
        self.`description` = `description`
        self.currentStatus = currentStatus
        self.currentTaskId = currentTaskId
        self.currentTaskTitle = currentTaskTitle
        self.isEngaged = isEngaged
        self.activeTasks = activeTasks
        self.lastSeen = lastSeen
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.orgId = try container.decode(String.self, forKey: .orgId)
        self.name = try container.decode(String.self, forKey: .name)
        self.handle = try container.decodeIfPresent(String.self, forKey: .handle)
        self.colorName = try container.decode(String.self, forKey: .colorName)
        self.hexColor = try container.decode(String.self, forKey: .hexColor)
        self.avatarUrl = try container.decodeIfPresent(String.self, forKey: .avatarUrl)
        self.role = try container.decodeIfPresent(String.self, forKey: .role)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.currentStatus = try container.decodeIfPresent(String.self, forKey: .currentStatus)
        self.currentTaskId = try container.decodeIfPresent(String.self, forKey: .currentTaskId)
        self.currentTaskTitle = try container.decodeIfPresent(String.self, forKey: .currentTaskTitle)
        self.isEngaged = try container.decodeIfPresent(Bool.self, forKey: .isEngaged)
        self.activeTasks = try container.decodeIfPresent([ActiveAgentTask].self, forKey: .activeTasks)
        self.lastSeen = try container.decodeIfPresent(Double.self, forKey: .lastSeen)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decode(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(orgId, forKey: .orgId)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(handle, forKey: .handle)
        try container.encode(colorName, forKey: .colorName)
        try container.encode(hexColor, forKey: .hexColor)
        try container.encodeIfPresent(avatarUrl, forKey: .avatarUrl)
        try container.encodeIfPresent(role, forKey: .role)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(currentStatus, forKey: .currentStatus)
        try container.encode(currentTaskId, forKey: .currentTaskId)
        try container.encode(currentTaskTitle, forKey: .currentTaskTitle)
        try container.encodeIfPresent(isEngaged, forKey: .isEngaged)
        try container.encodeIfPresent(activeTasks, forKey: .activeTasks)
        try container.encodeIfPresent(lastSeen, forKey: .lastSeen)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(updatedAt, forKey: .updatedAt)
    }
}

public struct AgentDocumentAttachment: Codable, Sendable, Equatable {
    public var data: String?
    public var uri: String?
    public var mimeType: String
    public var fileName: String?

    enum CodingKeys: String, CodingKey {
        case data = "data"
        case uri = "uri"
        case mimeType = "mimeType"
        case fileName = "fileName"
    }

    public init(
        data: String? = nil,
        uri: String? = nil,
        mimeType: String,
        fileName: String? = nil
    ) {
        self.data = data
        self.uri = uri
        self.mimeType = mimeType
        self.fileName = fileName
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.data = try container.decodeIfPresent(String.self, forKey: .data)
        self.uri = try container.decodeIfPresent(String.self, forKey: .uri)
        self.mimeType = try container.decode(String.self, forKey: .mimeType)
        self.fileName = try container.decodeIfPresent(String.self, forKey: .fileName)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(data, forKey: .data)
        try container.encodeIfPresent(uri, forKey: .uri)
        try container.encode(mimeType, forKey: .mimeType)
        try container.encodeIfPresent(fileName, forKey: .fileName)
    }
}

public enum AgentEnvironmentType: String, Codable, Sendable, CaseIterable {
    case remote = "remote"
    case local = "local"
}

public struct AgentEnvironmentNetwork: Codable, Sendable, Equatable {
    public var allowlist: [AgentNetworkAllowlistRule]?

    enum CodingKeys: String, CodingKey {
        case allowlist = "allowlist"
    }

    public init(
        allowlist: [AgentNetworkAllowlistRule]? = nil
    ) {
        self.allowlist = allowlist
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.allowlist = try container.decodeIfPresent([AgentNetworkAllowlistRule].self, forKey: .allowlist)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(allowlist, forKey: .allowlist)
    }
}

public struct AgentEnvironment: Codable, Sendable, Equatable {
    public var type: AgentEnvironmentType?
    public var network: AgentEnvironmentNetwork?

    enum CodingKeys: String, CodingKey {
        case type = "type"
        case network = "network"
    }

    public init(
        type: AgentEnvironmentType? = nil,
        network: AgentEnvironmentNetwork? = nil
    ) {
        self.type = type
        self.network = network
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.type = try container.decodeIfPresent(AgentEnvironmentType.self, forKey: .type)
        self.network = try container.decodeIfPresent(AgentEnvironmentNetwork.self, forKey: .network)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(network, forKey: .network)
    }
}

public struct AgentFileChange: Codable, Sendable, Equatable {
    public var path: String
    public var kind: AgentFileChangeKind
    public var before: String?
    public var after: String?
    public var diff: String
    public var stats: AgentDiffStats

    enum CodingKeys: String, CodingKey {
        case path = "path"
        case kind = "kind"
        case before = "before"
        case after = "after"
        case diff = "diff"
        case stats = "stats"
    }

    public init(
        path: String,
        kind: AgentFileChangeKind,
        before: String? = nil,
        after: String? = nil,
        diff: String,
        stats: AgentDiffStats
    ) {
        self.path = path
        self.kind = kind
        self.before = before
        self.after = after
        self.diff = diff
        self.stats = stats
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.path = try container.decode(String.self, forKey: .path)
        self.kind = try container.decode(AgentFileChangeKind.self, forKey: .kind)
        self.before = try container.decodeIfPresent(String.self, forKey: .before)
        self.after = try container.decodeIfPresent(String.self, forKey: .after)
        self.diff = try container.decode(String.self, forKey: .diff)
        self.stats = try container.decode(AgentDiffStats.self, forKey: .stats)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(path, forKey: .path)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(before, forKey: .before)
        try container.encodeIfPresent(after, forKey: .after)
        try container.encode(diff, forKey: .diff)
        try container.encode(stats, forKey: .stats)
    }
}

public struct AgentInteractionRequest: Codable, Sendable, Equatable {
    public var agent: String?
    public var input: String
    public var systemInstruction: String?
    public var background: Bool
    public var tools: [AgentTool]?
    public var agentConfig: AgentConfig?
    public var environment: AgentEnvironment?
    public var documents: [AgentDocumentAttachment]?
    public var coachingRules: [String]?

    enum CodingKeys: String, CodingKey {
        case agent = "agent"
        case input = "input"
        case systemInstruction = "systemInstruction"
        case background = "background"
        case tools = "tools"
        case agentConfig = "agentConfig"
        case environment = "environment"
        case documents = "documents"
        case coachingRules = "coachingRules"
    }

    public init(
        agent: String? = nil,
        input: String,
        systemInstruction: String? = nil,
        background: Bool = true,
        tools: [AgentTool]? = nil,
        agentConfig: AgentConfig? = nil,
        environment: AgentEnvironment? = nil,
        documents: [AgentDocumentAttachment]? = nil,
        coachingRules: [String]? = nil
    ) {
        self.agent = agent
        self.input = input
        self.systemInstruction = systemInstruction
        self.background = background
        self.tools = tools
        self.agentConfig = agentConfig
        self.environment = environment
        self.documents = documents
        self.coachingRules = coachingRules
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.agent = try container.decodeIfPresent(String.self, forKey: .agent)
        self.input = try container.decode(String.self, forKey: .input)
        self.systemInstruction = try container.decodeIfPresent(String.self, forKey: .systemInstruction)
        self.background = try container.decodeIfPresent(Bool.self, forKey: .background) ?? true
        self.tools = try container.decodeIfPresent([AgentTool].self, forKey: .tools)
        self.agentConfig = try container.decodeIfPresent(AgentConfig.self, forKey: .agentConfig)
        self.environment = try container.decodeIfPresent(AgentEnvironment.self, forKey: .environment)
        self.documents = try container.decodeIfPresent([AgentDocumentAttachment].self, forKey: .documents)
        self.coachingRules = try container.decodeIfPresent([String].self, forKey: .coachingRules)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(agent, forKey: .agent)
        try container.encode(input, forKey: .input)
        try container.encodeIfPresent(systemInstruction, forKey: .systemInstruction)
        try container.encode(background, forKey: .background)
        try container.encodeIfPresent(tools, forKey: .tools)
        try container.encodeIfPresent(agentConfig, forKey: .agentConfig)
        try container.encodeIfPresent(environment, forKey: .environment)
        try container.encodeIfPresent(documents, forKey: .documents)
        try container.encodeIfPresent(coachingRules, forKey: .coachingRules)
    }
}

public struct AgentInteractionResult: Codable, Sendable, Equatable {
    public var id: String
    public var agent: String
    public var status: AgentInteractionStatus
    public var outputText: String?
    public var error: String?
    public var latencyMs: Double?
    public var metadata: [String: JSONValue]?
    public var createdAt: String?
    public var updatedAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case agent = "agent"
        case status = "status"
        case outputText = "outputText"
        case error = "error"
        case latencyMs = "latencyMs"
        case metadata = "metadata"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
    }

    public init(
        id: String,
        agent: String,
        status: AgentInteractionStatus,
        outputText: String? = nil,
        error: String? = nil,
        latencyMs: Double? = nil,
        metadata: [String: JSONValue]? = nil,
        createdAt: String? = nil,
        updatedAt: String? = nil
    ) {
        self.id = id
        self.agent = agent
        self.status = status
        self.outputText = outputText
        self.error = error
        self.latencyMs = latencyMs
        self.metadata = metadata
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.agent = try container.decode(String.self, forKey: .agent)
        self.status = try container.decode(AgentInteractionStatus.self, forKey: .status)
        self.outputText = try container.decodeIfPresent(String.self, forKey: .outputText)
        self.error = try container.decodeIfPresent(String.self, forKey: .error)
        self.latencyMs = try container.decodeIfPresent(Double.self, forKey: .latencyMs)
        self.metadata = try container.decodeIfPresent([String: JSONValue].self, forKey: .metadata)
        self.createdAt = try container.decodeIfPresent(String.self, forKey: .createdAt)
        self.updatedAt = try container.decodeIfPresent(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(agent, forKey: .agent)
        try container.encode(status, forKey: .status)
        try container.encodeIfPresent(outputText, forKey: .outputText)
        try container.encodeIfPresent(error, forKey: .error)
        try container.encodeIfPresent(latencyMs, forKey: .latencyMs)
        try container.encodeIfPresent(metadata, forKey: .metadata)
        try container.encodeIfPresent(createdAt, forKey: .createdAt)
        try container.encodeIfPresent(updatedAt, forKey: .updatedAt)
    }
}

public struct AgentNetworkAllowlistRule: Codable, Sendable, Equatable {
    public var domain: String
    public var transform: [AgentNetworkTransformRule]?

    enum CodingKeys: String, CodingKey {
        case domain = "domain"
        case transform = "transform"
    }

    public init(
        domain: String,
        transform: [AgentNetworkTransformRule]? = nil
    ) {
        self.domain = domain
        self.transform = transform
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.domain = try container.decode(String.self, forKey: .domain)
        self.transform = try container.decodeIfPresent([AgentNetworkTransformRule].self, forKey: .transform)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(domain, forKey: .domain)
        try container.encodeIfPresent(transform, forKey: .transform)
    }
}

public struct AgentNetworkTransformRule: Codable, Sendable, Equatable {
    public var key: String
    public var value: String

    enum CodingKeys: String, CodingKey {
        case key = "key"
        case value = "value"
    }

    public init(
        key: String,
        value: String
    ) {
        self.key = key
        self.value = value
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.key = try container.decode(String.self, forKey: .key)
        self.value = try container.decode(String.self, forKey: .value)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(key, forKey: .key)
        try container.encode(value, forKey: .value)
    }
}

public struct AgentTool: Codable, Sendable, Equatable {
    public var type: String
    public var config: [String: JSONValue]?

    enum CodingKeys: String, CodingKey {
        case type = "type"
        case config = "config"
    }

    public init(
        type: String,
        config: [String: JSONValue]? = nil
    ) {
        self.type = type
        self.config = config
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.type = try container.decode(String.self, forKey: .type)
        self.config = try container.decodeIfPresent([String: JSONValue].self, forKey: .config)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(type, forKey: .type)
        try container.encodeIfPresent(config, forKey: .config)
    }
}

public struct AgentWorkspaceEntry: Codable, Sendable, Equatable {
    public var path: String
    public var type: AgentWorkspaceEntryType
    public var size: Int?

    enum CodingKeys: String, CodingKey {
        case path = "path"
        case type = "type"
        case size = "size"
    }

    public init(
        path: String,
        type: AgentWorkspaceEntryType,
        size: Int? = nil
    ) {
        self.path = path
        self.type = type
        self.size = size
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.path = try container.decode(String.self, forKey: .path)
        self.type = try container.decode(AgentWorkspaceEntryType.self, forKey: .type)
        self.size = try container.decodeIfPresent(Int.self, forKey: .size)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(path, forKey: .path)
        try container.encode(type, forKey: .type)
        try container.encodeIfPresent(size, forKey: .size)
    }
}

public struct ApiKey: Codable, Sendable, Equatable {
    public var id: String
    public var name: String
    public var keyPrefix: String
    public var hashedSecret: String
    public var ownerType: ApiKeyOwnerType
    public var ownerId: String
    public var orgId: String?
    public var teamId: String?
    public var serviceAccountId: String?
    public var createdBy: String
    public var scopes: [String]
    public var resourceIds: [String]?
    public var status: ApiKeyStatus
    public var metadata: [String: JSONValue]?
    public var createdAt: String
    public var updatedAt: String
    public var expiresAt: String?
    public var lastUsedAt: String?
    public var revokedAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
        case keyPrefix = "keyPrefix"
        case hashedSecret = "hashedSecret"
        case ownerType = "ownerType"
        case ownerId = "ownerId"
        case orgId = "orgId"
        case teamId = "teamId"
        case serviceAccountId = "serviceAccountId"
        case createdBy = "createdBy"
        case scopes = "scopes"
        case resourceIds = "resourceIds"
        case status = "status"
        case metadata = "metadata"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
        case expiresAt = "expiresAt"
        case lastUsedAt = "lastUsedAt"
        case revokedAt = "revokedAt"
    }

    public init(
        id: String,
        name: String,
        keyPrefix: String,
        hashedSecret: String,
        ownerType: ApiKeyOwnerType,
        ownerId: String,
        orgId: String? = nil,
        teamId: String? = nil,
        serviceAccountId: String? = nil,
        createdBy: String,
        scopes: [String],
        resourceIds: [String]? = nil,
        status: ApiKeyStatus,
        metadata: [String: JSONValue]? = nil,
        createdAt: String,
        updatedAt: String,
        expiresAt: String? = nil,
        lastUsedAt: String? = nil,
        revokedAt: String? = nil
    ) {
        self.id = id
        self.name = name
        self.keyPrefix = keyPrefix
        self.hashedSecret = hashedSecret
        self.ownerType = ownerType
        self.ownerId = ownerId
        self.orgId = orgId
        self.teamId = teamId
        self.serviceAccountId = serviceAccountId
        self.createdBy = createdBy
        self.scopes = scopes
        self.resourceIds = resourceIds
        self.status = status
        self.metadata = metadata
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.expiresAt = expiresAt
        self.lastUsedAt = lastUsedAt
        self.revokedAt = revokedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.keyPrefix = try container.decode(String.self, forKey: .keyPrefix)
        self.hashedSecret = try container.decode(String.self, forKey: .hashedSecret)
        self.ownerType = try container.decode(ApiKeyOwnerType.self, forKey: .ownerType)
        self.ownerId = try container.decode(String.self, forKey: .ownerId)
        self.orgId = try container.decodeIfPresent(String.self, forKey: .orgId)
        self.teamId = try container.decodeIfPresent(String.self, forKey: .teamId)
        self.serviceAccountId = try container.decodeIfPresent(String.self, forKey: .serviceAccountId)
        self.createdBy = try container.decode(String.self, forKey: .createdBy)
        self.scopes = try container.decode([String].self, forKey: .scopes)
        self.resourceIds = try container.decodeIfPresent([String].self, forKey: .resourceIds)
        self.status = try container.decode(ApiKeyStatus.self, forKey: .status)
        self.metadata = try container.decodeIfPresent([String: JSONValue].self, forKey: .metadata)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decode(String.self, forKey: .updatedAt)
        self.expiresAt = try container.decodeIfPresent(String.self, forKey: .expiresAt)
        self.lastUsedAt = try container.decodeIfPresent(String.self, forKey: .lastUsedAt)
        self.revokedAt = try container.decodeIfPresent(String.self, forKey: .revokedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encode(keyPrefix, forKey: .keyPrefix)
        try container.encode(hashedSecret, forKey: .hashedSecret)
        try container.encode(ownerType, forKey: .ownerType)
        try container.encode(ownerId, forKey: .ownerId)
        try container.encodeIfPresent(orgId, forKey: .orgId)
        try container.encodeIfPresent(teamId, forKey: .teamId)
        try container.encodeIfPresent(serviceAccountId, forKey: .serviceAccountId)
        try container.encode(createdBy, forKey: .createdBy)
        try container.encode(scopes, forKey: .scopes)
        try container.encodeIfPresent(resourceIds, forKey: .resourceIds)
        try container.encode(status, forKey: .status)
        try container.encodeIfPresent(metadata, forKey: .metadata)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(updatedAt, forKey: .updatedAt)
        try container.encode(expiresAt, forKey: .expiresAt)
        try container.encode(lastUsedAt, forKey: .lastUsedAt)
        try container.encode(revokedAt, forKey: .revokedAt)
    }
}

public enum ApiKeyLookupStatus: String, Codable, Sendable, CaseIterable {
    case active = "active"
    case revoked = "revoked"
}

public struct ApiKeyLookup: Codable, Sendable, Equatable {
    public var serviceAccountId: String
    public var orgId: String
    public var status: ApiKeyLookupStatus
    public var createdAt: String

    enum CodingKeys: String, CodingKey {
        case serviceAccountId = "serviceAccountId"
        case orgId = "orgId"
        case status = "status"
        case createdAt = "createdAt"
    }

    public init(
        serviceAccountId: String,
        orgId: String,
        status: ApiKeyLookupStatus,
        createdAt: String
    ) {
        self.serviceAccountId = serviceAccountId
        self.orgId = orgId
        self.status = status
        self.createdAt = createdAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.serviceAccountId = try container.decode(String.self, forKey: .serviceAccountId)
        self.orgId = try container.decode(String.self, forKey: .orgId)
        self.status = try container.decode(ApiKeyLookupStatus.self, forKey: .status)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(serviceAccountId, forKey: .serviceAccountId)
        try container.encode(orgId, forKey: .orgId)
        try container.encode(status, forKey: .status)
        try container.encode(createdAt, forKey: .createdAt)
    }
}

public struct CachedPage: Codable, Sendable, Equatable {
    public var url: String
    public var path: String
    public var title: String
    public var markdown: String
    public var textLength: Double
    public var links: [String]
    public var imageAssetIds: [String]
    public var fetchedAt: String
    public var expiresAt: String?
    public var hasInjectionWarning: Bool?
    public var metadata: [String: JSONValue]?

    enum CodingKeys: String, CodingKey {
        case url = "url"
        case path = "path"
        case title = "title"
        case markdown = "markdown"
        case textLength = "textLength"
        case links = "links"
        case imageAssetIds = "imageAssetIds"
        case fetchedAt = "fetchedAt"
        case expiresAt = "expiresAt"
        case hasInjectionWarning = "hasInjectionWarning"
        case metadata = "metadata"
    }

    public init(
        url: String,
        path: String,
        title: String,
        markdown: String,
        textLength: Double,
        links: [String],
        imageAssetIds: [String],
        fetchedAt: String,
        expiresAt: String? = nil,
        hasInjectionWarning: Bool? = nil,
        metadata: [String: JSONValue]? = nil
    ) {
        self.url = url
        self.path = path
        self.title = title
        self.markdown = markdown
        self.textLength = textLength
        self.links = links
        self.imageAssetIds = imageAssetIds
        self.fetchedAt = fetchedAt
        self.expiresAt = expiresAt
        self.hasInjectionWarning = hasInjectionWarning
        self.metadata = metadata
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.url = try container.decode(String.self, forKey: .url)
        self.path = try container.decode(String.self, forKey: .path)
        self.title = try container.decode(String.self, forKey: .title)
        self.markdown = try container.decode(String.self, forKey: .markdown)
        self.textLength = try container.decode(Double.self, forKey: .textLength)
        self.links = try container.decode([String].self, forKey: .links)
        self.imageAssetIds = try container.decode([String].self, forKey: .imageAssetIds)
        self.fetchedAt = try container.decode(String.self, forKey: .fetchedAt)
        self.expiresAt = try container.decodeIfPresent(String.self, forKey: .expiresAt)
        self.hasInjectionWarning = try container.decodeIfPresent(Bool.self, forKey: .hasInjectionWarning)
        self.metadata = try container.decodeIfPresent([String: JSONValue].self, forKey: .metadata)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(url, forKey: .url)
        try container.encode(path, forKey: .path)
        try container.encode(title, forKey: .title)
        try container.encode(markdown, forKey: .markdown)
        try container.encode(textLength, forKey: .textLength)
        try container.encode(links, forKey: .links)
        try container.encode(imageAssetIds, forKey: .imageAssetIds)
        try container.encode(fetchedAt, forKey: .fetchedAt)
        try container.encodeIfPresent(expiresAt, forKey: .expiresAt)
        try container.encodeIfPresent(hasInjectionWarning, forKey: .hasInjectionWarning)
        try container.encodeIfPresent(metadata, forKey: .metadata)
    }
}

public struct CachedPageSearchResult: Codable, Sendable, Equatable {
    public var url: String
    public var path: String
    public var title: String
    public var snippet: String
    public var matchScore: Double

    enum CodingKeys: String, CodingKey {
        case url = "url"
        case path = "path"
        case title = "title"
        case snippet = "snippet"
        case matchScore = "matchScore"
    }

    public init(
        url: String,
        path: String,
        title: String,
        snippet: String,
        matchScore: Double
    ) {
        self.url = url
        self.path = path
        self.title = title
        self.snippet = snippet
        self.matchScore = matchScore
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.url = try container.decode(String.self, forKey: .url)
        self.path = try container.decode(String.self, forKey: .path)
        self.title = try container.decode(String.self, forKey: .title)
        self.snippet = try container.decode(String.self, forKey: .snippet)
        self.matchScore = try container.decode(Double.self, forKey: .matchScore)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(url, forKey: .url)
        try container.encode(path, forKey: .path)
        try container.encode(title, forKey: .title)
        try container.encode(snippet, forKey: .snippet)
        try container.encode(matchScore, forKey: .matchScore)
    }
}

public struct CachedPageSummary: Codable, Sendable, Equatable {
    public var url: String
    public var path: String
    public var title: String
    public var textLength: Double
    public var imageCount: Double
    public var fetchedAt: String

    enum CodingKeys: String, CodingKey {
        case url = "url"
        case path = "path"
        case title = "title"
        case textLength = "textLength"
        case imageCount = "imageCount"
        case fetchedAt = "fetchedAt"
    }

    public init(
        url: String,
        path: String,
        title: String,
        textLength: Double,
        imageCount: Double,
        fetchedAt: String
    ) {
        self.url = url
        self.path = path
        self.title = title
        self.textLength = textLength
        self.imageCount = imageCount
        self.fetchedAt = fetchedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.url = try container.decode(String.self, forKey: .url)
        self.path = try container.decode(String.self, forKey: .path)
        self.title = try container.decode(String.self, forKey: .title)
        self.textLength = try container.decode(Double.self, forKey: .textLength)
        self.imageCount = try container.decode(Double.self, forKey: .imageCount)
        self.fetchedAt = try container.decode(String.self, forKey: .fetchedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(url, forKey: .url)
        try container.encode(path, forKey: .path)
        try container.encode(title, forKey: .title)
        try container.encode(textLength, forKey: .textLength)
        try container.encode(imageCount, forKey: .imageCount)
        try container.encode(fetchedAt, forKey: .fetchedAt)
    }
}

public struct CreateApiKeyInput: Codable, Sendable, Equatable {
    public var name: String
    public var createdBy: String
    public var orgId: String?
    public var teamId: String?
    public var scopes: [String]?
    public var resourceIds: [String]?
    public var expiresAt: String?
    public var metadata: [String: JSONValue]?

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case createdBy = "createdBy"
        case orgId = "orgId"
        case teamId = "teamId"
        case scopes = "scopes"
        case resourceIds = "resourceIds"
        case expiresAt = "expiresAt"
        case metadata = "metadata"
    }

    public init(
        name: String,
        createdBy: String,
        orgId: String? = nil,
        teamId: String? = nil,
        scopes: [String]? = nil,
        resourceIds: [String]? = nil,
        expiresAt: String? = nil,
        metadata: [String: JSONValue]? = nil
    ) {
        self.name = name
        self.createdBy = createdBy
        self.orgId = orgId
        self.teamId = teamId
        self.scopes = scopes
        self.resourceIds = resourceIds
        self.expiresAt = expiresAt
        self.metadata = metadata
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.createdBy = try container.decode(String.self, forKey: .createdBy)
        self.orgId = try container.decodeIfPresent(String.self, forKey: .orgId)
        self.teamId = try container.decodeIfPresent(String.self, forKey: .teamId)
        self.scopes = try container.decodeIfPresent([String].self, forKey: .scopes)
        self.resourceIds = try container.decodeIfPresent([String].self, forKey: .resourceIds)
        self.expiresAt = try container.decodeIfPresent(String.self, forKey: .expiresAt)
        self.metadata = try container.decodeIfPresent([String: JSONValue].self, forKey: .metadata)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encode(createdBy, forKey: .createdBy)
        try container.encodeIfPresent(orgId, forKey: .orgId)
        try container.encodeIfPresent(teamId, forKey: .teamId)
        try container.encodeIfPresent(scopes, forKey: .scopes)
        try container.encodeIfPresent(resourceIds, forKey: .resourceIds)
        try container.encode(expiresAt, forKey: .expiresAt)
        try container.encodeIfPresent(metadata, forKey: .metadata)
    }
}

public struct CreateServiceAccountInput: Codable, Sendable, Equatable {
    public var name: String
    public var handle: String?
    public var `description`: String?
    public var role: String?
    public var projectIds: [String]?
    public var createdBy: String?
    public var colorName: String?
    public var hexColor: String?
    public var avatarUrl: String?

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case handle = "handle"
        case `description` = "description"
        case role = "role"
        case projectIds = "projectIds"
        case createdBy = "createdBy"
        case colorName = "colorName"
        case hexColor = "hexColor"
        case avatarUrl = "avatarUrl"
    }

    public init(
        name: String,
        handle: String? = nil,
        `description`: String? = nil,
        role: String? = nil,
        projectIds: [String]? = nil,
        createdBy: String? = nil,
        colorName: String? = nil,
        hexColor: String? = nil,
        avatarUrl: String? = nil
    ) {
        self.name = name
        self.handle = handle
        self.`description` = `description`
        self.role = role
        self.projectIds = projectIds
        self.createdBy = createdBy
        self.colorName = colorName
        self.hexColor = hexColor
        self.avatarUrl = avatarUrl
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.handle = try container.decodeIfPresent(String.self, forKey: .handle)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.role = try container.decodeIfPresent(String.self, forKey: .role)
        self.projectIds = try container.decodeIfPresent([String].self, forKey: .projectIds)
        self.createdBy = try container.decodeIfPresent(String.self, forKey: .createdBy)
        self.colorName = try container.decodeIfPresent(String.self, forKey: .colorName)
        self.hexColor = try container.decodeIfPresent(String.self, forKey: .hexColor)
        self.avatarUrl = try container.decodeIfPresent(String.self, forKey: .avatarUrl)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(handle, forKey: .handle)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(role, forKey: .role)
        try container.encodeIfPresent(projectIds, forKey: .projectIds)
        try container.encodeIfPresent(createdBy, forKey: .createdBy)
        try container.encodeIfPresent(colorName, forKey: .colorName)
        try container.encodeIfPresent(hexColor, forKey: .hexColor)
        try container.encodeIfPresent(avatarUrl, forKey: .avatarUrl)
    }
}

public struct PublicApiKey: Codable, Sendable, Equatable {
    public var id: String
    public var name: String
    public var keyPrefix: String
    public var ownerType: ApiKeyOwnerType
    public var ownerId: String
    public var orgId: String?
    public var teamId: String?
    public var serviceAccountId: String?
    public var createdBy: String
    public var scopes: [String]
    public var resourceIds: [String]?
    public var status: ApiKeyStatus
    public var metadata: [String: JSONValue]?
    public var createdAt: String
    public var updatedAt: String
    public var expiresAt: String?
    public var lastUsedAt: String?
    public var revokedAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
        case keyPrefix = "keyPrefix"
        case ownerType = "ownerType"
        case ownerId = "ownerId"
        case orgId = "orgId"
        case teamId = "teamId"
        case serviceAccountId = "serviceAccountId"
        case createdBy = "createdBy"
        case scopes = "scopes"
        case resourceIds = "resourceIds"
        case status = "status"
        case metadata = "metadata"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
        case expiresAt = "expiresAt"
        case lastUsedAt = "lastUsedAt"
        case revokedAt = "revokedAt"
    }

    public init(
        id: String,
        name: String,
        keyPrefix: String,
        ownerType: ApiKeyOwnerType,
        ownerId: String,
        orgId: String? = nil,
        teamId: String? = nil,
        serviceAccountId: String? = nil,
        createdBy: String,
        scopes: [String],
        resourceIds: [String]? = nil,
        status: ApiKeyStatus,
        metadata: [String: JSONValue]? = nil,
        createdAt: String,
        updatedAt: String,
        expiresAt: String? = nil,
        lastUsedAt: String? = nil,
        revokedAt: String? = nil
    ) {
        self.id = id
        self.name = name
        self.keyPrefix = keyPrefix
        self.ownerType = ownerType
        self.ownerId = ownerId
        self.orgId = orgId
        self.teamId = teamId
        self.serviceAccountId = serviceAccountId
        self.createdBy = createdBy
        self.scopes = scopes
        self.resourceIds = resourceIds
        self.status = status
        self.metadata = metadata
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.expiresAt = expiresAt
        self.lastUsedAt = lastUsedAt
        self.revokedAt = revokedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.keyPrefix = try container.decode(String.self, forKey: .keyPrefix)
        self.ownerType = try container.decode(ApiKeyOwnerType.self, forKey: .ownerType)
        self.ownerId = try container.decode(String.self, forKey: .ownerId)
        self.orgId = try container.decodeIfPresent(String.self, forKey: .orgId)
        self.teamId = try container.decodeIfPresent(String.self, forKey: .teamId)
        self.serviceAccountId = try container.decodeIfPresent(String.self, forKey: .serviceAccountId)
        self.createdBy = try container.decode(String.self, forKey: .createdBy)
        self.scopes = try container.decode([String].self, forKey: .scopes)
        self.resourceIds = try container.decodeIfPresent([String].self, forKey: .resourceIds)
        self.status = try container.decode(ApiKeyStatus.self, forKey: .status)
        self.metadata = try container.decodeIfPresent([String: JSONValue].self, forKey: .metadata)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decode(String.self, forKey: .updatedAt)
        self.expiresAt = try container.decodeIfPresent(String.self, forKey: .expiresAt)
        self.lastUsedAt = try container.decodeIfPresent(String.self, forKey: .lastUsedAt)
        self.revokedAt = try container.decodeIfPresent(String.self, forKey: .revokedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encode(keyPrefix, forKey: .keyPrefix)
        try container.encode(ownerType, forKey: .ownerType)
        try container.encode(ownerId, forKey: .ownerId)
        try container.encodeIfPresent(orgId, forKey: .orgId)
        try container.encodeIfPresent(teamId, forKey: .teamId)
        try container.encodeIfPresent(serviceAccountId, forKey: .serviceAccountId)
        try container.encode(createdBy, forKey: .createdBy)
        try container.encode(scopes, forKey: .scopes)
        try container.encodeIfPresent(resourceIds, forKey: .resourceIds)
        try container.encode(status, forKey: .status)
        try container.encodeIfPresent(metadata, forKey: .metadata)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(updatedAt, forKey: .updatedAt)
        try container.encode(expiresAt, forKey: .expiresAt)
        try container.encode(lastUsedAt, forKey: .lastUsedAt)
        try container.encode(revokedAt, forKey: .revokedAt)
    }
}

public enum ServiceAccountType: String, Codable, Sendable, CaseIterable {
    case virtualUser = "virtual_user"
}

public enum ServiceAccountStatus: String, Codable, Sendable, CaseIterable {
    case active = "active"
    case revoked = "revoked"
}

public struct ServiceAccount: Codable, Sendable, Equatable {
    public var id: String
    public var orgId: String
    public var name: String
    public var handle: String
    public var `description`: String?
    public var role: String
    public var type: ServiceAccountType
    public var avatarUrl: String?
    public var colorName: String?
    public var hexColor: String?
    public var keyPrefix: String
    public var hashedSecret: String
    public var projectIds: [String]?
    public var createdBy: String
    public var createdAt: String
    public var updatedAt: String
    public var lastUsedAt: String?
    public var status: ServiceAccountStatus
    public var revokedAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case orgId = "orgId"
        case name = "name"
        case handle = "handle"
        case `description` = "description"
        case role = "role"
        case type = "type"
        case avatarUrl = "avatarUrl"
        case colorName = "colorName"
        case hexColor = "hexColor"
        case keyPrefix = "keyPrefix"
        case hashedSecret = "hashedSecret"
        case projectIds = "projectIds"
        case createdBy = "createdBy"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
        case lastUsedAt = "lastUsedAt"
        case status = "status"
        case revokedAt = "revokedAt"
    }

    public init(
        id: String,
        orgId: String,
        name: String,
        handle: String,
        `description`: String? = nil,
        role: String,
        type: ServiceAccountType,
        avatarUrl: String? = nil,
        colorName: String? = nil,
        hexColor: String? = nil,
        keyPrefix: String,
        hashedSecret: String,
        projectIds: [String]? = nil,
        createdBy: String,
        createdAt: String,
        updatedAt: String,
        lastUsedAt: String? = nil,
        status: ServiceAccountStatus,
        revokedAt: String? = nil
    ) {
        self.id = id
        self.orgId = orgId
        self.name = name
        self.handle = handle
        self.`description` = `description`
        self.role = role
        self.type = type
        self.avatarUrl = avatarUrl
        self.colorName = colorName
        self.hexColor = hexColor
        self.keyPrefix = keyPrefix
        self.hashedSecret = hashedSecret
        self.projectIds = projectIds
        self.createdBy = createdBy
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.lastUsedAt = lastUsedAt
        self.status = status
        self.revokedAt = revokedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.orgId = try container.decode(String.self, forKey: .orgId)
        self.name = try container.decode(String.self, forKey: .name)
        self.handle = try container.decode(String.self, forKey: .handle)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.role = try container.decode(String.self, forKey: .role)
        self.type = try container.decode(ServiceAccountType.self, forKey: .type)
        self.avatarUrl = try container.decodeIfPresent(String.self, forKey: .avatarUrl)
        self.colorName = try container.decodeIfPresent(String.self, forKey: .colorName)
        self.hexColor = try container.decodeIfPresent(String.self, forKey: .hexColor)
        self.keyPrefix = try container.decode(String.self, forKey: .keyPrefix)
        self.hashedSecret = try container.decode(String.self, forKey: .hashedSecret)
        self.projectIds = try container.decodeIfPresent([String].self, forKey: .projectIds)
        self.createdBy = try container.decode(String.self, forKey: .createdBy)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decode(String.self, forKey: .updatedAt)
        self.lastUsedAt = try container.decodeIfPresent(String.self, forKey: .lastUsedAt)
        self.status = try container.decode(ServiceAccountStatus.self, forKey: .status)
        self.revokedAt = try container.decodeIfPresent(String.self, forKey: .revokedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(orgId, forKey: .orgId)
        try container.encode(name, forKey: .name)
        try container.encode(handle, forKey: .handle)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(role, forKey: .role)
        try container.encode(type, forKey: .type)
        try container.encodeIfPresent(avatarUrl, forKey: .avatarUrl)
        try container.encodeIfPresent(colorName, forKey: .colorName)
        try container.encodeIfPresent(hexColor, forKey: .hexColor)
        try container.encode(keyPrefix, forKey: .keyPrefix)
        try container.encode(hashedSecret, forKey: .hashedSecret)
        try container.encodeIfPresent(projectIds, forKey: .projectIds)
        try container.encode(createdBy, forKey: .createdBy)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(updatedAt, forKey: .updatedAt)
        try container.encode(lastUsedAt, forKey: .lastUsedAt)
        try container.encode(status, forKey: .status)
        try container.encode(revokedAt, forKey: .revokedAt)
    }
}

public struct WebsiteCacheSummary: Codable, Sendable, Equatable {
    public var cacheId: String
    public var seedUrl: String
    public var pagesCount: Double
    public var imagesCount: Double
    public var pages: [CachedPageSummary]
    public var isFromCache: Bool
    public var cachedAt: String

    enum CodingKeys: String, CodingKey {
        case cacheId = "cacheId"
        case seedUrl = "seedUrl"
        case pagesCount = "pagesCount"
        case imagesCount = "imagesCount"
        case pages = "pages"
        case isFromCache = "isFromCache"
        case cachedAt = "cachedAt"
    }

    public init(
        cacheId: String,
        seedUrl: String,
        pagesCount: Double,
        imagesCount: Double,
        pages: [CachedPageSummary],
        isFromCache: Bool,
        cachedAt: String
    ) {
        self.cacheId = cacheId
        self.seedUrl = seedUrl
        self.pagesCount = pagesCount
        self.imagesCount = imagesCount
        self.pages = pages
        self.isFromCache = isFromCache
        self.cachedAt = cachedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.cacheId = try container.decode(String.self, forKey: .cacheId)
        self.seedUrl = try container.decode(String.self, forKey: .seedUrl)
        self.pagesCount = try container.decode(Double.self, forKey: .pagesCount)
        self.imagesCount = try container.decode(Double.self, forKey: .imagesCount)
        self.pages = try container.decode([CachedPageSummary].self, forKey: .pages)
        self.isFromCache = try container.decode(Bool.self, forKey: .isFromCache)
        self.cachedAt = try container.decode(String.self, forKey: .cachedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(cacheId, forKey: .cacheId)
        try container.encode(seedUrl, forKey: .seedUrl)
        try container.encode(pagesCount, forKey: .pagesCount)
        try container.encode(imagesCount, forKey: .imagesCount)
        try container.encode(pages, forKey: .pages)
        try container.encode(isFromCache, forKey: .isFromCache)
        try container.encode(cachedAt, forKey: .cachedAt)
    }
}

public struct WebsiteCrawlScope: Codable, Sendable, Equatable {
    public var url: String
    public var maxDepth: Int
    public var maxPages: Int
    public var sameDomainOnly: Bool
    public var allowSubdomains: Bool
    public var pathPrefix: String?
    public var urlMatchPattern: String?
    public var urlExcludePattern: String?
    public var includeImages: Bool
    public var maxImagesPerPage: Int
    public var maxImageBytes: Int
    public var maxPageBytes: Int
    public var allowedImageTypes: [String]?
    public var cacheId: String?
    public var ttlMs: Double?
    public var forceRefresh: Bool
    public var requestTimeoutMs: Double
    public var userAgent: String?

    enum CodingKeys: String, CodingKey {
        case url = "url"
        case maxDepth = "maxDepth"
        case maxPages = "maxPages"
        case sameDomainOnly = "sameDomainOnly"
        case allowSubdomains = "allowSubdomains"
        case pathPrefix = "pathPrefix"
        case urlMatchPattern = "urlMatchPattern"
        case urlExcludePattern = "urlExcludePattern"
        case includeImages = "includeImages"
        case maxImagesPerPage = "maxImagesPerPage"
        case maxImageBytes = "maxImageBytes"
        case maxPageBytes = "maxPageBytes"
        case allowedImageTypes = "allowedImageTypes"
        case cacheId = "cacheId"
        case ttlMs = "ttlMs"
        case forceRefresh = "forceRefresh"
        case requestTimeoutMs = "requestTimeoutMs"
        case userAgent = "userAgent"
    }

    public init(
        url: String,
        maxDepth: Int = 1,
        maxPages: Int = 25,
        sameDomainOnly: Bool = true,
        allowSubdomains: Bool = false,
        pathPrefix: String? = nil,
        urlMatchPattern: String? = nil,
        urlExcludePattern: String? = nil,
        includeImages: Bool = true,
        maxImagesPerPage: Int = 15,
        maxImageBytes: Int = 5242880,
        maxPageBytes: Int = 5242880,
        allowedImageTypes: [String]? = nil,
        cacheId: String? = nil,
        ttlMs: Double? = nil,
        forceRefresh: Bool = false,
        requestTimeoutMs: Double = 15000,
        userAgent: String? = nil
    ) {
        self.url = url
        self.maxDepth = maxDepth
        self.maxPages = maxPages
        self.sameDomainOnly = sameDomainOnly
        self.allowSubdomains = allowSubdomains
        self.pathPrefix = pathPrefix
        self.urlMatchPattern = urlMatchPattern
        self.urlExcludePattern = urlExcludePattern
        self.includeImages = includeImages
        self.maxImagesPerPage = maxImagesPerPage
        self.maxImageBytes = maxImageBytes
        self.maxPageBytes = maxPageBytes
        self.allowedImageTypes = allowedImageTypes
        self.cacheId = cacheId
        self.ttlMs = ttlMs
        self.forceRefresh = forceRefresh
        self.requestTimeoutMs = requestTimeoutMs
        self.userAgent = userAgent
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.url = try container.decode(String.self, forKey: .url)
        self.maxDepth = try container.decodeIfPresent(Int.self, forKey: .maxDepth) ?? 1
        self.maxPages = try container.decodeIfPresent(Int.self, forKey: .maxPages) ?? 25
        self.sameDomainOnly = try container.decodeIfPresent(Bool.self, forKey: .sameDomainOnly) ?? true
        self.allowSubdomains = try container.decodeIfPresent(Bool.self, forKey: .allowSubdomains) ?? false
        self.pathPrefix = try container.decodeIfPresent(String.self, forKey: .pathPrefix)
        self.urlMatchPattern = try container.decodeIfPresent(String.self, forKey: .urlMatchPattern)
        self.urlExcludePattern = try container.decodeIfPresent(String.self, forKey: .urlExcludePattern)
        self.includeImages = try container.decodeIfPresent(Bool.self, forKey: .includeImages) ?? true
        self.maxImagesPerPage = try container.decodeIfPresent(Int.self, forKey: .maxImagesPerPage) ?? 15
        self.maxImageBytes = try container.decodeIfPresent(Int.self, forKey: .maxImageBytes) ?? 5242880
        self.maxPageBytes = try container.decodeIfPresent(Int.self, forKey: .maxPageBytes) ?? 5242880
        self.allowedImageTypes = try container.decodeIfPresent([String].self, forKey: .allowedImageTypes)
        self.cacheId = try container.decodeIfPresent(String.self, forKey: .cacheId)
        self.ttlMs = try container.decodeIfPresent(Double.self, forKey: .ttlMs)
        self.forceRefresh = try container.decodeIfPresent(Bool.self, forKey: .forceRefresh) ?? false
        self.requestTimeoutMs = try container.decodeIfPresent(Double.self, forKey: .requestTimeoutMs) ?? 15000
        self.userAgent = try container.decodeIfPresent(String.self, forKey: .userAgent)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(url, forKey: .url)
        try container.encode(maxDepth, forKey: .maxDepth)
        try container.encode(maxPages, forKey: .maxPages)
        try container.encode(sameDomainOnly, forKey: .sameDomainOnly)
        try container.encode(allowSubdomains, forKey: .allowSubdomains)
        try container.encodeIfPresent(pathPrefix, forKey: .pathPrefix)
        try container.encodeIfPresent(urlMatchPattern, forKey: .urlMatchPattern)
        try container.encodeIfPresent(urlExcludePattern, forKey: .urlExcludePattern)
        try container.encode(includeImages, forKey: .includeImages)
        try container.encode(maxImagesPerPage, forKey: .maxImagesPerPage)
        try container.encode(maxImageBytes, forKey: .maxImageBytes)
        try container.encode(maxPageBytes, forKey: .maxPageBytes)
        try container.encodeIfPresent(allowedImageTypes, forKey: .allowedImageTypes)
        try container.encodeIfPresent(cacheId, forKey: .cacheId)
        try container.encodeIfPresent(ttlMs, forKey: .ttlMs)
        try container.encode(forceRefresh, forKey: .forceRefresh)
        try container.encode(requestTimeoutMs, forKey: .requestTimeoutMs)
        try container.encodeIfPresent(userAgent, forKey: .userAgent)
    }
}
