import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service'; 
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    // Replace 'login' with the appropriate route for redirection
    router.navigate(['login']);
    return false;
  }
};
