import { Component, computed, signal } from '@angular/core';
import { CalendarComponent } from "../../../calendar/components/calendar/calendar.component";
import { TasksComponent } from "../../../calendar/components/tasks/tasks.component";
import { DriveComponent } from "../../../drive/components/drive/drive.component";

@Component({
  selector: 'home-page',
  imports: [CalendarComponent, TasksComponent, DriveComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  // token = signal<string>(sessionStorage.getItem('token')!);
  // token = signal<string>(sessionStorage.getItem('access_token')!);

  user = signal<any>(JSON.parse(sessionStorage.getItem('user') || '{}')!);


  // user = computed(() => this.decodeJwtPayload(this.token()));

  // decodeJwtPayload(token: string): any {
  //   console.log("entre en el decode", token)
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
  //       .join('')
  //   );
  //   return JSON.parse(jsonPayload);
  // }
}
