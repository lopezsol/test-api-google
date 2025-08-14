import { Component, inject, signal } from '@angular/core';
import { Event, GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  events = signal<Event[]>([]);
  calendarService = inject(GoogleCalendarService);

  ngOnInit() {
    this.fetchEvents();
  }
  fetchEvents() {
    this.calendarService.getEventsCalendar().subscribe({
      next: (resp) => {
        this.events.set(resp.eventsList);
        console.log('fetchEvents', resp.eventsList);
      },
      error: (err) => console.error('Error trayendo los eventos:', err),
    });
  }
}
