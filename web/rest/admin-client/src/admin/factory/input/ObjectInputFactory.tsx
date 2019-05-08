import React from 'react';

import EntityInputFactory from './EntityInputFactory';
import EmbeddableInputFactory from './EmbeddableInputFactory';

export default (props: any) => {

    const {detailed, spec, referableResources, ...rest} = props;
    const isEmbedabble = spec.model.indexOf('_') !== -1;

    if (detailed || isEmbedabble) {
        return (<EmbeddableInputFactory spec={spec} isEntity={!isEmbedabble} {...rest} />);
    }

    return (<EntityInputFactory {...props} />);
}
