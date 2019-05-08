import React from 'react';
import EmbeddableField from './EmbeddableField';
import FieldFactory from '../FieldFactory';
import Field from '../../../model/Field';

export default (props: any) => {

    const {spec} = props;

    const subProperties = spec.properties
        ? Object.getOwnPropertyNames(spec.properties)
        : [];

    const embeddedChildren = subProperties.map((propertyName, idx) => {

        const key = `${spec.model}-${propertyName}-${idx}`;

        return FieldFactory({
            spec: new Field({
                context: spec.context,
                name: propertyName,
                ...spec.properties[propertyName]
            }),
            sortable: false,
            key
        });
    });

    return (
        <div key={spec.model}>
            <div>
                <h1>{spec.model.split("_").pop()}</h1>
            </div>
            <EmbeddableField {...props}>
                {embeddedChildren}
            </EmbeddableField>
        </div>
    );
}
