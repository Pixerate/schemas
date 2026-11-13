// Generated from @pixerate/schemas skills contracts by scripts/gen-swift.mjs. Do not edit.
import Foundation

/// instructions: SKILL.md and files it points a model to; profile: the kind's typed profile; reference: pictures or documents to aim for; example: worked examples; kit: code a page or component may use; check: a check that can be run
public enum SkillFileRole: String, Codable, Sendable, CaseIterable {
    case instructions = "instructions"
    case profile = "profile"
    case reference = "reference"
    case example = "example"
    case kit = "kit"
    case check = "check"
    case other = "other"
}

public enum SkillLayer: String, Codable, Sendable, CaseIterable {
    case builtin = "builtin"
    case org = "org"
    case workspace = "workspace"
    case user = "user"
}

/// replace: the nearer profile wins whole; deep: objects merge key by key, arrays are replaced; none: extending or overriding is not allowed
public enum SkillMerge: String, Codable, Sendable, CaseIterable {
    case replace = "replace"
    case deep = "deep"
    case none = "none"
}

public struct SkillBundleManifestFilesItem: Codable, Sendable, Equatable {
    public var path: String
    public var size: Int
    public var sha256: String

    enum CodingKeys: String, CodingKey {
        case path = "path"
        case size = "size"
        case sha256 = "sha256"
    }

    public init(
        path: String,
        size: Int,
        sha256: String
    ) {
        self.path = path
        self.size = size
        self.sha256 = sha256
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.path = try container.decode(String.self, forKey: .path)
        self.size = try container.decode(Int.self, forKey: .size)
        self.sha256 = try container.decode(String.self, forKey: .sha256)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(path, forKey: .path)
        try container.encode(size, forKey: .size)
        try container.encode(sha256, forKey: .sha256)
    }
}

public struct SkillBundleManifest: Codable, Sendable, Equatable {
    /// Bundle format version
    public var format: Double
    public var skill: SkillManifest
    /// Every file in the zip except bundle.json; installers refuse anything not listed, or that doesn't match
    public var files: [SkillBundleManifestFilesItem]
    public var contentHash: String

    enum CodingKeys: String, CodingKey {
        case format = "format"
        case skill = "skill"
        case files = "files"
        case contentHash = "contentHash"
    }

    public init(
        format: Double,
        skill: SkillManifest,
        files: [SkillBundleManifestFilesItem],
        contentHash: String
    ) {
        self.format = format
        self.skill = skill
        self.files = files
        self.contentHash = contentHash
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.format = try container.decode(Double.self, forKey: .format)
        self.skill = try container.decode(SkillManifest.self, forKey: .skill)
        self.files = try container.decode([SkillBundleManifestFilesItem].self, forKey: .files)
        self.contentHash = try container.decode(String.self, forKey: .contentHash)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(format, forKey: .format)
        try container.encode(skill, forKey: .skill)
        try container.encode(files, forKey: .files)
        try container.encode(contentHash, forKey: .contentHash)
    }
}

/// text or binary, as skillFileEncoding(path) says; binary files (pictures, PDFs, fonts) enter the content hash by their sha256
public enum SkillFileEncoding: String, Codable, Sendable, CaseIterable {
    case text = "text"
    case binary = "binary"
}

public struct SkillFile: Codable, Sendable, Equatable {
    /// Path inside the skill folder, with '/' separators and no '..'
    public var path: String
    public var role: SkillFileRole
    /// Media type, e.g. 'text/markdown', 'application/json', 'image/png'
    public var mediaType: String?
    /// Size in bytes
    public var size: Int?
    /// text or binary, as skillFileEncoding(path) says; binary files (pictures, PDFs, fonts) enter the content hash by their sha256
    public var encoding: SkillFileEncoding?
    /// What to take from this file (for references: what the picture shows that matters)
    public var note: String?

    enum CodingKeys: String, CodingKey {
        case path = "path"
        case role = "role"
        case mediaType = "mediaType"
        case size = "size"
        case encoding = "encoding"
        case note = "note"
    }

    public init(
        path: String,
        role: SkillFileRole,
        mediaType: String? = nil,
        size: Int? = nil,
        encoding: SkillFileEncoding? = nil,
        note: String? = nil
    ) {
        self.path = path
        self.role = role
        self.mediaType = mediaType
        self.size = size
        self.encoding = encoding
        self.note = note
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.path = try container.decode(String.self, forKey: .path)
        self.role = try container.decode(SkillFileRole.self, forKey: .role)
        self.mediaType = try container.decodeIfPresent(String.self, forKey: .mediaType)
        self.size = try container.decodeIfPresent(Int.self, forKey: .size)
        self.encoding = try container.decodeIfPresent(SkillFileEncoding.self, forKey: .encoding)
        self.note = try container.decodeIfPresent(String.self, forKey: .note)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(path, forKey: .path)
        try container.encode(role, forKey: .role)
        try container.encodeIfPresent(mediaType, forKey: .mediaType)
        try container.encodeIfPresent(size, forKey: .size)
        try container.encodeIfPresent(encoding, forKey: .encoding)
        try container.encodeIfPresent(note, forKey: .note)
    }
}

/// The skill's id: its folder name, lowercase words joined by hyphens
///
/// Pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`
public typealias SkillId = String

public struct SkillKind: Codable, Sendable, Equatable {
    public var id: String
    public var `description`: String?
    /// The profile's file name in the skill folder, e.g. 'aesthetic.json'
    public var profileFile: String?
    /// Where the profile's JSON Schema lives, e.g. '@pixerate/schemas/json-schema/genui/UiAestheticProfile.json'
    public var profileSchema: String?
    /// The profile version this kind writes; older profiles are migrated
    public var profileVersion: Int?
    /// replace: the nearer profile wins whole; deep: objects merge key by key, arrays are replaced; none: extending or overriding is not allowed
    public var merge: SkillMerge

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case `description` = "description"
        case profileFile = "profileFile"
        case profileSchema = "profileSchema"
        case profileVersion = "profileVersion"
        case merge = "merge"
    }

    public init(
        id: String,
        `description`: String? = nil,
        profileFile: String? = nil,
        profileSchema: String? = nil,
        profileVersion: Int? = nil,
        merge: SkillMerge = .replace
    ) {
        self.id = id
        self.`description` = `description`
        self.profileFile = profileFile
        self.profileSchema = profileSchema
        self.profileVersion = profileVersion
        self.merge = merge
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.profileFile = try container.decodeIfPresent(String.self, forKey: .profileFile)
        self.profileSchema = try container.decodeIfPresent(String.self, forKey: .profileSchema)
        self.profileVersion = try container.decodeIfPresent(Int.self, forKey: .profileVersion)
        self.merge = try container.decodeIfPresent(SkillMerge.self, forKey: .merge) ?? .replace
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(profileFile, forKey: .profileFile)
        try container.encodeIfPresent(profileSchema, forKey: .profileSchema)
        try container.encodeIfPresent(profileVersion, forKey: .profileVersion)
        try container.encode(merge, forKey: .merge)
    }
}

public struct SkillManifest: Codable, Sendable, Equatable {
    /// The skill's id: its folder name (loaders fill it in when frontmatter leaves it out)
    public var id: String
    /// Display name
    public var name: String
    /// When to use this skill, in a sentence or two (shown in catalogs and to models)
    public var `description`: String
    public var version: String
    /// The skill's kind (see SkillKindSchema). Built-in kinds: 'rule', 'skill', 'style', 'ui-aesthetic'
    public var kind: String
    /// Another skill this one builds on: its id, optionally pinned as 'id@1.2.0'
    public var extends: String?
    public var tags: [String]
    /// Free-form frontmatter metadata a package reads, e.g. editor's { kind: 'workflow', reference: '…' }
    public var metadata: [String: JSONValue]?
    /// Files in the skill, SKILL.md included
    public var files: [SkillFile]
    /// sha256 (hex) of skillContentHashInput(every file: text by content, binary by its sha256); changes whenever any file does
    public var contentHash: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
        case `description` = "description"
        case version = "version"
        case kind = "kind"
        case extends = "extends"
        case tags = "tags"
        case metadata = "metadata"
        case files = "files"
        case contentHash = "contentHash"
    }

    public init(
        id: String,
        name: String,
        `description`: String,
        version: String = "0.1.0",
        kind: String = "skill",
        extends: String? = nil,
        tags: [String] = [],
        metadata: [String: JSONValue]? = nil,
        files: [SkillFile] = [],
        contentHash: String? = nil
    ) {
        self.id = id
        self.name = name
        self.`description` = `description`
        self.version = version
        self.kind = kind
        self.extends = extends
        self.tags = tags
        self.metadata = metadata
        self.files = files
        self.contentHash = contentHash
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.`description` = try container.decode(String.self, forKey: .`description`)
        self.version = try container.decodeIfPresent(String.self, forKey: .version) ?? "0.1.0"
        self.kind = try container.decodeIfPresent(String.self, forKey: .kind) ?? "skill"
        self.extends = try container.decodeIfPresent(String.self, forKey: .extends)
        self.tags = try container.decodeIfPresent([String].self, forKey: .tags) ?? []
        self.metadata = try container.decodeIfPresent([String: JSONValue].self, forKey: .metadata)
        self.files = try container.decodeIfPresent([SkillFile].self, forKey: .files) ?? []
        self.contentHash = try container.decodeIfPresent(String.self, forKey: .contentHash)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encode(`description`, forKey: .`description`)
        try container.encode(version, forKey: .version)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(extends, forKey: .extends)
        try container.encode(tags, forKey: .tags)
        try container.encodeIfPresent(metadata, forKey: .metadata)
        try container.encode(files, forKey: .files)
        try container.encodeIfPresent(contentHash, forKey: .contentHash)
    }
}

public struct SkillState: Codable, Sendable, Equatable {
    public var id: SkillId
    public var enabled: Bool
    public var layer: SkillLayer?
    /// ISO timestamp
    public var updatedAt: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case enabled = "enabled"
        case layer = "layer"
        case updatedAt = "updatedAt"
    }

    public init(
        id: SkillId,
        enabled: Bool = true,
        layer: SkillLayer? = nil,
        updatedAt: String? = nil
    ) {
        self.id = id
        self.enabled = enabled
        self.layer = layer
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(SkillId.self, forKey: .id)
        self.enabled = try container.decodeIfPresent(Bool.self, forKey: .enabled) ?? true
        self.layer = try container.decodeIfPresent(SkillLayer.self, forKey: .layer)
        self.updatedAt = try container.decodeIfPresent(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(enabled, forKey: .enabled)
        try container.encodeIfPresent(layer, forKey: .layer)
        try container.encodeIfPresent(updatedAt, forKey: .updatedAt)
    }
}
