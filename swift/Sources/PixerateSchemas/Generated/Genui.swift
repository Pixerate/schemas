// Generated from @pixerate/schemas genui contracts by scripts/gen-swift.mjs. Do not edit.
import Foundation

public enum ActivityAction: String, Codable, Sendable, CaseIterable {
    case CREATED = "CREATED"
    case UPDATED = "UPDATED"
    case REVERTED = "REVERTED"
    case PACKAGEGENERATED = "PACKAGE_GENERATED"
    case DELETED = "DELETED"
}

public enum ChartThemeToken: String, Codable, Sendable, CaseIterable {
    case chart1 = "chart-1"
    case chart2 = "chart-2"
    case chart3 = "chart-3"
    case chart4 = "chart-4"
    case chart5 = "chart-5"
}

public enum ChartValueFormat: String, Codable, Sendable, CaseIterable {
    case number = "number"
    case percent = "percent"
    case currency = "currency"
}

/// code: source you install and own; engine: a fixed, reviewed runtime that takes data
public enum ComponentRuntime: String, Codable, Sendable, CaseIterable {
    case code = "code"
    case engine = "engine"
}

public enum ConditionOperator: String, Codable, Sendable, CaseIterable {
    case equals = "equals"
    case notEquals = "notEquals"
    case not_equals = "not_equals"
    case includes = "includes"
    case contains = "contains"
    case greaterThan = "greaterThan"
    case greater_than = "greater_than"
    case lessThan = "lessThan"
    case less_than = "less_than"
    case exists = "exists"
}

public enum DecisionGateKind: String, Codable, Sendable, CaseIterable {
    case approval = "approval"
    case review = "review"
    case decision = "decision"
}

public enum ElicitationQuestionType: String, Codable, Sendable, CaseIterable {
    case singleSelect = "single_select"
    case multiSelect = "multi_select"
    case freeForm = "free_form"
    case rankPriorities = "rank_priorities"
}

public enum FormControlType: String, Codable, Sendable, CaseIterable {
    case text = "text"
    case textarea = "textarea"
    case number = "number"
    case select = "select"
    case multiselect = "multiselect"
    case radio = "radio"
    case checkbox = "checkbox"
    case date = "date"
    case file = "file"
    case company = "company"
    case user = "user"
    case slider = "slider"
    case computed = "computed"
    case repeater = "repeater"
}

public enum LookStatus: String, Codable, Sendable, CaseIterable {
    case pass = "pass"
    case warn = "warn"
    case fail = "fail"
}

public enum PageThemeMode: String, Codable, Sendable, CaseIterable {
    case light = "light"
    case dark = "dark"
}

public enum PlatformLanguage: String, Codable, Sendable, CaseIterable {
    case svelte = "svelte"
    case react = "react"
    case webcomponent = "webcomponent"
}

public enum PlatformTarget: String, Codable, Sendable, CaseIterable {
    case svelte = "svelte"
    case react = "react"
    case webcomponent = "webcomponent"
    case swiftui = "swiftui"
    case compose = "compose"
    case htmlPage = "html-page"
}

public enum ReferenceDataSource: String, Codable, Sendable, CaseIterable {
    case companies = "companies"
    case users = "users"
}

public enum SemanticReviewStatus: String, Codable, Sendable, CaseIterable {
    case pass = "pass"
    case flagged = "flagged"
    case unavailable = "unavailable"
}

public enum SvgStyleArchetype: String, Codable, Sendable, CaseIterable {
    case minimalist = "minimalist"
    case neubrutalist = "neubrutalist"
    case skeuomorphic = "skeuomorphic"
    case flat = "flat"
    case custom = "custom"
    case promptDriven = "prompt-driven"
}

public enum ThemeSupport: String, Codable, Sendable, CaseIterable {
    case `default` = "default"
    case lightAndDark = "light-and-dark"
}

/// baseline: the shadcn set; data-visual: charts and diagrams whose layout follows the data; paradigm: new kinds of UI (3-D, instruments)
public enum UiComponentGroup: String, Codable, Sendable, CaseIterable {
    case baseline = "baseline"
    case dataVisual = "data-visual"
    case paradigm = "paradigm"
}

public struct ActionItem: Codable, Sendable, Equatable {
    public var icon: String?
    public var text: String
    public var owner: String?
    public var due: String?

    enum CodingKeys: String, CodingKey {
        case icon = "icon"
        case text = "text"
        case owner = "owner"
        case due = "due"
    }

    public init(
        icon: String? = nil,
        text: String,
        owner: String? = nil,
        due: String? = nil
    ) {
        self.icon = icon
        self.text = text
        self.owner = owner
        self.due = due
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.icon = try container.decodeIfPresent(String.self, forKey: .icon)
        self.text = try container.decode(String.self, forKey: .text)
        self.owner = try container.decodeIfPresent(String.self, forKey: .owner)
        self.due = try container.decodeIfPresent(String.self, forKey: .due)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(icon, forKey: .icon)
        try container.encode(text, forKey: .text)
        try container.encodeIfPresent(owner, forKey: .owner)
        try container.encodeIfPresent(due, forKey: .due)
    }
}

public enum ActionsBlockKind: String, Codable, Sendable, CaseIterable {
    case actions = "actions"
}

public struct ActionsBlock: Codable, Sendable, Equatable {
    public var kind: ActionsBlockKind
    public var title: String?
    public var items: [ActionItem]

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case title = "title"
        case items = "items"
    }

    public init(
        kind: ActionsBlockKind,
        title: String? = nil,
        items: [ActionItem]
    ) {
        self.kind = kind
        self.title = title
        self.items = items
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decode(ActionsBlockKind.self, forKey: .kind)
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.items = try container.decode([ActionItem].self, forKey: .items)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encode(items, forKey: .items)
    }
}

public struct ActivityLog: Codable, Sendable, Equatable {
    public var id: String
    public var componentTypeId: String
    public var componentTypeName: String
    public var variantId: String?
    public var aestheticId: String
    public var action: ActivityAction
    public var version: String
    public var details: String
    public var timestamp: String

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case componentTypeId = "componentTypeId"
        case componentTypeName = "componentTypeName"
        case variantId = "variantId"
        case aestheticId = "aestheticId"
        case action = "action"
        case version = "version"
        case details = "details"
        case timestamp = "timestamp"
    }

    public init(
        id: String,
        componentTypeId: String,
        componentTypeName: String,
        variantId: String? = nil,
        aestheticId: String,
        action: ActivityAction,
        version: String,
        details: String,
        timestamp: String
    ) {
        self.id = id
        self.componentTypeId = componentTypeId
        self.componentTypeName = componentTypeName
        self.variantId = variantId
        self.aestheticId = aestheticId
        self.action = action
        self.version = version
        self.details = details
        self.timestamp = timestamp
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.componentTypeId = try container.decode(String.self, forKey: .componentTypeId)
        self.componentTypeName = try container.decode(String.self, forKey: .componentTypeName)
        self.variantId = try container.decodeIfPresent(String.self, forKey: .variantId)
        self.aestheticId = try container.decode(String.self, forKey: .aestheticId)
        self.action = try container.decode(ActivityAction.self, forKey: .action)
        self.version = try container.decode(String.self, forKey: .version)
        self.details = try container.decode(String.self, forKey: .details)
        self.timestamp = try container.decode(String.self, forKey: .timestamp)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(componentTypeId, forKey: .componentTypeId)
        try container.encode(componentTypeName, forKey: .componentTypeName)
        try container.encodeIfPresent(variantId, forKey: .variantId)
        try container.encode(aestheticId, forKey: .aestheticId)
        try container.encode(action, forKey: .action)
        try container.encode(version, forKey: .version)
        try container.encode(details, forKey: .details)
        try container.encode(timestamp, forKey: .timestamp)
    }
}

public typealias Aesthetic = ComponentVariant

public struct BaseFormControlComputed: Codable, Sendable, Equatable {
    public var formula: String?

    enum CodingKeys: String, CodingKey {
        case formula = "formula"
    }

    public init(
        formula: String? = nil
    ) {
        self.formula = formula
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.formula = try container.decodeIfPresent(String.self, forKey: .formula)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(formula, forKey: .formula)
    }
}

public struct BaseFormControl: Codable, Sendable, Equatable {
    public var id: String
    public var type: FormControlType
    public var label: String
    public var `description`: String?
    public var helperText: String?
    public var placeholder: String?
    public var examples: [String]?
    public var suggestions: [String]?
    public var required: Bool?
    public var defaultValue: FormDefaultValue?
    public var options: [FormOption]?
    public var dataSource: ReferenceDataSource?
    public var validation: ControlValidation?
    public var pattern: String?
    public var min: Double?
    public var max: Double?
    public var step: Double?
    public var minItems: Double?
    public var maxItems: Double?
    public var formula: String?
    public var computed: BaseFormControlComputed?
    public var visibleWhen: Condition?
    public var condition: Condition?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case type = "type"
        case label = "label"
        case `description` = "description"
        case helperText = "helperText"
        case placeholder = "placeholder"
        case examples = "examples"
        case suggestions = "suggestions"
        case required = "required"
        case defaultValue = "defaultValue"
        case options = "options"
        case dataSource = "dataSource"
        case validation = "validation"
        case pattern = "pattern"
        case min = "min"
        case max = "max"
        case step = "step"
        case minItems = "minItems"
        case maxItems = "maxItems"
        case formula = "formula"
        case computed = "computed"
        case visibleWhen = "visibleWhen"
        case condition = "condition"
    }

    public init(
        id: String,
        type: FormControlType,
        label: String,
        `description`: String? = nil,
        helperText: String? = nil,
        placeholder: String? = nil,
        examples: [String]? = nil,
        suggestions: [String]? = nil,
        required: Bool? = nil,
        defaultValue: FormDefaultValue? = nil,
        options: [FormOption]? = nil,
        dataSource: ReferenceDataSource? = nil,
        validation: ControlValidation? = nil,
        pattern: String? = nil,
        min: Double? = nil,
        max: Double? = nil,
        step: Double? = nil,
        minItems: Double? = nil,
        maxItems: Double? = nil,
        formula: String? = nil,
        computed: BaseFormControlComputed? = nil,
        visibleWhen: Condition? = nil,
        condition: Condition? = nil
    ) {
        self.id = id
        self.type = type
        self.label = label
        self.`description` = `description`
        self.helperText = helperText
        self.placeholder = placeholder
        self.examples = examples
        self.suggestions = suggestions
        self.required = required
        self.defaultValue = defaultValue
        self.options = options
        self.dataSource = dataSource
        self.validation = validation
        self.pattern = pattern
        self.min = min
        self.max = max
        self.step = step
        self.minItems = minItems
        self.maxItems = maxItems
        self.formula = formula
        self.computed = computed
        self.visibleWhen = visibleWhen
        self.condition = condition
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.type = try container.decode(FormControlType.self, forKey: .type)
        self.label = try container.decode(String.self, forKey: .label)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.helperText = try container.decodeIfPresent(String.self, forKey: .helperText)
        self.placeholder = try container.decodeIfPresent(String.self, forKey: .placeholder)
        self.examples = try container.decodeIfPresent([String].self, forKey: .examples)
        self.suggestions = try container.decodeIfPresent([String].self, forKey: .suggestions)
        self.required = try container.decodeIfPresent(Bool.self, forKey: .required)
        self.defaultValue = try container.decodeIfPresent(FormDefaultValue.self, forKey: .defaultValue)
        self.options = try container.decodeIfPresent([FormOption].self, forKey: .options)
        self.dataSource = try container.decodeIfPresent(ReferenceDataSource.self, forKey: .dataSource)
        self.validation = try container.decodeIfPresent(ControlValidation.self, forKey: .validation)
        self.pattern = try container.decodeIfPresent(String.self, forKey: .pattern)
        self.min = try container.decodeIfPresent(Double.self, forKey: .min)
        self.max = try container.decodeIfPresent(Double.self, forKey: .max)
        self.step = try container.decodeIfPresent(Double.self, forKey: .step)
        self.minItems = try container.decodeIfPresent(Double.self, forKey: .minItems)
        self.maxItems = try container.decodeIfPresent(Double.self, forKey: .maxItems)
        self.formula = try container.decodeIfPresent(String.self, forKey: .formula)
        self.computed = try container.decodeIfPresent(BaseFormControlComputed.self, forKey: .computed)
        self.visibleWhen = try container.decodeIfPresent(Condition.self, forKey: .visibleWhen)
        self.condition = try container.decodeIfPresent(Condition.self, forKey: .condition)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(type, forKey: .type)
        try container.encode(label, forKey: .label)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(helperText, forKey: .helperText)
        try container.encodeIfPresent(placeholder, forKey: .placeholder)
        try container.encodeIfPresent(examples, forKey: .examples)
        try container.encodeIfPresent(suggestions, forKey: .suggestions)
        try container.encodeIfPresent(required, forKey: .required)
        try container.encodeIfPresent(defaultValue, forKey: .defaultValue)
        try container.encodeIfPresent(options, forKey: .options)
        try container.encodeIfPresent(dataSource, forKey: .dataSource)
        try container.encodeIfPresent(validation, forKey: .validation)
        try container.encodeIfPresent(pattern, forKey: .pattern)
        try container.encodeIfPresent(min, forKey: .min)
        try container.encodeIfPresent(max, forKey: .max)
        try container.encodeIfPresent(step, forKey: .step)
        try container.encodeIfPresent(minItems, forKey: .minItems)
        try container.encodeIfPresent(maxItems, forKey: .maxItems)
        try container.encodeIfPresent(formula, forKey: .formula)
        try container.encodeIfPresent(computed, forKey: .computed)
        try container.encodeIfPresent(visibleWhen, forKey: .visibleWhen)
        try container.encodeIfPresent(condition, forKey: .condition)
    }
}

public enum CalloutBlockKind: String, Codable, Sendable, CaseIterable {
    case callout = "callout"
}

public enum CalloutBlockSeverity: String, Codable, Sendable, CaseIterable {
    case risk = "risk"
    case opportunity = "opportunity"
    case info = "info"
    case success = "success"
}

public struct CalloutBlock: Codable, Sendable, Equatable {
    public var kind: CalloutBlockKind
    public var severity: CalloutBlockSeverity
    public var title: String
    public var body: String?

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case severity = "severity"
        case title = "title"
        case body = "body"
    }

    public init(
        kind: CalloutBlockKind,
        severity: CalloutBlockSeverity,
        title: String,
        body: String? = nil
    ) {
        self.kind = kind
        self.severity = severity
        self.title = title
        self.body = body
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decode(CalloutBlockKind.self, forKey: .kind)
        self.severity = try container.decode(CalloutBlockSeverity.self, forKey: .severity)
        self.title = try container.decode(String.self, forKey: .title)
        self.body = try container.decodeIfPresent(String.self, forKey: .body)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encode(severity, forKey: .severity)
        try container.encode(title, forKey: .title)
        try container.encodeIfPresent(body, forKey: .body)
    }
}

public enum ChartBlockKind: String, Codable, Sendable, CaseIterable {
    case chart = "chart"
}

public enum ChartBlockChartType: String, Codable, Sendable, CaseIterable {
    case bar = "bar"
    case line = "line"
    case pie = "pie"
    case radar = "radar"
    case area = "area"
}

public struct ChartBlock: Codable, Sendable, Equatable {
    public var kind: ChartBlockKind
    public var chartType: ChartBlockChartType
    public var title: String?
    public var `description`: String?
    public var unit: String?
    public var valueFormat: ChartValueFormat?
    public var yLabel: String?
    public var stacked: Bool?
    public var categories: [String]?
    public var series: [ChartSeries]
    public var drilldown: ChartDrilldown?
    public var followUps: [String]?

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case chartType = "chartType"
        case title = "title"
        case `description` = "description"
        case unit = "unit"
        case valueFormat = "valueFormat"
        case yLabel = "yLabel"
        case stacked = "stacked"
        case categories = "categories"
        case series = "series"
        case drilldown = "drilldown"
        case followUps = "followUps"
    }

    public init(
        kind: ChartBlockKind,
        chartType: ChartBlockChartType,
        title: String? = nil,
        `description`: String? = nil,
        unit: String? = nil,
        valueFormat: ChartValueFormat? = nil,
        yLabel: String? = nil,
        stacked: Bool? = nil,
        categories: [String]? = nil,
        series: [ChartSeries],
        drilldown: ChartDrilldown? = nil,
        followUps: [String]? = nil
    ) {
        self.kind = kind
        self.chartType = chartType
        self.title = title
        self.`description` = `description`
        self.unit = unit
        self.valueFormat = valueFormat
        self.yLabel = yLabel
        self.stacked = stacked
        self.categories = categories
        self.series = series
        self.drilldown = drilldown
        self.followUps = followUps
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decode(ChartBlockKind.self, forKey: .kind)
        self.chartType = try container.decode(ChartBlockChartType.self, forKey: .chartType)
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.unit = try container.decodeIfPresent(String.self, forKey: .unit)
        self.valueFormat = try container.decodeIfPresent(ChartValueFormat.self, forKey: .valueFormat)
        self.yLabel = try container.decodeIfPresent(String.self, forKey: .yLabel)
        self.stacked = try container.decodeIfPresent(Bool.self, forKey: .stacked)
        self.categories = try container.decodeIfPresent([String].self, forKey: .categories)
        self.series = try container.decode([ChartSeries].self, forKey: .series)
        self.drilldown = try container.decodeIfPresent(ChartDrilldown.self, forKey: .drilldown)
        self.followUps = try container.decodeIfPresent([String].self, forKey: .followUps)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encode(chartType, forKey: .chartType)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(unit, forKey: .unit)
        try container.encodeIfPresent(valueFormat, forKey: .valueFormat)
        try container.encodeIfPresent(yLabel, forKey: .yLabel)
        try container.encodeIfPresent(stacked, forKey: .stacked)
        try container.encodeIfPresent(categories, forKey: .categories)
        try container.encode(series, forKey: .series)
        try container.encodeIfPresent(drilldown, forKey: .drilldown)
        try container.encodeIfPresent(followUps, forKey: .followUps)
    }
}

public struct ChartDrilldown: Codable, Sendable, Equatable {
    public var title: String?
    public var details: [String: JSONValue]?
    public var followUps: [String]?

    enum CodingKeys: String, CodingKey {
        case title = "title"
        case details = "details"
        case followUps = "followUps"
    }

    public init(
        title: String? = nil,
        details: [String: JSONValue]? = nil,
        followUps: [String]? = nil
    ) {
        self.title = title
        self.details = details
        self.followUps = followUps
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.details = try container.decodeIfPresent([String: JSONValue].self, forKey: .details)
        self.followUps = try container.decodeIfPresent([String].self, forKey: .followUps)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encodeIfPresent(details, forKey: .details)
        try container.encodeIfPresent(followUps, forKey: .followUps)
    }
}

public struct ChartSeries: Codable, Sendable, Equatable {
    public var name: String
    public var data: [Double]
    public var color: ChartThemeToken?

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case data = "data"
        case color = "color"
    }

    public init(
        name: String,
        data: [Double],
        color: ChartThemeToken? = nil
    ) {
        self.name = name
        self.data = data
        self.color = color
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.data = try container.decode([Double].self, forKey: .data)
        self.color = try container.decodeIfPresent(ChartThemeToken.self, forKey: .color)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encode(data, forKey: .data)
        try container.encodeIfPresent(color, forKey: .color)
    }
}

public typealias ComponentDependency = JSONValue

public struct ComponentDocs: Codable, Sendable, Equatable {
    /// Usage instructions and import examples
    public var usage: String
    /// List of prop definitions and types
    public var props: [ComponentPropDoc]
    /// Additional usage or architectural notes
    public var notes: String?

    enum CodingKeys: String, CodingKey {
        case usage = "usage"
        case props = "props"
        case notes = "notes"
    }

    public init(
        usage: String,
        props: [ComponentPropDoc],
        notes: String? = nil
    ) {
        self.usage = usage
        self.props = props
        self.notes = notes
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.usage = try container.decode(String.self, forKey: .usage)
        self.props = try container.decode([ComponentPropDoc].self, forKey: .props)
        self.notes = try container.decodeIfPresent(String.self, forKey: .notes)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(usage, forKey: .usage)
        try container.encode(props, forKey: .props)
        try container.encodeIfPresent(notes, forKey: .notes)
    }
}

public struct ComponentPackage: Codable, Sendable, Equatable {
    public var language: PlatformLanguage
    /// Formatted code bundle with trimmed leading whitespace
    public var code: String
    public var docs: ComponentDocs
    /// Deprecated, use screenshots. Data URI or URL of actual rendered component
    public var screenshot: String
    public var themeSupport: ThemeSupport
    public var tags: [String]
    public var dependencies: [ComponentDependency]
    public var previewHarness: PreviewHarness?
    /// Where the package came from; absent for packages made before sources were recorded
    public var source: ComponentSource?
    /// Absent means 'code'
    public var runtime: ComponentRuntime?
    public var screenshots: ComponentScreenshots?

    enum CodingKeys: String, CodingKey {
        case language = "language"
        case code = "code"
        case docs = "docs"
        case screenshot = "screenshot"
        case themeSupport = "themeSupport"
        case tags = "tags"
        case dependencies = "dependencies"
        case previewHarness = "previewHarness"
        case source = "source"
        case runtime = "runtime"
        case screenshots = "screenshots"
    }

    public init(
        language: PlatformLanguage,
        code: String,
        docs: ComponentDocs,
        screenshot: String,
        themeSupport: ThemeSupport,
        tags: [String],
        dependencies: [ComponentDependency] = [],
        previewHarness: PreviewHarness? = nil,
        source: ComponentSource? = nil,
        runtime: ComponentRuntime? = nil,
        screenshots: ComponentScreenshots? = nil
    ) {
        self.language = language
        self.code = code
        self.docs = docs
        self.screenshot = screenshot
        self.themeSupport = themeSupport
        self.tags = tags
        self.dependencies = dependencies
        self.previewHarness = previewHarness
        self.source = source
        self.runtime = runtime
        self.screenshots = screenshots
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.language = try container.decode(PlatformLanguage.self, forKey: .language)
        self.code = try container.decode(String.self, forKey: .code)
        self.docs = try container.decode(ComponentDocs.self, forKey: .docs)
        self.screenshot = try container.decode(String.self, forKey: .screenshot)
        self.themeSupport = try container.decode(ThemeSupport.self, forKey: .themeSupport)
        self.tags = try container.decode([String].self, forKey: .tags)
        self.dependencies = try container.decodeIfPresent([ComponentDependency].self, forKey: .dependencies) ?? []
        self.previewHarness = try container.decodeIfPresent(PreviewHarness.self, forKey: .previewHarness)
        self.source = try container.decodeIfPresent(ComponentSource.self, forKey: .source)
        self.runtime = try container.decodeIfPresent(ComponentRuntime.self, forKey: .runtime)
        self.screenshots = try container.decodeIfPresent(ComponentScreenshots.self, forKey: .screenshots)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(language, forKey: .language)
        try container.encode(code, forKey: .code)
        try container.encode(docs, forKey: .docs)
        try container.encode(screenshot, forKey: .screenshot)
        try container.encode(themeSupport, forKey: .themeSupport)
        try container.encode(tags, forKey: .tags)
        try container.encode(dependencies, forKey: .dependencies)
        try container.encodeIfPresent(previewHarness, forKey: .previewHarness)
        try container.encodeIfPresent(source, forKey: .source)
        try container.encodeIfPresent(runtime, forKey: .runtime)
        try container.encodeIfPresent(screenshots, forKey: .screenshots)
    }
}

public typealias ComponentPropDefinition = ComponentPropDoc

public struct ComponentPropDoc: Codable, Sendable, Equatable {
    public var name: String
    public var type: String
    public var `default`: String?
    public var `description`: String

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case type = "type"
        case `default` = "default"
        case `description` = "description"
    }

    public init(
        name: String,
        type: String,
        `default`: String? = nil,
        `description`: String
    ) {
        self.name = name
        self.type = type
        self.`default` = `default`
        self.`description` = `description`
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.type = try container.decode(String.self, forKey: .type)
        self.`default` = try container.decodeIfPresent(String.self, forKey: .`default`)
        self.`description` = try container.decode(String.self, forKey: .`description`)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encode(type, forKey: .type)
        try container.encodeIfPresent(`default`, forKey: .`default`)
        try container.encode(`description`, forKey: .`description`)
    }
}

public struct ComponentScreenshots: Codable, Sendable, Equatable {
    /// URL or data URI of a real render in light mode
    public var light: String?
    /// URL or data URI of a real render in dark mode
    public var dark: String?

    enum CodingKeys: String, CodingKey {
        case light = "light"
        case dark = "dark"
    }

    public init(
        light: String? = nil,
        dark: String? = nil
    ) {
        self.light = light
        self.dark = dark
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.light = try container.decodeIfPresent(String.self, forKey: .light)
        self.dark = try container.decodeIfPresent(String.self, forKey: .dark)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(light, forKey: .light)
        try container.encodeIfPresent(dark, forKey: .dark)
    }
}

public enum ComponentSourceProvider: String, Codable, Sendable, CaseIterable {
    case flair = "flair"
    case editor = "editor"
    case generated = "generated"
    case manual = "manual"
}

public struct ComponentSource: Codable, Sendable, Equatable {
    public var provider: ComponentSourceProvider
    /// The provider's id for the item, e.g. Flair's 'toggle-switch'
    public var itemId: String?
    /// The provider package's version, or the generator's
    public var version: String?
    public var contentHash: String?

    enum CodingKeys: String, CodingKey {
        case provider = "provider"
        case itemId = "itemId"
        case version = "version"
        case contentHash = "contentHash"
    }

    public init(
        provider: ComponentSourceProvider,
        itemId: String? = nil,
        version: String? = nil,
        contentHash: String? = nil
    ) {
        self.provider = provider
        self.itemId = itemId
        self.version = version
        self.contentHash = contentHash
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.provider = try container.decode(ComponentSourceProvider.self, forKey: .provider)
        self.itemId = try container.decodeIfPresent(String.self, forKey: .itemId)
        self.version = try container.decodeIfPresent(String.self, forKey: .version)
        self.contentHash = try container.decodeIfPresent(String.self, forKey: .contentHash)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(provider, forKey: .provider)
        try container.encodeIfPresent(itemId, forKey: .itemId)
        try container.encodeIfPresent(version, forKey: .version)
        try container.encodeIfPresent(contentHash, forKey: .contentHash)
    }
}

public struct ComponentSynthesisPlatforms: Codable, Sendable, Equatable {
    /// Self-contained Svelte 5 component with runes ($props, $state, onclick, snippets, etc.)
    public var svelte: String
    /// Self-contained React 19 TSX component with all subcomponents defined and exported
    public var react: String
    /// Self-contained WebComponent custom element extending HTMLElement
    public var webcomponent: String

    enum CodingKeys: String, CodingKey {
        case svelte = "svelte"
        case react = "react"
        case webcomponent = "webcomponent"
    }

    public init(
        svelte: String,
        react: String,
        webcomponent: String
    ) {
        self.svelte = svelte
        self.react = react
        self.webcomponent = webcomponent
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.svelte = try container.decode(String.self, forKey: .svelte)
        self.react = try container.decode(String.self, forKey: .react)
        self.webcomponent = try container.decode(String.self, forKey: .webcomponent)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(svelte, forKey: .svelte)
        try container.encode(react, forKey: .react)
        try container.encode(webcomponent, forKey: .webcomponent)
    }
}

public struct ComponentSynthesisHarnesses: Codable, Sendable, Equatable {
    public var svelte: PreviewHarness
    public var react: PreviewHarness
    public var webcomponent: PreviewHarness

    enum CodingKeys: String, CodingKey {
        case svelte = "svelte"
        case react = "react"
        case webcomponent = "webcomponent"
    }

    public init(
        svelte: PreviewHarness,
        react: PreviewHarness,
        webcomponent: PreviewHarness
    ) {
        self.svelte = svelte
        self.react = react
        self.webcomponent = webcomponent
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.svelte = try container.decode(PreviewHarness.self, forKey: .svelte)
        self.react = try container.decode(PreviewHarness.self, forKey: .react)
        self.webcomponent = try container.decode(PreviewHarness.self, forKey: .webcomponent)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(svelte, forKey: .svelte)
        try container.encode(react, forKey: .react)
        try container.encode(webcomponent, forKey: .webcomponent)
    }
}

public struct ComponentSynthesisDependencies: Codable, Sendable, Equatable {
    public var svelte: [ComponentDependency]
    public var react: [ComponentDependency]
    public var webcomponent: [ComponentDependency]

    enum CodingKeys: String, CodingKey {
        case svelte = "svelte"
        case react = "react"
        case webcomponent = "webcomponent"
    }

    public init(
        svelte: [ComponentDependency] = [],
        react: [ComponentDependency] = [],
        webcomponent: [ComponentDependency] = []
    ) {
        self.svelte = svelte
        self.react = react
        self.webcomponent = webcomponent
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.svelte = try container.decodeIfPresent([ComponentDependency].self, forKey: .svelte) ?? []
        self.react = try container.decodeIfPresent([ComponentDependency].self, forKey: .react) ?? []
        self.webcomponent = try container.decodeIfPresent([ComponentDependency].self, forKey: .webcomponent) ?? []
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(svelte, forKey: .svelte)
        try container.encode(react, forKey: .react)
        try container.encode(webcomponent, forKey: .webcomponent)
    }
}

public struct ComponentSynthesis: Codable, Sendable, Equatable {
    /// Title of the synthesized component
    public var title: String
    /// Detailed description of the component
    public var `description`: String
    /// Keywords and categorization tags
    public var tags: [String]
    public var platforms: ComponentSynthesisPlatforms
    public var harnesses: ComponentSynthesisHarnesses?
    public var dependencies: ComponentSynthesisDependencies?
    public var docs: ComponentDocs
    /// Whether synthesized code passed validation
    public var isValid: Bool?
    /// Total number of validation/repair attempts
    public var validationAttempts: Int?
    /// Validation error if still failing after max retries
    public var validationError: String?

    enum CodingKeys: String, CodingKey {
        case title = "title"
        case `description` = "description"
        case tags = "tags"
        case platforms = "platforms"
        case harnesses = "harnesses"
        case dependencies = "dependencies"
        case docs = "docs"
        case isValid = "isValid"
        case validationAttempts = "validationAttempts"
        case validationError = "validationError"
    }

    public init(
        title: String,
        `description`: String,
        tags: [String],
        platforms: ComponentSynthesisPlatforms,
        harnesses: ComponentSynthesisHarnesses? = nil,
        dependencies: ComponentSynthesisDependencies? = nil,
        docs: ComponentDocs,
        isValid: Bool? = nil,
        validationAttempts: Int? = nil,
        validationError: String? = nil
    ) {
        self.title = title
        self.`description` = `description`
        self.tags = tags
        self.platforms = platforms
        self.harnesses = harnesses
        self.dependencies = dependencies
        self.docs = docs
        self.isValid = isValid
        self.validationAttempts = validationAttempts
        self.validationError = validationError
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.title = try container.decode(String.self, forKey: .title)
        self.`description` = try container.decode(String.self, forKey: .`description`)
        self.tags = try container.decode([String].self, forKey: .tags)
        self.platforms = try container.decode(ComponentSynthesisPlatforms.self, forKey: .platforms)
        self.harnesses = try container.decodeIfPresent(ComponentSynthesisHarnesses.self, forKey: .harnesses)
        self.dependencies = try container.decodeIfPresent(ComponentSynthesisDependencies.self, forKey: .dependencies)
        self.docs = try container.decode(ComponentDocs.self, forKey: .docs)
        self.isValid = try container.decodeIfPresent(Bool.self, forKey: .isValid)
        self.validationAttempts = try container.decodeIfPresent(Int.self, forKey: .validationAttempts)
        self.validationError = try container.decodeIfPresent(String.self, forKey: .validationError)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(title, forKey: .title)
        try container.encode(`description`, forKey: .`description`)
        try container.encode(tags, forKey: .tags)
        try container.encode(platforms, forKey: .platforms)
        try container.encodeIfPresent(harnesses, forKey: .harnesses)
        try container.encodeIfPresent(dependencies, forKey: .dependencies)
        try container.encode(docs, forKey: .docs)
        try container.encodeIfPresent(isValid, forKey: .isValid)
        try container.encodeIfPresent(validationAttempts, forKey: .validationAttempts)
        try container.encodeIfPresent(validationError, forKey: .validationError)
    }
}

public struct ComponentTransformationResultDependencies: Codable, Sendable, Equatable {
    public var svelte: [ComponentDependency]
    public var react: [ComponentDependency]
    public var webcomponent: [ComponentDependency]

    enum CodingKeys: String, CodingKey {
        case svelte = "svelte"
        case react = "react"
        case webcomponent = "webcomponent"
    }

    public init(
        svelte: [ComponentDependency] = [],
        react: [ComponentDependency] = [],
        webcomponent: [ComponentDependency] = []
    ) {
        self.svelte = svelte
        self.react = react
        self.webcomponent = webcomponent
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.svelte = try container.decodeIfPresent([ComponentDependency].self, forKey: .svelte) ?? []
        self.react = try container.decodeIfPresent([ComponentDependency].self, forKey: .react) ?? []
        self.webcomponent = try container.decodeIfPresent([ComponentDependency].self, forKey: .webcomponent) ?? []
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(svelte, forKey: .svelte)
        try container.encode(react, forKey: .react)
        try container.encode(webcomponent, forKey: .webcomponent)
    }
}

public struct ComponentTransformationResult: Codable, Sendable, Equatable {
    public var title: String
    public var `description`: String
    public var tags: [String]
    public var platforms: [String: String]
    public var harnesses: [String: PreviewHarness]
    public var dependencies: ComponentTransformationResultDependencies?
    public var docs: ComponentDocs
    public var detectedLanguage: PlatformLanguage
    public var themeSupport: ThemeSupport

    enum CodingKeys: String, CodingKey {
        case title = "title"
        case `description` = "description"
        case tags = "tags"
        case platforms = "platforms"
        case harnesses = "harnesses"
        case dependencies = "dependencies"
        case docs = "docs"
        case detectedLanguage = "detectedLanguage"
        case themeSupport = "themeSupport"
    }

    public init(
        title: String,
        `description`: String,
        tags: [String],
        platforms: [String: String],
        harnesses: [String: PreviewHarness],
        dependencies: ComponentTransformationResultDependencies? = nil,
        docs: ComponentDocs,
        detectedLanguage: PlatformLanguage,
        themeSupport: ThemeSupport
    ) {
        self.title = title
        self.`description` = `description`
        self.tags = tags
        self.platforms = platforms
        self.harnesses = harnesses
        self.dependencies = dependencies
        self.docs = docs
        self.detectedLanguage = detectedLanguage
        self.themeSupport = themeSupport
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.title = try container.decode(String.self, forKey: .title)
        self.`description` = try container.decode(String.self, forKey: .`description`)
        self.tags = try container.decode([String].self, forKey: .tags)
        self.platforms = try container.decode([String: String].self, forKey: .platforms)
        self.harnesses = try container.decode([String: PreviewHarness].self, forKey: .harnesses)
        self.dependencies = try container.decodeIfPresent(ComponentTransformationResultDependencies.self, forKey: .dependencies)
        self.docs = try container.decode(ComponentDocs.self, forKey: .docs)
        self.detectedLanguage = try container.decode(PlatformLanguage.self, forKey: .detectedLanguage)
        self.themeSupport = try container.decode(ThemeSupport.self, forKey: .themeSupport)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(title, forKey: .title)
        try container.encode(`description`, forKey: .`description`)
        try container.encode(tags, forKey: .tags)
        try container.encode(platforms, forKey: .platforms)
        try container.encode(harnesses, forKey: .harnesses)
        try container.encodeIfPresent(dependencies, forKey: .dependencies)
        try container.encode(docs, forKey: .docs)
        try container.encode(detectedLanguage, forKey: .detectedLanguage)
        try container.encode(themeSupport, forKey: .themeSupport)
    }
}

public struct ComponentVariant: Codable, Sendable, Equatable {
    /// Slug, e.g., 'glass-card' or 'glassmorphism'
    public var id: String
    /// References UIComponentType.id
    public var componentTypeId: String
    /// e.g. 'Glass Action Button'
    public var name: String
    /// Deprecated mirror of aesthetic.skillId. Style aesthetic, e.g. 'glassmorphism', 'neubrutalism', 'minimalist', 'modern', 'shadcn'
    public var aestheticId: String
    /// The ui-aesthetic skill (and version) this variant is styled by
    public var aesthetic: UiAestheticRef?
    /// Optional recommended theme ID (e.g., 'shadcn-zinc', 'tokyo-night')
    public var recommendedThemeId: String?
    /// Style & business logic description
    public var `description`: String?
    /// Optional image URL
    public var imageUrl: String?
    public var image: String?
    public var screenshot: String?
    /// ISO timestamp
    public var createdAt: String
    /// ISO timestamp
    public var updatedAt: String

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case componentTypeId = "componentTypeId"
        case name = "name"
        case aestheticId = "aestheticId"
        case aesthetic = "aesthetic"
        case recommendedThemeId = "recommendedThemeId"
        case `description` = "description"
        case imageUrl = "imageUrl"
        case image = "image"
        case screenshot = "screenshot"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
    }

    public init(
        id: String,
        componentTypeId: String,
        name: String,
        aestheticId: String,
        aesthetic: UiAestheticRef? = nil,
        recommendedThemeId: String? = nil,
        `description`: String? = nil,
        imageUrl: String? = nil,
        image: String? = nil,
        screenshot: String? = nil,
        createdAt: String,
        updatedAt: String
    ) {
        self.id = id
        self.componentTypeId = componentTypeId
        self.name = name
        self.aestheticId = aestheticId
        self.aesthetic = aesthetic
        self.recommendedThemeId = recommendedThemeId
        self.`description` = `description`
        self.imageUrl = imageUrl
        self.image = image
        self.screenshot = screenshot
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.componentTypeId = try container.decode(String.self, forKey: .componentTypeId)
        self.name = try container.decode(String.self, forKey: .name)
        self.aestheticId = try container.decode(String.self, forKey: .aestheticId)
        self.aesthetic = try container.decodeIfPresent(UiAestheticRef.self, forKey: .aesthetic)
        self.recommendedThemeId = try container.decodeIfPresent(String.self, forKey: .recommendedThemeId)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.imageUrl = try container.decodeIfPresent(String.self, forKey: .imageUrl)
        self.image = try container.decodeIfPresent(String.self, forKey: .image)
        self.screenshot = try container.decodeIfPresent(String.self, forKey: .screenshot)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decode(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(componentTypeId, forKey: .componentTypeId)
        try container.encode(name, forKey: .name)
        try container.encode(aestheticId, forKey: .aestheticId)
        try container.encodeIfPresent(aesthetic, forKey: .aesthetic)
        try container.encodeIfPresent(recommendedThemeId, forKey: .recommendedThemeId)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(imageUrl, forKey: .imageUrl)
        try container.encodeIfPresent(image, forKey: .image)
        try container.encodeIfPresent(screenshot, forKey: .screenshot)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(updatedAt, forKey: .updatedAt)
    }
}

public struct ComponentVersion: Codable, Sendable, Equatable {
    /// Unique version ID e.g. 'button-glass-action-button-v1.0.0'
    public var id: String
    /// References UIComponentType.id
    public var componentTypeId: String
    /// References ComponentVariant.id
    public var variantId: String
    /// Deprecated mirror of aesthetic.skillId. References Aesthetic style e.g. 'glassmorphism'
    public var aestheticId: String
    /// The ui-aesthetic skill version this version was built from
    public var aesthetic: UiAestheticRef?
    /// Semver e.g. '1.0.0'
    public var version: String
    public var changelogNote: String
    public var createdBy: String
    /// ISO timestamp
    public var createdAt: String
    public var packages: [String: ComponentPackage]

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case componentTypeId = "componentTypeId"
        case variantId = "variantId"
        case aestheticId = "aestheticId"
        case aesthetic = "aesthetic"
        case version = "version"
        case changelogNote = "changelogNote"
        case createdBy = "createdBy"
        case createdAt = "createdAt"
        case packages = "packages"
    }

    public init(
        id: String,
        componentTypeId: String,
        variantId: String,
        aestheticId: String,
        aesthetic: UiAestheticRef? = nil,
        version: String,
        changelogNote: String,
        createdBy: String,
        createdAt: String,
        packages: [String: ComponentPackage]
    ) {
        self.id = id
        self.componentTypeId = componentTypeId
        self.variantId = variantId
        self.aestheticId = aestheticId
        self.aesthetic = aesthetic
        self.version = version
        self.changelogNote = changelogNote
        self.createdBy = createdBy
        self.createdAt = createdAt
        self.packages = packages
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.componentTypeId = try container.decode(String.self, forKey: .componentTypeId)
        self.variantId = try container.decode(String.self, forKey: .variantId)
        self.aestheticId = try container.decode(String.self, forKey: .aestheticId)
        self.aesthetic = try container.decodeIfPresent(UiAestheticRef.self, forKey: .aesthetic)
        self.version = try container.decode(String.self, forKey: .version)
        self.changelogNote = try container.decode(String.self, forKey: .changelogNote)
        self.createdBy = try container.decode(String.self, forKey: .createdBy)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.packages = try container.decode([String: ComponentPackage].self, forKey: .packages)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(componentTypeId, forKey: .componentTypeId)
        try container.encode(variantId, forKey: .variantId)
        try container.encode(aestheticId, forKey: .aestheticId)
        try container.encodeIfPresent(aesthetic, forKey: .aesthetic)
        try container.encode(version, forKey: .version)
        try container.encode(changelogNote, forKey: .changelogNote)
        try container.encode(createdBy, forKey: .createdBy)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(packages, forKey: .packages)
    }
}

public struct Condition: Codable, Sendable, Equatable {
    public var field: String?
    public var fieldId: String?
    public var `operator`: ConditionOperator
    public var value: JSONValue?

    enum CodingKeys: String, CodingKey {
        case field = "field"
        case fieldId = "fieldId"
        case `operator` = "operator"
        case value = "value"
    }

    public init(
        field: String? = nil,
        fieldId: String? = nil,
        `operator`: ConditionOperator,
        value: JSONValue? = nil
    ) {
        self.field = field
        self.fieldId = fieldId
        self.`operator` = `operator`
        self.value = value
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.field = try container.decodeIfPresent(String.self, forKey: .field)
        self.fieldId = try container.decodeIfPresent(String.self, forKey: .fieldId)
        self.`operator` = try container.decode(ConditionOperator.self, forKey: .`operator`)
        self.value = try container.decodeIfPresent(JSONValue.self, forKey: .value)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(field, forKey: .field)
        try container.encodeIfPresent(fieldId, forKey: .fieldId)
        try container.encode(`operator`, forKey: .`operator`)
        try container.encodeIfPresent(value, forKey: .value)
    }
}

public struct ControlValidation: Codable, Sendable, Equatable {
    public var min: Double?
    public var max: Double?
    public var minLength: Double?
    public var maxLength: Double?
    public var pattern: String?
    public var message: String?
    public var unit: String?

    enum CodingKeys: String, CodingKey {
        case min = "min"
        case max = "max"
        case minLength = "minLength"
        case maxLength = "maxLength"
        case pattern = "pattern"
        case message = "message"
        case unit = "unit"
    }

    public init(
        min: Double? = nil,
        max: Double? = nil,
        minLength: Double? = nil,
        maxLength: Double? = nil,
        pattern: String? = nil,
        message: String? = nil,
        unit: String? = nil
    ) {
        self.min = min
        self.max = max
        self.minLength = minLength
        self.maxLength = maxLength
        self.pattern = pattern
        self.message = message
        self.unit = unit
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.min = try container.decodeIfPresent(Double.self, forKey: .min)
        self.max = try container.decodeIfPresent(Double.self, forKey: .max)
        self.minLength = try container.decodeIfPresent(Double.self, forKey: .minLength)
        self.maxLength = try container.decodeIfPresent(Double.self, forKey: .maxLength)
        self.pattern = try container.decodeIfPresent(String.self, forKey: .pattern)
        self.message = try container.decodeIfPresent(String.self, forKey: .message)
        self.unit = try container.decodeIfPresent(String.self, forKey: .unit)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(min, forKey: .min)
        try container.encodeIfPresent(max, forKey: .max)
        try container.encodeIfPresent(minLength, forKey: .minLength)
        try container.encodeIfPresent(maxLength, forKey: .maxLength)
        try container.encodeIfPresent(pattern, forKey: .pattern)
        try container.encodeIfPresent(message, forKey: .message)
        try container.encodeIfPresent(unit, forKey: .unit)
    }
}

public struct DecisionGate: Codable, Sendable, Equatable {
    public var id: String
    public var title: String
    public var `description`: String?
    public var stageId: String
    public var kind: DecisionGateKind?
    public var trigger: String?
    public var requiredAction: String?
    public var consequence: String?
    public var condition: JSONValue?
    public var blocking: Bool
    public var reviewerRole: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case title = "title"
        case `description` = "description"
        case stageId = "stageId"
        case kind = "kind"
        case trigger = "trigger"
        case requiredAction = "requiredAction"
        case consequence = "consequence"
        case condition = "condition"
        case blocking = "blocking"
        case reviewerRole = "reviewerRole"
    }

    public init(
        id: String,
        title: String,
        `description`: String? = nil,
        stageId: String,
        kind: DecisionGateKind? = nil,
        trigger: String? = nil,
        requiredAction: String? = nil,
        consequence: String? = nil,
        condition: JSONValue? = nil,
        blocking: Bool,
        reviewerRole: String? = nil
    ) {
        self.id = id
        self.title = title
        self.`description` = `description`
        self.stageId = stageId
        self.kind = kind
        self.trigger = trigger
        self.requiredAction = requiredAction
        self.consequence = consequence
        self.condition = condition
        self.blocking = blocking
        self.reviewerRole = reviewerRole
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.title = try container.decode(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.stageId = try container.decode(String.self, forKey: .stageId)
        self.kind = try container.decodeIfPresent(DecisionGateKind.self, forKey: .kind)
        self.trigger = try container.decodeIfPresent(String.self, forKey: .trigger)
        self.requiredAction = try container.decodeIfPresent(String.self, forKey: .requiredAction)
        self.consequence = try container.decodeIfPresent(String.self, forKey: .consequence)
        self.condition = try container.decodeIfPresent(JSONValue.self, forKey: .condition)
        self.blocking = try container.decode(Bool.self, forKey: .blocking)
        self.reviewerRole = try container.decodeIfPresent(String.self, forKey: .reviewerRole)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(stageId, forKey: .stageId)
        try container.encodeIfPresent(kind, forKey: .kind)
        try container.encodeIfPresent(trigger, forKey: .trigger)
        try container.encodeIfPresent(requiredAction, forKey: .requiredAction)
        try container.encodeIfPresent(consequence, forKey: .consequence)
        try container.encodeIfPresent(condition, forKey: .condition)
        try container.encode(blocking, forKey: .blocking)
        try container.encodeIfPresent(reviewerRole, forKey: .reviewerRole)
    }
}

public struct DimensionScore: Codable, Sendable, Equatable {
    public var dimensionId: String
    public var label: String
    public var points: Double
    public var weight: Double
    public var weighted: Double

    enum CodingKeys: String, CodingKey {
        case dimensionId = "dimensionId"
        case label = "label"
        case points = "points"
        case weight = "weight"
        case weighted = "weighted"
    }

    public init(
        dimensionId: String,
        label: String,
        points: Double,
        weight: Double,
        weighted: Double
    ) {
        self.dimensionId = dimensionId
        self.label = label
        self.points = points
        self.weight = weight
        self.weighted = weighted
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.dimensionId = try container.decode(String.self, forKey: .dimensionId)
        self.label = try container.decode(String.self, forKey: .label)
        self.points = try container.decode(Double.self, forKey: .points)
        self.weight = try container.decode(Double.self, forKey: .weight)
        self.weighted = try container.decode(Double.self, forKey: .weighted)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(dimensionId, forKey: .dimensionId)
        try container.encode(label, forKey: .label)
        try container.encode(points, forKey: .points)
        try container.encode(weight, forKey: .weight)
        try container.encode(weighted, forKey: .weighted)
    }
}

public struct ElicitationBatch: Codable, Sendable, Equatable {
    public var id: String
    public var questions: [ElicitationRequest]

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case questions = "questions"
    }

    public init(
        id: String,
        questions: [ElicitationRequest]
    ) {
        self.id = id
        self.questions = questions
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.questions = try container.decode([ElicitationRequest].self, forKey: .questions)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(questions, forKey: .questions)
    }
}

public struct ElicitationBatchResponse: Codable, Sendable, Equatable {
    public var batchId: String
    public var responses: [ElicitationResponse]

    enum CodingKeys: String, CodingKey {
        case batchId = "batchId"
        case responses = "responses"
    }

    public init(
        batchId: String,
        responses: [ElicitationResponse]
    ) {
        self.batchId = batchId
        self.responses = responses
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.batchId = try container.decode(String.self, forKey: .batchId)
        self.responses = try container.decode([ElicitationResponse].self, forKey: .responses)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(batchId, forKey: .batchId)
        try container.encode(responses, forKey: .responses)
    }
}

public struct ElicitationOption: Codable, Sendable, Equatable {
    public var id: String
    public var label: String
    public var `description`: String?
    public var isRecommended: Bool?
    public var preview: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case `description` = "description"
        case isRecommended = "isRecommended"
        case preview = "preview"
    }

    public init(
        id: String,
        label: String,
        `description`: String? = nil,
        isRecommended: Bool? = nil,
        preview: String? = nil
    ) {
        self.id = id
        self.label = label
        self.`description` = `description`
        self.isRecommended = isRecommended
        self.preview = preview
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.label = try container.decode(String.self, forKey: .label)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.isRecommended = try container.decodeIfPresent(Bool.self, forKey: .isRecommended)
        self.preview = try container.decodeIfPresent(String.self, forKey: .preview)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(label, forKey: .label)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(isRecommended, forKey: .isRecommended)
        try container.encodeIfPresent(preview, forKey: .preview)
    }
}

public struct ElicitationRequest: Codable, Sendable, Equatable {
    public var id: String
    public var question: String
    public var header: String?
    public var type: ElicitationQuestionType
    public var options: [ElicitationOption]
    public var contextRationale: String?
    public var allowCustomResponse: Bool?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case question = "question"
        case header = "header"
        case type = "type"
        case options = "options"
        case contextRationale = "contextRationale"
        case allowCustomResponse = "allowCustomResponse"
    }

    public init(
        id: String,
        question: String,
        header: String? = nil,
        type: ElicitationQuestionType,
        options: [ElicitationOption],
        contextRationale: String? = nil,
        allowCustomResponse: Bool? = nil
    ) {
        self.id = id
        self.question = question
        self.header = header
        self.type = type
        self.options = options
        self.contextRationale = contextRationale
        self.allowCustomResponse = allowCustomResponse
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.question = try container.decode(String.self, forKey: .question)
        self.header = try container.decodeIfPresent(String.self, forKey: .header)
        self.type = try container.decode(ElicitationQuestionType.self, forKey: .type)
        self.options = try container.decode([ElicitationOption].self, forKey: .options)
        self.contextRationale = try container.decodeIfPresent(String.self, forKey: .contextRationale)
        self.allowCustomResponse = try container.decodeIfPresent(Bool.self, forKey: .allowCustomResponse)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(question, forKey: .question)
        try container.encodeIfPresent(header, forKey: .header)
        try container.encode(type, forKey: .type)
        try container.encode(options, forKey: .options)
        try container.encodeIfPresent(contextRationale, forKey: .contextRationale)
        try container.encodeIfPresent(allowCustomResponse, forKey: .allowCustomResponse)
    }
}

public struct ElicitationResponse: Codable, Sendable, Equatable {
    public var requestId: String
    public var selectedOptionIds: [String]?
    public var customText: String?
    public var rankings: [String]?

    enum CodingKeys: String, CodingKey {
        case requestId = "requestId"
        case selectedOptionIds = "selectedOptionIds"
        case customText = "customText"
        case rankings = "rankings"
    }

    public init(
        requestId: String,
        selectedOptionIds: [String]? = nil,
        customText: String? = nil,
        rankings: [String]? = nil
    ) {
        self.requestId = requestId
        self.selectedOptionIds = selectedOptionIds
        self.customText = customText
        self.rankings = rankings
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.requestId = try container.decode(String.self, forKey: .requestId)
        self.selectedOptionIds = try container.decodeIfPresent([String].self, forKey: .selectedOptionIds)
        self.customText = try container.decodeIfPresent(String.self, forKey: .customText)
        self.rankings = try container.decodeIfPresent([String].self, forKey: .rankings)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(requestId, forKey: .requestId)
        try container.encodeIfPresent(selectedOptionIds, forKey: .selectedOptionIds)
        try container.encodeIfPresent(customText, forKey: .customText)
        try container.encodeIfPresent(rankings, forKey: .rankings)
    }
}

public enum ExternalPackageDependencyType: String, Codable, Sendable, CaseIterable {
    case npm = "npm"
}

public struct ExternalPackageDependency: Codable, Sendable, Equatable {
    public var type: ExternalPackageDependencyType
    /// NPM package name (e.g. 'bits-ui', '@radix-ui/react-dialog')
    public var packageName: String
    /// Semver range (e.g. '^1.0.0', '^1.1.2')
    public var versionRange: String
    public var isPeerDependency: Bool
    public var importSpecifiers: [String]?

    enum CodingKeys: String, CodingKey {
        case type = "type"
        case packageName = "packageName"
        case versionRange = "versionRange"
        case isPeerDependency = "isPeerDependency"
        case importSpecifiers = "importSpecifiers"
    }

    public init(
        type: ExternalPackageDependencyType,
        packageName: String,
        versionRange: String = "^1.0.0",
        isPeerDependency: Bool = false,
        importSpecifiers: [String]? = nil
    ) {
        self.type = type
        self.packageName = packageName
        self.versionRange = versionRange
        self.isPeerDependency = isPeerDependency
        self.importSpecifiers = importSpecifiers
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.type = try container.decode(ExternalPackageDependencyType.self, forKey: .type)
        self.packageName = try container.decode(String.self, forKey: .packageName)
        self.versionRange = try container.decodeIfPresent(String.self, forKey: .versionRange) ?? "^1.0.0"
        self.isPeerDependency = try container.decodeIfPresent(Bool.self, forKey: .isPeerDependency) ?? false
        self.importSpecifiers = try container.decodeIfPresent([String].self, forKey: .importSpecifiers)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(type, forKey: .type)
        try container.encode(packageName, forKey: .packageName)
        try container.encode(versionRange, forKey: .versionRange)
        try container.encode(isPeerDependency, forKey: .isPeerDependency)
        try container.encodeIfPresent(importSpecifiers, forKey: .importSpecifiers)
    }
}

public enum FormBlockKind: String, Codable, Sendable, CaseIterable {
    case form = "form"
    case clarification = "clarification"
    case question = "question"
}

public struct FormBlock: Codable, Sendable, Equatable {
    public var kind: FormBlockKind
    public var title: String?
    public var `description`: String?
    public var questions: [FormQuestion]?
    public var fields: [FormQuestion]?
    public var submitLabel: String?

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case title = "title"
        case `description` = "description"
        case questions = "questions"
        case fields = "fields"
        case submitLabel = "submitLabel"
    }

    public init(
        kind: FormBlockKind = .form,
        title: String? = nil,
        `description`: String? = nil,
        questions: [FormQuestion]? = nil,
        fields: [FormQuestion]? = nil,
        submitLabel: String? = nil
    ) {
        self.kind = kind
        self.title = title
        self.`description` = `description`
        self.questions = questions
        self.fields = fields
        self.submitLabel = submitLabel
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decodeIfPresent(FormBlockKind.self, forKey: .kind) ?? .form
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.questions = try container.decodeIfPresent([FormQuestion].self, forKey: .questions)
        self.fields = try container.decodeIfPresent([FormQuestion].self, forKey: .fields)
        self.submitLabel = try container.decodeIfPresent(String.self, forKey: .submitLabel)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(questions, forKey: .questions)
        try container.encodeIfPresent(fields, forKey: .fields)
        try container.encodeIfPresent(submitLabel, forKey: .submitLabel)
    }
}

public struct FormChoice: Codable, Sendable, Equatable {
    public var id: String
    public var label: String
    public var `description`: String?
    public var isRecommended: Bool?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case `description` = "description"
        case isRecommended = "isRecommended"
    }

    public init(
        id: String,
        label: String,
        `description`: String? = nil,
        isRecommended: Bool? = nil
    ) {
        self.id = id
        self.label = label
        self.`description` = `description`
        self.isRecommended = isRecommended
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.label = try container.decode(String.self, forKey: .label)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.isRecommended = try container.decodeIfPresent(Bool.self, forKey: .isRecommended)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(label, forKey: .label)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(isRecommended, forKey: .isRecommended)
    }
}

public typealias FormConfig = [String: FormConfigValue]

public typealias FormConfigValue = JSONValue

public struct FormControlComputed: Codable, Sendable, Equatable {
    public var formula: String?

    enum CodingKeys: String, CodingKey {
        case formula = "formula"
    }

    public init(
        formula: String? = nil
    ) {
        self.formula = formula
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.formula = try container.decodeIfPresent(String.self, forKey: .formula)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(formula, forKey: .formula)
    }
}

public struct FormControl: Codable, Sendable, Equatable {
    public var id: String
    public var type: FormControlType
    public var label: String
    public var `description`: String?
    public var helperText: String?
    public var placeholder: String?
    public var examples: [String]?
    public var suggestions: [String]?
    public var required: Bool?
    public var defaultValue: FormDefaultValue?
    public var options: [FormOption]?
    public var dataSource: ReferenceDataSource?
    public var validation: ControlValidation?
    public var pattern: String?
    public var min: Double?
    public var max: Double?
    public var step: Double?
    public var minItems: Double?
    public var maxItems: Double?
    public var formula: String?
    public var computed: FormControlComputed?
    public var visibleWhen: Condition?
    public var condition: Condition?
    public var itemControls: [BaseFormControl]?
    public var controls: [BaseFormControl]?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case type = "type"
        case label = "label"
        case `description` = "description"
        case helperText = "helperText"
        case placeholder = "placeholder"
        case examples = "examples"
        case suggestions = "suggestions"
        case required = "required"
        case defaultValue = "defaultValue"
        case options = "options"
        case dataSource = "dataSource"
        case validation = "validation"
        case pattern = "pattern"
        case min = "min"
        case max = "max"
        case step = "step"
        case minItems = "minItems"
        case maxItems = "maxItems"
        case formula = "formula"
        case computed = "computed"
        case visibleWhen = "visibleWhen"
        case condition = "condition"
        case itemControls = "itemControls"
        case controls = "controls"
    }

    public init(
        id: String,
        type: FormControlType,
        label: String,
        `description`: String? = nil,
        helperText: String? = nil,
        placeholder: String? = nil,
        examples: [String]? = nil,
        suggestions: [String]? = nil,
        required: Bool? = nil,
        defaultValue: FormDefaultValue? = nil,
        options: [FormOption]? = nil,
        dataSource: ReferenceDataSource? = nil,
        validation: ControlValidation? = nil,
        pattern: String? = nil,
        min: Double? = nil,
        max: Double? = nil,
        step: Double? = nil,
        minItems: Double? = nil,
        maxItems: Double? = nil,
        formula: String? = nil,
        computed: FormControlComputed? = nil,
        visibleWhen: Condition? = nil,
        condition: Condition? = nil,
        itemControls: [BaseFormControl]? = nil,
        controls: [BaseFormControl]? = nil
    ) {
        self.id = id
        self.type = type
        self.label = label
        self.`description` = `description`
        self.helperText = helperText
        self.placeholder = placeholder
        self.examples = examples
        self.suggestions = suggestions
        self.required = required
        self.defaultValue = defaultValue
        self.options = options
        self.dataSource = dataSource
        self.validation = validation
        self.pattern = pattern
        self.min = min
        self.max = max
        self.step = step
        self.minItems = minItems
        self.maxItems = maxItems
        self.formula = formula
        self.computed = computed
        self.visibleWhen = visibleWhen
        self.condition = condition
        self.itemControls = itemControls
        self.controls = controls
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.type = try container.decode(FormControlType.self, forKey: .type)
        self.label = try container.decode(String.self, forKey: .label)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.helperText = try container.decodeIfPresent(String.self, forKey: .helperText)
        self.placeholder = try container.decodeIfPresent(String.self, forKey: .placeholder)
        self.examples = try container.decodeIfPresent([String].self, forKey: .examples)
        self.suggestions = try container.decodeIfPresent([String].self, forKey: .suggestions)
        self.required = try container.decodeIfPresent(Bool.self, forKey: .required)
        self.defaultValue = try container.decodeIfPresent(FormDefaultValue.self, forKey: .defaultValue)
        self.options = try container.decodeIfPresent([FormOption].self, forKey: .options)
        self.dataSource = try container.decodeIfPresent(ReferenceDataSource.self, forKey: .dataSource)
        self.validation = try container.decodeIfPresent(ControlValidation.self, forKey: .validation)
        self.pattern = try container.decodeIfPresent(String.self, forKey: .pattern)
        self.min = try container.decodeIfPresent(Double.self, forKey: .min)
        self.max = try container.decodeIfPresent(Double.self, forKey: .max)
        self.step = try container.decodeIfPresent(Double.self, forKey: .step)
        self.minItems = try container.decodeIfPresent(Double.self, forKey: .minItems)
        self.maxItems = try container.decodeIfPresent(Double.self, forKey: .maxItems)
        self.formula = try container.decodeIfPresent(String.self, forKey: .formula)
        self.computed = try container.decodeIfPresent(FormControlComputed.self, forKey: .computed)
        self.visibleWhen = try container.decodeIfPresent(Condition.self, forKey: .visibleWhen)
        self.condition = try container.decodeIfPresent(Condition.self, forKey: .condition)
        self.itemControls = try container.decodeIfPresent([BaseFormControl].self, forKey: .itemControls)
        self.controls = try container.decodeIfPresent([BaseFormControl].self, forKey: .controls)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(type, forKey: .type)
        try container.encode(label, forKey: .label)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(helperText, forKey: .helperText)
        try container.encodeIfPresent(placeholder, forKey: .placeholder)
        try container.encodeIfPresent(examples, forKey: .examples)
        try container.encodeIfPresent(suggestions, forKey: .suggestions)
        try container.encodeIfPresent(required, forKey: .required)
        try container.encodeIfPresent(defaultValue, forKey: .defaultValue)
        try container.encodeIfPresent(options, forKey: .options)
        try container.encodeIfPresent(dataSource, forKey: .dataSource)
        try container.encodeIfPresent(validation, forKey: .validation)
        try container.encodeIfPresent(pattern, forKey: .pattern)
        try container.encodeIfPresent(min, forKey: .min)
        try container.encodeIfPresent(max, forKey: .max)
        try container.encodeIfPresent(step, forKey: .step)
        try container.encodeIfPresent(minItems, forKey: .minItems)
        try container.encodeIfPresent(maxItems, forKey: .maxItems)
        try container.encodeIfPresent(formula, forKey: .formula)
        try container.encodeIfPresent(computed, forKey: .computed)
        try container.encodeIfPresent(visibleWhen, forKey: .visibleWhen)
        try container.encodeIfPresent(condition, forKey: .condition)
        try container.encodeIfPresent(itemControls, forKey: .itemControls)
        try container.encodeIfPresent(controls, forKey: .controls)
    }
}

public typealias FormDefaultValue = JSONValue

public struct FormHandoffAction: Codable, Sendable, Equatable {
    public var id: String?
    public var label: String?
    public var destination: String?
    public var condition: JSONValue?
    public var payloadFields: [String]?
    public var type: String?
    public var config: FormConfig?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case destination = "destination"
        case condition = "condition"
        case payloadFields = "payloadFields"
        case type = "type"
        case config = "config"
    }

    public init(
        id: String? = nil,
        label: String? = nil,
        destination: String? = nil,
        condition: JSONValue? = nil,
        payloadFields: [String]? = nil,
        type: String? = nil,
        config: FormConfig? = nil
    ) {
        self.id = id
        self.label = label
        self.destination = destination
        self.condition = condition
        self.payloadFields = payloadFields
        self.type = type
        self.config = config
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decodeIfPresent(String.self, forKey: .id)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
        self.destination = try container.decodeIfPresent(String.self, forKey: .destination)
        self.condition = try container.decodeIfPresent(JSONValue.self, forKey: .condition)
        self.payloadFields = try container.decodeIfPresent([String].self, forKey: .payloadFields)
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.config = try container.decodeIfPresent(FormConfig.self, forKey: .config)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(id, forKey: .id)
        try container.encodeIfPresent(label, forKey: .label)
        try container.encodeIfPresent(destination, forKey: .destination)
        try container.encodeIfPresent(condition, forKey: .condition)
        try container.encodeIfPresent(payloadFields, forKey: .payloadFields)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(config, forKey: .config)
    }
}

public struct FormOption: Codable, Sendable, Equatable {
    public var label: String
    public var value: String

    enum CodingKeys: String, CodingKey {
        case label = "label"
        case value = "value"
    }

    public init(
        label: String,
        value: String
    ) {
        self.label = label
        self.value = value
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.label = try container.decode(String.self, forKey: .label)
        self.value = try container.decode(String.self, forKey: .value)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(label, forKey: .label)
        try container.encode(value, forKey: .value)
    }
}

public enum FormQuestionType: String, Codable, Sendable, CaseIterable {
    case text = "text"
    case textarea = "textarea"
    case radio = "radio"
    case select = "select"
    case checkbox = "checkbox"
    case rank = "rank"
}

public struct FormQuestion: Codable, Sendable, Equatable {
    public var id: String?
    public var label: String?
    public var question: String?
    public var type: FormQuestionType?
    public var options: [String]?
    public var choices: [FormChoice]?
    public var allowCustom: Bool?
    public var placeholder: String?
    public var required: Bool?
    public var defaultValue: JSONValue?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case question = "question"
        case type = "type"
        case options = "options"
        case choices = "choices"
        case allowCustom = "allowCustom"
        case placeholder = "placeholder"
        case required = "required"
        case defaultValue = "defaultValue"
    }

    public init(
        id: String? = nil,
        label: String? = nil,
        question: String? = nil,
        type: FormQuestionType? = nil,
        options: [String]? = nil,
        choices: [FormChoice]? = nil,
        allowCustom: Bool? = nil,
        placeholder: String? = nil,
        required: Bool? = nil,
        defaultValue: JSONValue? = nil
    ) {
        self.id = id
        self.label = label
        self.question = question
        self.type = type
        self.options = options
        self.choices = choices
        self.allowCustom = allowCustom
        self.placeholder = placeholder
        self.required = required
        self.defaultValue = defaultValue
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decodeIfPresent(String.self, forKey: .id)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
        self.question = try container.decodeIfPresent(String.self, forKey: .question)
        self.type = try container.decodeIfPresent(FormQuestionType.self, forKey: .type)
        self.options = try container.decodeIfPresent([String].self, forKey: .options)
        self.choices = try container.decodeIfPresent([FormChoice].self, forKey: .choices)
        self.allowCustom = try container.decodeIfPresent(Bool.self, forKey: .allowCustom)
        self.placeholder = try container.decodeIfPresent(String.self, forKey: .placeholder)
        self.required = try container.decodeIfPresent(Bool.self, forKey: .required)
        self.defaultValue = try container.decodeIfPresent(JSONValue.self, forKey: .defaultValue)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(id, forKey: .id)
        try container.encodeIfPresent(label, forKey: .label)
        try container.encodeIfPresent(question, forKey: .question)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(options, forKey: .options)
        try container.encodeIfPresent(choices, forKey: .choices)
        try container.encodeIfPresent(allowCustom, forKey: .allowCustom)
        try container.encodeIfPresent(placeholder, forKey: .placeholder)
        try container.encodeIfPresent(required, forKey: .required)
        try container.encodeIfPresent(defaultValue, forKey: .defaultValue)
    }
}

public struct FormReviewMeta: Codable, Sendable, Equatable {
    public var humanReviewRequired: Bool
    public var reviewAreas: [String]

    enum CodingKeys: String, CodingKey {
        case humanReviewRequired = "humanReviewRequired"
        case reviewAreas = "reviewAreas"
    }

    public init(
        humanReviewRequired: Bool,
        reviewAreas: [String]
    ) {
        self.humanReviewRequired = humanReviewRequired
        self.reviewAreas = reviewAreas
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.humanReviewRequired = try container.decode(Bool.self, forKey: .humanReviewRequired)
        self.reviewAreas = try container.decode([String].self, forKey: .reviewAreas)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(humanReviewRequired, forKey: .humanReviewRequired)
        try container.encode(reviewAreas, forKey: .reviewAreas)
    }
}

public struct FormSection: Codable, Sendable, Equatable {
    public var id: String
    public var title: String
    public var `description`: String?
    public var controls: [FormControl]
    public var visibleWhen: Condition?
    public var condition: Condition?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case title = "title"
        case `description` = "description"
        case controls = "controls"
        case visibleWhen = "visibleWhen"
        case condition = "condition"
    }

    public init(
        id: String,
        title: String,
        `description`: String? = nil,
        controls: [FormControl],
        visibleWhen: Condition? = nil,
        condition: Condition? = nil
    ) {
        self.id = id
        self.title = title
        self.`description` = `description`
        self.controls = controls
        self.visibleWhen = visibleWhen
        self.condition = condition
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.title = try container.decode(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.controls = try container.decode([FormControl].self, forKey: .controls)
        self.visibleWhen = try container.decodeIfPresent(Condition.self, forKey: .visibleWhen)
        self.condition = try container.decodeIfPresent(Condition.self, forKey: .condition)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(controls, forKey: .controls)
        try container.encodeIfPresent(visibleWhen, forKey: .visibleWhen)
        try container.encodeIfPresent(condition, forKey: .condition)
    }
}

public struct FormStage: Codable, Sendable, Equatable {
    public var id: String
    public var title: String
    public var `description`: String?
    public var sections: [FormSection]
    public var gate: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case title = "title"
        case `description` = "description"
        case sections = "sections"
        case gate = "gate"
    }

    public init(
        id: String,
        title: String,
        `description`: String? = nil,
        sections: [FormSection],
        gate: String? = nil
    ) {
        self.id = id
        self.title = title
        self.`description` = `description`
        self.sections = sections
        self.gate = gate
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.title = try container.decode(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.sections = try container.decode([FormSection].self, forKey: .sections)
        self.gate = try container.decodeIfPresent(String.self, forKey: .gate)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(sections, forKey: .sections)
        try container.encodeIfPresent(gate, forKey: .gate)
    }
}

public struct FormSubmissionPayload: Codable, Sendable, Equatable {
    public var id: String?
    public var answers: [String: JSONValue]
    public var stageReviews: [JSONValue]?
    public var gateDecisions: [JSONValue]?
    public var submittedAt: String?
    public var score: SubmissionScore?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case answers = "answers"
        case stageReviews = "stageReviews"
        case gateDecisions = "gateDecisions"
        case submittedAt = "submittedAt"
        case score = "score"
    }

    public init(
        id: String? = nil,
        answers: [String: JSONValue],
        stageReviews: [JSONValue]? = nil,
        gateDecisions: [JSONValue]? = nil,
        submittedAt: String? = nil,
        score: SubmissionScore? = nil
    ) {
        self.id = id
        self.answers = answers
        self.stageReviews = stageReviews
        self.gateDecisions = gateDecisions
        self.submittedAt = submittedAt
        self.score = score
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decodeIfPresent(String.self, forKey: .id)
        self.answers = try container.decode([String: JSONValue].self, forKey: .answers)
        self.stageReviews = try container.decodeIfPresent([JSONValue].self, forKey: .stageReviews)
        self.gateDecisions = try container.decodeIfPresent([JSONValue].self, forKey: .gateDecisions)
        self.submittedAt = try container.decodeIfPresent(String.self, forKey: .submittedAt)
        self.score = try container.decodeIfPresent(SubmissionScore.self, forKey: .score)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(id, forKey: .id)
        try container.encode(answers, forKey: .answers)
        try container.encodeIfPresent(stageReviews, forKey: .stageReviews)
        try container.encodeIfPresent(gateDecisions, forKey: .gateDecisions)
        try container.encodeIfPresent(submittedAt, forKey: .submittedAt)
        try container.encodeIfPresent(score, forKey: .score)
    }
}

public struct FormValidator: Codable, Sendable, Equatable {
    public var id: String
    public var `description`: String?
    public var fields: [String]?
    public var severity: String?
    public var type: String?
    public var config: FormConfig?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case `description` = "description"
        case fields = "fields"
        case severity = "severity"
        case type = "type"
        case config = "config"
    }

    public init(
        id: String,
        `description`: String? = nil,
        fields: [String]? = nil,
        severity: String? = nil,
        type: String? = nil,
        config: FormConfig? = nil
    ) {
        self.id = id
        self.`description` = `description`
        self.fields = fields
        self.severity = severity
        self.type = type
        self.config = config
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.fields = try container.decodeIfPresent([String].self, forKey: .fields)
        self.severity = try container.decodeIfPresent(String.self, forKey: .severity)
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.config = try container.decodeIfPresent(FormConfig.self, forKey: .config)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(fields, forKey: .fields)
        try container.encodeIfPresent(severity, forKey: .severity)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(config, forKey: .config)
    }
}

public struct GenerateHarnessOptions: Codable, Sendable, Equatable {
    public var code: String
    public var language: PlatformLanguage
    public var componentName: String
    public var docsProps: [ComponentPropDoc]?

    enum CodingKeys: String, CodingKey {
        case code = "code"
        case language = "language"
        case componentName = "componentName"
        case docsProps = "docsProps"
    }

    public init(
        code: String,
        language: PlatformLanguage,
        componentName: String,
        docsProps: [ComponentPropDoc]? = nil
    ) {
        self.code = code
        self.language = language
        self.componentName = componentName
        self.docsProps = docsProps
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.code = try container.decode(String.self, forKey: .code)
        self.language = try container.decode(PlatformLanguage.self, forKey: .language)
        self.componentName = try container.decode(String.self, forKey: .componentName)
        self.docsProps = try container.decodeIfPresent([ComponentPropDoc].self, forKey: .docsProps)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(code, forKey: .code)
        try container.encode(language, forKey: .language)
        try container.encode(componentName, forKey: .componentName)
        try container.encodeIfPresent(docsProps, forKey: .docsProps)
    }
}

public struct IngestionInput: Codable, Sendable, Equatable {
    /// Raw code bundle provided
    public var codeBundle: String
    /// Optional raw CSS or CSS bundle to extract and inline
    public var css: String?
    /// Slug or Name of UI Component Type (e.g., 'button')
    public var componentTypeId: String
    /// Mandatory Variant Name text input (e.g., 'Glass Action Button')
    public var variantName: String
    /// Optional custom slug or ID for variant
    public var variantId: String?
    /// Dropdown value for aesthetic style (e.g., 'glassmorphism', 'neubrutalism', 'minimalist', 'modern', 'shadcn')
    public var aestheticId: String?
    /// Optional recommended theme ID
    public var recommendedThemeId: String?
    /// Optional display name if creating new component type
    public var componentTypeName: String?
    /// Optional description if creating new component type
    public var componentTypeDescription: String?
    /// Optional description if creating new variant
    public var variantDescription: String?
    /// Optional display name for aesthetic
    public var aestheticName: String?
    /// Optional description if creating new aesthetic
    public var aestheticDescription: String?
    /// Optional source platform - detected automatically if omitted
    public var sourcePlatform: PlatformLanguage?
    public var changelogNote: String?
    public var tags: [String]?

    enum CodingKeys: String, CodingKey {
        case codeBundle = "codeBundle"
        case css = "css"
        case componentTypeId = "componentTypeId"
        case variantName = "variantName"
        case variantId = "variantId"
        case aestheticId = "aestheticId"
        case recommendedThemeId = "recommendedThemeId"
        case componentTypeName = "componentTypeName"
        case componentTypeDescription = "componentTypeDescription"
        case variantDescription = "variantDescription"
        case aestheticName = "aestheticName"
        case aestheticDescription = "aestheticDescription"
        case sourcePlatform = "sourcePlatform"
        case changelogNote = "changelogNote"
        case tags = "tags"
    }

    public init(
        codeBundle: String,
        css: String? = nil,
        componentTypeId: String,
        variantName: String,
        variantId: String? = nil,
        aestheticId: String? = nil,
        recommendedThemeId: String? = nil,
        componentTypeName: String? = nil,
        componentTypeDescription: String? = nil,
        variantDescription: String? = nil,
        aestheticName: String? = nil,
        aestheticDescription: String? = nil,
        sourcePlatform: PlatformLanguage? = nil,
        changelogNote: String? = nil,
        tags: [String]? = nil
    ) {
        self.codeBundle = codeBundle
        self.css = css
        self.componentTypeId = componentTypeId
        self.variantName = variantName
        self.variantId = variantId
        self.aestheticId = aestheticId
        self.recommendedThemeId = recommendedThemeId
        self.componentTypeName = componentTypeName
        self.componentTypeDescription = componentTypeDescription
        self.variantDescription = variantDescription
        self.aestheticName = aestheticName
        self.aestheticDescription = aestheticDescription
        self.sourcePlatform = sourcePlatform
        self.changelogNote = changelogNote
        self.tags = tags
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.codeBundle = try container.decode(String.self, forKey: .codeBundle)
        self.css = try container.decodeIfPresent(String.self, forKey: .css)
        self.componentTypeId = try container.decode(String.self, forKey: .componentTypeId)
        self.variantName = try container.decode(String.self, forKey: .variantName)
        self.variantId = try container.decodeIfPresent(String.self, forKey: .variantId)
        self.aestheticId = try container.decodeIfPresent(String.self, forKey: .aestheticId)
        self.recommendedThemeId = try container.decodeIfPresent(String.self, forKey: .recommendedThemeId)
        self.componentTypeName = try container.decodeIfPresent(String.self, forKey: .componentTypeName)
        self.componentTypeDescription = try container.decodeIfPresent(String.self, forKey: .componentTypeDescription)
        self.variantDescription = try container.decodeIfPresent(String.self, forKey: .variantDescription)
        self.aestheticName = try container.decodeIfPresent(String.self, forKey: .aestheticName)
        self.aestheticDescription = try container.decodeIfPresent(String.self, forKey: .aestheticDescription)
        self.sourcePlatform = try container.decodeIfPresent(PlatformLanguage.self, forKey: .sourcePlatform)
        self.changelogNote = try container.decodeIfPresent(String.self, forKey: .changelogNote)
        self.tags = try container.decodeIfPresent([String].self, forKey: .tags)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(codeBundle, forKey: .codeBundle)
        try container.encodeIfPresent(css, forKey: .css)
        try container.encode(componentTypeId, forKey: .componentTypeId)
        try container.encode(variantName, forKey: .variantName)
        try container.encodeIfPresent(variantId, forKey: .variantId)
        try container.encodeIfPresent(aestheticId, forKey: .aestheticId)
        try container.encodeIfPresent(recommendedThemeId, forKey: .recommendedThemeId)
        try container.encodeIfPresent(componentTypeName, forKey: .componentTypeName)
        try container.encodeIfPresent(componentTypeDescription, forKey: .componentTypeDescription)
        try container.encodeIfPresent(variantDescription, forKey: .variantDescription)
        try container.encodeIfPresent(aestheticName, forKey: .aestheticName)
        try container.encodeIfPresent(aestheticDescription, forKey: .aestheticDescription)
        try container.encodeIfPresent(sourcePlatform, forKey: .sourcePlatform)
        try container.encodeIfPresent(changelogNote, forKey: .changelogNote)
        try container.encodeIfPresent(tags, forKey: .tags)
    }
}

public enum InternalComponentDependencyType: String, Codable, Sendable, CaseIterable {
    case surreal = "surreal"
}

public struct InternalComponentDependency: Codable, Sendable, Equatable {
    public var type: InternalComponentDependencyType
    /// Slug of target component type (e.g. 'button')
    public var componentTypeId: String
    /// Aesthetic style ID (e.g. 'glassmorphism')
    public var aestheticId: String?
    /// Variant ID (e.g. 'glass-action-button')
    public var variantId: String?
    /// Semver range required
    public var versionRange: String
    /// Local identifier name (e.g. 'Button')
    public var importedAs: String

    enum CodingKeys: String, CodingKey {
        case type = "type"
        case componentTypeId = "componentTypeId"
        case aestheticId = "aestheticId"
        case variantId = "variantId"
        case versionRange = "versionRange"
        case importedAs = "importedAs"
    }

    public init(
        type: InternalComponentDependencyType,
        componentTypeId: String,
        aestheticId: String? = nil,
        variantId: String? = nil,
        versionRange: String = "^1.0.0",
        importedAs: String
    ) {
        self.type = type
        self.componentTypeId = componentTypeId
        self.aestheticId = aestheticId
        self.variantId = variantId
        self.versionRange = versionRange
        self.importedAs = importedAs
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.type = try container.decode(InternalComponentDependencyType.self, forKey: .type)
        self.componentTypeId = try container.decode(String.self, forKey: .componentTypeId)
        self.aestheticId = try container.decodeIfPresent(String.self, forKey: .aestheticId)
        self.variantId = try container.decodeIfPresent(String.self, forKey: .variantId)
        self.versionRange = try container.decodeIfPresent(String.self, forKey: .versionRange) ?? "^1.0.0"
        self.importedAs = try container.decode(String.self, forKey: .importedAs)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(type, forKey: .type)
        try container.encode(componentTypeId, forKey: .componentTypeId)
        try container.encodeIfPresent(aestheticId, forKey: .aestheticId)
        try container.encodeIfPresent(variantId, forKey: .variantId)
        try container.encode(versionRange, forKey: .versionRange)
        try container.encode(importedAs, forKey: .importedAs)
    }
}

/// A JSON Schema (draft 2020-12 or 7) as a JSON object, e.g. { type: 'object', properties: { … } }
public typealias JsonSchemaDocument = [String: JsonValue]

/// Any JSON value.
public typealias JsonValue = JSONValue

/// Palette color tokens for adaptive theming
public struct KineticBlueprintPalette: Codable, Sendable, Equatable {
    /// Canvas background color (default transparent)
    public var canvasBg: String?
    /// Main body / subject color
    public var chassis: String?
    /// Primary stroke color
    public var stroke: String?
    /// Primary accent color
    public var accent1: String?
    /// Secondary accent color
    public var accent2: String?
    /// Shadow color with opacity
    public var shadow: String?
    /// Additional custom CSS color variables
    public var custom: [String: String]?

    enum CodingKeys: String, CodingKey {
        case canvasBg = "canvasBg"
        case chassis = "chassis"
        case stroke = "stroke"
        case accent1 = "accent1"
        case accent2 = "accent2"
        case shadow = "shadow"
        case custom = "custom"
    }

    public init(
        canvasBg: String? = nil,
        chassis: String? = nil,
        stroke: String? = nil,
        accent1: String? = nil,
        accent2: String? = nil,
        shadow: String? = nil,
        custom: [String: String]? = nil
    ) {
        self.canvasBg = canvasBg
        self.chassis = chassis
        self.stroke = stroke
        self.accent1 = accent1
        self.accent2 = accent2
        self.shadow = shadow
        self.custom = custom
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.canvasBg = try container.decodeIfPresent(String.self, forKey: .canvasBg)
        self.chassis = try container.decodeIfPresent(String.self, forKey: .chassis)
        self.stroke = try container.decodeIfPresent(String.self, forKey: .stroke)
        self.accent1 = try container.decodeIfPresent(String.self, forKey: .accent1)
        self.accent2 = try container.decodeIfPresent(String.self, forKey: .accent2)
        self.shadow = try container.decodeIfPresent(String.self, forKey: .shadow)
        self.custom = try container.decodeIfPresent([String: String].self, forKey: .custom)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(canvasBg, forKey: .canvasBg)
        try container.encodeIfPresent(chassis, forKey: .chassis)
        try container.encodeIfPresent(stroke, forKey: .stroke)
        try container.encodeIfPresent(accent1, forKey: .accent1)
        try container.encodeIfPresent(accent2, forKey: .accent2)
        try container.encodeIfPresent(shadow, forKey: .shadow)
        try container.encodeIfPresent(custom, forKey: .custom)
    }
}

public struct KineticBlueprint: Codable, Sendable, Equatable {
    /// Title of the kinetic illustration
    public var title: String?
    /// Harmonic time base loop duration in milliseconds (e.g. 2400, 3600, 4800)
    public var loopDurationMs: Double
    /// Motion personality (e.g. bouncy, snappy, smooth, mechanical, organic)
    public var motionPersonality: String
    /// Visual style archetype derived from references or prompt
    public var styleArchetype: SvgStyleArchetype?
    /// Palette color tokens for adaptive theming
    public var palette: KineticBlueprintPalette
    /// Primary anchor animation cycle (e.g. idle breathing, floating, or rotating cycle)
    public var primaryAnchor: String
    /// Secondary mechanics (e.g. conveyors, gears, fluid flow)
    public var secondaryMechanics: [String]?
    /// Event actions (e.g. droplets, sparks, pulses with delays)
    public var eventActions: [String]?
    /// Ambient particles drifting with staggered offsets
    public var ambientParticles: [String]?

    enum CodingKeys: String, CodingKey {
        case title = "title"
        case loopDurationMs = "loopDurationMs"
        case motionPersonality = "motionPersonality"
        case styleArchetype = "styleArchetype"
        case palette = "palette"
        case primaryAnchor = "primaryAnchor"
        case secondaryMechanics = "secondaryMechanics"
        case eventActions = "eventActions"
        case ambientParticles = "ambientParticles"
    }

    public init(
        title: String? = nil,
        loopDurationMs: Double,
        motionPersonality: String,
        styleArchetype: SvgStyleArchetype? = nil,
        palette: KineticBlueprintPalette,
        primaryAnchor: String,
        secondaryMechanics: [String]? = nil,
        eventActions: [String]? = nil,
        ambientParticles: [String]? = nil
    ) {
        self.title = title
        self.loopDurationMs = loopDurationMs
        self.motionPersonality = motionPersonality
        self.styleArchetype = styleArchetype
        self.palette = palette
        self.primaryAnchor = primaryAnchor
        self.secondaryMechanics = secondaryMechanics
        self.eventActions = eventActions
        self.ambientParticles = ambientParticles
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.loopDurationMs = try container.decode(Double.self, forKey: .loopDurationMs)
        self.motionPersonality = try container.decode(String.self, forKey: .motionPersonality)
        self.styleArchetype = try container.decodeIfPresent(SvgStyleArchetype.self, forKey: .styleArchetype)
        self.palette = try container.decode(KineticBlueprintPalette.self, forKey: .palette)
        self.primaryAnchor = try container.decode(String.self, forKey: .primaryAnchor)
        self.secondaryMechanics = try container.decodeIfPresent([String].self, forKey: .secondaryMechanics)
        self.eventActions = try container.decodeIfPresent([String].self, forKey: .eventActions)
        self.ambientParticles = try container.decodeIfPresent([String].self, forKey: .ambientParticles)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encode(loopDurationMs, forKey: .loopDurationMs)
        try container.encode(motionPersonality, forKey: .motionPersonality)
        try container.encodeIfPresent(styleArchetype, forKey: .styleArchetype)
        try container.encode(palette, forKey: .palette)
        try container.encode(primaryAnchor, forKey: .primaryAnchor)
        try container.encodeIfPresent(secondaryMechanics, forKey: .secondaryMechanics)
        try container.encodeIfPresent(eventActions, forKey: .eventActions)
        try container.encodeIfPresent(ambientParticles, forKey: .ambientParticles)
    }
}

public struct LookCheck: Codable, Sendable, Equatable {
    /// Check id, e.g. 'contrast', 'hit-target', 'reduced-motion', 'axe'
    public var id: String
    public var status: LookStatus
    public var message: String
    /// What it's about: a CSS selector, a prop, or an element description
    public var target: String?
    /// The aesthetic rule it enforces, if any
    public var ruleId: String?
    /// Index into LookResult.pictures
    public var picture: Int?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case status = "status"
        case message = "message"
        case target = "target"
        case ruleId = "ruleId"
        case picture = "picture"
    }

    public init(
        id: String,
        status: LookStatus,
        message: String,
        target: String? = nil,
        ruleId: String? = nil,
        picture: Int? = nil
    ) {
        self.id = id
        self.status = status
        self.message = message
        self.target = target
        self.ruleId = ruleId
        self.picture = picture
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.status = try container.decode(LookStatus.self, forKey: .status)
        self.message = try container.decode(String.self, forKey: .message)
        self.target = try container.decodeIfPresent(String.self, forKey: .target)
        self.ruleId = try container.decodeIfPresent(String.self, forKey: .ruleId)
        self.picture = try container.decodeIfPresent(Int.self, forKey: .picture)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(status, forKey: .status)
        try container.encode(message, forKey: .message)
        try container.encodeIfPresent(target, forKey: .target)
        try container.encodeIfPresent(ruleId, forKey: .ruleId)
        try container.encodeIfPresent(picture, forKey: .picture)
    }
}

public struct LookFinding: Codable, Sendable, Equatable {
    /// What a look (vision) check saw
    public var text: String
    public var severity: LookStatus
    /// The aesthetic rule it relates to
    public var ruleId: String?
    /// The aesthetic reference it relates to
    public var referenceId: String?
    public var picture: Int?

    enum CodingKeys: String, CodingKey {
        case text = "text"
        case severity = "severity"
        case ruleId = "ruleId"
        case referenceId = "referenceId"
        case picture = "picture"
    }

    public init(
        text: String,
        severity: LookStatus = .warn,
        ruleId: String? = nil,
        referenceId: String? = nil,
        picture: Int? = nil
    ) {
        self.text = text
        self.severity = severity
        self.ruleId = ruleId
        self.referenceId = referenceId
        self.picture = picture
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.text = try container.decode(String.self, forKey: .text)
        self.severity = try container.decodeIfPresent(LookStatus.self, forKey: .severity) ?? .warn
        self.ruleId = try container.decodeIfPresent(String.self, forKey: .ruleId)
        self.referenceId = try container.decodeIfPresent(String.self, forKey: .referenceId)
        self.picture = try container.decodeIfPresent(Int.self, forKey: .picture)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(text, forKey: .text)
        try container.encode(severity, forKey: .severity)
        try container.encodeIfPresent(ruleId, forKey: .ruleId)
        try container.encodeIfPresent(referenceId, forKey: .referenceId)
        try container.encodeIfPresent(picture, forKey: .picture)
    }
}

public struct LookResult: Codable, Sendable, Equatable {
    public var pictures: [PictureRef]
    public var checks: [LookCheck]
    public var findings: [LookFinding]
    /// Overall, from a look check; 1 is a perfect match to the aesthetic
    public var score: Double?
    public var aesthetic: UiAestheticRef?

    enum CodingKeys: String, CodingKey {
        case pictures = "pictures"
        case checks = "checks"
        case findings = "findings"
        case score = "score"
        case aesthetic = "aesthetic"
    }

    public init(
        pictures: [PictureRef] = [],
        checks: [LookCheck] = [],
        findings: [LookFinding] = [],
        score: Double? = nil,
        aesthetic: UiAestheticRef? = nil
    ) {
        self.pictures = pictures
        self.checks = checks
        self.findings = findings
        self.score = score
        self.aesthetic = aesthetic
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.pictures = try container.decodeIfPresent([PictureRef].self, forKey: .pictures) ?? []
        self.checks = try container.decodeIfPresent([LookCheck].self, forKey: .checks) ?? []
        self.findings = try container.decodeIfPresent([LookFinding].self, forKey: .findings) ?? []
        self.score = try container.decodeIfPresent(Double.self, forKey: .score)
        self.aesthetic = try container.decodeIfPresent(UiAestheticRef.self, forKey: .aesthetic)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(pictures, forKey: .pictures)
        try container.encode(checks, forKey: .checks)
        try container.encode(findings, forKey: .findings)
        try container.encodeIfPresent(score, forKey: .score)
        try container.encodeIfPresent(aesthetic, forKey: .aesthetic)
    }
}

public typealias NodeDiagramBlock = TreeBlock

public typealias OrgChartBlock = TreeBlock

public typealias OrgChartPerson = TreeNode

public typealias OrgChartReport = TreeEdge

public enum PageControlKind: String, Codable, Sendable, CaseIterable {
    case range = "range"
    case select = "select"
    case toggle = "toggle"
    case text = "text"
    case button = "button"
}

public struct PageControlOptionsItem: Codable, Sendable, Equatable {
    public var value: String
    public var label: String

    enum CodingKeys: String, CodingKey {
        case value = "value"
        case label = "label"
    }

    public init(
        value: String,
        label: String
    ) {
        self.value = value
        self.label = label
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.value = try container.decode(String.self, forKey: .value)
        self.label = try container.decode(String.self, forKey: .label)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(value, forKey: .value)
        try container.encode(label, forKey: .label)
    }
}

public struct PageControl: Codable, Sendable, Equatable {
    public var id: String
    public var label: String
    public var kind: PageControlKind
    public var value: JSONValue?
    public var options: [PageControlOptionsItem]?
    public var min: Double?
    public var max: Double?
    public var step: Double?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case kind = "kind"
        case value = "value"
        case options = "options"
        case min = "min"
        case max = "max"
        case step = "step"
    }

    public init(
        id: String,
        label: String,
        kind: PageControlKind,
        value: JSONValue? = nil,
        options: [PageControlOptionsItem]? = nil,
        min: Double? = nil,
        max: Double? = nil,
        step: Double? = nil
    ) {
        self.id = id
        self.label = label
        self.kind = kind
        self.value = value
        self.options = options
        self.min = min
        self.max = max
        self.step = step
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.label = try container.decode(String.self, forKey: .label)
        self.kind = try container.decode(PageControlKind.self, forKey: .kind)
        self.value = try container.decodeIfPresent(JSONValue.self, forKey: .value)
        self.options = try container.decodeIfPresent([PageControlOptionsItem].self, forKey: .options)
        self.min = try container.decodeIfPresent(Double.self, forKey: .min)
        self.max = try container.decodeIfPresent(Double.self, forKey: .max)
        self.step = try container.decodeIfPresent(Double.self, forKey: .step)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(label, forKey: .label)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(value, forKey: .value)
        try container.encodeIfPresent(options, forKey: .options)
        try container.encodeIfPresent(min, forKey: .min)
        try container.encodeIfPresent(max, forKey: .max)
        try container.encodeIfPresent(step, forKey: .step)
    }
}

public struct PageMarks: Codable, Sendable, Equatable {
    /// Canvas and SVG layers inside the data-picture container
    public var pictureLayers: Int
    public var controls: [PageControl]
    /// Plain-text description from data-about
    public var about: String?
    public var motion: PageMotionInfo?

    enum CodingKeys: String, CodingKey {
        case pictureLayers = "pictureLayers"
        case controls = "controls"
        case about = "about"
        case motion = "motion"
    }

    public init(
        pictureLayers: Int,
        controls: [PageControl] = [],
        about: String? = nil,
        motion: PageMotionInfo? = nil
    ) {
        self.pictureLayers = pictureLayers
        self.controls = controls
        self.about = about
        self.motion = motion
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.pictureLayers = try container.decode(Int.self, forKey: .pictureLayers)
        self.controls = try container.decodeIfPresent([PageControl].self, forKey: .controls) ?? []
        self.about = try container.decodeIfPresent(String.self, forKey: .about)
        self.motion = try container.decodeIfPresent(PageMotionInfo.self, forKey: .motion)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(pictureLayers, forKey: .pictureLayers)
        try container.encode(controls, forKey: .controls)
        try container.encodeIfPresent(about, forKey: .about)
        try container.encodeIfPresent(motion, forKey: .motion)
    }
}

public typealias PageMessage = JSONValue

public struct PageMotionInfo: Codable, Sendable, Equatable {
    /// The window property holding the motion object, e.g. 'diagramMotion'
    public var global: String
    /// Length of play() in milliseconds
    public var duration: Double

    enum CodingKeys: String, CodingKey {
        case global = "global"
        case duration = "duration"
    }

    public init(
        global: String,
        duration: Double
    ) {
        self.global = global
        self.duration = duration
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.global = try container.decode(String.self, forKey: .global)
        self.duration = try container.decode(Double.self, forKey: .duration)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(global, forKey: .global)
        try container.encode(duration, forKey: .duration)
    }
}

public struct PictureRef: Codable, Sendable, Equatable {
    /// URL, data URI or storage path of the image
    public var ref: String
    public var width: Int
    public var height: Int
    public var theme: PageThemeMode
    public var at: Double
    public var hover: String?

    enum CodingKeys: String, CodingKey {
        case ref = "ref"
        case width = "width"
        case height = "height"
        case theme = "theme"
        case at = "at"
        case hover = "hover"
    }

    public init(
        ref: String,
        width: Int,
        height: Int,
        theme: PageThemeMode,
        at: Double = 1,
        hover: String? = nil
    ) {
        self.ref = ref
        self.width = width
        self.height = height
        self.theme = theme
        self.at = at
        self.hover = hover
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.ref = try container.decode(String.self, forKey: .ref)
        self.width = try container.decode(Int.self, forKey: .width)
        self.height = try container.decode(Int.self, forKey: .height)
        self.theme = try container.decode(PageThemeMode.self, forKey: .theme)
        self.at = try container.decodeIfPresent(Double.self, forKey: .at) ?? 1
        self.hover = try container.decodeIfPresent(String.self, forKey: .hover)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(ref, forKey: .ref)
        try container.encode(width, forKey: .width)
        try container.encode(height, forKey: .height)
        try container.encode(theme, forKey: .theme)
        try container.encode(at, forKey: .at)
        try container.encodeIfPresent(hover, forKey: .hover)
    }
}

public enum PictureRequestFormat: String, Codable, Sendable, CaseIterable {
    case png = "png"
    case jpeg = "jpeg"
}

public struct PictureRequest: Codable, Sendable, Equatable {
    /// CSS px
    public var widths: [Int]
    /// CSS px; absent means the content's height
    public var height: Int?
    public var themes: [PageThemeMode]
    /// Motion progress values; 1 is at rest
    public var at: [Double]
    /// CSS selector of an element to hover before each picture
    public var hover: String?
    /// Device pixel ratio
    public var scale: Double
    public var format: PictureRequestFormat

    enum CodingKeys: String, CodingKey {
        case widths = "widths"
        case height = "height"
        case themes = "themes"
        case at = "at"
        case hover = "hover"
        case scale = "scale"
        case format = "format"
    }

    public init(
        widths: [Int] = SchemaDefault.decode([Int].self, json: "[1200]"),
        height: Int? = nil,
        themes: [PageThemeMode] = SchemaDefault.decode([PageThemeMode].self, json: "[\"light\",\"dark\"]"),
        at: [Double] = SchemaDefault.decode([Double].self, json: "[1]"),
        hover: String? = nil,
        scale: Double = 1,
        format: PictureRequestFormat = .png
    ) {
        self.widths = widths
        self.height = height
        self.themes = themes
        self.at = at
        self.hover = hover
        self.scale = scale
        self.format = format
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.widths = try container.decodeIfPresent([Int].self, forKey: .widths) ?? SchemaDefault.decode([Int].self, json: "[1200]")
        self.height = try container.decodeIfPresent(Int.self, forKey: .height)
        self.themes = try container.decodeIfPresent([PageThemeMode].self, forKey: .themes) ?? SchemaDefault.decode([PageThemeMode].self, json: "[\"light\",\"dark\"]")
        self.at = try container.decodeIfPresent([Double].self, forKey: .at) ?? SchemaDefault.decode([Double].self, json: "[1]")
        self.hover = try container.decodeIfPresent(String.self, forKey: .hover)
        self.scale = try container.decodeIfPresent(Double.self, forKey: .scale) ?? 1
        self.format = try container.decodeIfPresent(PictureRequestFormat.self, forKey: .format) ?? .png
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(widths, forKey: .widths)
        try container.encodeIfPresent(height, forKey: .height)
        try container.encode(themes, forKey: .themes)
        try container.encode(at, forKey: .at)
        try container.encodeIfPresent(hover, forKey: .hover)
        try container.encode(scale, forKey: .scale)
        try container.encode(format, forKey: .format)
    }
}

public struct PreviewHarness: Codable, Sendable, Equatable {
    /// Complete, runnable preview driver code harness demonstrating usage of the component with snippets/children or mock props
    public var driverCode: String
    /// JSON map of realistic mock prop values passed to the component
    public var mockProps: [String: JSONValue]
    /// Tailwind CSS class string for wrapping the preview container
    public var wrapperClass: String?

    enum CodingKeys: String, CodingKey {
        case driverCode = "driverCode"
        case mockProps = "mockProps"
        case wrapperClass = "wrapperClass"
    }

    public init(
        driverCode: String,
        mockProps: [String: JSONValue],
        wrapperClass: String? = nil
    ) {
        self.driverCode = driverCode
        self.mockProps = mockProps
        self.wrapperClass = wrapperClass
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.driverCode = try container.decode(String.self, forKey: .driverCode)
        self.mockProps = try container.decode([String: JSONValue].self, forKey: .mockProps)
        self.wrapperClass = try container.decodeIfPresent(String.self, forKey: .wrapperClass)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(driverCode, forKey: .driverCode)
        try container.encode(mockProps, forKey: .mockProps)
        try container.encodeIfPresent(wrapperClass, forKey: .wrapperClass)
    }
}

public enum ProposalItemPriority: String, Codable, Sendable, CaseIterable {
    case low = "low"
    case medium = "medium"
    case high = "high"
    case urgent = "urgent"
}

public struct ProposalItem: Codable, Sendable, Equatable {
    public var id: String?
    public var title: String
    public var `description`: String
    public var rationale: String?
    public var status: String?
    public var priority: ProposalItemPriority?
    public var estimatedHours: Double?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case title = "title"
        case `description` = "description"
        case rationale = "rationale"
        case status = "status"
        case priority = "priority"
        case estimatedHours = "estimatedHours"
    }

    public init(
        id: String? = nil,
        title: String,
        `description`: String,
        rationale: String? = nil,
        status: String? = nil,
        priority: ProposalItemPriority? = nil,
        estimatedHours: Double? = nil
    ) {
        self.id = id
        self.title = title
        self.`description` = `description`
        self.rationale = rationale
        self.status = status
        self.priority = priority
        self.estimatedHours = estimatedHours
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decodeIfPresent(String.self, forKey: .id)
        self.title = try container.decode(String.self, forKey: .title)
        self.`description` = try container.decode(String.self, forKey: .`description`)
        self.rationale = try container.decodeIfPresent(String.self, forKey: .rationale)
        self.status = try container.decodeIfPresent(String.self, forKey: .status)
        self.priority = try container.decodeIfPresent(ProposalItemPriority.self, forKey: .priority)
        self.estimatedHours = try container.decodeIfPresent(Double.self, forKey: .estimatedHours)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(id, forKey: .id)
        try container.encode(title, forKey: .title)
        try container.encode(`description`, forKey: .`description`)
        try container.encodeIfPresent(rationale, forKey: .rationale)
        try container.encodeIfPresent(status, forKey: .status)
        try container.encodeIfPresent(priority, forKey: .priority)
        try container.encodeIfPresent(estimatedHours, forKey: .estimatedHours)
    }
}

public enum ProposalsBlockKind: String, Codable, Sendable, CaseIterable {
    case proposals = "proposals"
    case followup = "followup"
    case followUp = "follow-up"
}

public struct ProposalsBlock: Codable, Sendable, Equatable {
    public var kind: ProposalsBlockKind
    public var title: String?
    public var `description`: String?
    public var items: [ProposalItem]

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case title = "title"
        case `description` = "description"
        case items = "items"
    }

    public init(
        kind: ProposalsBlockKind = .proposals,
        title: String? = nil,
        `description`: String? = nil,
        items: [ProposalItem]
    ) {
        self.kind = kind
        self.title = title
        self.`description` = `description`
        self.items = items
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decodeIfPresent(ProposalsBlockKind.self, forKey: .kind) ?? .proposals
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.items = try container.decode([ProposalItem].self, forKey: .items)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(items, forKey: .items)
    }
}

public struct ScoreBand: Codable, Sendable, Equatable {
    public var id: String
    public var label: String
    public var min: Double
    public var max: Double?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case min = "min"
        case max = "max"
    }

    public init(
        id: String,
        label: String,
        min: Double,
        max: Double? = nil
    ) {
        self.id = id
        self.label = label
        self.min = min
        self.max = max
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.label = try container.decode(String.self, forKey: .label)
        self.min = try container.decode(Double.self, forKey: .min)
        self.max = try container.decodeIfPresent(Double.self, forKey: .max)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(label, forKey: .label)
        try container.encode(min, forKey: .min)
        try container.encodeIfPresent(max, forKey: .max)
    }
}

public struct ScoringConfig: Codable, Sendable, Equatable {
    public var `description`: String?
    public var dimensions: [ScoringDimension]
    public var bands: [ScoreBand]?

    enum CodingKeys: String, CodingKey {
        case `description` = "description"
        case dimensions = "dimensions"
        case bands = "bands"
    }

    public init(
        `description`: String? = nil,
        dimensions: [ScoringDimension],
        bands: [ScoreBand]? = nil
    ) {
        self.`description` = `description`
        self.dimensions = dimensions
        self.bands = bands
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.dimensions = try container.decode([ScoringDimension].self, forKey: .dimensions)
        self.bands = try container.decodeIfPresent([ScoreBand].self, forKey: .bands)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(dimensions, forKey: .dimensions)
        try container.encodeIfPresent(bands, forKey: .bands)
    }
}

public struct ScoringDimension: Codable, Sendable, Equatable {
    public var id: String
    public var label: String
    public var `description`: String?
    public var weight: Double?
    public var rules: [ScoringRule]

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case `description` = "description"
        case weight = "weight"
        case rules = "rules"
    }

    public init(
        id: String,
        label: String,
        `description`: String? = nil,
        weight: Double? = nil,
        rules: [ScoringRule]
    ) {
        self.id = id
        self.label = label
        self.`description` = `description`
        self.weight = weight
        self.rules = rules
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.label = try container.decode(String.self, forKey: .label)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.weight = try container.decodeIfPresent(Double.self, forKey: .weight)
        self.rules = try container.decode([ScoringRule].self, forKey: .rules)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(label, forKey: .label)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(weight, forKey: .weight)
        try container.encode(rules, forKey: .rules)
    }
}

public struct ScoringRuleRangesItem: Codable, Sendable, Equatable {
    public var min: Double?
    public var max: Double?
    public var points: Double

    enum CodingKeys: String, CodingKey {
        case min = "min"
        case max = "max"
        case points = "points"
    }

    public init(
        min: Double? = nil,
        max: Double? = nil,
        points: Double
    ) {
        self.min = min
        self.max = max
        self.points = points
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.min = try container.decodeIfPresent(Double.self, forKey: .min)
        self.max = try container.decodeIfPresent(Double.self, forKey: .max)
        self.points = try container.decode(Double.self, forKey: .points)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(min, forKey: .min)
        try container.encodeIfPresent(max, forKey: .max)
        try container.encode(points, forKey: .points)
    }
}

public struct ScoringRule: Codable, Sendable, Equatable {
    public var field: String
    public var optionPoints: [String: Double]?
    public var ranges: [ScoringRuleRangesItem]?
    public var multiplier: Double?
    public var truePoints: Double?
    public var falsePoints: Double?

    enum CodingKeys: String, CodingKey {
        case field = "field"
        case optionPoints = "optionPoints"
        case ranges = "ranges"
        case multiplier = "multiplier"
        case truePoints = "truePoints"
        case falsePoints = "falsePoints"
    }

    public init(
        field: String,
        optionPoints: [String: Double]? = nil,
        ranges: [ScoringRuleRangesItem]? = nil,
        multiplier: Double? = nil,
        truePoints: Double? = nil,
        falsePoints: Double? = nil
    ) {
        self.field = field
        self.optionPoints = optionPoints
        self.ranges = ranges
        self.multiplier = multiplier
        self.truePoints = truePoints
        self.falsePoints = falsePoints
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.field = try container.decode(String.self, forKey: .field)
        self.optionPoints = try container.decodeIfPresent([String: Double].self, forKey: .optionPoints)
        self.ranges = try container.decodeIfPresent([ScoringRuleRangesItem].self, forKey: .ranges)
        self.multiplier = try container.decodeIfPresent(Double.self, forKey: .multiplier)
        self.truePoints = try container.decodeIfPresent(Double.self, forKey: .truePoints)
        self.falsePoints = try container.decodeIfPresent(Double.self, forKey: .falsePoints)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(field, forKey: .field)
        try container.encodeIfPresent(optionPoints, forKey: .optionPoints)
        try container.encodeIfPresent(ranges, forKey: .ranges)
        try container.encodeIfPresent(multiplier, forKey: .multiplier)
        try container.encodeIfPresent(truePoints, forKey: .truePoints)
        try container.encodeIfPresent(falsePoints, forKey: .falsePoints)
    }
}

public enum SemanticReviewIssueSeverity: String, Codable, Sendable, CaseIterable {
    case warning = "warning"
    case error = "error"
}

public struct SemanticReviewIssue: Codable, Sendable, Equatable {
    public var id: String
    public var severity: SemanticReviewIssueSeverity
    public var message: String
    public var fieldId: String?
    public var fieldLabel: String?
    public var suggestion: String?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case severity = "severity"
        case message = "message"
        case fieldId = "fieldId"
        case fieldLabel = "fieldLabel"
        case suggestion = "suggestion"
    }

    public init(
        id: String,
        severity: SemanticReviewIssueSeverity,
        message: String,
        fieldId: String? = nil,
        fieldLabel: String? = nil,
        suggestion: String? = nil
    ) {
        self.id = id
        self.severity = severity
        self.message = message
        self.fieldId = fieldId
        self.fieldLabel = fieldLabel
        self.suggestion = suggestion
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.severity = try container.decode(SemanticReviewIssueSeverity.self, forKey: .severity)
        self.message = try container.decode(String.self, forKey: .message)
        self.fieldId = try container.decodeIfPresent(String.self, forKey: .fieldId)
        self.fieldLabel = try container.decodeIfPresent(String.self, forKey: .fieldLabel)
        self.suggestion = try container.decodeIfPresent(String.self, forKey: .suggestion)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(severity, forKey: .severity)
        try container.encode(message, forKey: .message)
        try container.encodeIfPresent(fieldId, forKey: .fieldId)
        try container.encodeIfPresent(fieldLabel, forKey: .fieldLabel)
        try container.encodeIfPresent(suggestion, forKey: .suggestion)
    }
}

public struct SemanticReviewResult: Codable, Sendable, Equatable {
    public var status: SemanticReviewStatus
    public var summary: String?
    public var issues: [SemanticReviewIssue]

    enum CodingKeys: String, CodingKey {
        case status = "status"
        case summary = "summary"
        case issues = "issues"
    }

    public init(
        status: SemanticReviewStatus,
        summary: String? = nil,
        issues: [SemanticReviewIssue]
    ) {
        self.status = status
        self.summary = summary
        self.issues = issues
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.status = try container.decode(SemanticReviewStatus.self, forKey: .status)
        self.summary = try container.decodeIfPresent(String.self, forKey: .summary)
        self.issues = try container.decode([SemanticReviewIssue].self, forKey: .issues)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(status, forKey: .status)
        try container.encodeIfPresent(summary, forKey: .summary)
        try container.encode(issues, forKey: .issues)
    }
}

public enum StatItemTone: String, Codable, Sendable, CaseIterable {
    case up = "up"
    case down = "down"
    case neutral = "neutral"
}

public struct StatItem: Codable, Sendable, Equatable {
    public var icon: String?
    public var label: String
    public var value: String
    public var delta: String?
    public var tone: StatItemTone?

    enum CodingKeys: String, CodingKey {
        case icon = "icon"
        case label = "label"
        case value = "value"
        case delta = "delta"
        case tone = "tone"
    }

    public init(
        icon: String? = nil,
        label: String,
        value: String,
        delta: String? = nil,
        tone: StatItemTone? = nil
    ) {
        self.icon = icon
        self.label = label
        self.value = value
        self.delta = delta
        self.tone = tone
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.icon = try container.decodeIfPresent(String.self, forKey: .icon)
        self.label = try container.decode(String.self, forKey: .label)
        self.value = try container.decode(String.self, forKey: .value)
        self.delta = try container.decodeIfPresent(String.self, forKey: .delta)
        self.tone = try container.decodeIfPresent(StatItemTone.self, forKey: .tone)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(icon, forKey: .icon)
        try container.encode(label, forKey: .label)
        try container.encode(value, forKey: .value)
        try container.encodeIfPresent(delta, forKey: .delta)
        try container.encodeIfPresent(tone, forKey: .tone)
    }
}

public enum StatsBlockKind: String, Codable, Sendable, CaseIterable {
    case stats = "stats"
}

public struct StatsBlock: Codable, Sendable, Equatable {
    public var kind: StatsBlockKind
    public var items: [StatItem]

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case items = "items"
    }

    public init(
        kind: StatsBlockKind,
        items: [StatItem]
    ) {
        self.kind = kind
        self.items = items
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decode(StatsBlockKind.self, forKey: .kind)
        self.items = try container.decode([StatItem].self, forKey: .items)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encode(items, forKey: .items)
    }
}

public struct SubmissionScoreBand: Codable, Sendable, Equatable {
    public var id: String
    public var label: String

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
    }

    public init(
        id: String,
        label: String
    ) {
        self.id = id
        self.label = label
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.label = try container.decode(String.self, forKey: .label)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(label, forKey: .label)
    }
}

public struct SubmissionScore: Codable, Sendable, Equatable {
    public var total: Double
    public var dimensions: [DimensionScore]
    public var band: SubmissionScoreBand?
    public var calculatedAt: String
    public var schemaVersion: JSONValue

    enum CodingKeys: String, CodingKey {
        case total = "total"
        case dimensions = "dimensions"
        case band = "band"
        case calculatedAt = "calculatedAt"
        case schemaVersion = "schemaVersion"
    }

    public init(
        total: Double,
        dimensions: [DimensionScore],
        band: SubmissionScoreBand? = nil,
        calculatedAt: String,
        schemaVersion: JSONValue
    ) {
        self.total = total
        self.dimensions = dimensions
        self.band = band
        self.calculatedAt = calculatedAt
        self.schemaVersion = schemaVersion
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.total = try container.decode(Double.self, forKey: .total)
        self.dimensions = try container.decode([DimensionScore].self, forKey: .dimensions)
        self.band = try container.decodeIfPresent(SubmissionScoreBand.self, forKey: .band)
        self.calculatedAt = try container.decode(String.self, forKey: .calculatedAt)
        self.schemaVersion = try container.decode(JSONValue.self, forKey: .schemaVersion)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(total, forKey: .total)
        try container.encode(dimensions, forKey: .dimensions)
        try container.encodeIfPresent(band, forKey: .band)
        try container.encode(calculatedAt, forKey: .calculatedAt)
        try container.encode(schemaVersion, forKey: .schemaVersion)
    }
}

public struct SvgGenerationOptions: Codable, Sendable, Equatable {
    /// User prompt describing the SVG subject, style, and motion
    public var prompt: String
    /// Whether to generate an animated SVG or static SVG
    public var animated: Bool
    /// Existing SVG for iterative modification
    public var currentSvg: String?
    /// Preferred stylistic archetype
    public var archetype: SvgStyleArchetype?
    /// SVG viewBox dimensions
    public var viewBox: String
    /// Target loop duration in ms (default 3600ms)
    public var loopDurationMs: Double?
    /// Reference artifacts (video/image/document)
    public var references: [SvgReferenceArtifact]?
    /// Whether to run the visual QA audit loop
    public var visualQA: Bool
    /// Maximum retries for visual/code refinement
    public var maxRetries: Int
    /// Custom system prompt override
    public var systemPrompt: String?
    /// Model temperature
    public var temperature: Double?

    enum CodingKeys: String, CodingKey {
        case prompt = "prompt"
        case animated = "animated"
        case currentSvg = "currentSvg"
        case archetype = "archetype"
        case viewBox = "viewBox"
        case loopDurationMs = "loopDurationMs"
        case references = "references"
        case visualQA = "visualQA"
        case maxRetries = "maxRetries"
        case systemPrompt = "systemPrompt"
        case temperature = "temperature"
    }

    public init(
        prompt: String,
        animated: Bool = true,
        currentSvg: String? = nil,
        archetype: SvgStyleArchetype? = nil,
        viewBox: String = "0 0 512 512",
        loopDurationMs: Double? = nil,
        references: [SvgReferenceArtifact]? = nil,
        visualQA: Bool = true,
        maxRetries: Int = 2,
        systemPrompt: String? = nil,
        temperature: Double? = nil
    ) {
        self.prompt = prompt
        self.animated = animated
        self.currentSvg = currentSvg
        self.archetype = archetype
        self.viewBox = viewBox
        self.loopDurationMs = loopDurationMs
        self.references = references
        self.visualQA = visualQA
        self.maxRetries = maxRetries
        self.systemPrompt = systemPrompt
        self.temperature = temperature
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.prompt = try container.decode(String.self, forKey: .prompt)
        self.animated = try container.decodeIfPresent(Bool.self, forKey: .animated) ?? true
        self.currentSvg = try container.decodeIfPresent(String.self, forKey: .currentSvg)
        self.archetype = try container.decodeIfPresent(SvgStyleArchetype.self, forKey: .archetype)
        self.viewBox = try container.decodeIfPresent(String.self, forKey: .viewBox) ?? "0 0 512 512"
        self.loopDurationMs = try container.decodeIfPresent(Double.self, forKey: .loopDurationMs)
        self.references = try container.decodeIfPresent([SvgReferenceArtifact].self, forKey: .references)
        self.visualQA = try container.decodeIfPresent(Bool.self, forKey: .visualQA) ?? true
        self.maxRetries = try container.decodeIfPresent(Int.self, forKey: .maxRetries) ?? 2
        self.systemPrompt = try container.decodeIfPresent(String.self, forKey: .systemPrompt)
        self.temperature = try container.decodeIfPresent(Double.self, forKey: .temperature)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(prompt, forKey: .prompt)
        try container.encode(animated, forKey: .animated)
        try container.encodeIfPresent(currentSvg, forKey: .currentSvg)
        try container.encodeIfPresent(archetype, forKey: .archetype)
        try container.encode(viewBox, forKey: .viewBox)
        try container.encodeIfPresent(loopDurationMs, forKey: .loopDurationMs)
        try container.encodeIfPresent(references, forKey: .references)
        try container.encode(visualQA, forKey: .visualQA)
        try container.encode(maxRetries, forKey: .maxRetries)
        try container.encodeIfPresent(systemPrompt, forKey: .systemPrompt)
        try container.encodeIfPresent(temperature, forKey: .temperature)
    }
}

public struct SvgGenerationResult: Codable, Sendable, Equatable {
    /// Clean, self-contained SVG markup
    public var svg: String
    /// Whether the SVG is animated
    public var animated: Bool
    /// ViewBox of the generated SVG
    public var viewBox: String
    /// Kinetic blueprint generated for animated SVG
    public var blueprint: KineticBlueprint?
    /// Visual QA audit results
    public var qaAudit: VisualQAAudit?
    /// Raw LLM output
    public var rawOutput: String?

    enum CodingKeys: String, CodingKey {
        case svg = "svg"
        case animated = "animated"
        case viewBox = "viewBox"
        case blueprint = "blueprint"
        case qaAudit = "qaAudit"
        case rawOutput = "rawOutput"
    }

    public init(
        svg: String,
        animated: Bool,
        viewBox: String,
        blueprint: KineticBlueprint? = nil,
        qaAudit: VisualQAAudit? = nil,
        rawOutput: String? = nil
    ) {
        self.svg = svg
        self.animated = animated
        self.viewBox = viewBox
        self.blueprint = blueprint
        self.qaAudit = qaAudit
        self.rawOutput = rawOutput
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.svg = try container.decode(String.self, forKey: .svg)
        self.animated = try container.decode(Bool.self, forKey: .animated)
        self.viewBox = try container.decode(String.self, forKey: .viewBox)
        self.blueprint = try container.decodeIfPresent(KineticBlueprint.self, forKey: .blueprint)
        self.qaAudit = try container.decodeIfPresent(VisualQAAudit.self, forKey: .qaAudit)
        self.rawOutput = try container.decodeIfPresent(String.self, forKey: .rawOutput)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(svg, forKey: .svg)
        try container.encode(animated, forKey: .animated)
        try container.encode(viewBox, forKey: .viewBox)
        try container.encodeIfPresent(blueprint, forKey: .blueprint)
        try container.encodeIfPresent(qaAudit, forKey: .qaAudit)
        try container.encodeIfPresent(rawOutput, forKey: .rawOutput)
    }
}

public struct SvgPaletteTokens: Codable, Sendable, Equatable {
    /// Canvas background color (default transparent)
    public var canvasBg: String?
    /// Main body / subject color
    public var chassis: String?
    /// Primary stroke color
    public var stroke: String?
    /// Primary accent color
    public var accent1: String?
    /// Secondary accent color
    public var accent2: String?
    /// Shadow color with opacity
    public var shadow: String?
    /// Additional custom CSS color variables
    public var custom: [String: String]?

    enum CodingKeys: String, CodingKey {
        case canvasBg = "canvasBg"
        case chassis = "chassis"
        case stroke = "stroke"
        case accent1 = "accent1"
        case accent2 = "accent2"
        case shadow = "shadow"
        case custom = "custom"
    }

    public init(
        canvasBg: String? = nil,
        chassis: String? = nil,
        stroke: String? = nil,
        accent1: String? = nil,
        accent2: String? = nil,
        shadow: String? = nil,
        custom: [String: String]? = nil
    ) {
        self.canvasBg = canvasBg
        self.chassis = chassis
        self.stroke = stroke
        self.accent1 = accent1
        self.accent2 = accent2
        self.shadow = shadow
        self.custom = custom
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.canvasBg = try container.decodeIfPresent(String.self, forKey: .canvasBg)
        self.chassis = try container.decodeIfPresent(String.self, forKey: .chassis)
        self.stroke = try container.decodeIfPresent(String.self, forKey: .stroke)
        self.accent1 = try container.decodeIfPresent(String.self, forKey: .accent1)
        self.accent2 = try container.decodeIfPresent(String.self, forKey: .accent2)
        self.shadow = try container.decodeIfPresent(String.self, forKey: .shadow)
        self.custom = try container.decodeIfPresent([String: String].self, forKey: .custom)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(canvasBg, forKey: .canvasBg)
        try container.encodeIfPresent(chassis, forKey: .chassis)
        try container.encodeIfPresent(stroke, forKey: .stroke)
        try container.encodeIfPresent(accent1, forKey: .accent1)
        try container.encodeIfPresent(accent2, forKey: .accent2)
        try container.encodeIfPresent(shadow, forKey: .shadow)
        try container.encodeIfPresent(custom, forKey: .custom)
    }
}

/// Reference artifact type
public enum SvgReferenceArtifactType: String, Codable, Sendable, CaseIterable {
    case image = "image"
    case video = "video"
    case document = "document"
}

public struct SvgReferenceArtifact: Codable, Sendable, Equatable {
    /// Reference artifact type
    public var type: SvgReferenceArtifactType
    /// Asset URL or data URL
    public var url: String
    /// MIME type if known
    public var mimeType: String?
    /// Contextual description or role of this reference
    public var `description`: String?

    enum CodingKeys: String, CodingKey {
        case type = "type"
        case url = "url"
        case mimeType = "mimeType"
        case `description` = "description"
    }

    public init(
        type: SvgReferenceArtifactType,
        url: String,
        mimeType: String? = nil,
        `description`: String? = nil
    ) {
        self.type = type
        self.url = url
        self.mimeType = mimeType
        self.`description` = `description`
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.type = try container.decode(SvgReferenceArtifactType.self, forKey: .type)
        self.url = try container.decode(String.self, forKey: .url)
        self.mimeType = try container.decodeIfPresent(String.self, forKey: .mimeType)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(type, forKey: .type)
        try container.encode(url, forKey: .url)
        try container.encodeIfPresent(mimeType, forKey: .mimeType)
        try container.encodeIfPresent(`description`, forKey: .`description`)
    }
}

public struct SvgValidationCheck: Codable, Sendable, Equatable {
    /// Whether the SVG contains no external url() or scripts
    public var selfContained: Bool
    /// Whether viewBox is defined with width/height 100%
    public var responsive: Bool
    /// Whether foreground and labels sit at the end of the DOM
    public var stackingOrderValid: Bool
    /// Whether animated elements separate coordinate translate from keyframe motion
    public var transformIsolated: Bool
    /// Whether moving elements stay within canvas bounds
    public var boundaryClamped: Bool
    /// Whether dark mode media query and CSS custom properties are properly defined
    public var dualThemeVerified: Bool
    /// Whether the SVG includes role="img" and title/aria-labelledby accessibility attributes
    public var accessible: Bool
    /// Whether animated SVG provides @media (prefers-reduced-motion: reduce) rules
    public var reducedMotion: Bool

    enum CodingKeys: String, CodingKey {
        case selfContained = "selfContained"
        case responsive = "responsive"
        case stackingOrderValid = "stackingOrderValid"
        case transformIsolated = "transformIsolated"
        case boundaryClamped = "boundaryClamped"
        case dualThemeVerified = "dualThemeVerified"
        case accessible = "accessible"
        case reducedMotion = "reducedMotion"
    }

    public init(
        selfContained: Bool,
        responsive: Bool,
        stackingOrderValid: Bool,
        transformIsolated: Bool,
        boundaryClamped: Bool,
        dualThemeVerified: Bool,
        accessible: Bool = true,
        reducedMotion: Bool = true
    ) {
        self.selfContained = selfContained
        self.responsive = responsive
        self.stackingOrderValid = stackingOrderValid
        self.transformIsolated = transformIsolated
        self.boundaryClamped = boundaryClamped
        self.dualThemeVerified = dualThemeVerified
        self.accessible = accessible
        self.reducedMotion = reducedMotion
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.selfContained = try container.decode(Bool.self, forKey: .selfContained)
        self.responsive = try container.decode(Bool.self, forKey: .responsive)
        self.stackingOrderValid = try container.decode(Bool.self, forKey: .stackingOrderValid)
        self.transformIsolated = try container.decode(Bool.self, forKey: .transformIsolated)
        self.boundaryClamped = try container.decode(Bool.self, forKey: .boundaryClamped)
        self.dualThemeVerified = try container.decode(Bool.self, forKey: .dualThemeVerified)
        self.accessible = try container.decodeIfPresent(Bool.self, forKey: .accessible) ?? true
        self.reducedMotion = try container.decodeIfPresent(Bool.self, forKey: .reducedMotion) ?? true
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(selfContained, forKey: .selfContained)
        try container.encode(responsive, forKey: .responsive)
        try container.encode(stackingOrderValid, forKey: .stackingOrderValid)
        try container.encode(transformIsolated, forKey: .transformIsolated)
        try container.encode(boundaryClamped, forKey: .boundaryClamped)
        try container.encode(dualThemeVerified, forKey: .dualThemeVerified)
        try container.encode(accessible, forKey: .accessible)
        try container.encode(reducedMotion, forKey: .reducedMotion)
    }
}

public struct TechnicalFormReviewMetadata: Codable, Sendable, Equatable {
    public var approvers: [String]
    public var requirements: [String]

    enum CodingKeys: String, CodingKey {
        case approvers = "approvers"
        case requirements = "requirements"
    }

    public init(
        approvers: [String],
        requirements: [String]
    ) {
        self.approvers = approvers
        self.requirements = requirements
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.approvers = try container.decode([String].self, forKey: .approvers)
        self.requirements = try container.decode([String].self, forKey: .requirements)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(approvers, forKey: .approvers)
        try container.encode(requirements, forKey: .requirements)
    }
}

public struct TechnicalForm: Codable, Sendable, Equatable {
    public var id: String?
    public var title: String?
    public var `description`: String?
    public var version: JSONValue
    public var stages: [FormStage]
    public var decisionGates: [DecisionGate]?
    public var validators: [FormValidator]?
    public var handoffActions: [FormHandoffAction]?
    public var review: FormReviewMeta?
    public var reviewMetadata: TechnicalFormReviewMetadata?
    public var scoring: ScoringConfig?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case title = "title"
        case `description` = "description"
        case version = "version"
        case stages = "stages"
        case decisionGates = "decisionGates"
        case validators = "validators"
        case handoffActions = "handoffActions"
        case review = "review"
        case reviewMetadata = "reviewMetadata"
        case scoring = "scoring"
    }

    public init(
        id: String? = nil,
        title: String? = nil,
        `description`: String? = nil,
        version: JSONValue,
        stages: [FormStage],
        decisionGates: [DecisionGate]? = nil,
        validators: [FormValidator]? = nil,
        handoffActions: [FormHandoffAction]? = nil,
        review: FormReviewMeta? = nil,
        reviewMetadata: TechnicalFormReviewMetadata? = nil,
        scoring: ScoringConfig? = nil
    ) {
        self.id = id
        self.title = title
        self.`description` = `description`
        self.version = version
        self.stages = stages
        self.decisionGates = decisionGates
        self.validators = validators
        self.handoffActions = handoffActions
        self.review = review
        self.reviewMetadata = reviewMetadata
        self.scoring = scoring
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decodeIfPresent(String.self, forKey: .id)
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.version = try container.decode(JSONValue.self, forKey: .version)
        self.stages = try container.decode([FormStage].self, forKey: .stages)
        self.decisionGates = try container.decodeIfPresent([DecisionGate].self, forKey: .decisionGates)
        self.validators = try container.decodeIfPresent([FormValidator].self, forKey: .validators)
        self.handoffActions = try container.decodeIfPresent([FormHandoffAction].self, forKey: .handoffActions)
        self.review = try container.decodeIfPresent(FormReviewMeta.self, forKey: .review)
        self.reviewMetadata = try container.decodeIfPresent(TechnicalFormReviewMetadata.self, forKey: .reviewMetadata)
        self.scoring = try container.decodeIfPresent(ScoringConfig.self, forKey: .scoring)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(id, forKey: .id)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(version, forKey: .version)
        try container.encode(stages, forKey: .stages)
        try container.encodeIfPresent(decisionGates, forKey: .decisionGates)
        try container.encodeIfPresent(validators, forKey: .validators)
        try container.encodeIfPresent(handoffActions, forKey: .handoffActions)
        try container.encodeIfPresent(review, forKey: .review)
        try container.encodeIfPresent(reviewMetadata, forKey: .reviewMetadata)
        try container.encodeIfPresent(scoring, forKey: .scoring)
    }
}

public struct Theme: Codable, Sendable, Equatable {
    /// e.g. 'shadcn-zinc', 'tokyo-night', 'glassmorphism-cyber'
    public var id: String
    /// e.g. 'Shadcn Zinc Modern'
    public var name: String
    public var `description`: String?
    public var tokens: ThemeTokens
    public var supportsDarkMode: Bool?
    public var isSystem: Bool?
    /// ISO timestamp
    public var createdAt: String
    /// ISO timestamp
    public var updatedAt: String

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
        case `description` = "description"
        case tokens = "tokens"
        case supportsDarkMode = "supportsDarkMode"
        case isSystem = "isSystem"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
    }

    public init(
        id: String,
        name: String,
        `description`: String? = nil,
        tokens: ThemeTokens,
        supportsDarkMode: Bool? = nil,
        isSystem: Bool? = nil,
        createdAt: String,
        updatedAt: String
    ) {
        self.id = id
        self.name = name
        self.`description` = `description`
        self.tokens = tokens
        self.supportsDarkMode = supportsDarkMode
        self.isSystem = isSystem
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.tokens = try container.decode(ThemeTokens.self, forKey: .tokens)
        self.supportsDarkMode = try container.decodeIfPresent(Bool.self, forKey: .supportsDarkMode)
        self.isSystem = try container.decodeIfPresent(Bool.self, forKey: .isSystem)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decode(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encode(tokens, forKey: .tokens)
        try container.encodeIfPresent(supportsDarkMode, forKey: .supportsDarkMode)
        try container.encodeIfPresent(isSystem, forKey: .isSystem)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(updatedAt, forKey: .updatedAt)
    }
}

public struct ThemeColors: Codable, Sendable, Equatable {
    public var primary: String
    public var primaryForeground: String?
    public var secondary: String?
    public var secondaryForeground: String?
    public var accent: String?
    public var accentForeground: String?
    public var background: String
    public var foreground: String
    public var surface: String?
    public var surfaceForeground: String?
    public var muted: String?
    public var mutedForeground: String?
    public var destructive: String?
    public var destructiveForeground: String?
    public var border: String?
    public var ring: String?
    public var customProperties: [String: String]?

    enum CodingKeys: String, CodingKey {
        case primary = "primary"
        case primaryForeground = "primaryForeground"
        case secondary = "secondary"
        case secondaryForeground = "secondaryForeground"
        case accent = "accent"
        case accentForeground = "accentForeground"
        case background = "background"
        case foreground = "foreground"
        case surface = "surface"
        case surfaceForeground = "surfaceForeground"
        case muted = "muted"
        case mutedForeground = "mutedForeground"
        case destructive = "destructive"
        case destructiveForeground = "destructiveForeground"
        case border = "border"
        case ring = "ring"
        case customProperties = "customProperties"
    }

    public init(
        primary: String,
        primaryForeground: String? = nil,
        secondary: String? = nil,
        secondaryForeground: String? = nil,
        accent: String? = nil,
        accentForeground: String? = nil,
        background: String,
        foreground: String,
        surface: String? = nil,
        surfaceForeground: String? = nil,
        muted: String? = nil,
        mutedForeground: String? = nil,
        destructive: String? = nil,
        destructiveForeground: String? = nil,
        border: String? = nil,
        ring: String? = nil,
        customProperties: [String: String]? = nil
    ) {
        self.primary = primary
        self.primaryForeground = primaryForeground
        self.secondary = secondary
        self.secondaryForeground = secondaryForeground
        self.accent = accent
        self.accentForeground = accentForeground
        self.background = background
        self.foreground = foreground
        self.surface = surface
        self.surfaceForeground = surfaceForeground
        self.muted = muted
        self.mutedForeground = mutedForeground
        self.destructive = destructive
        self.destructiveForeground = destructiveForeground
        self.border = border
        self.ring = ring
        self.customProperties = customProperties
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.primary = try container.decode(String.self, forKey: .primary)
        self.primaryForeground = try container.decodeIfPresent(String.self, forKey: .primaryForeground)
        self.secondary = try container.decodeIfPresent(String.self, forKey: .secondary)
        self.secondaryForeground = try container.decodeIfPresent(String.self, forKey: .secondaryForeground)
        self.accent = try container.decodeIfPresent(String.self, forKey: .accent)
        self.accentForeground = try container.decodeIfPresent(String.self, forKey: .accentForeground)
        self.background = try container.decode(String.self, forKey: .background)
        self.foreground = try container.decode(String.self, forKey: .foreground)
        self.surface = try container.decodeIfPresent(String.self, forKey: .surface)
        self.surfaceForeground = try container.decodeIfPresent(String.self, forKey: .surfaceForeground)
        self.muted = try container.decodeIfPresent(String.self, forKey: .muted)
        self.mutedForeground = try container.decodeIfPresent(String.self, forKey: .mutedForeground)
        self.destructive = try container.decodeIfPresent(String.self, forKey: .destructive)
        self.destructiveForeground = try container.decodeIfPresent(String.self, forKey: .destructiveForeground)
        self.border = try container.decodeIfPresent(String.self, forKey: .border)
        self.ring = try container.decodeIfPresent(String.self, forKey: .ring)
        self.customProperties = try container.decodeIfPresent([String: String].self, forKey: .customProperties)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(primary, forKey: .primary)
        try container.encodeIfPresent(primaryForeground, forKey: .primaryForeground)
        try container.encodeIfPresent(secondary, forKey: .secondary)
        try container.encodeIfPresent(secondaryForeground, forKey: .secondaryForeground)
        try container.encodeIfPresent(accent, forKey: .accent)
        try container.encodeIfPresent(accentForeground, forKey: .accentForeground)
        try container.encode(background, forKey: .background)
        try container.encode(foreground, forKey: .foreground)
        try container.encodeIfPresent(surface, forKey: .surface)
        try container.encodeIfPresent(surfaceForeground, forKey: .surfaceForeground)
        try container.encodeIfPresent(muted, forKey: .muted)
        try container.encodeIfPresent(mutedForeground, forKey: .mutedForeground)
        try container.encodeIfPresent(destructive, forKey: .destructive)
        try container.encodeIfPresent(destructiveForeground, forKey: .destructiveForeground)
        try container.encodeIfPresent(border, forKey: .border)
        try container.encodeIfPresent(ring, forKey: .ring)
        try container.encodeIfPresent(customProperties, forKey: .customProperties)
    }
}

public struct ThemeIngestionInput: Codable, Sendable, Equatable {
    public var id: String?
    public var name: String
    public var `description`: String?
    public var tokens: ThemeTokens?
    public var rawCss: String?
    public var supportsDarkMode: Bool?
    public var isSystem: Bool?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
        case `description` = "description"
        case tokens = "tokens"
        case rawCss = "rawCss"
        case supportsDarkMode = "supportsDarkMode"
        case isSystem = "isSystem"
    }

    public init(
        id: String? = nil,
        name: String,
        `description`: String? = nil,
        tokens: ThemeTokens? = nil,
        rawCss: String? = nil,
        supportsDarkMode: Bool? = nil,
        isSystem: Bool? = nil
    ) {
        self.id = id
        self.name = name
        self.`description` = `description`
        self.tokens = tokens
        self.rawCss = rawCss
        self.supportsDarkMode = supportsDarkMode
        self.isSystem = isSystem
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decodeIfPresent(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.tokens = try container.decodeIfPresent(ThemeTokens.self, forKey: .tokens)
        self.rawCss = try container.decodeIfPresent(String.self, forKey: .rawCss)
        self.supportsDarkMode = try container.decodeIfPresent(Bool.self, forKey: .supportsDarkMode)
        self.isSystem = try container.decodeIfPresent(Bool.self, forKey: .isSystem)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(tokens, forKey: .tokens)
        try container.encodeIfPresent(rawCss, forKey: .rawCss)
        try container.encodeIfPresent(supportsDarkMode, forKey: .supportsDarkMode)
        try container.encodeIfPresent(isSystem, forKey: .isSystem)
    }
}

public struct ThemeTokensColorsDark: Codable, Sendable, Equatable {
    public var primary: String?
    public var primaryForeground: String?
    public var secondary: String?
    public var secondaryForeground: String?
    public var accent: String?
    public var accentForeground: String?
    public var background: String?
    public var foreground: String?
    public var surface: String?
    public var surfaceForeground: String?
    public var muted: String?
    public var mutedForeground: String?
    public var destructive: String?
    public var destructiveForeground: String?
    public var border: String?
    public var ring: String?
    public var customProperties: [String: String]?

    enum CodingKeys: String, CodingKey {
        case primary = "primary"
        case primaryForeground = "primaryForeground"
        case secondary = "secondary"
        case secondaryForeground = "secondaryForeground"
        case accent = "accent"
        case accentForeground = "accentForeground"
        case background = "background"
        case foreground = "foreground"
        case surface = "surface"
        case surfaceForeground = "surfaceForeground"
        case muted = "muted"
        case mutedForeground = "mutedForeground"
        case destructive = "destructive"
        case destructiveForeground = "destructiveForeground"
        case border = "border"
        case ring = "ring"
        case customProperties = "customProperties"
    }

    public init(
        primary: String? = nil,
        primaryForeground: String? = nil,
        secondary: String? = nil,
        secondaryForeground: String? = nil,
        accent: String? = nil,
        accentForeground: String? = nil,
        background: String? = nil,
        foreground: String? = nil,
        surface: String? = nil,
        surfaceForeground: String? = nil,
        muted: String? = nil,
        mutedForeground: String? = nil,
        destructive: String? = nil,
        destructiveForeground: String? = nil,
        border: String? = nil,
        ring: String? = nil,
        customProperties: [String: String]? = nil
    ) {
        self.primary = primary
        self.primaryForeground = primaryForeground
        self.secondary = secondary
        self.secondaryForeground = secondaryForeground
        self.accent = accent
        self.accentForeground = accentForeground
        self.background = background
        self.foreground = foreground
        self.surface = surface
        self.surfaceForeground = surfaceForeground
        self.muted = muted
        self.mutedForeground = mutedForeground
        self.destructive = destructive
        self.destructiveForeground = destructiveForeground
        self.border = border
        self.ring = ring
        self.customProperties = customProperties
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.primary = try container.decodeIfPresent(String.self, forKey: .primary)
        self.primaryForeground = try container.decodeIfPresent(String.self, forKey: .primaryForeground)
        self.secondary = try container.decodeIfPresent(String.self, forKey: .secondary)
        self.secondaryForeground = try container.decodeIfPresent(String.self, forKey: .secondaryForeground)
        self.accent = try container.decodeIfPresent(String.self, forKey: .accent)
        self.accentForeground = try container.decodeIfPresent(String.self, forKey: .accentForeground)
        self.background = try container.decodeIfPresent(String.self, forKey: .background)
        self.foreground = try container.decodeIfPresent(String.self, forKey: .foreground)
        self.surface = try container.decodeIfPresent(String.self, forKey: .surface)
        self.surfaceForeground = try container.decodeIfPresent(String.self, forKey: .surfaceForeground)
        self.muted = try container.decodeIfPresent(String.self, forKey: .muted)
        self.mutedForeground = try container.decodeIfPresent(String.self, forKey: .mutedForeground)
        self.destructive = try container.decodeIfPresent(String.self, forKey: .destructive)
        self.destructiveForeground = try container.decodeIfPresent(String.self, forKey: .destructiveForeground)
        self.border = try container.decodeIfPresent(String.self, forKey: .border)
        self.ring = try container.decodeIfPresent(String.self, forKey: .ring)
        self.customProperties = try container.decodeIfPresent([String: String].self, forKey: .customProperties)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(primary, forKey: .primary)
        try container.encodeIfPresent(primaryForeground, forKey: .primaryForeground)
        try container.encodeIfPresent(secondary, forKey: .secondary)
        try container.encodeIfPresent(secondaryForeground, forKey: .secondaryForeground)
        try container.encodeIfPresent(accent, forKey: .accent)
        try container.encodeIfPresent(accentForeground, forKey: .accentForeground)
        try container.encodeIfPresent(background, forKey: .background)
        try container.encodeIfPresent(foreground, forKey: .foreground)
        try container.encodeIfPresent(surface, forKey: .surface)
        try container.encodeIfPresent(surfaceForeground, forKey: .surfaceForeground)
        try container.encodeIfPresent(muted, forKey: .muted)
        try container.encodeIfPresent(mutedForeground, forKey: .mutedForeground)
        try container.encodeIfPresent(destructive, forKey: .destructive)
        try container.encodeIfPresent(destructiveForeground, forKey: .destructiveForeground)
        try container.encodeIfPresent(border, forKey: .border)
        try container.encodeIfPresent(ring, forKey: .ring)
        try container.encodeIfPresent(customProperties, forKey: .customProperties)
    }
}

public struct ThemeTokensColors: Codable, Sendable, Equatable {
    public var light: ThemeColors
    public var dark: ThemeTokensColorsDark?

    enum CodingKeys: String, CodingKey {
        case light = "light"
        case dark = "dark"
    }

    public init(
        light: ThemeColors,
        dark: ThemeTokensColorsDark? = nil
    ) {
        self.light = light
        self.dark = dark
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.light = try container.decode(ThemeColors.self, forKey: .light)
        self.dark = try container.decodeIfPresent(ThemeTokensColorsDark.self, forKey: .dark)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(light, forKey: .light)
        try container.encodeIfPresent(dark, forKey: .dark)
    }
}

public struct ThemeTokens: Codable, Sendable, Equatable {
    public var colors: ThemeTokensColors
    public var typography: ThemeTypographyTokens?
    public var radii: [String: JSONValue]?
    public var spacing: [String: String]?
    public var paddings: [String: String]?
    public var shadows: [String: String]?

    enum CodingKeys: String, CodingKey {
        case colors = "colors"
        case typography = "typography"
        case radii = "radii"
        case spacing = "spacing"
        case paddings = "paddings"
        case shadows = "shadows"
    }

    public init(
        colors: ThemeTokensColors,
        typography: ThemeTypographyTokens? = nil,
        radii: [String: JSONValue]? = nil,
        spacing: [String: String]? = nil,
        paddings: [String: String]? = nil,
        shadows: [String: String]? = nil
    ) {
        self.colors = colors
        self.typography = typography
        self.radii = radii
        self.spacing = spacing
        self.paddings = paddings
        self.shadows = shadows
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.colors = try container.decode(ThemeTokensColors.self, forKey: .colors)
        self.typography = try container.decodeIfPresent(ThemeTypographyTokens.self, forKey: .typography)
        self.radii = try container.decodeIfPresent([String: JSONValue].self, forKey: .radii)
        self.spacing = try container.decodeIfPresent([String: String].self, forKey: .spacing)
        self.paddings = try container.decodeIfPresent([String: String].self, forKey: .paddings)
        self.shadows = try container.decodeIfPresent([String: String].self, forKey: .shadows)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(colors, forKey: .colors)
        try container.encodeIfPresent(typography, forKey: .typography)
        try container.encodeIfPresent(radii, forKey: .radii)
        try container.encodeIfPresent(spacing, forKey: .spacing)
        try container.encodeIfPresent(paddings, forKey: .paddings)
        try container.encodeIfPresent(shadows, forKey: .shadows)
    }
}

public struct ThemeTypographyTokens: Codable, Sendable, Equatable {
    public var fontSans: String?
    public var fontMono: String?
    public var fontHeading: String?
    public var fontImports: [String]?
    public var fontCss: String?
    public var fontSize: [String: String]?
    public var fontWeight: [String: String]?

    enum CodingKeys: String, CodingKey {
        case fontSans = "fontSans"
        case fontMono = "fontMono"
        case fontHeading = "fontHeading"
        case fontImports = "fontImports"
        case fontCss = "fontCss"
        case fontSize = "fontSize"
        case fontWeight = "fontWeight"
    }

    public init(
        fontSans: String? = nil,
        fontMono: String? = nil,
        fontHeading: String? = nil,
        fontImports: [String]? = nil,
        fontCss: String? = nil,
        fontSize: [String: String]? = nil,
        fontWeight: [String: String]? = nil
    ) {
        self.fontSans = fontSans
        self.fontMono = fontMono
        self.fontHeading = fontHeading
        self.fontImports = fontImports
        self.fontCss = fontCss
        self.fontSize = fontSize
        self.fontWeight = fontWeight
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.fontSans = try container.decodeIfPresent(String.self, forKey: .fontSans)
        self.fontMono = try container.decodeIfPresent(String.self, forKey: .fontMono)
        self.fontHeading = try container.decodeIfPresent(String.self, forKey: .fontHeading)
        self.fontImports = try container.decodeIfPresent([String].self, forKey: .fontImports)
        self.fontCss = try container.decodeIfPresent(String.self, forKey: .fontCss)
        self.fontSize = try container.decodeIfPresent([String: String].self, forKey: .fontSize)
        self.fontWeight = try container.decodeIfPresent([String: String].self, forKey: .fontWeight)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(fontSans, forKey: .fontSans)
        try container.encodeIfPresent(fontMono, forKey: .fontMono)
        try container.encodeIfPresent(fontHeading, forKey: .fontHeading)
        try container.encodeIfPresent(fontImports, forKey: .fontImports)
        try container.encodeIfPresent(fontCss, forKey: .fontCss)
        try container.encodeIfPresent(fontSize, forKey: .fontSize)
        try container.encodeIfPresent(fontWeight, forKey: .fontWeight)
    }
}

public enum TreeBlockKind: String, Codable, Sendable, CaseIterable {
    case tree = "tree"
    case nodeDiagram = "node-diagram"
    case node_diagram = "node_diagram"
    case orgchart = "orgchart"
}

public enum TreeBlockLayout: String, Codable, Sendable, CaseIterable {
    case hierarchical = "hierarchical"
    case radial = "radial"
    case flow = "flow"
    case horizontal = "horizontal"
    case vertical = "vertical"
}

public struct TreeBlock: Codable, Sendable, Equatable {
    public var kind: TreeBlockKind
    public var title: String?
    public var `description`: String?
    public var layout: TreeBlockLayout?
    public var root: TreeNode?
    public var nodes: [TreeNode]?
    public var edges: [TreeEdge]
    public var company: String?
    public var people: [TreeNode]?
    public var reports: [TreeEdge]?

    enum CodingKeys: String, CodingKey {
        case kind = "kind"
        case title = "title"
        case `description` = "description"
        case layout = "layout"
        case root = "root"
        case nodes = "nodes"
        case edges = "edges"
        case company = "company"
        case people = "people"
        case reports = "reports"
    }

    public init(
        kind: TreeBlockKind = .tree,
        title: String? = nil,
        `description`: String? = nil,
        layout: TreeBlockLayout? = nil,
        root: TreeNode? = nil,
        nodes: [TreeNode]? = nil,
        edges: [TreeEdge] = [],
        company: String? = nil,
        people: [TreeNode]? = nil,
        reports: [TreeEdge]? = nil
    ) {
        self.kind = kind
        self.title = title
        self.`description` = `description`
        self.layout = layout
        self.root = root
        self.nodes = nodes
        self.edges = edges
        self.company = company
        self.people = people
        self.reports = reports
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.kind = try container.decodeIfPresent(TreeBlockKind.self, forKey: .kind) ?? .tree
        self.title = try container.decodeIfPresent(String.self, forKey: .title)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
        self.layout = try container.decodeIfPresent(TreeBlockLayout.self, forKey: .layout)
        self.root = try container.decodeIfPresent(TreeNode.self, forKey: .root)
        self.nodes = try container.decodeIfPresent([TreeNode].self, forKey: .nodes)
        self.edges = try container.decodeIfPresent([TreeEdge].self, forKey: .edges) ?? []
        self.company = try container.decodeIfPresent(String.self, forKey: .company)
        self.people = try container.decodeIfPresent([TreeNode].self, forKey: .people)
        self.reports = try container.decodeIfPresent([TreeEdge].self, forKey: .reports)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(kind, forKey: .kind)
        try container.encodeIfPresent(title, forKey: .title)
        try container.encodeIfPresent(`description`, forKey: .`description`)
        try container.encodeIfPresent(layout, forKey: .layout)
        try container.encodeIfPresent(root, forKey: .root)
        try container.encodeIfPresent(nodes, forKey: .nodes)
        try container.encode(edges, forKey: .edges)
        try container.encodeIfPresent(company, forKey: .company)
        try container.encodeIfPresent(people, forKey: .people)
        try container.encodeIfPresent(reports, forKey: .reports)
    }
}

public enum TreeEdgeStyle: String, Codable, Sendable, CaseIterable {
    case solid = "solid"
    case dashed = "dashed"
    case dotted = "dotted"
}

public struct TreeEdge: Codable, Sendable, Equatable {
    public var from: String?
    public var source: String?
    public var to: String?
    public var target: String?
    public var label: String?
    public var style: TreeEdgeStyle?

    enum CodingKeys: String, CodingKey {
        case from = "from"
        case source = "source"
        case to = "to"
        case target = "target"
        case label = "label"
        case style = "style"
    }

    public init(
        from: String? = nil,
        source: String? = nil,
        to: String? = nil,
        target: String? = nil,
        label: String? = nil,
        style: TreeEdgeStyle? = nil
    ) {
        self.from = from
        self.source = source
        self.to = to
        self.target = target
        self.label = label
        self.style = style
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.from = try container.decodeIfPresent(String.self, forKey: .from)
        self.source = try container.decodeIfPresent(String.self, forKey: .source)
        self.to = try container.decodeIfPresent(String.self, forKey: .to)
        self.target = try container.decodeIfPresent(String.self, forKey: .target)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
        self.style = try container.decodeIfPresent(TreeEdgeStyle.self, forKey: .style)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(from, forKey: .from)
        try container.encodeIfPresent(source, forKey: .source)
        try container.encodeIfPresent(to, forKey: .to)
        try container.encodeIfPresent(target, forKey: .target)
        try container.encodeIfPresent(label, forKey: .label)
        try container.encodeIfPresent(style, forKey: .style)
    }
}

public enum TreeNodeBadgeTone: String, Codable, Sendable, CaseIterable {
    case success = "success"
    case warning = "warning"
    case error = "error"
    case info = "info"
    case gray = "gray"
}

public struct TreeNode: Codable, Sendable, Equatable {
    public var id: String
    public var label: String?
    public var name: String?
    public var type: String?
    public var subtitle: String?
    public var role: String?
    public var icon: String?
    public var badge: String?
    public var badgeTone: TreeNodeBadgeTone?
    public var status: String?
    public var data: [String: JSONValue]?
    public var children: [TreeNode]?

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case label = "label"
        case name = "name"
        case type = "type"
        case subtitle = "subtitle"
        case role = "role"
        case icon = "icon"
        case badge = "badge"
        case badgeTone = "badgeTone"
        case status = "status"
        case data = "data"
        case children = "children"
    }

    public init(
        id: String,
        label: String? = nil,
        name: String? = nil,
        type: String? = nil,
        subtitle: String? = nil,
        role: String? = nil,
        icon: String? = nil,
        badge: String? = nil,
        badgeTone: TreeNodeBadgeTone? = nil,
        status: String? = nil,
        data: [String: JSONValue]? = nil,
        children: [TreeNode]? = nil
    ) {
        self.id = id
        self.label = label
        self.name = name
        self.type = type
        self.subtitle = subtitle
        self.role = role
        self.icon = icon
        self.badge = badge
        self.badgeTone = badgeTone
        self.status = status
        self.data = data
        self.children = children
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.label = try container.decodeIfPresent(String.self, forKey: .label)
        self.name = try container.decodeIfPresent(String.self, forKey: .name)
        self.type = try container.decodeIfPresent(String.self, forKey: .type)
        self.subtitle = try container.decodeIfPresent(String.self, forKey: .subtitle)
        self.role = try container.decodeIfPresent(String.self, forKey: .role)
        self.icon = try container.decodeIfPresent(String.self, forKey: .icon)
        self.badge = try container.decodeIfPresent(String.self, forKey: .badge)
        self.badgeTone = try container.decodeIfPresent(TreeNodeBadgeTone.self, forKey: .badgeTone)
        self.status = try container.decodeIfPresent(String.self, forKey: .status)
        self.data = try container.decodeIfPresent([String: JSONValue].self, forKey: .data)
        self.children = try container.decodeIfPresent([TreeNode].self, forKey: .children)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encodeIfPresent(label, forKey: .label)
        try container.encodeIfPresent(name, forKey: .name)
        try container.encodeIfPresent(type, forKey: .type)
        try container.encodeIfPresent(subtitle, forKey: .subtitle)
        try container.encodeIfPresent(role, forKey: .role)
        try container.encodeIfPresent(icon, forKey: .icon)
        try container.encodeIfPresent(badge, forKey: .badge)
        try container.encodeIfPresent(badgeTone, forKey: .badgeTone)
        try container.encodeIfPresent(status, forKey: .status)
        try container.encodeIfPresent(data, forKey: .data)
        try container.encodeIfPresent(children, forKey: .children)
    }
}

/// Where the accessible name comes from; 'content' means a description built from the data
public enum UiA11yLabelFrom: String, Codable, Sendable, CaseIterable {
    case prop = "prop"
    case children = "children"
    case ariaLabel = "aria-label"
    case content = "content"
}

public struct UiA11y: Codable, Sendable, Equatable {
    /// ARIA role, e.g. 'switch', 'progressbar', 'img', 'figure'
    public var role: String?
    /// Key → what it does, e.g. { Space: 'toggle', Enter: 'toggle' }
    public var keyboard: [String: String]
    /// Where the accessible name comes from; 'content' means a description built from the data
    public var labelFrom: UiA11yLabelFrom?
    /// Progress (0–1) to show, still, under prefers-reduced-motion; 1 is the rest state
    public var reducedMotionAt: Double?

    enum CodingKeys: String, CodingKey {
        case role = "role"
        case keyboard = "keyboard"
        case labelFrom = "labelFrom"
        case reducedMotionAt = "reducedMotionAt"
    }

    public init(
        role: String? = nil,
        keyboard: [String: String] = [:],
        labelFrom: UiA11yLabelFrom? = nil,
        reducedMotionAt: Double? = nil
    ) {
        self.role = role
        self.keyboard = keyboard
        self.labelFrom = labelFrom
        self.reducedMotionAt = reducedMotionAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.role = try container.decodeIfPresent(String.self, forKey: .role)
        self.keyboard = try container.decodeIfPresent([String: String].self, forKey: .keyboard) ?? [:]
        self.labelFrom = try container.decodeIfPresent(UiA11yLabelFrom.self, forKey: .labelFrom)
        self.reducedMotionAt = try container.decodeIfPresent(Double.self, forKey: .reducedMotionAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(role, forKey: .role)
        try container.encode(keyboard, forKey: .keyboard)
        try container.encodeIfPresent(labelFrom, forKey: .labelFrom)
        try container.encodeIfPresent(reducedMotionAt, forKey: .reducedMotionAt)
    }
}

public struct UiAestheticExample: Codable, Sendable, Equatable {
    public var componentTypeId: String
    public var props: [String: JsonValue]
    public var note: String?

    enum CodingKeys: String, CodingKey {
        case componentTypeId = "componentTypeId"
        case props = "props"
        case note = "note"
    }

    public init(
        componentTypeId: String,
        props: [String: JsonValue] = [:],
        note: String? = nil
    ) {
        self.componentTypeId = componentTypeId
        self.props = props
        self.note = note
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.componentTypeId = try container.decode(String.self, forKey: .componentTypeId)
        self.props = try container.decodeIfPresent([String: JsonValue].self, forKey: .props) ?? [:]
        self.note = try container.decodeIfPresent(String.self, forKey: .note)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(componentTypeId, forKey: .componentTypeId)
        try container.encode(props, forKey: .props)
        try container.encodeIfPresent(note, forKey: .note)
    }
}

public enum UiAestheticProfileMotionReducedMotion: String, Codable, Sendable, CaseIterable {
    case `static` = "static"
    case fade = "fade"
    case shorten = "shorten"
}

public struct UiAestheticProfileMotion: Codable, Sendable, Equatable {
    /// Name → CSS easing, e.g. { standard: 'cubic-bezier(.2,0,0,1)' }
    public var easing: [String: String]
    /// Name → milliseconds, e.g. { short: 120, long: 360 }
    public var durations: [String: Double]
    public var reducedMotion: UiAestheticProfileMotionReducedMotion

    enum CodingKeys: String, CodingKey {
        case easing = "easing"
        case durations = "durations"
        case reducedMotion = "reducedMotion"
    }

    public init(
        easing: [String: String] = [:],
        durations: [String: Double] = [:],
        reducedMotion: UiAestheticProfileMotionReducedMotion = .`static`
    ) {
        self.easing = easing
        self.durations = durations
        self.reducedMotion = reducedMotion
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.easing = try container.decodeIfPresent([String: String].self, forKey: .easing) ?? [:]
        self.durations = try container.decodeIfPresent([String: Double].self, forKey: .durations) ?? [:]
        self.reducedMotion = try container.decodeIfPresent(UiAestheticProfileMotionReducedMotion.self, forKey: .reducedMotion) ?? .`static`
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(easing, forKey: .easing)
        try container.encode(durations, forKey: .durations)
        try container.encode(reducedMotion, forKey: .reducedMotion)
    }
}

public enum UiAestheticProfileShapeElevation: String, Codable, Sendable, CaseIterable {
    case flat = "flat"
    case low = "low"
    case high = "high"
}

public enum UiAestheticProfileShapeDensity: String, Codable, Sendable, CaseIterable {
    case compact = "compact"
    case regular = "regular"
    case comfortable = "comfortable"
}

public struct UiAestheticProfileShape: Codable, Sendable, Equatable {
    /// Base radius, e.g. '10px'
    public var radius: String?
    public var borderWidth: String?
    public var elevation: UiAestheticProfileShapeElevation?
    public var density: UiAestheticProfileShapeDensity?

    enum CodingKeys: String, CodingKey {
        case radius = "radius"
        case borderWidth = "borderWidth"
        case elevation = "elevation"
        case density = "density"
    }

    public init(
        radius: String? = nil,
        borderWidth: String? = nil,
        elevation: UiAestheticProfileShapeElevation? = nil,
        density: UiAestheticProfileShapeDensity? = nil
    ) {
        self.radius = radius
        self.borderWidth = borderWidth
        self.elevation = elevation
        self.density = density
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.radius = try container.decodeIfPresent(String.self, forKey: .radius)
        self.borderWidth = try container.decodeIfPresent(String.self, forKey: .borderWidth)
        self.elevation = try container.decodeIfPresent(UiAestheticProfileShapeElevation.self, forKey: .elevation)
        self.density = try container.decodeIfPresent(UiAestheticProfileShapeDensity.self, forKey: .density)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(radius, forKey: .radius)
        try container.encodeIfPresent(borderWidth, forKey: .borderWidth)
        try container.encodeIfPresent(elevation, forKey: .elevation)
        try container.encodeIfPresent(density, forKey: .density)
    }
}

public struct UiAestheticProfile: Codable, Sendable, Equatable {
    public var profileVersion: Double
    /// The aesthetic's tokens (give tokens or themeId)
    public var tokens: ThemeTokens?
    /// A theme whose tokens to use instead of inline tokens
    public var themeId: String?
    /// Colour role → token path or CSS colour, e.g. { surface: 'colors.surface', accent: 'colors.accent', 'track-on': 'colors.primary' }
    public var roles: [String: String]
    public var motion: UiAestheticProfileMotion?
    public var shape: UiAestheticProfileShape?
    public var rules: [UiAestheticRule]
    public var references: [UiAestheticReference]
    /// Ids of checks to run on every component, e.g. 'contrast', 'hit-target', 'reduced-motion', 'look'
    public var checks: [String]
    /// Component type id → notes for that type, e.g. { table: 'No zebra striping' }
    public var overrides: [String: String]
    /// What to render on the aesthetic's contact sheet
    public var examples: [UiAestheticExample]

    enum CodingKeys: String, CodingKey {
        case profileVersion = "profileVersion"
        case tokens = "tokens"
        case themeId = "themeId"
        case roles = "roles"
        case motion = "motion"
        case shape = "shape"
        case rules = "rules"
        case references = "references"
        case checks = "checks"
        case overrides = "overrides"
        case examples = "examples"
    }

    public init(
        profileVersion: Double,
        tokens: ThemeTokens? = nil,
        themeId: String? = nil,
        roles: [String: String] = [:],
        motion: UiAestheticProfileMotion? = nil,
        shape: UiAestheticProfileShape? = nil,
        rules: [UiAestheticRule] = [],
        references: [UiAestheticReference] = [],
        checks: [String] = [],
        overrides: [String: String] = [:],
        examples: [UiAestheticExample] = []
    ) {
        self.profileVersion = profileVersion
        self.tokens = tokens
        self.themeId = themeId
        self.roles = roles
        self.motion = motion
        self.shape = shape
        self.rules = rules
        self.references = references
        self.checks = checks
        self.overrides = overrides
        self.examples = examples
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.profileVersion = try container.decode(Double.self, forKey: .profileVersion)
        self.tokens = try container.decodeIfPresent(ThemeTokens.self, forKey: .tokens)
        self.themeId = try container.decodeIfPresent(String.self, forKey: .themeId)
        self.roles = try container.decodeIfPresent([String: String].self, forKey: .roles) ?? [:]
        self.motion = try container.decodeIfPresent(UiAestheticProfileMotion.self, forKey: .motion)
        self.shape = try container.decodeIfPresent(UiAestheticProfileShape.self, forKey: .shape)
        self.rules = try container.decodeIfPresent([UiAestheticRule].self, forKey: .rules) ?? []
        self.references = try container.decodeIfPresent([UiAestheticReference].self, forKey: .references) ?? []
        self.checks = try container.decodeIfPresent([String].self, forKey: .checks) ?? []
        self.overrides = try container.decodeIfPresent([String: String].self, forKey: .overrides) ?? [:]
        self.examples = try container.decodeIfPresent([UiAestheticExample].self, forKey: .examples) ?? []
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(profileVersion, forKey: .profileVersion)
        try container.encodeIfPresent(tokens, forKey: .tokens)
        try container.encodeIfPresent(themeId, forKey: .themeId)
        try container.encode(roles, forKey: .roles)
        try container.encodeIfPresent(motion, forKey: .motion)
        try container.encodeIfPresent(shape, forKey: .shape)
        try container.encode(rules, forKey: .rules)
        try container.encode(references, forKey: .references)
        try container.encode(checks, forKey: .checks)
        try container.encode(overrides, forKey: .overrides)
        try container.encode(examples, forKey: .examples)
    }
}

public struct UiAestheticRef: Codable, Sendable, Equatable {
    /// The aesthetic skill's id, e.g. 'glassmorphism'
    public var skillId: String
    /// The skill's semver; absent means the latest
    public var version: String?
    /// The skill's contentHash when the thing was made
    public var contentHash: String?

    enum CodingKeys: String, CodingKey {
        case skillId = "skillId"
        case version = "version"
        case contentHash = "contentHash"
    }

    public init(
        skillId: String,
        version: String? = nil,
        contentHash: String? = nil
    ) {
        self.skillId = skillId
        self.version = version
        self.contentHash = contentHash
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.skillId = try container.decode(String.self, forKey: .skillId)
        self.version = try container.decodeIfPresent(String.self, forKey: .version)
        self.contentHash = try container.decodeIfPresent(String.self, forKey: .contentHash)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(skillId, forKey: .skillId)
        try container.encodeIfPresent(version, forKey: .version)
        try container.encodeIfPresent(contentHash, forKey: .contentHash)
    }
}

public struct UiAestheticReference: Codable, Sendable, Equatable {
    public var id: String
    /// Path in the skill folder, e.g. 'references/cards.png'
    public var file: String
    /// What to take from it, and what not to
    public var note: String

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case file = "file"
        case note = "note"
    }

    public init(
        id: String,
        file: String,
        note: String
    ) {
        self.id = id
        self.file = file
        self.note = note
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.file = try container.decode(String.self, forKey: .file)
        self.note = try container.decode(String.self, forKey: .note)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(file, forKey: .file)
        try container.encode(note, forKey: .note)
    }
}

public struct UiAestheticRule: Codable, Sendable, Equatable {
    /// Stable id, so checks and look findings can point at the rule
    public var id: String
    /// One short statement, e.g. 'Only data is coloured; chrome stays neutral'
    public var text: String
    /// Whether a deterministic check enforces it (listed in checks)
    public var checkable: Bool

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case text = "text"
        case checkable = "checkable"
    }

    public init(
        id: String,
        text: String,
        checkable: Bool = false
    ) {
        self.id = id
        self.text = text
        self.checkable = checkable
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.text = try container.decode(String.self, forKey: .text)
        self.checkable = try container.decodeIfPresent(Bool.self, forKey: .checkable) ?? false
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(text, forKey: .text)
        try container.encode(checkable, forKey: .checkable)
    }
}

/// A colour role, e.g. surface, ink, accent, track-on (see UI_COLOR_ROLES)
///
/// Pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`
public typealias UiColorRole = String

public struct UiComponentContract: Codable, Sendable, Equatable {
    /// JSON Schema for props (or, for an engine, its data)
    public var props: JsonSchemaDocument?
    public var state: [UiStateField]
    public var events: [UiEvent]
    public var a11y: UiA11y?
    /// The colour roles the component draws with
    public var colorRoles: [UiColorRole]
    /// Whether it follows the page motion contract (PageMotionInfoSchema)
    public var motion: Bool
    public var sizing: UiSizing?

    enum CodingKeys: String, CodingKey {
        case props = "props"
        case state = "state"
        case events = "events"
        case a11y = "a11y"
        case colorRoles = "colorRoles"
        case motion = "motion"
        case sizing = "sizing"
    }

    public init(
        props: JsonSchemaDocument? = nil,
        state: [UiStateField] = [],
        events: [UiEvent] = [],
        a11y: UiA11y? = nil,
        colorRoles: [UiColorRole] = [],
        motion: Bool = false,
        sizing: UiSizing? = nil
    ) {
        self.props = props
        self.state = state
        self.events = events
        self.a11y = a11y
        self.colorRoles = colorRoles
        self.motion = motion
        self.sizing = sizing
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.props = try container.decodeIfPresent(JsonSchemaDocument.self, forKey: .props)
        self.state = try container.decodeIfPresent([UiStateField].self, forKey: .state) ?? []
        self.events = try container.decodeIfPresent([UiEvent].self, forKey: .events) ?? []
        self.a11y = try container.decodeIfPresent(UiA11y.self, forKey: .a11y)
        self.colorRoles = try container.decodeIfPresent([UiColorRole].self, forKey: .colorRoles) ?? []
        self.motion = try container.decodeIfPresent(Bool.self, forKey: .motion) ?? false
        self.sizing = try container.decodeIfPresent(UiSizing.self, forKey: .sizing)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(props, forKey: .props)
        try container.encode(state, forKey: .state)
        try container.encode(events, forKey: .events)
        try container.encodeIfPresent(a11y, forKey: .a11y)
        try container.encode(colorRoles, forKey: .colorRoles)
        try container.encode(motion, forKey: .motion)
        try container.encodeIfPresent(sizing, forKey: .sizing)
    }
}

public struct UIComponentType: Codable, Sendable, Equatable {
    /// Slug, e.g., 'button'
    public var id: String
    /// e.g. 'Button'
    public var name: String
    /// Official description e.g. from Shadcn documentation
    public var `description`: String
    /// Freeform tags e.g. ['form', 'action']
    public var tags: [String]
    /// Absent means 'baseline'
    public var group: UiComponentGroup?
    public var contract: UiComponentContract?
    /// A type id to use where this one can't run (no WebGL, reduced motion)
    public var fallback: String?
    /// ISO timestamp
    public var createdAt: String
    /// ISO timestamp
    public var updatedAt: String

    enum CodingKeys: String, CodingKey {
        case id = "id"
        case name = "name"
        case `description` = "description"
        case tags = "tags"
        case group = "group"
        case contract = "contract"
        case fallback = "fallback"
        case createdAt = "createdAt"
        case updatedAt = "updatedAt"
    }

    public init(
        id: String,
        name: String,
        `description`: String,
        tags: [String],
        group: UiComponentGroup? = nil,
        contract: UiComponentContract? = nil,
        fallback: String? = nil,
        createdAt: String,
        updatedAt: String
    ) {
        self.id = id
        self.name = name
        self.`description` = `description`
        self.tags = tags
        self.group = group
        self.contract = contract
        self.fallback = fallback
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.name = try container.decode(String.self, forKey: .name)
        self.`description` = try container.decode(String.self, forKey: .`description`)
        self.tags = try container.decode([String].self, forKey: .tags)
        self.group = try container.decodeIfPresent(UiComponentGroup.self, forKey: .group)
        self.contract = try container.decodeIfPresent(UiComponentContract.self, forKey: .contract)
        self.fallback = try container.decodeIfPresent(String.self, forKey: .fallback)
        self.createdAt = try container.decode(String.self, forKey: .createdAt)
        self.updatedAt = try container.decode(String.self, forKey: .updatedAt)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(id, forKey: .id)
        try container.encode(name, forKey: .name)
        try container.encode(`description`, forKey: .`description`)
        try container.encode(tags, forKey: .tags)
        try container.encodeIfPresent(group, forKey: .group)
        try container.encodeIfPresent(contract, forKey: .contract)
        try container.encodeIfPresent(fallback, forKey: .fallback)
        try container.encode(createdAt, forKey: .createdAt)
        try container.encode(updatedAt, forKey: .updatedAt)
    }
}

/// Overrides or additions to the type's contract
public struct UiDescriptorContract: Codable, Sendable, Equatable {
    /// JSON Schema for props (or, for an engine, its data)
    public var props: JsonSchemaDocument?
    public var state: [UiStateField]
    public var events: [UiEvent]
    public var a11y: UiA11y?
    /// The colour roles the component draws with
    public var colorRoles: [UiColorRole]
    /// Whether it follows the page motion contract (PageMotionInfoSchema)
    public var motion: Bool
    public var sizing: UiSizing?

    enum CodingKeys: String, CodingKey {
        case props = "props"
        case state = "state"
        case events = "events"
        case a11y = "a11y"
        case colorRoles = "colorRoles"
        case motion = "motion"
        case sizing = "sizing"
    }

    public init(
        props: JsonSchemaDocument? = nil,
        state: [UiStateField] = [],
        events: [UiEvent] = [],
        a11y: UiA11y? = nil,
        colorRoles: [UiColorRole] = [],
        motion: Bool = false,
        sizing: UiSizing? = nil
    ) {
        self.props = props
        self.state = state
        self.events = events
        self.a11y = a11y
        self.colorRoles = colorRoles
        self.motion = motion
        self.sizing = sizing
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.props = try container.decodeIfPresent(JsonSchemaDocument.self, forKey: .props)
        self.state = try container.decodeIfPresent([UiStateField].self, forKey: .state) ?? []
        self.events = try container.decodeIfPresent([UiEvent].self, forKey: .events) ?? []
        self.a11y = try container.decodeIfPresent(UiA11y.self, forKey: .a11y)
        self.colorRoles = try container.decodeIfPresent([UiColorRole].self, forKey: .colorRoles) ?? []
        self.motion = try container.decodeIfPresent(Bool.self, forKey: .motion) ?? false
        self.sizing = try container.decodeIfPresent(UiSizing.self, forKey: .sizing)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(props, forKey: .props)
        try container.encode(state, forKey: .state)
        try container.encode(events, forKey: .events)
        try container.encodeIfPresent(a11y, forKey: .a11y)
        try container.encode(colorRoles, forKey: .colorRoles)
        try container.encode(motion, forKey: .motion)
        try container.encodeIfPresent(sizing, forKey: .sizing)
    }
}

public struct UiDescriptor: Codable, Sendable, Equatable {
    /// The component type id it implements, e.g. 'switch', or a new type such as 'gauge'
    public var implements: String
    /// For a new type: which group it belongs to
    public var group: UiComponentGroup?
    /// Overrides or additions to the type's contract
    public var contract: UiDescriptorContract?
    /// Platforms the provider can render it on
    public var platforms: [PlatformTarget]
    public var swiftReady: Bool?
    /// Example props or data, for previews and checks
    public var example: [String: JsonValue]?
    /// Changes whenever the item's output changes, so a sync can tell
    public var contentHash: String?

    enum CodingKeys: String, CodingKey {
        case implements = "implements"
        case group = "group"
        case contract = "contract"
        case platforms = "platforms"
        case swiftReady = "swiftReady"
        case example = "example"
        case contentHash = "contentHash"
    }

    public init(
        implements: String,
        group: UiComponentGroup? = nil,
        contract: UiDescriptorContract? = nil,
        platforms: [PlatformTarget] = [],
        swiftReady: Bool? = nil,
        example: [String: JsonValue]? = nil,
        contentHash: String? = nil
    ) {
        self.implements = implements
        self.group = group
        self.contract = contract
        self.platforms = platforms
        self.swiftReady = swiftReady
        self.example = example
        self.contentHash = contentHash
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.implements = try container.decode(String.self, forKey: .implements)
        self.group = try container.decodeIfPresent(UiComponentGroup.self, forKey: .group)
        self.contract = try container.decodeIfPresent(UiDescriptorContract.self, forKey: .contract)
        self.platforms = try container.decodeIfPresent([PlatformTarget].self, forKey: .platforms) ?? []
        self.swiftReady = try container.decodeIfPresent(Bool.self, forKey: .swiftReady)
        self.example = try container.decodeIfPresent([String: JsonValue].self, forKey: .example)
        self.contentHash = try container.decodeIfPresent(String.self, forKey: .contentHash)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(implements, forKey: .implements)
        try container.encodeIfPresent(group, forKey: .group)
        try container.encodeIfPresent(contract, forKey: .contract)
        try container.encode(platforms, forKey: .platforms)
        try container.encodeIfPresent(swiftReady, forKey: .swiftReady)
        try container.encodeIfPresent(example, forKey: .example)
        try container.encodeIfPresent(contentHash, forKey: .contentHash)
    }
}

public struct UiEvent: Codable, Sendable, Equatable {
    /// e.g. 'change', 'select', 'open'
    public var name: String
    /// A JSON Schema (draft 2020-12 or 7) as a JSON object, e.g. { type: 'object', properties: { … } }
    public var payload: JsonSchemaDocument?
    public var `description`: String?

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case payload = "payload"
        case `description` = "description"
    }

    public init(
        name: String,
        payload: JsonSchemaDocument? = nil,
        `description`: String? = nil
    ) {
        self.name = name
        self.payload = payload
        self.`description` = `description`
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.payload = try container.decodeIfPresent(JsonSchemaDocument.self, forKey: .payload)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(payload, forKey: .payload)
        try container.encodeIfPresent(`description`, forKey: .`description`)
    }
}

public struct UIExtractionResult: Codable, Sendable, Equatable {
    /// Clean extracted component code without markdown fences
    public var code: String
    /// Conversational explanation or summary after the code block
    public var postamble: String?
    /// Complete raw output from the model
    public var rawText: String?

    enum CodingKeys: String, CodingKey {
        case code = "code"
        case postamble = "postamble"
        case rawText = "rawText"
    }

    public init(
        code: String,
        postamble: String? = nil,
        rawText: String? = nil
    ) {
        self.code = code
        self.postamble = postamble
        self.rawText = rawText
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.code = try container.decode(String.self, forKey: .code)
        self.postamble = try container.decodeIfPresent(String.self, forKey: .postamble)
        self.rawText = try container.decodeIfPresent(String.self, forKey: .rawText)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(code, forKey: .code)
        try container.encodeIfPresent(postamble, forKey: .postamble)
        try container.encodeIfPresent(rawText, forKey: .rawText)
    }
}

public struct UIGenerationOptions: Codable, Sendable, Equatable {
    /// User prompt or instruction for component generation/modification
    public var prompt: String
    /// Existing component code for iterative modification
    public var currentCode: String?
    /// Target component platform language
    public var platform: PlatformLanguage
    /// Theme identifier or token reference
    public var theme: String?
    /// The ui-aesthetic skill to generate in; the generator loads it rather than a slug
    public var aesthetic: UiAestheticRef?
    /// Custom or override system prompt
    public var systemPrompt: String?
    /// Maximum retry attempts for iterative auto-repair validation
    public var maxRetries: Int
    /// Model temperature
    public var temperature: Double?

    enum CodingKeys: String, CodingKey {
        case prompt = "prompt"
        case currentCode = "currentCode"
        case platform = "platform"
        case theme = "theme"
        case aesthetic = "aesthetic"
        case systemPrompt = "systemPrompt"
        case maxRetries = "maxRetries"
        case temperature = "temperature"
    }

    public init(
        prompt: String,
        currentCode: String? = nil,
        platform: PlatformLanguage = .svelte,
        theme: String? = nil,
        aesthetic: UiAestheticRef? = nil,
        systemPrompt: String? = nil,
        maxRetries: Int = 3,
        temperature: Double? = nil
    ) {
        self.prompt = prompt
        self.currentCode = currentCode
        self.platform = platform
        self.theme = theme
        self.aesthetic = aesthetic
        self.systemPrompt = systemPrompt
        self.maxRetries = maxRetries
        self.temperature = temperature
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.prompt = try container.decode(String.self, forKey: .prompt)
        self.currentCode = try container.decodeIfPresent(String.self, forKey: .currentCode)
        self.platform = try container.decodeIfPresent(PlatformLanguage.self, forKey: .platform) ?? .svelte
        self.theme = try container.decodeIfPresent(String.self, forKey: .theme)
        self.aesthetic = try container.decodeIfPresent(UiAestheticRef.self, forKey: .aesthetic)
        self.systemPrompt = try container.decodeIfPresent(String.self, forKey: .systemPrompt)
        self.maxRetries = try container.decodeIfPresent(Int.self, forKey: .maxRetries) ?? 3
        self.temperature = try container.decodeIfPresent(Double.self, forKey: .temperature)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(prompt, forKey: .prompt)
        try container.encodeIfPresent(currentCode, forKey: .currentCode)
        try container.encode(platform, forKey: .platform)
        try container.encodeIfPresent(theme, forKey: .theme)
        try container.encodeIfPresent(aesthetic, forKey: .aesthetic)
        try container.encodeIfPresent(systemPrompt, forKey: .systemPrompt)
        try container.encode(maxRetries, forKey: .maxRetries)
        try container.encodeIfPresent(temperature, forKey: .temperature)
    }
}

public struct UIGenerationResult: Codable, Sendable, Equatable {
    /// Final validated component code
    public var code: String
    /// Conversational explanation or summary
    public var postamble: String?
    /// Complete raw model output
    public var rawText: String?
    /// Whether the final code passed validation
    public var isValid: Bool?
    /// Total number of generation/repair attempts
    public var validationAttempts: Int?
    /// Validation error if still failing after max retries
    public var validationError: String?

    enum CodingKeys: String, CodingKey {
        case code = "code"
        case postamble = "postamble"
        case rawText = "rawText"
        case isValid = "isValid"
        case validationAttempts = "validationAttempts"
        case validationError = "validationError"
    }

    public init(
        code: String,
        postamble: String? = nil,
        rawText: String? = nil,
        isValid: Bool? = nil,
        validationAttempts: Int? = nil,
        validationError: String? = nil
    ) {
        self.code = code
        self.postamble = postamble
        self.rawText = rawText
        self.isValid = isValid
        self.validationAttempts = validationAttempts
        self.validationError = validationError
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.code = try container.decode(String.self, forKey: .code)
        self.postamble = try container.decodeIfPresent(String.self, forKey: .postamble)
        self.rawText = try container.decodeIfPresent(String.self, forKey: .rawText)
        self.isValid = try container.decodeIfPresent(Bool.self, forKey: .isValid)
        self.validationAttempts = try container.decodeIfPresent(Int.self, forKey: .validationAttempts)
        self.validationError = try container.decodeIfPresent(String.self, forKey: .validationError)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(code, forKey: .code)
        try container.encodeIfPresent(postamble, forKey: .postamble)
        try container.encodeIfPresent(rawText, forKey: .rawText)
        try container.encodeIfPresent(isValid, forKey: .isValid)
        try container.encodeIfPresent(validationAttempts, forKey: .validationAttempts)
        try container.encodeIfPresent(validationError, forKey: .validationError)
    }
}

public enum UiSizingMode: String, Codable, Sendable, CaseIterable {
    case intrinsic = "intrinsic"
    case fill = "fill"
}

public struct UiSizing: Codable, Sendable, Equatable {
    public var mode: UiSizingMode
    /// CSS px
    public var minWidth: Double?
    /// CSS px
    public var minHeight: Double?
    /// width / height, for components that keep a shape
    public var aspectRatio: Double?

    enum CodingKeys: String, CodingKey {
        case mode = "mode"
        case minWidth = "minWidth"
        case minHeight = "minHeight"
        case aspectRatio = "aspectRatio"
    }

    public init(
        mode: UiSizingMode = .intrinsic,
        minWidth: Double? = nil,
        minHeight: Double? = nil,
        aspectRatio: Double? = nil
    ) {
        self.mode = mode
        self.minWidth = minWidth
        self.minHeight = minHeight
        self.aspectRatio = aspectRatio
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.mode = try container.decodeIfPresent(UiSizingMode.self, forKey: .mode) ?? .intrinsic
        self.minWidth = try container.decodeIfPresent(Double.self, forKey: .minWidth)
        self.minHeight = try container.decodeIfPresent(Double.self, forKey: .minHeight)
        self.aspectRatio = try container.decodeIfPresent(Double.self, forKey: .aspectRatio)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(mode, forKey: .mode)
        try container.encodeIfPresent(minWidth, forKey: .minWidth)
        try container.encodeIfPresent(minHeight, forKey: .minHeight)
        try container.encodeIfPresent(aspectRatio, forKey: .aspectRatio)
    }
}

public struct UiStateField: Codable, Sendable, Equatable {
    /// The controlled value's prop name, e.g. 'checked', 'value', 'progress'
    public var name: String
    /// A JSON Schema (draft 2020-12 or 7) as a JSON object, e.g. { type: 'object', properties: { … } }
    public var schema: JsonSchemaDocument?
    /// The event fired when it changes, e.g. 'change'
    public var event: String?
    public var `description`: String?

    enum CodingKeys: String, CodingKey {
        case name = "name"
        case schema = "schema"
        case event = "event"
        case `description` = "description"
    }

    public init(
        name: String,
        schema: JsonSchemaDocument? = nil,
        event: String? = nil,
        `description`: String? = nil
    ) {
        self.name = name
        self.schema = schema
        self.event = event
        self.`description` = `description`
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.name = try container.decode(String.self, forKey: .name)
        self.schema = try container.decodeIfPresent(JsonSchemaDocument.self, forKey: .schema)
        self.event = try container.decodeIfPresent(String.self, forKey: .event)
        self.`description` = try container.decodeIfPresent(String.self, forKey: .`description`)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(name, forKey: .name)
        try container.encodeIfPresent(schema, forKey: .schema)
        try container.encodeIfPresent(event, forKey: .event)
        try container.encodeIfPresent(`description`, forKey: .`description`)
    }
}

public struct UIValidationResult: Codable, Sendable, Equatable {
    /// Whether the component passed syntax and linter validation
    public var valid: Bool
    /// Error output from validation if failed
    public var error: String?
    /// List of parsed validation errors
    public var errors: [String]?
    /// Prettier-formatted component code if available
    public var formattedCode: String?

    enum CodingKeys: String, CodingKey {
        case valid = "valid"
        case error = "error"
        case errors = "errors"
        case formattedCode = "formattedCode"
    }

    public init(
        valid: Bool,
        error: String? = nil,
        errors: [String]? = nil,
        formattedCode: String? = nil
    ) {
        self.valid = valid
        self.error = error
        self.errors = errors
        self.formattedCode = formattedCode
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.valid = try container.decode(Bool.self, forKey: .valid)
        self.error = try container.decodeIfPresent(String.self, forKey: .error)
        self.errors = try container.decodeIfPresent([String].self, forKey: .errors)
        self.formattedCode = try container.decodeIfPresent(String.self, forKey: .formattedCode)
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(valid, forKey: .valid)
        try container.encodeIfPresent(error, forKey: .error)
        try container.encodeIfPresent(errors, forKey: .errors)
        try container.encodeIfPresent(formattedCode, forKey: .formattedCode)
    }
}

public struct VisualQAAudit: Codable, Sendable, Equatable {
    /// Whether visual QA passed all criteria
    public var passed: Bool
    public var checks: SvgValidationCheck?
    /// Number of frame slices captured and audited
    public var frameSlicesCount: Int?
    /// Issues detected during static or multimodal visual audit
    public var issues: [String]
    /// Refinement suggestions applied or needed
    public var recommendations: [String]

    enum CodingKeys: String, CodingKey {
        case passed = "passed"
        case checks = "checks"
        case frameSlicesCount = "frameSlicesCount"
        case issues = "issues"
        case recommendations = "recommendations"
    }

    public init(
        passed: Bool,
        checks: SvgValidationCheck? = nil,
        frameSlicesCount: Int? = nil,
        issues: [String] = [],
        recommendations: [String] = []
    ) {
        self.passed = passed
        self.checks = checks
        self.frameSlicesCount = frameSlicesCount
        self.issues = issues
        self.recommendations = recommendations
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.passed = try container.decode(Bool.self, forKey: .passed)
        self.checks = try container.decodeIfPresent(SvgValidationCheck.self, forKey: .checks)
        self.frameSlicesCount = try container.decodeIfPresent(Int.self, forKey: .frameSlicesCount)
        self.issues = try container.decodeIfPresent([String].self, forKey: .issues) ?? []
        self.recommendations = try container.decodeIfPresent([String].self, forKey: .recommendations) ?? []
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(passed, forKey: .passed)
        try container.encodeIfPresent(checks, forKey: .checks)
        try container.encodeIfPresent(frameSlicesCount, forKey: .frameSlicesCount)
        try container.encode(issues, forKey: .issues)
        try container.encode(recommendations, forKey: .recommendations)
    }
}
