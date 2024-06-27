import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import fakeDataInterceptor from "../interceptors/fake-data.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(), withInterceptors([fakeDataInterceptor]))]
};
