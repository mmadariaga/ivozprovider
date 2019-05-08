import React from 'react';
import InputFactory from '../InputFactory';
import Field from '../../../model/Field';

export default (props: any) => {

    const {spec} = props;

    const subProperties = Object.getOwnPropertyNames(spec.properties);
    const embeddedChildren = subProperties.map((propertyName, idx) => {

        const key = `${spec.model}-${propertyName}-${idx}`;
        const name = `${spec.name}.${propertyName}`;

        return InputFactory({
            key,
            label: propertyName,
            name,
            spec: new Field({
                context: spec.context,
                name: propertyName,
                ...spec.properties[propertyName]
            }),
            detailed: false,
            resource: props.resource
        });
    });

    return (
        <div key={spec.model}>
            {embeddedChildren.map( (field, idx) => {
                return (<div key={idx}>{field}</div>);
            })}
        </div>
    );
}
