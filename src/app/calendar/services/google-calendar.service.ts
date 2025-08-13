import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
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
    return this.http
      .get<CalendarEventsResponse>(apiUrl)
      .pipe(tap((resp) => console.log('tap:', resp)));
  }
}
