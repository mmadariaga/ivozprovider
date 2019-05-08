import {
  DateInput,
  TextInput,
} from 'react-admin';

import React from 'react';

export default (props: any) => {

    const {
        spec,
        label,
        name,
        ...rest
    } = props;

    // @see https://swagger.io/docs/specification/data-models/data-types/#string
    switch(spec.format) {

        case 'date':

          // @see https://marmelab.com/react-admin/Fields.html#datefield
          return (
            <DateInput source={name} {...rest} label={label} />
          );

        case 'date-time':

            // @see https://marmelab.com/react-admin/Fields.html#datefield
            return (
              <DateInput showTime {...rest} source={name} label={label} />
            );

        case 'email':
            // @see https://marmelab.com/react-admin/Fields.html#emailfield
            return (
              <TextInput showTime {...rest} source={name} label={label} />
            );

        case 'url':
            // @see https://marmelab.com/react-admin/Fields.html#emailfield
            return (
              <TextInput  {...rest} source={name} label={label} />
            );

        default:

            return (
                <TextInput
                    {...rest}
                    source={name}
                    label={label}
                />
            );
    }

}
