import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuth = inject(AuthService).isAuthenticated();
  if(isAuth){
    return true;
  }else{
    router.navigate(['/auth/login']);
    return false;
  }
};
