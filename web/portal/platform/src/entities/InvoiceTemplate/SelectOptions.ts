import { DropdownChoices, EntityValues } from '@irontec-voip/ivoz-ui';
import defaultEntityBehavior from '@irontec-voip/ivoz-ui/entities/DefaultEntityBehavior';
import { SelectOptionsType } from '@irontec-voip/ivoz-ui/entities/EntityInterface';
import store from 'store';

const InvoiceTemplateSelectOptions: SelectOptionsType = ({
  callback,
  cancelToken,
}): Promise<unknown> => {
  const entities = store.getState().entities.entities;
  const InvoiceTemplate = entities.InvoiceTemplate;

  return defaultEntityBehavior.fetchFks(
    `${InvoiceTemplate.path}?_order[name]=ASC`,
    ['id', 'name'],
    (data: Array<EntityValues>) => {
      const options: DropdownChoices = [];
      for (const item of data) {
        options.push({ id: item.id as number, label: item.name as string });
      }

      callback(options);
    },
    cancelToken
  );
};

export default InvoiceTemplateSelectOptions;
