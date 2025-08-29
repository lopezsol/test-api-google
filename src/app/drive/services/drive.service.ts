import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FileDrive {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size: string;
  type: 'file' | 'folder';
  children?: FileDrive[]; // solo para carpetas
}

export interface DriveFilesResponse {
  success: boolean;
  message: string;
  userEmail: string;
  fileCount: number;
  filesList: FileDrive[];
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

    const apiUrl = `${baseUrl}/auth/drive/files`;
    return this.http.get<DriveFilesResponse>(apiUrl);
  }

  uploadFile(payload: any, id: string): Observable<any> {
    const apiUrl = `${baseUrl}/auth/drive/upload`;
    return this.http.post<any>(apiUrl, payload);
  }
}
