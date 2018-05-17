export default class Criteria {

    private template;

    private mapping;

    constructor(queryStringSpec) {
        this.template = queryStringSpec['hydra:template'];
        this.mapping = queryStringSpec['hydra:hydra:mapping'];
    }
}