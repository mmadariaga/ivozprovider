import Field from "../model/Field";
import Operation from "../model/Operation";
import Resource from "../model/Resource";
import Info from "../model/Info";
import Api from "../model/Api";

import parseSpec from "./specParser";
import sortPropertiesByContext from "./propertySorterByContext";

import {SwaggerSpecInterface} from './interfaces';
var merge = require('lodash.merge');

export default function(response: SwaggerSpecInterface, specOverwrite:any = {}) {

    const spec =  parseSpec(response);
    const resources = [];

    for (const entityName in spec) {

        const entitySpec = spec[entityName];

        for (const name in entitySpec.properties) {

            const propertySpec = entitySpec.properties[name];

            if (!propertySpec.type) {
                console.error(`${entityName}.${name}: Property type is required`);
            }

            const isEmbeddedProperty = propertySpec.model && propertySpec.model.indexOf('_') !== -1;
            const context = isEmbeddedProperty
                ? propertySpec.model.split('_').pop()
                : entityName;

            entitySpec.properties[name] = new Field({
                ...propertySpec,
                context,
                name
            });
        }

        sortPropertiesByContext(entitySpec);

        if (entitySpec.list) {
            entitySpec.list = new Operation(entitySpec.list);
        }

        if (entitySpec.show) {
            entitySpec.show = new Operation(entitySpec.show);
        }

        if (entitySpec.create) {
            entitySpec.create = new Operation(entitySpec.create);
        }

        if (entitySpec.edit) {
            entitySpec.edit = new Operation(entitySpec.edit);
        }

        if (entitySpec.delete) {
            entitySpec.delete = new Operation(entitySpec.delete);
        }

        const resourceOverwrite = specOverwrite[entityName] || {};
        const resourceSpec = merge(
            entitySpec,
            {name: entityName},
            resourceOverwrite
        );

        resources.push(new Resource(resourceSpec));
    }

    return new Api({
        specification: 'OpenAPI',
        specVersion: response.swagger,
        basePath: response.basePath,
        info: new Info(response.info),
        resources: resources,
    });
}


