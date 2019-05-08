import React from 'react';
import { Edit } from 'react-admin';

import Resource from '../../model/Resource';
import TabbedInputFormFactory from './TabbedInputFormFactory';

export default (resource: Resource, referableResources: Array<string>) => {

    if (!resource.edit) {
        return null;
    }

    const TabbedForm = TabbedInputFormFactory(
        resource,
        referableResources,
        resource.edit.properties || []
    );

    return (props: any) => {
        return (
            <Edit {...props}>
                {TabbedForm(props)}
            </Edit>
        );
    };
}
