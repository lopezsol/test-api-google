import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
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

  initializeGoogleSignInButton() {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
      theme: 'outline',
      size: 'large',
    });
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
    if (response.credential) {
      sessionStorage.setItem('token', response.credential);
      this.router.navigateByUrl('/home');
    }
  }
}
