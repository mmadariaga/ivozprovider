import { PropertySpec } from '@irontec-voip/ivoz-ui/services/api/ParsedApiSpecInterface';
import {
  EntityValue,
  EntityValues,
} from '@irontec-voip/ivoz-ui/services/entity/EntityService';

export type FriendsPatternPropertyList<T> = {
  friend?: T;
  name?: T;
  regExp?: T;
};

export type FriendsPatternProperties = FriendsPatternPropertyList<
  Partial<PropertySpec>
>;
export type FriendsPatternPropertiesList = Array<
  FriendsPatternPropertyList<EntityValue | EntityValues>
>;
