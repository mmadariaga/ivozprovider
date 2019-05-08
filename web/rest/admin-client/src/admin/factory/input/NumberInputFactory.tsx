import { NumberInput } from 'react-admin';
import React from 'react';

export default (props: any) => {

    const {
        spec,
        ...rest
    } = props;

    // @see https://swagger.io/docs/specification/data-models/data-types/#number
    // @see https://marmelab.com/react-admin/Fields.html#numberfield
    switch(spec.format) {

        case 'float':
        case 'double-time':
        case 'int32':
        case 'int64':
        default:
            return (
                <NumberInput source={spec.name} label={spec.name} {...rest} />
            );
    }
}

