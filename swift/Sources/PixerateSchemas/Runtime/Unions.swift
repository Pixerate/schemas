import Foundation

/// Object payload for `VideoFrameImage`.
public struct VideoFrameImageData: Codable, Sendable, Equatable {
    public var bytesBase64Encoded: String?
    public var data: String?
    public var mimeType: String?

    public init(
        bytesBase64Encoded: String? = nil,
        data: String? = nil,
        mimeType: String? = nil
    ) {
        self.bytesBase64Encoded = bytesBase64Encoded
        self.data = data
        self.mimeType = mimeType
    }
}

/// Union of string or image object data.
public enum VideoFrameImage: Codable, Sendable, Equatable {
    case string(String)
    case object(VideoFrameImageData)

    public init(from decoder: Decoder) throws {
        if let container = try? decoder.singleValueContainer(), let str = try? container.decode(String.self) {
            self = .string(str)
            return
        }
        let data = try VideoFrameImageData(from: decoder)
        self = .object(data)
    }

    public func encode(to encoder: Encoder) throws {
        switch self {
        case .string(let s):
            var container = encoder.singleValueContainer()
            try container.encode(s)
        case .object(let data):
            try data.encode(to: encoder)
        }
    }
}

/// Object payload for `VideoAttachment`.
public struct VideoAttachmentData: Codable, Sendable, Equatable {
    public var bytesBase64Encoded: String?
    public var data: JSONValue?
    public var mimeType: String?
    public var url: String?

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
}

/// Union of string or video attachment object data.
public enum VideoAttachment: Codable, Sendable, Equatable {
    case string(String)
    case object(VideoAttachmentData)

    public init(from decoder: Decoder) throws {
        if let container = try? decoder.singleValueContainer(), let str = try? container.decode(String.self) {
            self = .string(str)
            return
        }
        let data = try VideoAttachmentData(from: decoder)
        self = .object(data)
    }

    public func encode(to encoder: Encoder) throws {
        switch self {
        case .string(let s):
            var container = encoder.singleValueContainer()
            try container.encode(s)
        case .object(let data):
            try data.encode(to: encoder)
        }
    }
}
