import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, User } from '../interfaces/User';
import { Router } from '@angular/router';

const baseUrl = environment.mobyUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  apiUrl = `${baseUrl}/auth/google/callback`;
  private router = inject(Router);
  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  loginWithGoogle(jwt: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { token: jwt });
  }

  getMe(): Observable<User | null> {
    return this.http.get<ApiResponse<User>>(`${baseUrl}/auth/me`).pipe(
      map(resp => (resp.user) ?? null),
      tap(user => this._user$.next(user)),
      catchError(() => {
        this._user$.next(null);
        return of(null);
      })
    );
  }

 // auth.service.ts
logout(opts: { hard?: boolean } = {}): Observable<void> {
  const url = `${baseUrl}/auth/logout`;
  return this.http.post(url, {}).pipe(
    tap(() => {
      // 1) Avisar a otras pestañas
      localStorage.setItem('auth_event', JSON.stringify({ type: 'LOGOUT', ts: Date.now() }));
    }),
    tap(() => {
      // 2) Limpiar UI local
      this._user$.next(null);
      this.router.navigate(['/login']);
    }),
    map(() => void 0),
    catchError(() => {
      // ante error también forzamos el flujo
      localStorage.setItem('auth_event', JSON.stringify({ type: 'LOGOUT', ts: Date.now() }));
      this._user$.next(null);
      this.router.navigate(['/login']);
      return of(void 0);
    })
  );
}

clearLocalStateAndRedirect(msgtype:String) {
  if(msgtype === 'LOGOUT'){
this._user$.next(null);
  localStorage.removeItem('auth_event');
  this.router.navigate(['/login']);
  }
  else if(msgtype === 'LOGIN'){
 localStorage.removeItem('auth_event');
  this.router.navigate(['/login']);

  }


}

}
