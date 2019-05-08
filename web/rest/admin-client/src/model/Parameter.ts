export interface ParameterInterface {
    name: string
    in: string
    required: boolean
    type: string
    description?: string
    schema?: Object
};

export default class Parameter implements ParameterInterface {

    name: string
    in: string
    required: boolean
    type: string
    description?: string
    schema?: Object

    constructor({
        name,
        in: location,
        required,
        type,
        description,
        schema
    }: ParameterInterface) {
        this.name = name
        this.in = location
        this.required = required
        this.type = type
        this.description = description
        this.schema = schema
    }
}
