import XCTest
@testable import PixerateSchemas

final class PixerateSchemasTests: XCTestCase {
    private func fixtureData(named name: String) throws -> Data {
        // Resolve fixture URL relative to #filePath
        let repoRoot = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent() // PixerateSchemasTests
            .deletingLastPathComponent() // Tests
            .deletingLastPathComponent() // swift
            .deletingLastPathComponent() // repo root
        let url = repoRoot.appendingPathComponent("tests/fixtures/swift/\(name)")
        XCTAssertTrue(FileManager.default.fileExists(atPath: url.path), "Fixture not found at \(url.path)")
        return try Data(contentsOf: url)
    }

    private func jsonObject(_ data: Data) throws -> NSObject {
        try JSONSerialization.jsonObject(with: data, options: [.fragmentsAllowed]) as! NSObject
    }

    /// Decodes a fixture written by Zod, encodes it again, and checks the JSON is the same:
    /// no field lost, renamed, retyped, or null turned into a missing key.
    @discardableResult
    private func roundTrip<T: Codable & Equatable>(_ type: T.Type, fixtureName: String) throws -> T {
        let data = try fixtureData(named: fixtureName)
        let decoded = try JSONDecoder().decode(T.self, from: data)
        let encoded = try JSONEncoder().encode(decoded)
        XCTAssertEqual(try jsonObject(encoded), try jsonObject(data), "\(fixtureName) does not survive decode and encode")
        XCTAssertEqual(try JSONDecoder().decode(T.self, from: encoded), decoded)
        return decoded
    }

    func testJazzPolicyDefaults() throws {
        let zodDefaults = try roundTrip(JazzPolicy.self, fixtureName: "jazz_policy_empty.json")
        let fromEmpty = try JSONDecoder().decode(JazzPolicy.self, from: Data("{}".utf8))
        XCTAssertEqual(fromEmpty, zodDefaults, "Decoding {} should fill in the same defaults as Zod")
        XCTAssertEqual(JazzPolicy(), zodDefaults, "The memberwise initializer should use the same defaults")
    }

    func testJazzObservation() throws {
        try roundTrip(JazzObservation.self, fixtureName: "jazz_observation.json")
    }

    func testJazzRiffWithNestedToolArguments() throws {
        let riff = try roundTrip(JazzRiff.self, fixtureName: "jazz_riff.json")
        XCTAssertEqual(riff.toolCalls.first?.arguments["coords"], ["x": 100, "y": 350])
    }

    func testJazzPhrase() throws {
        let phrase = try roundTrip(JazzPhrase.self, fixtureName: "jazz_phrase.json")
        XCTAssertEqual(phrase.observations.first?.action, .add)
    }

    func testJazzContextComposesTopLevelTypes() throws {
        let context = try roundTrip(JazzContext.self, fixtureName: "jazz_context.json")
        // Shared schemas are the same Swift types, so values built on their own fit together.
        let policy: JazzPolicy = context.policy
        XCTAssertEqual(policy.autonomy, JazzAutonomy.assist)
        let phrase = try JSONDecoder().decode(JazzPhrase.self, from: fixtureData(named: "jazz_phrase.json"))
        var updated = context
        updated.phrases.append(phrase)
        XCTAssertEqual(updated.phrases.last?.observations.first, phrase.observations.first)
    }

    func testJazzTextLeadRequestAndResponse() throws {
        let req = try roundTrip(JazzTextLeadRequest.self, fixtureName: "jazz_text_lead_request.json")
        XCTAssertEqual(req.flavor, .gfm)
        XCTAssertEqual(req.voices.first?.voice, .punctuate)
        XCTAssertEqual(req.voices.first?.rules["end-stop"]?.undone, 1)

        // Minimal request fills in defaults (flavor = .gfm, voices = [])
        let minimalReq = try JSONDecoder().decode(
            TextLeadRequest.self,
            from: Data(#"{"paragraph":"hello world"}"#.utf8)
        )
        XCTAssertEqual(minimalReq.flavor, .gfm)
        XCTAssertEqual(minimalReq.voices, [])

        let res = try roundTrip(JazzTextLeadResponse.self, fixtureName: "jazz_text_lead_response.json")
        XCTAssertEqual(res.genre, .list)
        XCTAssertEqual(res.palette.first?.voice, .punctuate)
        XCTAssertEqual(res.palette.first?.disabledRules, ["end-stop"])
        XCTAssertEqual(res.suggestions.first?.kind, .list)
        XCTAssertEqual(res.suggestions.first?.range, JazzTextRange(start: 0, end: 18))
        XCTAssertEqual(res.fuelBalance, 249)

        // Verify UTF-16 NSString range semantics match JavaScript string offsets
        let nsParagraph = req.paragraph as NSString
        let suggestion = try XCTUnwrap(res.suggestions.first)
        let nsRange = NSRange(location: suggestion.range.start, length: suggestion.range.end - suggestion.range.start)
        XCTAssertEqual(nsParagraph.substring(with: nsRange), "apples\npears\nplums")
    }

    func testAgentTool() throws {
        try roundTrip(AgentTool.self, fixtureName: "agent_tool.json")
    }

    func testAgentFileChange() throws {
        try roundTrip(AgentFileChange.self, fixtureName: "agent_file_change.json")
    }

    func testNullableFieldsAreTypedAndKeepNull() throws {
        let key = try roundTrip(PublicApiKey.self, fixtureName: "agent_public_api_key.json")
        let lastUsedAt: String? = key.lastUsedAt
        XCTAssertEqual(lastUsedAt, "2026-11-03T13:00:00.000Z")
        XCTAssertNil(key.expiresAt)
    }

    func testCommonAspectRatio() throws {
        XCTAssertEqual(try roundTrip(AspectRatio.self, fixtureName: "common_aspect_ratio.json"), .r16_9)
    }

    func testVideoAttachmentUnion() throws {
        XCTAssertEqual(
            try roundTrip(VideoAttachment.self, fixtureName: "common_video_attachment_url.json"),
            .string("https://example.com/clip.mp4")
        )
        let object = try roundTrip(VideoAttachment.self, fixtureName: "common_video_attachment_object.json")
        XCTAssertEqual(object, .object(VideoAttachmentData(mimeType: "video/mp4", url: "https://example.com/clip.mp4")))
    }
}

extension PixerateSchemasTests {
    /// The example in swift/README.md.
    func testReadmeExample() throws {
        let riff = JazzRiff(
            id: "riff-1",
            sessionId: "sess-abc",
            origin: "agent:assistant",
            surface: "canvas",
            strategy: "layout",
            intent: .suggest,
            title: "Align boxes",
            confidence: 0.95,
            toolCalls: [
                JazzToolCall(name: "align_nodes", arguments: ["ids": ["a", "b"], "axis": "x"])
            ],
            mode: .suggest,
            status: .proposed,
            createdAt: "2026-11-03T12:00:00.000Z"
        )
        XCTAssertEqual(riff.toolCalls.first?.arguments["axis"], "x")
        let policy = try JSONDecoder().decode(JazzPolicy.self, from: Data("{}".utf8))
        XCTAssertEqual(policy.autonomy, .suggest)
        XCTAssertEqual(policy.tempo.idleMs, 1500)
    }
}
