import React from 'react';

///////////////////////////////////////////
//
///////////////////////////////////////////

export interface PathParameterInterface {
    name: string,
    in: string,
    required: boolean,
    type: string,
}

export interface PathEndpoint {
    produces: Array<string>,
    responses: Object,
    tags: Array<string>,
    operationId: string,
    summary: string,
    parameters: Array<Object>
}

export interface PathInterface {
    get?: PathEndpoint,
    post?: PathEndpoint,
    put?: PathEndpoint,
    delete?: PathEndpoint,
}

export interface PathListInterface {
    [name: string]: PathInterface
}

export interface DefinitionInterface {
    properties: Object
}

export interface DefinitionListInterface {
    [name: string]: DefinitionInterface
}

export interface InfoInterface {
    title: string,
    version: string,
    description: string
}

export interface SwaggerSpecInterface {
    swagger: string,
    basePath: string,
    info: InfoInterface,
    paths: PathListInterface
    definitions: DefinitionListInterface
}

///////////////////////////////////////////
//
///////////////////////////////////////////

export interface FilterFieldListInterface {
    [field:string]: Array<string>
}

export interface EntityPropertyInterface {
    [name:string]: any
}

export interface EntitySpecInterface {
    basePath: any
    icon?: React.ReactElement;
    list?: any,
    show?: any,
    create?: any,
    edit?: any,
    delete?: any,
    properties: EntityPropertyInterface
}

export interface EntitySpecListInterface {
    [name:string]: EntitySpecInterface
}
