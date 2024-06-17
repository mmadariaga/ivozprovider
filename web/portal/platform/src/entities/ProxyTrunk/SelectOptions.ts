import { DropdownChoices } from '@irontec-voip/ivoz-ui';
import defaultEntityBehavior from '@irontec-voip/ivoz-ui/entities/DefaultEntityBehavior';
import { SelectOptionsType } from '@irontec-voip/ivoz-ui/entities/EntityInterface';
import store from 'store';

import { ProxyTrunkPropertiesList } from './ProxyTrunkProperties';

const ProxyTrunkSelectOptions: SelectOptionsType = ({
  callback,
  cancelToken,
}): Promise<unknown> => {
  const entities = store.getState().entities.entities;
  const ProxyTrunk = entities.ProxyTrunk;

  return defaultEntityBehavior.fetchFks(
    `${ProxyTrunk.path}?_order[name]=ASC`,
    ['id', 'ip', 'name', 'advertisedIp'],
    (data: ProxyTrunkPropertiesList) => {
      const options: DropdownChoices = [];
      for (const item of data) {
        options.push({ id: item.id as number, label: ProxyTrunk.toStr(item) });
      }

      callback(options);
    },
    cancelToken
  );
};

export default ProxyTrunkSelectOptions;
