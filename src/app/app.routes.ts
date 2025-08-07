import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', component: LoginPageComponent },
];
