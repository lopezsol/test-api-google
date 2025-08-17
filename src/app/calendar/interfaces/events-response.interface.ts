import { Event } from "./event-response-complete.interface";

export interface EventsResponse {
  success: boolean;
  message: string;
  userEmail: string;
  eventCount: number;
  eventsList: Event[];
  timestamp: number;
  note: string;
}
