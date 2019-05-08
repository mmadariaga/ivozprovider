import { BooleanField } from 'react-admin';

import React from 'react';

export default (props: any) => {

    const {
        spec,
        ...rest
    } = props;

    return (
        <BooleanField source={spec.name} {...rest} />
    );
}
