import React from 'react';
import { TabbedShowLayout, FormTab } from 'react-admin';

import Resource from '../../model/Resource';
import FieldFactory from './FieldFactory';

interface PropertiesByContextInterface {
    [context: string]: string[]
}

export default (resource: Resource, referableResources: Array<string>, properties: Array<string>) => {

    const propertiesByContext: PropertiesByContextInterface = properties.reduce(
        (acc: any, field: string) => {
            const context = resource.properties[field].context;

            if (!acc[context]) {
                acc[context] = [];
            }
            acc[context].push(field);

            return acc;
        },
        {}
    );

    return (props: any) => {

        return (
            <TabbedShowLayout>
                {Object.keys(propertiesByContext).map((context) => {
                    return (
                        <FormTab label={context} key={context}>
                            {propertiesByContext[context].map(
                                (field: string, key: number) => {

                                    const property = resource.properties[field];
                                    if (props.skipReadOnly && property.readOnly) {
                                        return null;
                                    }

                                    return FieldFactory({
                                        key,
                                        label: property.name,
                                        name: property.name,
                                        spec: property,
                                        detailed: true,
                                        resource: props.resource,
                                        referableResources
                                    });
                                }
                            )}
                        </FormTab>
                    );
                })}
            </TabbedShowLayout>
        );
    };
}
