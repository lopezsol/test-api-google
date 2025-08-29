import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavPageComponent } from "./shared/pages/nav-page/nav-page/nav-page.component";
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'test-api-google';
  private router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    window.addEventListener('storage', (ev) => {
      if (ev.key !== 'auth_event' || !ev.newValue) return;

      let msg: { type?: 'LOGIN' | 'LOGOUT'; ts?: number } = {};
      try { msg = JSON.parse(ev.newValue); } catch {}
      localStorage.removeItem('auth_event'); // limpiar una vez leído

      if (msg.type === 'LOGOUT') {
        this.authService.clearLocalStateAndRedirect('LOGOUT');
        return;
      }

      if (msg.type === 'LOGIN') {
        // 🔑 Solo empujar a dashboard si esta pestaña está en /login
        if (this.router.url.startsWith('/login')) {
          this.authService.clearLocalStateAndRedirect('LOGIN');
        }
        // si está en / o /home u otra ruta, NO hacemos nada
      }
    });
  }
}
