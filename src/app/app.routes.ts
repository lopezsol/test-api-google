import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { authguardGuard } from './auth/guard/authguard.guard';
import { PerfilPageComponent } from './perfil/pages/perfil-page/perfil-page.component';
import { guestguardGuard } from './auth/guard/guestguard.guard';

export const routes: Routes = [
  { path: 'dashboard', component: PerfilPageComponent, canActivate: [authguardGuard] },
  { path: 'login', component: LoginPageComponent,canActivate: [guestguardGuard] },
  { path: 'home', component: HomePageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' }
];
