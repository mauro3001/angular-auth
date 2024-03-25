import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { TokenService } from '@services/token.service';

export const AuthGuard: CanActivateFn = () => {
  const isValidToken: string | unknown = inject(TokenService).isValidRefreshToken();
  console.log('isvalidtoken form Authguard', isValidToken);
  if (!isValidToken) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};

