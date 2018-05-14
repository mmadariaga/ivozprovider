/* tslint:disable */
import {
  Brand,
} from './.';

export interface AdministratorDetailed {
  active: boolean;
  brand: Brand;
  company: string;
  email: string;
  id: number;
  lastname: string;
  name: string;
  pass: string;
  timezone: string;
  username: string;
}
