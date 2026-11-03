// Generated from @pixerate/schemas common contracts by scripts/gen-swift.mjs. Do not edit.
import Foundation

public enum AspectRatio: String, Codable, Sendable, CaseIterable {
    case r1_1 = "1:1"
    case r2_3 = "2:3"
    case r3_2 = "3:2"
    case r3_4 = "3:4"
    case r4_3 = "4:3"
    case r4_5 = "4:5"
    case r5_4 = "5:4"
    case r9_16 = "9:16"
    case r16_9 = "16:9"
    case r21_9 = "21:9"
}

public enum ServiceClient: String, Codable, Sendable, CaseIterable {
    case pixerate = "pixerate"
    case slopmachine = "slopmachine"
    case social = "social"
    case surrealui = "surrealui"
    case surrealUi = "surreal-ui"
    case symphonia = "symphonia"
    case flair = "flair"
    case operative = "operative"
    case uchiage = "uchiage"
    case unknown = "unknown"
}

public enum VideoAspectRatio: String, Codable, Sendable, CaseIterable {
    case r9_16 = "9:16"
    case r16_9 = "16:9"
}

public enum VideoResolution: String, Codable, Sendable, CaseIterable {
    case r360p = "360p"
    case r720p = "720p"
    case r1080p = "1080p"
    case r4k = "4k"
    case r360P = "360P"
    case r720P = "720P"
    case r1080P = "1080P"
    case r4K = "4K"
}

public struct VideoAttachmentData: Codable, Sendable, Equatable {
    public var bytesBase64Encoded: String?
    public var data: JSONValue?
    public var mimeType: String?
    public var url: String?

    enum CodingKeys: String, CodingKey {
        case bytesBase64Encoded = "bytesBase64Encoded"
        case data = "data"
        case mimeType = "mimeType"
        case url = "url"
    }

    public init(
        bytesBase64Encoded: String? = nil,
        data: JSONValue? = nil,
        mimeType: String? = nil,
        url: String? = nil
    ) {
        self.bytesBase64Encoded = bytesBase64Encoded
        self.data = data
        self.mimeType = mimeType
        self.url = url
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.bytesBase64Encoded = try container.decodeIfPresent(String.self, forKey: .bytesBase64Encoded)
        self.data = try container.decodeIfPresent(JSONValue.self, forKey: .data)
        self.mimeType = try container.decodeIfPresent(String.self, forKey: .mimeType)
        self.url = try container.decodeIfPresent(String.self, forKey: .url)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(bytesBase64Encoded, forKey: .bytesBase64Encoded)
        try container.encodeIfPresent(data, forKey: .data)
        try container.encodeIfPresent(mimeType, forKey: .mimeType)
        try container.encodeIfPresent(url, forKey: .url)
    }
}

/// A string, or a `VideoAttachmentData` object.
public enum VideoAttachment: Codable, Sendable, Equatable {
    case string(String)
    case object(VideoAttachmentData)

    public init(from decoder: Decoder) throws {
        if let container = try? decoder.singleValueContainer(), let string = try? container.decode(String.self) {
            self = .string(string)
            return
        }
        self = .object(try VideoAttachmentData(from: decoder))
    }

    public func encode(to encoder: Encoder) throws {
        switch self {
        case .string(let string):
            var container = encoder.singleValueContainer()
            try container.encode(string)
        case .object(let data):
            try data.encode(to: encoder)
        }
    }
}

public struct VideoFrameImageData: Codable, Sendable, Equatable {
    public var bytesBase64Encoded: String?
    public var data: String?
    public var mimeType: String?

    enum CodingKeys: String, CodingKey {
        case bytesBase64Encoded = "bytesBase64Encoded"
        case data = "data"
        case mimeType = "mimeType"
    }

    public init(
        bytesBase64Encoded: String? = nil,
        data: String? = nil,
        mimeType: String? = nil
    ) {
        self.bytesBase64Encoded = bytesBase64Encoded
        self.data = data
        self.mimeType = mimeType
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.bytesBase64Encoded = try container.decodeIfPresent(String.self, forKey: .bytesBase64Encoded)
        self.data = try container.decodeIfPresent(String.self, forKey: .data)
        self.mimeType = try container.decodeIfPresent(String.self, forKey: .mimeType)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(bytesBase64Encoded, forKey: .bytesBase64Encoded)
        try container.encodeIfPresent(data, forKey: .data)
        try container.encodeIfPresent(mimeType, forKey: .mimeType)
    }
}

/// A string, or a `VideoFrameImageData` object.
public enum VideoFrameImage: Codable, Sendable, Equatable {
    case string(String)
    case object(VideoFrameImageData)

    public init(from decoder: Decoder) throws {
        if let container = try? decoder.singleValueContainer(), let string = try? container.decode(String.self) {
            self = .string(string)
            return
        }
        self = .object(try VideoFrameImageData(from: decoder))
    }

    public func encode(to encoder: Encoder) throws {
        switch self {
        case .string(let string):
            var container = encoder.singleValueContainer()
            try container.encode(string)
        case .object(let data):
            try data.encode(to: encoder)
        }
    }
}
