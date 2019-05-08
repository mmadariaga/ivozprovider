import BooleanFieldFactory from './field/BooleanFieldFactory';
import ObjectFieldFactory from './field/ObjectFieldFactory';
import NumberFieldFactory from './field/NumberFieldFactory';
import StringFieldFactory from './field/StringFieldFactory';

export default (props:any) => {

    const {detailed, referableResources, ...rest} = props;
    const spec = props.spec;

    // @see https://swagger.io/docs/specification/data-models/data-types/
    let type = spec.model
        ? 'object'
        : spec.type;

    switch (type) {
        case 'string':
             return StringFieldFactory(rest);
        case 'number':
        case 'integer':
            return NumberFieldFactory(rest);
        case 'boolean':
            return BooleanFieldFactory(rest);
        case 'object':
            return ObjectFieldFactory(props);
        default:
            break;
    }

    console.error(`Unexpected field type: ${type}`, props);
}

export const isFieldSortable = (field: any, resource: any) => {
    return (
      resource.parameters.filter(
        (parameter: any) => parameter.variable === `order[${field.name}]`,
      ).length > 0
    );
  };

