export interface Event {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description?: string;
  creator: CreatorOrganizer;
  organizer: CreatorOrganizer;
  start: EventDateTime;
  end: EventDateTime;
  transparency?: string;
  visibility?: string;
  iCalUID: string;
  sequence: number;
  attendees?: Attendee[];
  hangoutLink?: string;
  conferenceData?: ConferenceData;
  reminders: Reminders;
  eventType: string;
}

export interface CreatorOrganizer {
  email: string;
  self?: boolean;
  displayName?: string;
}

export interface EventDateTime {
  dateTime?: string; // para eventos con hora
  date?: string;     // para eventos de día completo
  timeZone?: string;
}

export interface Attendee {
  email: string;
  organizer?: boolean;
  self?: boolean;
  responseStatus: string;
}

export interface ConferenceData {
  entryPoints: EntryPoint[];
  conferenceSolution: ConferenceSolution;
  conferenceId: string;
}

export interface EntryPoint {
  entryPointType: string;
  uri: string;
  label: string;
}

export interface ConferenceSolution {
  key: { type: string };
  name: string;
  iconUri: string;
}

export interface Reminders {
  useDefault: boolean;
  overrides?: ReminderOverride[];
}

export interface ReminderOverride {
  method: string;
  minutes: number;
}
