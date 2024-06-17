import { EntityValue } from '@irontec-voip/ivoz-ui';
import defaultEntityBehavior from '@irontec-voip/ivoz-ui/entities/DefaultEntityBehavior';
import EntityInterface from '@irontec-voip/ivoz-ui/entities/EntityInterface';
import _ from '@irontec-voip/ivoz-ui/services/translations/translate';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import {
  DdiProviderProperties,
  DdiProviderPropertyList,
} from './DdiProviderProperties';

const properties: DdiProviderProperties = {
  description: {
    label: _('Description'),
  },
  name: {
    label: _('Name'),
  },
  id: {
    label: _('Id'),
  },
  brand: {
    label: _('Brand', { count: 1 }),
  },
  proxyTrunk: {
    label: _('Proxy Trunk', { count: 1 }),
  },
  mediaRelaySets: {
    label: _('Media Relay Set', { count: 1 }),
  },
};

const DdiProvider: EntityInterface = {
  ...defaultEntityBehavior,
  icon: AccountTreeIcon,
  link: '/doc/en/administration_portal/brand/providers/ddi_providers.html',
  iden: 'DdiProvider',
  title: _('DDI Provider', { count: 2 }),
  path: '/ddi_providers',
  toStr: (row: DdiProviderPropertyList<EntityValue>) => row.name as string,
  properties,
  acl: {
    ...defaultEntityBehavior.acl,
    iden: 'DDIProviders',
  },
  selectOptions: async () => {
    const module = await import('./SelectOptions');

    return module.default;
  },
};

export default DdiProvider;
