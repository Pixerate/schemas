// Generated from @pixerate/schemas common contracts. Do not edit.
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

