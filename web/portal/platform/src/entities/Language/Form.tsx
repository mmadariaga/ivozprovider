import {
  EntityFormProps,
  FieldsetGroups,
} from '@irontec-voip/ivoz-ui/entities/DefaultEntityBehavior';
import { Form as DefaultEntityForm } from '@irontec-voip/ivoz-ui/entities/DefaultEntityBehavior/Form';
import _ from '@irontec-voip/ivoz-ui/services/translations/translate';

const Form = (props: EntityFormProps): JSX.Element => {
  const groups: Array<FieldsetGroups | false> = [
    {
      legend: _('Main'),
      fields: ['iden', 'id', 'name'],
    },
  ];

  return <DefaultEntityForm {...props} groups={groups} />;
};

export default Form;
