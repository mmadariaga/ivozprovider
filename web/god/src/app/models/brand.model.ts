/* tslint:disable */
import {
  BrandInvoice,
  BrandLogo,
} from './.';

export interface Brand {
  defaultTimezone: string;
  domain: string;
  domainUsers: string;
  id: number;
  invoice: BrandInvoice;
  language: string;
  logo: BrandLogo;
  maxCalls: number;
  name: string;
  recordingsLimitEmail: string;
  recordingsLimitMB: number;
}
