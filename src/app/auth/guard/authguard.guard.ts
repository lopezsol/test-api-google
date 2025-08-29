import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, switchMap, of, map, tap, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    // Si ya tenemos user en memoria => OK; si no, consultamos al backend con getMe()
    switchMap(user => user ? of(user) : auth.getMe()),
    map(userOrNull => !!userOrNull),
    tap(isAuthed => {
      if (!isAuthed) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
    }),
    catchError(() => {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
};
