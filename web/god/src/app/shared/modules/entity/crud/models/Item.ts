import Property from '@shared/models/Property';
import Criteria from './Criteria';
import Entity from './Entity';

export default class Item {

    private context: string;
    private entity: Entity;
    private spec: Object;
    private model: string;
    private properties: Property[];

    constructor(response: any, modelSpec: any, entitySpec: Object) {

        this.context = response['@context'];
        this.entity = new Entity(response);
        this.spec = entitySpec;
        this.model = modelSpec.model;

        this.setProperties(modelSpec.properties);
    }

    public getEntity(): Entity {
        return this.entity;
    }

    public getModel(): string {
        return this.model;
    }

    public getSpec(): Object {
        return this.spec;
    }

    public getProperties(): Property[] {
        return this.properties;
    }

    private setProperties(properties): void {
        this.properties = [];
        for (const property in properties) {

            if (property === 'id') {
                continue;
            }

            this.properties.push(
                new Property(property, properties[property])
            );
        }
    }
}