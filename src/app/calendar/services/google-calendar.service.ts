import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Event {
  title: string;
  description: string;
  dateTime: string;
}
export interface CalendarEventsResponse {
  success: boolean;
  message: string;
  userEmail: string;
  eventCount: number;
  eventsList: Event[];
  timestamp: number;
  note: string;
}

export interface Task {
  title: string;
  dueDate: string;
  status: string;
  note: string;
}
export interface TasksResponse {
  success: boolean;
  message: string;
  userEmail: string;
  taskCount: number;
  tasksList: Task[];
  timestamp: number;
  note: string;
}

const baseUrl = environment.mobyUrl;
@Injectable({ providedIn: 'root' })
export class GoogleCalendarService {
  http = inject(HttpClient);

  getEventsCalendar(): Observable<CalendarEventsResponse> {
    const userEmail = sessionStorage.getItem('user_email') || '';
    const apiUrl = `${baseUrl}/auth/calendar/events/${encodeURIComponent(
      userEmail
    )}`;
    return this.http.get<CalendarEventsResponse>(apiUrl);
  }

  getTasks(): Observable<TasksResponse> {
    const userEmail = sessionStorage.getItem('user_email') || '';
    const apiUrl = `${baseUrl}/auth/tasks/${encodeURIComponent(userEmail)}`;
    return this.http.get<TasksResponse>(apiUrl);
  }
}
