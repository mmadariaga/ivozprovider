export interface FieldInterface {

    readonly context: string
    readonly name: string
    readonly type: string

    readonly model?: string
    readonly format?: string
    readonly properties?: Array<any>
    readonly readOnly?: string
    readonly minimun?: number
    readonly maxLength?: number
    readonly default?: string
    readonly description?: string
}

export default class Field implements FieldInterface {

    readonly context: string
    readonly name: string
    readonly type: string

    readonly model?: string
    readonly format?: string
    readonly properties?: Array<any>
    readonly readOnly?: string
    readonly minimun?: number
    readonly maxLength?: number
    readonly default?: string
    readonly description?: string

    constructor({
        context,
        name,
        type,
        model,
        format,
        properties,
        readOnly,
        minimun,
        maxLength,
        default: defaultValue,
        description
    }: FieldInterface) {

        this.context = context
        this.name = name
        this.type = type
        this.model = model
        this.format = format
        this.properties = properties
        this.readOnly = readOnly
        this.minimun = minimun
        this.maxLength = maxLength
        this.default = defaultValue
        this.description = description
    }
}
