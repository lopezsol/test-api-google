import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
declare var google: any;
const clientId = environment.googleClientId;

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  router = inject(Router);

  ngAfterViewInit() {
    this.initializeGoogleSignInButton();
  }

  // initializeGoogleSignInButton() {
  //   google.accounts.id.initialize({
  //     client_id: clientId,
  //     callback: (response: any) => this.handleCredentialResponse(response),
  //   });
  //   google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
  //     theme: 'outline',
  //     size: 'large',
  //   });
  //   google.accounts.id.prompt();
  // }

  // handleCredentialResponse(response: any) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   if (response.credential) {
  //     sessionStorage.setItem('token', response.credential);
  //     this.router.navigateByUrl('/home');
  //   }
  // }

  // --------
  initializeGoogleSignInButton() {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope:
        'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file',
      callback: (tokenResponse: any) => this.handleAccessToken(tokenResponse),
    });

    // Mostrar el botón manualmente o hacer auto-login
    document.getElementById('buttonDiv')?.addEventListener('click', () => {
      tokenClient.requestAccessToken();
    });
  }

  handleAccessToken(tokenResponse: any) {
    console.log('tokenResponse', tokenResponse);
    console.log('Access token: ', tokenResponse.access_token);
    if (tokenResponse.access_token) {
      sessionStorage.setItem('access_token', tokenResponse.access_token);
      this.router.navigateByUrl('/home');
    }
  }

  // --------
  // initializeGoogleSignInButton() {
  //   const tokenClient = google.accounts.oauth2.initCodeClient({
  //     client_id: clientId,
  //     scope:
  //       'openid email profile https://www.googleapis.com/auth/calendar.readonly',
  //     callback: (tokenResponse: any) => {
  //       console.log('Access Token:', tokenResponse.access_token);
  //       console.log('ID Token (JWT):', tokenResponse.id_token); // 👈 ESTE
  //     },
  //     response_type: 'id_token token', // 👈 clave para recibir ambos
  //   });

  //   // Mostrar el botón manualmente o hacer auto-login
  //   document.getElementById('buttonDiv')?.addEventListener('click', () => {
  //     tokenClient.requestAccessToken();
  //   });
  // }

  // handleAccessToken(tokenResponse: any) {
  //   // console.log('tokenResponse', tokenResponse);
  //   // console.log('Access token: ', tokenResponse.access_token);
  //   if (tokenResponse.access_token) {
  //     sessionStorage.setItem('jwt_token', tokenResponse.id_token);

  //     sessionStorage.setItem('access_token', tokenResponse.access_token);
  //     this.router.navigateByUrl('/home');
  //   }
  // }
}
