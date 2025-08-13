import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CalendarEventsResponse {
  success: boolean;
  message: string;
  userEmail: string;
  eventCount: number;
  events: string[];
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
}
