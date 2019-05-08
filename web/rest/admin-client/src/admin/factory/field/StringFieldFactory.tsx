import {
  DateField,
  EmailField,
  TextField,
  UrlField,
} from 'react-admin';

import React from 'react';

export default (props: any) => {

    const {
        spec,
        ...rest
    } = props;

    // @see https://swagger.io/docs/specification/data-models/data-types/#string
    switch(spec.format) {

        case 'date':

          // @see https://marmelab.com/react-admin/Fields.html#datefield
          return (
            <DateField source={spec.name} {...rest} />
          );

        case 'date-time':

            // @see https://marmelab.com/react-admin/Fields.html#datefield
            return (
              <DateField showTime source={spec.name} {...rest} />
            );

        case 'email':
            // @see https://marmelab.com/react-admin/Fields.html#emailfield
            return (
              <EmailField showTime source={spec.name} {...rest} />
            );

        case 'url':
            // @see https://marmelab.com/react-admin/Fields.html#emailfield
            return (
              <UrlField source={spec.name} {...rest} />
            );

        default:

            return (
                <TextField
                    source={spec.name}
                    label={spec.name}
                    {...rest} />
            );
    }

}
