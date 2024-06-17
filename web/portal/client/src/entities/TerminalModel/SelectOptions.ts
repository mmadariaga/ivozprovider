import { DropdownChoices } from '@irontec-voip/ivoz-ui';
import defaultEntityBehavior from '@irontec-voip/ivoz-ui/entities/DefaultEntityBehavior';
import { SelectOptionsType } from '@irontec-voip/ivoz-ui/entities/EntityInterface';
import store from 'store';

const TerminalModelSelectOptions: SelectOptionsType = ({
  callback,
  cancelToken,
}): Promise<unknown> => {
  const entities = store.getState().entities.entities;
  const TerminalModel = entities.TerminalModel;

  return defaultEntityBehavior.fetchFks(
    TerminalModel.path,
    ['id', 'name'],
    (data) => {
      const options: DropdownChoices = {};
      for (const item of data) {
        options[item.id] = item.name;
      }

      callback(options);
    },
    cancelToken
  );
};

export default TerminalModelSelectOptions;
