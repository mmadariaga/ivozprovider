import React from 'react';
import { Show } from 'react-admin';

import Resource from '../../model/Resource';
import TabbedFormFieldFactory from './TabbedShowFactory';

export default (resource: Resource, referableResources: Array<string>) => {

    if (!resource.show) {
        return null;
    }

    const TabbedForm = TabbedFormFieldFactory(
        resource,
        referableResources,
        resource.show.properties || []
    );

    return (props: any) => {

        return (
            <Show {...props}>
                {TabbedForm(props)}
            </Show>
        );
    };
}
