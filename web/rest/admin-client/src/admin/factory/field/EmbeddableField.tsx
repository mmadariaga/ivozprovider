import React from 'react';

import { Datagrid, ArrayField } from 'react-admin';

const EmbeddableField = (props: any) => {

    const {
        basePath,
        children,
        source,
        sortable,
        classes,
        isEntity,
        ...rest
    } = props;

    let record = props.record;
    let label = props.label || props.spec.name;
    if (record[label]) {
        record = record[label];
    }

    const data = record || {};
    const arrayRecord = {
        [label]: [data]
    };

    return (
        <ArrayField
            {...rest}
            source={label}
            record={arrayRecord}
            key={rest.model}
       >
            <Datagrid>
                {children}
            </Datagrid>
        </ArrayField>
    );
};

//EmbeddableField.defaultProps = {
//    addLabel: true
//};
//
//EmbeddableField.propTypes = {
//    label: PropTypes.string,
//    record: PropTypes.object,
//    spec: PropTypes.object.isRequired,
//};

export default  EmbeddableField;
