export interface OperationInterface {
    readonly successesponseCode: number
    readonly model?: string
    readonly properties?: Array<string>
    readonly filterFields?: Array<string>
    readonly sortableFields?: Array<string>
    readonly actions: Array<any>
};

export default class Operation implements OperationInterface {

    readonly successesponseCode: number
    readonly model?: string
    readonly properties?: Array<string>
    readonly filterFields?: Array<string>
    readonly sortableFields?: Array<string>
    readonly actions: Array<any> = [];

    constructor({
        successesponseCode,
        model,
        properties,
        filterFields,
        sortableFields,
        actions
    }: OperationInterface) {

        this.successesponseCode = successesponseCode
        this.model = model
        this.properties = properties
        this.filterFields = filterFields;
        this.sortableFields = sortableFields;
        this.actions = actions || [];
    }
}
