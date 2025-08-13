import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

const clientId = environment.googleClientId;
const redirectUri = environment.redirectUriLogin;

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  router = inject(Router);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  scope = encodeURIComponent(
    'openid email profile ' +
      'https://www.googleapis.com/auth/calendar.readonly ' +
      'https://www.googleapis.com/auth/tasks.readonly ' +
      'https://www.googleapis.com/auth/drive.readonly ' +
      'https://www.googleapis.com/auth/drive.file'
  );
  responseType = 'code';
  accessType = 'offline'; // para pedir refresh token
  includeGrantedScopes = 'true';
  //TODO: cambiar el state por uno real del backend
  state = 'someCsrfTokenOrRandomString'; // recomendable para seguridad

  loginWithGoogleOAuth() {
    const oauth2Url =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=${this.responseType}` +
      `&scope=${this.scope}` +
      `&access_type=${this.accessType}` +
      `&include_granted_scopes=${this.includeGrantedScopes}` +
      `&state=${this.state}`;

    window.location.href = oauth2Url;
  }

}
