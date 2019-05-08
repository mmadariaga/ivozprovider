import { BooleanInput } from 'react-admin';

import React from 'react';

export default (props: any) => {

    const {
        spec,
        ...rest
    } = props;

    return (
        <BooleanInput source={spec.name} {...rest} />
    );
}
