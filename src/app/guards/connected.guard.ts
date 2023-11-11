import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthInterceptorService } from '../services/auth.service';
import { forwardRef, inject } from '@angular/core';

export const connectedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(forwardRef(() => AuthInterceptorService));
  const router = inject(forwardRef(() => Router));

  if (authService.checkConnexion()) {
    router.navigate(['/admin']);
    return false;
  } else {
    return true;
  }
};
