import React from 'react';

import BooleanInputFactory from './input/BooleanInputFactory';
import NumberInputFactory from './input/NumberInputFactory';
import StringInputFactory from './input/StringInputFactory';
import ObjectInputFactory from './input/ObjectInputFactory';

import { DisabledInput } from 'react-admin';

export default (props: any) => {

    const {detailed, referableResources, ...rest} = props;
    const spec = props.spec;

    if (spec.readOnly) {
        return (
            <DisabledInput key={spec.name} source={spec.name} />
        );
    }

    const isEntity = spec.model && spec.model.indexOf('_') === -1;

    // @see https://swagger.io/docs/specification/data-models/data-types/
    let type = isEntity
        ? 'entity'
        : spec.type;

    switch (type) {
        case 'string':
             return StringInputFactory(rest);
        case 'number':
        case 'integer':
            return NumberInputFactory(rest);
        case 'boolean':
            return BooleanInputFactory(rest);
        case 'entity':
        case 'object':
            return ObjectInputFactory({...rest, referableResources});
        case 'array':
        default:
            break;
    }

    console.error(`Unexpected field type: ${type}`, props);
}