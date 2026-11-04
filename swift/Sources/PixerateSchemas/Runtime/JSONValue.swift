import Foundation

/// A recursive JSON value representing any valid JSON payload.
/// Conforms to `Codable`, `Sendable`, and `Equatable`.
public enum JSONValue: Codable, Sendable, Equatable, Hashable {
    case string(String)
    case number(Double)
    case bool(Bool)
    case object([String: JSONValue])
    case array([JSONValue])
    case null

    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if container.decodeNil() {
            self = .null
            return
        }
        if let boolVal = try? container.decode(Bool.self) {
            self = .bool(boolVal)
            return
        }
        if let intVal = try? container.decode(Int.self) {
            self = .number(Double(intVal))
            return
        }
        if let doubleVal = try? container.decode(Double.self) {
            self = .number(doubleVal)
            return
        }
        if let stringVal = try? container.decode(String.self) {
            self = .string(stringVal)
            return
        }
        if let dictVal = try? decoder.container(keyedBy: DynamicCodingKeys.self) {
            var result: [String: JSONValue] = [:]
            for key in dictVal.allKeys {
                result[key.stringValue] = try dictVal.decode(JSONValue.self, forKey: key)
            }
            self = .object(result)
            return
        }
        if var arrayVal = try? decoder.unkeyedContainer() {
            var items: [JSONValue] = []
            while !arrayVal.isAtEnd {
                items.append(try arrayVal.decode(JSONValue.self))
            }
            self = .array(items)
            return
        }
        throw DecodingError.dataCorrupted(
            DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Unable to decode JSONValue")
        )
    }

    public func encode(to encoder: Encoder) throws {
        switch self {
        case .string(let str):
            var container = encoder.singleValueContainer()
            try container.encode(str)
        case .number(let num):
            var container = encoder.singleValueContainer()
            if num.rounded() == num && !num.isInfinite && !num.isNaN && num >= Double(Int.min) && num <= Double(Int.max) {
                try container.encode(Int(num))
            } else {
                try container.encode(num)
            }
        case .bool(let b):
            var container = encoder.singleValueContainer()
            try container.encode(b)
        case .null:
            var container = encoder.singleValueContainer()
            try container.encodeNil()
        case .object(let dict):
            var container = encoder.container(keyedBy: DynamicCodingKeys.self)
            for (k, v) in dict.sorted(by: { $0.key < $1.key }) {
                guard let key = DynamicCodingKeys(stringValue: k) else { continue }
                try container.encode(v, forKey: key)
            }
        case .array(let arr):
            var container = encoder.unkeyedContainer()
            for item in arr {
                try container.encode(item)
            }
        }
    }
}

private struct DynamicCodingKeys: CodingKey {
    var stringValue: String
    var intValue: Int?

    init?(stringValue: String) {
        self.stringValue = stringValue
        self.intValue = nil
    }

    init?(intValue: Int) {
        self.stringValue = "\(intValue)"
        self.intValue = intValue
    }
}

extension JSONValue: ExpressibleByStringLiteral {
    public init(stringLiteral value: String) {
        self = .string(value)
    }
}

extension JSONValue: ExpressibleByIntegerLiteral {
    public init(integerLiteral value: Int) {
        self = .number(Double(value))
    }
}

extension JSONValue: ExpressibleByFloatLiteral {
    public init(floatLiteral value: Double) {
        self = .number(value)
    }
}

extension JSONValue: ExpressibleByBooleanLiteral {
    public init(booleanLiteral value: Bool) {
        self = .bool(value)
    }
}

extension JSONValue: ExpressibleByNilLiteral {
    public init(nilLiteral: ()) {
        self = .null
    }
}

extension JSONValue: ExpressibleByDictionaryLiteral {
    public init(dictionaryLiteral elements: (String, JSONValue)...) {
        self = .object(Dictionary(uniqueKeysWithValues: elements))
    }
}

extension JSONValue: ExpressibleByArrayLiteral {
    public init(arrayLiteral elements: JSONValue...) {
        self = .array(elements)
    }
}
