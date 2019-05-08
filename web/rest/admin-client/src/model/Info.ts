export interface InfoInterface {
    readonly title: string
    readonly version: string
    readonly description: string
}

export default class Info implements InfoInterface {

    readonly title: string
    readonly version: string
    readonly description: string

    constructor({
        title,
        version,
        description
    }: InfoInterface) {

        this.title = title
        this.version = version
        this.description = description
    }
}
