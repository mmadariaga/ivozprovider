import pluralize from "pluralize";

import {
    SwaggerSpecInterface,
    EntitySpecInterface,
    EntitySpecListInterface,
    EntityPropertyInterface,
    PathParameterInterface,
    FilterFieldListInterface
} from './interfaces';

function parseSpec(apiSpec: SwaggerSpecInterface): EntitySpecListInterface {

    let response: EntitySpecListInterface = {};
    for (let entityName in apiSpec.definitions) {

        const entityNameRoot: string = entityName.split('-').shift() || '';
        if (response[entityNameRoot]) {
            continue;
        }

        const basePath = getEntityBasePath(entityNameRoot);
        if (!apiSpec.paths[`/${basePath}`]) {
            continue;
        }

        const entitySpec = getEntitySpec(
            basePath,
            apiSpec
        );

        response[entityNameRoot] = {
            ...entitySpec,
            basePath
        }
    }

    return response;
}

export default parseSpec;

function getEntityBasePath(entityNameRoot: string): string {

    const pluralized = pluralize(entityNameRoot);
    const underScored = pluralized.replace(/([A-Z])/g, $1 => {
        return "_" + $1.toLowerCase();
    });

    return underScored.slice(1);
}

function getEntitySpec(entity: string, apiSpec: SwaggerSpecInterface): EntitySpecInterface {

    const pattern = `^/${entity}(/.*)?$`;
    const regExp = new RegExp(pattern);

    const entityPaths = Object
        .keys(apiSpec.paths)
        .filter(path  => {
            return path.search(regExp) === 0;
        });

    let response: EntitySpecInterface = {
        basePath: '',
        properties: {}
    };

    for (let path of entityPaths) {

        if (path.indexOf('{id}') > 0) {

            let pathSpec = apiSpec.paths[path];
            let isBinaryResponse =
                pathSpec.get
                && pathSpec.get.produces.includes('application/octet-stream');

            if (isBinaryResponse) {
                console.log('skiping binary path', path);
            }

            if (apiSpec.paths[path].get && !isBinaryResponse) {
                response.show = cleanUpUnnecesasaryAttributes(apiSpec.paths[path].get);
            }
            if (apiSpec.paths[path].put) {
                response.edit = cleanUpUnnecesasaryAttributes(apiSpec.paths[path].put);
            }
            if (apiSpec.paths[path].delete) {
                response.delete = cleanUpUnnecesasaryAttributes(apiSpec.paths[path].delete);
            }

            continue;
        }

        if (apiSpec.paths[path].get) {
            response.list  = cleanUpUnnecesasaryAttributes(apiSpec.paths[path].get, true);
        }
        if (apiSpec.paths[path].post) {
            response.create  = cleanUpUnnecesasaryAttributes(apiSpec.paths[path].post);
        }
    }

    const entitySpec = resolvePathDefinitionsRecursively(response, apiSpec);

    return entityPropertyUnifier(entitySpec);
}

function resolvePathDefinitionsRecursively(value: any, apiSpec: SwaggerSpecInterface): EntitySpecInterface {

    for (let idx in value) {

        if (idx === '$ref') {

            const ref = value.$ref.split('/').pop();
            value.model = ref;
            value.type = 'object';
            value.properties = resolvePathDefinitionsRecursively(
                deepClone(apiSpec.definitions[ref].properties),
                apiSpec
            );
            delete value.description;
            delete value.$ref;

            continue;
        }

        if (typeof value[idx] === 'object') {
            resolvePathDefinitionsRecursively(value[idx], apiSpec);
        }
    }

    return value;
}

function entityPropertyUnifier(entitySpec: EntitySpecInterface) {

    let properties:EntityPropertyInterface = {};

    let action: keyof EntitySpecInterface;
    for (action in entitySpec) {

        if (!entitySpec[action]) {
            continue
        }

        if (!entitySpec[action].properties) {
            continue;
        }

        for (const idx in entitySpec[action].properties) {
            properties[idx] = {
                ...properties[idx],
                ...entitySpec[action].properties[idx]
            };
        }

        entitySpec[action].properties = Object.keys(
            entitySpec[action].properties
        );
    }
    entitySpec.properties = properties;

    return entitySpec;
}

function cleanUpUnnecesasaryAttributes(spec: any, parseParameters = false) {

    if (spec.tags) {
        delete spec.tags;
    }

    if (spec.operationId) {
        delete spec.operationId;
    }

    if (spec.summary) {
        delete spec.summary;
    }

    if (spec.consumes) {
        delete spec.consumes;
    }

    if (spec.produces) {
        delete spec.produces;
    }

    if (spec.parameters) {
        if (parseParameters) {
            spec.sortableFields = getSortableFields(spec.parameters);
            spec.filterFields = getFilterFields(spec.parameters);
        }

        delete spec.parameters;
    }

    for (const responseCode in spec.responses) {
        const intResponseCode = parseInt(responseCode, 10);

        if (intResponseCode >= 200 && intResponseCode < 300) {
            const response = spec.responses[responseCode];

            spec.successesponseCode = intResponseCode;
            if (!response.schema) {
                break;
            }

            if (response.schema.$ref) {
                spec.$ref = response.schema.$ref;
            } else if (response.schema.items && response.schema.items.$ref) {
                spec.$ref = response.schema.items.$ref;
            }
            break;
        }
    }
    delete spec.responses;

    return {...spec};
}

function getSortableFields(parameters: Array<PathParameterInterface>) {

    const sortableFields = parameters.filter(_ => {
        return _.name.indexOf('_order') === 0;
    });

    const fieldNameMatch = new RegExp(/_order\[([^\]]*)\]/);
    return sortableFields
        .map((_:PathParameterInterface) => {
            let [, fldName] = fieldNameMatch.exec(_.name) || ['', ''];
            return fldName;
        })
        .filter(_ => _);
}

function getFilterFields(parameters: Array<PathParameterInterface>) {

    const filterFields: Array<string> =
        parameters
            .filter(_ => {
                return (_.name.indexOf('_') !== 0)
                    && (_.in === 'query');
            })
            .map(fld => fld.name);

    const filterSegments = new RegExp(/([^[]+)\[(.*)\]/);
    const fields: FilterFieldListInterface = {};

    filterFields.forEach(filterField => {
        const segments = filterSegments.exec(filterField) || ['', filterField, 'eq'];
        let [,fldName, action] = segments;
        if (!fields[fldName]) {
            fields[fldName] = [];
        }
        fields[fldName].push(action);
    });

    return fields;
}


function deepClone(value: Object) {
    return JSON.parse(JSON.stringify(value));
}
