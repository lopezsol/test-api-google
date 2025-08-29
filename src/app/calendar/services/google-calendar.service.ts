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
    const apiUrl = `${baseUrl}/auth/calendar/events`;
    return this.http.get<EventsResponse>(apiUrl);
  }

  getTasks(): Observable<TasksResponse> {
    const apiUrl = `${baseUrl}/auth/tasks`;
    return this.http.get<TasksResponse>(apiUrl);
  }
}
