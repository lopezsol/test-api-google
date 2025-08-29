import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

const baseUrl = environment.mobyUrl;

export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // Si la request es a tu backend, agrega withCredentials
  if (req.url.startsWith(baseUrl)) {
    req = req.clone({ withCredentials: true });
  }
  return next(req);
};
