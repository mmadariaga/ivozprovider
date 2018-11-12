import Property from '@shared/models/Property';
import Criteria from './Criteria';
import Entity from './Entity';

export default class Collection {

    private context: string;
    private model: string;
    private properties: Property[];

    private totalItems: number = 0;
    private items: any[] = [];

    private criteria: Criteria;

    constructor(response: any, modelSpec: any) {

        this.context = response['@context'];
        this.totalItems = response['hydra:totalItems'];
        this.items = response['hydra:member'];
        this.model = modelSpec.model;

        this.setProperties(modelSpec.properties);
        this.setCriteria(response['hydra:search']);
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

    private setItems(items): void {
        this.items = [];
        for (const item in items) {
            this.items.push(new Entity(item));
        }
    }

    private setCriteria(queryStringSpec) {
        this.criteria = new Criteria(queryStringSpec);
    }
}