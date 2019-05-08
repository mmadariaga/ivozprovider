import React from 'react';
import { TabbedForm, FormTab, Toolbar, SaveButton } from 'react-admin';

import Resource from '../../model/Resource';
import InputFactory from './InputFactory';

export default (resource: Resource, referableResources: Array<string>, properties: Array<string>, newRecord: Boolean = false) => {

    const propertiesByContext = properties.reduce(
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

    const ToolbarFactory = (props: any) => {

        if (newRecord) {
            return (
                <Toolbar {...props} >
                    <SaveButton
                        label="ra.action.save"
                    />
                    <SaveButton
                        label="ra.action.save_and_add"
                        redirect={false}
                        submitOnEnter={false}
                        variant="flat"
                    />
                </Toolbar>
            );
        }

        return (
            <Toolbar {...props} >
                <SaveButton
                    label="ra.action.save"
                />
            </Toolbar>
        );
    };

    return (props: any) => {

        return (
            <TabbedForm toolbar={<ToolbarFactory />}>
                {Object.keys(propertiesByContext).map((context, idx) => {
                    return (
                        <FormTab label={context} key={context}>
                            {propertiesByContext[context].map(
                                (field: string, key: string) => {

                                    const property = resource.properties[field];
                                    if (props.skipReadOnly && property.readOnly) {
                                        return null;
                                    }

                                    return InputFactory({
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
            </TabbedForm>
        );
    };
}
