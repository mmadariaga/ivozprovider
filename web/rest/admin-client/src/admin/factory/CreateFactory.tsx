import React from 'react';
import { Create } from 'react-admin';

import Resource from '../../model/Resource';
import TabbedInputFormFactory from './TabbedInputFormFactory';

export default (resource: Resource, referableResources: Array<string>) => {

    if (!resource.create) {
        return null;
    }

    const TabbedForm = TabbedInputFormFactory(
        resource,
        referableResources,
        resource.create.properties || [],
        true
    );

    return (props: any) => {

        return (
            <Create {...props}>
                {TabbedForm(props)}
            </Create>
        );
    };
}
