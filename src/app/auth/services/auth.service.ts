import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.mobyUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  apiUrl = `${baseUrl}/auth/google/callback`;

  loginWithGoogle(jwt: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { token: jwt });
  }
}
