import React from 'react';
import { EntitySpecInterface, EntityPropertyInterface } from './../parser/interfaces';
import Operation from './Operation';

export interface ResourceInterface extends EntitySpecInterface {
    iden: string;
    name: string;
    recordToString: (record: any) => string;
};

export default class Resource implements ResourceInterface {
    iden: string;
    name: string;
    basePath: string
    properties: EntityPropertyInterface
    recordToString: (record: any) => string;
    icon?: React.ReactElement
    list?: Operation
    show?: Operation
    create?: Operation
    edit?: Operation
    delete?: Operation

    constructor({
        iden,
        name,
        basePath,
        properties,
        recordToString,
        icon,
        list,
        show,
        create,
        edit,
        delete: deleteOperation
    }: ResourceInterface) {
        this.iden = iden;
        this.name = name
        this.basePath = basePath
        this.properties = properties
        this.icon = icon;
        this.list = list
        this.show = show
        this.create = create
        this.edit = edit
        this.delete = deleteOperation

        this.recordToString = recordToString
            ? recordToString
            : this.fallbackRecordToString;
    }

    private fallbackRecordToString(record: any): string {
        return record.id || ''
    }
}
