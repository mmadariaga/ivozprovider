import React from 'react';

import EntityFieldFactory from './EntityFieldFactory';
import EmbedableFieldFactory from './EmbeddableFieldFactory';

export default (props: any) => {

    const {detailed, spec, referableResources, ...rest} = props;
    const isEmbedabble = spec.model.indexOf('_') !== -1;

    if (detailed || isEmbedabble) {
        return (<EmbedableFieldFactory spec={spec} isEntity={!isEmbedabble} {...rest} />);
    }

    return (<EntityFieldFactory referableResources={referableResources} spec={spec} {...rest} />);
}
