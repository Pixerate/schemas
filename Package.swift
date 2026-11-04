// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "PixerateSchemas",
    platforms: [
        .macOS(.v13),
        .iOS(.v16)
    ],
    products: [
        .library(
            name: "PixerateSchemas",
            targets: ["PixerateSchemas"]
        )
    ],
    dependencies: [],
    targets: [
        .target(
            name: "PixerateSchemas",
            dependencies: [],
            path: "swift/Sources/PixerateSchemas"
        ),
        .testTarget(
            name: "PixerateSchemasTests",
            dependencies: ["PixerateSchemas"],
            path: "swift/Tests/PixerateSchemasTests"
        )
    ]
)
