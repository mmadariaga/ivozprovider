import { EntitySpecInterface } from './interfaces';

const sortByContextFactory = (entitySpec: EntitySpecInterface) => (a: string, b: string) => {

    if (a === 'id') {
        return -1;
    }

    if (b === 'id') {
        return 1;
    }

    const contextA = entitySpec.properties[a].context;
    const contextB = entitySpec.properties[b].context;

    if (contextA === contextB) {
        return 0;
    }

    const mainContext = entitySpec.properties.id.context;

    if (contextA === mainContext) {
        return -1;
    }

    if (contextB === mainContext) {
        return 1;
    }

    return contextA < contextB;
};

export default (entitySpec: EntitySpecInterface) => {

    const entityPropertySorter = sortByContextFactory(entitySpec);

    if (entitySpec.list) {
        entitySpec.list.properties = entitySpec.list.properties.sort(entityPropertySorter);
    }

    if (entitySpec.show) {
        entitySpec.show.properties = entitySpec.show.properties.sort(entityPropertySorter);
    }

    if (entitySpec.create) {
        entitySpec.create.properties = entitySpec.create.properties.sort(entityPropertySorter);
    }

    if (entitySpec.edit) {
        entitySpec.edit.properties = entitySpec.edit.properties.sort(entityPropertySorter);
    }
}