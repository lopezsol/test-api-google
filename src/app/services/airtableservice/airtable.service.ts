import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AirtableListResponse } from '../../auth/interfaces/Airtable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirtableService {

  http = inject(HttpClient);



 getAirtableRecords(): Observable<AirtableListResponse> {
  const url = `http://localhost:8080/airtable/records`;
  return this.http.get<AirtableListResponse>(url);
}
}
