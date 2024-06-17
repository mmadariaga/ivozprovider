import { EntityValue } from '@irontec-voip/ivoz-ui';
import defaultEntityBehavior, {
  foreignKeyGetter,
} from '@irontec-voip/ivoz-ui/entities/DefaultEntityBehavior';
import EntityInterface from '@irontec-voip/ivoz-ui/entities/EntityInterface';
import _ from '@irontec-voip/ivoz-ui/services/translations/translate';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

import {
  CorporationProperties,
  CorporationPropertyList,
} from './CorporationProperties';

const properties: CorporationProperties = {
  name: {
    label: _('Name'),
  },
  description: {
    label: _('Description'),
    default: '',
  },
  id: {
    label: _('Id'),
  },
  brand: {
    label: _('Brand'),
  },
};

const Corporation: EntityInterface = {
  ...defaultEntityBehavior,
  icon: CorporateFareIcon,
  link: '/doc/en/administration_portal/brand/settings/corporations.html',
  iden: 'Corporation',
  title: _('Corporation', { count: 2 }),
  path: '/corporations',
  toStr: (row: CorporationPropertyList<EntityValue>) => row.name as string,
  columns: ['name', 'description'],
  defaultOrderBy: 'name',
  properties,
  acl: {
    ...defaultEntityBehavior.acl,
    iden: 'Corporations',
  },
  selectOptions: async () => {
    const module = await import('./SelectOptions');

    return module.default;
  },
  foreignKeyGetter: async () => {
    return foreignKeyGetter;
  },
  Form: async () => {
    const module = await import('./Form');

    return module.default;
  },
};

export default Corporation;
