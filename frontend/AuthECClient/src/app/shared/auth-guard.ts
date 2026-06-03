import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router);

  let redirectUrl: string = state.url;
  let returnValue = true;
  switch (state.url) {
    case '/signin':
    case '/signup':
      if (authService.isLoggedIn()) {
        redirectUrl = '/dashboard';
        returnValue = false;
      }
      break;
    case '/dashboard':
      if (!authService.isLoggedIn()) {
        redirectUrl = '/signin';
        returnValue = false;
      }
      break;
  }

  if (!returnValue) router.navigateByUrl(redirectUrl);
  return returnValue;
};
