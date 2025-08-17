import type { CalendarEvent } from './calendar-event.interface';

export interface EventsResponse {
  success: boolean;
  message: string;
  userEmail: string;
  eventCount: number;
  eventsList: CalendarEvent[];
  timestamp: number;
  note: string;
}
