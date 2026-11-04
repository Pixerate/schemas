import Foundation

/// Builds a schema default that has no Swift literal (a struct, a non-empty array or dictionary,
/// a `JSONValue`) from the default's JSON, as written by `scripts/gen-swift.mjs`.
@usableFromInline
enum SchemaDefault {
    @usableFromInline
    static func decode<T: Decodable>(_ type: T.Type, json: String) -> T {
        do {
            return try JSONDecoder().decode(T.self, from: Data(json.utf8))
        } catch {
            preconditionFailure("Generated default for \(T.self) does not decode: \(error)")
        }
    }
}
