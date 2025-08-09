import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// import { environment } from '../../environments/environment';

declare const gapi: any;
declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleCalendarService {
  private gapiLoaded = false;
  private tokenClient: any;

  async initGapiClient(): Promise<void> {
    if (!this.gapiLoaded) {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = resolve;
        document.body.appendChild(script);
      });

      await gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: environment.googleApiKey,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
        });
      });

      this.gapiLoaded = true;
    }
  }

  requestAccessToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const tokenScript = document.createElement('script');
      tokenScript.src = 'https://accounts.google.com/gsi/client';
      tokenScript.onload = () => {
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: environment.googleClientId,
          scope: 'https://www.googleapis.com/auth/calendar.readonly',
          callback: (tokenResponse: any) => {
            if (tokenResponse.error) {
              reject(tokenResponse);
            } else {
              gapi.client.setToken({
                access_token: tokenResponse.access_token,
              });
              resolve(tokenResponse.access_token);
            }
          },
        });

        this.tokenClient.requestAccessToken({ prompt: '' });
      };
      document.body.appendChild(tokenScript);
    });
  }

  async getUpcomingEvents(): Promise<any[]> {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      });
      return response.result.items;
    } catch (err: any) {
      console.error('Error fetching events:', err);
      return [];
    }
  }
}
