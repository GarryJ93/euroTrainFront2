import { forwardRef, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthInterceptorService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(forwardRef(() => AuthInterceptorService));
  const router = inject(forwardRef(() => Router));

  if (authService.checkConnexion()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
