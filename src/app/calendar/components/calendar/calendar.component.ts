import { Component, inject, signal } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { CalendarEvent } from '../../interfaces/calendar-event.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'calendar',
  imports: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  events = signal<CalendarEvent[]>([]);
  calendarService = inject(GoogleCalendarService);

  ngOnInit() {
    this.fetchEvents();
  }
  fetchEvents() {
    this.calendarService.getEventsCalendar().subscribe({
      next: (resp) => {
        console.log(resp);
        this.events.set(resp.eventsList);
        console.log('fetchEvents', resp.eventsList);
      },
      error: (err) => console.error('Error trayendo los eventos:', err),
    });
  }
}
