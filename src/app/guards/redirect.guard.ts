import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { TokenService } from '@services/token.service';

export const RedirectGuard: CanActivateFn = () => {
  const isValidToken: string | unknown = inject(TokenService).isValidRefreshToken();
  if (isValidToken) {
    inject(Router).navigate(['/app']);
    return false;
  }
  return true;
};

