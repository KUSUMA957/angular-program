import { CanActivateFn, Router} from '@angular/router';
import { Inject } from '@angular/core';
import { Auth } from '../auth';

export const adminGuard: CanActivateFn = () => {
  const auth = Inject(Auth);
  const router = Inject(Router);
  if(auth.isAdmin()) {
    return true;
  }
  alert("Connect t0 administrator");
  router.navigate(['/']);
  return false;
};
