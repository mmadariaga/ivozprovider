import React, { SFC } from 'react';
import Typography from '@material-ui/core/Typography';
import Resource from '../../../model/Resource';

interface EntityFieldInputArgumnents {
    className: string,
    record: any,
    resource: string,
    resources: Resource[],
}

const EntityField: SFC<any> = ({
    className,
    record = {},
    resource,
    resources,
    ...rest
}: EntityFieldInputArgumnents) => {

    const entitySpec = resources.find((_: Resource) => _.name === resource);
    const value = entitySpec
        ? entitySpec.recordToString(record)
        : null;

    return (
        <Typography
            component="span"
            variant="body1"
            className={className}
        >
            {value && typeof value !== 'string' ? JSON.stringify(value) : value}
        </Typography>
    );
};

// wat? TypeScript looses the displayName if we don't set it explicitly
EntityField.displayName = 'EntityField';

export default EntityField;
