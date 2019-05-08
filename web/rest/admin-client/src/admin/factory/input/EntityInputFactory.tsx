import {
  ReferenceInput,
  AutocompleteInput,
  DisabledInput,
} from 'react-admin';

import React from 'react';

export default (props: any) => {

    const {label, spec, referableResources = [], ...rest} = props;
    const hasEndpoint = referableResources.includes(spec.model);

    if (!hasEndpoint) {
        return <DisabledInput label={label} source={`${spec.name}.id`} spec={spec} {...rest} />;
    }

    const filterMapper = (searchText: string) => ({ id: searchText });

    return (
        <ReferenceInput
            label={label}
            source={`${spec.name}.id`}
            reference={spec.model}
            filterToQuery={filterMapper}
            sort={{ field: 'id', order: 'ASC' }}
            {...rest}
        >
            <AutocompleteInput optionText='id' resettable />
        </ReferenceInput>
    );

}
