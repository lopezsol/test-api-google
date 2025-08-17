import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { TasksResponse } from '../interfaces/tasks-response.interface';
import type { EventsResponse } from '../interfaces/events-response.interface';

const baseUrl = environment.mobyUrl;
@Injectable({ providedIn: 'root' })
export class GoogleCalendarService {
  http = inject(HttpClient);

  getEventsCalendar(): Observable<EventsResponse> {
    const userEmail = sessionStorage.getItem('user_email') || '';
    const apiUrl = `${baseUrl}/auth/calendar/events/${encodeURIComponent(
      userEmail
    )}`;
    return this.http.get<EventsResponse>(apiUrl);
  }

  getTasks(): Observable<TasksResponse> {
    const userEmail = sessionStorage.getItem('user_email') || '';
    const apiUrl = `${baseUrl}/auth/tasks/${encodeURIComponent(userEmail)}`;
    return this.http.get<TasksResponse>(apiUrl);
  }
}
