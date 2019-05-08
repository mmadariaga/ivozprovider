import React from 'react';

import { ReferenceField, TextField } from 'react-admin';
import EntityField from './EntityField';

export default (props: any) => {

    const {label, spec, referableResources = [], ...rest} = props;

    const hasEndpoint = referableResources.includes(spec.model);
    if (!hasEndpoint) {
        return <TextField label={label} source={spec.name} spec={spec} {...rest} />;
    }

    return (
        <ReferenceField label={label} source={spec.name} reference={spec.model} spec={spec} linkType="show" {...rest}>
            <EntityField />
        </ReferenceField>
    );
}
