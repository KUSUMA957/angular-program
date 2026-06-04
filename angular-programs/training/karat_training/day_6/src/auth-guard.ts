import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../src/services/auth';
export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);
  if(authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
