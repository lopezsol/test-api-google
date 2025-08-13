import { Component, inject, signal } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  events = signal<string[]>([]);
  calendarService = inject(GoogleCalendarService);

  ngOnInit() {
    this.fetchEvents();
  }
  fetchEvents() {
    this.calendarService.getEventsCalendar().subscribe({
      next: (resp) => {
        this.events.set(resp.events);
        console.log('fetchEvents', resp.events);
      },
      error: (err) => console.error('Error trayendo los eventos:', err),
    });
  }
}
