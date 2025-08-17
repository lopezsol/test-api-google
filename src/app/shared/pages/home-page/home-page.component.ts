import { Component, computed, inject, signal } from '@angular/core';
import { CalendarComponent } from '../../../calendar/components/calendar/calendar.component';
import { TasksComponent } from '../../../calendar/components/tasks/tasks.component';
import { DriveComponent } from '../../../drive/components/drive/drive.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home-page',
  imports: [CalendarComponent, TasksComponent, DriveComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const userEmail = params['user_email'];
      if (userEmail) {
        sessionStorage.setItem('user_email', userEmail);
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    });
  }
}
