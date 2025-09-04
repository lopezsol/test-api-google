import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LoginButtonComponent } from '../../components/login-button/login-button.component';

const clientId = environment.googleClientId;
const redirectUri = environment.redirectUriLogin;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  imports: [LoginButtonComponent],
})
export class LoginPageComponent {}
