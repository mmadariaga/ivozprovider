import React from 'react';
import EntityLink from './EntityLink';

export default (props:any, key: number) => {

    const { action, ...rest} = props;

    switch (action.type) {
        case 'link':
             return <EntityLink key={key} action={action} {...rest} />;
    }

    console.error(`Unexpected action type: ${action.type}`, props);
}
