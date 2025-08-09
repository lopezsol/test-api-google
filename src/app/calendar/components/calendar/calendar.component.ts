import { Component, signal } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  // events: any[] = [];

  // constructor(private calendarService: GoogleCalendarService) {}

  // async ngOnInit() {
  //   try {
  //     await this.calendarService.initGapiClient();
  //     await this.calendarService.requestAccessToken();
  //     this.events = await this.calendarService.getUpcomingEvents();
  //   } catch (e) {
  //     console.error('No se pudo cargar el calendario', e);
  //   }
  // }

  // async ngOnInit() {
  //   try {
  //     const accessToken = sessionStorage.getItem('access_token');
  //     const response = await fetch(
  //       'https://www.googleapis.com/calendar/v3/users/me/calendarList',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     console.log('Calendarios:', data);
  //   } catch (e) {
  //     console.error('No se pudo cargar el calendario', e);
  //   }
  // }

  // ------------------------
  // events = signal<any>([])
  // async ngOnInit() {
  //   try {
  //     const accessToken = sessionStorage.getItem('access_token');
  //     if (!accessToken) throw new Error('No hay token de acceso');

  //     // Obtener calendarios
  //     const calendarListResponse = await fetch(
  //       'https://www.googleapis.com/calendar/v3/users/me/calendarList',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const calendarList = await calendarListResponse.json();
  //     console.log('Calendarios:', calendarList);

  //     // Elegir un calendario (ejemplo: primary o el primero que venga)
  //     console.log("calendarList.items", calendarList.items)
  //     const calendarId = 'primary'; // o calendarList.items[0].id

  //     // Obtener eventos
  //     const eventsResponse = await fetch(
  //       `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
  //         calendarId
  //       )}/events`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const eventsData = await eventsResponse.json();
  //     console.log('Eventos:', eventsData.items);
  //     this.events.set(eventsData.items)
  //   } catch (e) {
  //     console.error('Error cargando calendario y eventos:', e);
  //   }
  // }

  events = signal<any[]>([]);
  userEmail = signal<string>('mobyappacademy@gmail.com');

  async ngOnInit() {
    try {
      const accessToken = sessionStorage.getItem('access_token');
      if (!accessToken) throw new Error('No hay token de acceso');

      // Obtener lista de calendarios
      const calendarListResponse = await fetch(
        'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const calendarList = await calendarListResponse.json();
      console.log('Calendarios:', calendarList.items);

      const allEvents: any[] = [];

      // Recorrer todos los calendarios y obtener eventos
      for (const calendar of calendarList.items) {
        const eventsResponse = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendar.id
          )}/events`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const eventsData = await eventsResponse.json();
        console.log(`Eventos de ${calendar.summary}:`, eventsData.items);

        // Agregar los eventos a la lista total, junto con info del calendario
        allEvents.push(
          ...eventsData.items.map((event: any) => ({
            ...event,
            calendarSummary: calendar.summary,
            calendarId: calendar.id,
            eventType: this.getEventType(event), 
          }))
        );
      }

      this.events.set(allEvents);
    } catch (e) {
      console.error('Error cargando calendarios y eventos:', e);
    }
  }

  getEventType(event: any): 'mine' | 'other' | 'holiday' {
    const myEmail = this.userEmail();
    const creatorEmail = event.creator?.email || '';

    if (creatorEmail === myEmail) return 'mine';
    if (creatorEmail.endsWith('@group.v.calendar.google.com')) return 'holiday';
    return 'other';
  }
}
