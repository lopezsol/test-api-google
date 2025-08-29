import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-page',
  imports: [AsyncPipe],
  templateUrl: './nav-page.component.html',
  styleUrl: './nav-page.component.css'
})
export class NavPageComponent {
 auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);


  ngOnInit() {
    this.auth.getMe()
    .subscribe();
  }
  onLogout() {
    // Elegí hard:true si querés que el back invalide la sesión y borre la cookie
    this.auth.logout({ hard: true }).subscribe();
  }
   onDashboard() {
    this.router.navigate(['/dashboard']);
  }
  onLogin()  {
    this.router.navigate(['/login']);
  }
}
