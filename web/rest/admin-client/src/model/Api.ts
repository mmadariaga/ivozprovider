import Resource from "./Resource"
import Info from "./Info"

export interface ApiInterface {
    readonly specification: string
    readonly specVersion: string
    readonly basePath: string
    readonly info: Info
    readonly resources: Resource[]
}

export default class Api implements ApiInterface {

    readonly specification: string
    readonly specVersion: string
    readonly basePath: string
    readonly info: Info
    readonly resources: Resource[]

    constructor ({
        specification,
        specVersion,
        basePath,
        info,
        resources
    }: ApiInterface) {

        this.specification = specification
        this.specVersion = specVersion
        this.basePath = basePath
        this.info = info
        this.resources = resources
    }
}
