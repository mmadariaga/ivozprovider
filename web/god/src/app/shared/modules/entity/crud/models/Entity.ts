export default class Entity {

    private endpoint: string;
    private type: string;

    private attributes = {};

    constructor(data) {

        this.endpoint = data['@id'];
        this.type = data['@type'];

        const attributes = Object.keys(data).filter((attribute) => {
            return attribute[0] !== '@';
        });

        for (let attibute of attributes) {
            this.attributes[attibute] = data[attibute];
        }
    }

    public getEndpoint(): string {
        return this.endpoint;
    }

    public getType(): string {
        return this.type;
    }

    public get(attributeName: string): any {
        const targetKey = Object
            .keys(this.attributes)
            .filter(attribute => (attributeName === attribute));

        if (targetKey.length < 1) {
            throw Error(`Property ${attributeName} was not found`);
        }

        return this.attributes[attributeName];
    }

    public getAttributes() {
        return this.attributes;
    }
}