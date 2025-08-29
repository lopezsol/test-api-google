import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, take, switchMap, of, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const guestguardGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {

  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    switchMap(u => u ? of(u) : auth.getMe()),
    map(u => {
      if (u) {
        router.navigate(['/dashboard']);
        return false;
      }
      return true;
    })
  );
};
