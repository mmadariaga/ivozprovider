export default class Property {

    name: string;

    type: string;
    description: string;

    default?: string;
    readOnly?: boolean;
    ref?: string;

    required: boolean;

    constructor(name:string, spec: any) {

        this.name = name;
        this.type = spec.$ref
            ? spec.$ref.split('/').pop()
            : spec.type;
        this.readOnly = spec.readOnly || false;
        this.default = spec.default || '';
        this.required = spec.required || false;

        this.description = spec.description;
    }
}