import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface File {
  name: string;
  mimeType: string;
  modifiedTime: string;
  size: string;
}
export interface DriveFilesResponse {
  success: boolean;
  message: string;
  userEmail: string;
  fileCount: number;
  filesList: File[];
  timestamp: number;
  note: string;
}
const baseUrl = environment.mobyUrl;

@Injectable({
  providedIn: 'root',
})
export class DriveService {
  http = inject(HttpClient);

  getDriveFiles(): Observable<DriveFilesResponse> {
    const userEmail = sessionStorage.getItem('user_email') || '';
    const apiUrl = `${baseUrl}/auth/drive/files/${encodeURIComponent(
      userEmail
    )}`;
    return this.http.get<DriveFilesResponse>(apiUrl);
  }
}
