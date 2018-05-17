import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './http-interceptors/token-interceptor';

export * from './modules';
export * from './pipes/shared-pipes.module';
export * from './guard';
export * from './services';

export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
