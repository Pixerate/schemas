import XCTest
@testable import PixerateSchemas

final class PixerateSchemasTests: XCTestCase {
    private func fixtureURL(named name: String) -> URL {
        // Resolve fixture URL relative to #filePath
        let thisFile = URL(fileURLWithPath: #filePath)
        let repoRoot = thisFile
            .deletingLastPathComponent() // PixerateSchemasTests
            .deletingLastPathComponent() // Tests
            .deletingLastPathComponent() // swift
            .deletingLastPathComponent() // repo root
        return repoRoot.appendingPathComponent("tests/fixtures/swift/\(name)")
    }

    private func roundTrip<T: Codable & Equatable>(_ type: T.Type, fixtureName: String) throws {
        let url = fixtureURL(named: fixtureName)
        XCTAssertTrue(FileManager.default.fileExists(atPath: url.path), "Fixture not found at \(url.path)")
        let data = try Data(contentsOf: url)

        let decoder = JSONDecoder()
        let decoded1 = try decoder.decode(T.self, from: data)

        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        let encodedData = try encoder.encode(decoded1)

        let decoded2 = try decoder.decode(T.self, from: encodedData)
        XCTAssertEqual(decoded1, decoded2, "Round-trip equality check failed for \(fixtureName)")
    }

    func testJazzPolicyDefaults() throws {
        try roundTrip(JazzPolicy.self, fixtureName: "jazz_policy_empty.json")
    }

    func testJazzObservation() throws {
        try roundTrip(JazzObservation.self, fixtureName: "jazz_observation.json")
    }

    func testJazzRiffWithNestedToolArguments() throws {
        try roundTrip(JazzRiff.self, fixtureName: "jazz_riff.json")
    }

    func testAgentTool() throws {
        try roundTrip(AgentTool.self, fixtureName: "agent_tool.json")
    }

    func testCommonAspectRatio() throws {
        try roundTrip(AspectRatio.self, fixtureName: "common_aspect_ratio.json")
    }

    func testAgentFileChange() throws {
        try roundTrip(AgentFileChange.self, fixtureName: "agent_file_change.json")
    }

    func testJazzPhrase() throws {
        try roundTrip(JazzPhrase.self, fixtureName: "jazz_phrase.json")
    }
}
