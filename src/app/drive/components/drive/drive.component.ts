import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DriveService, File } from '../../services/drive.service';

@Component({
  selector: 'drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css'],
  imports: [CommonModule],
})
export class DriveComponent implements OnInit {
  accessToken = sessionStorage.getItem('access_token');

  // folders: Array<{ id: string; name: string }> = [];
  // files: Array<{ id: string; name: string; mimeType: string }> = [];
  // selectedFolderId: string | null = null;

  // selectedFile: File | null = null;

  files = signal<File[]>([]);
  driveService = inject(DriveService);

  ngOnInit() {
    this.fetchDriveFiles();
  }

  fetchDriveFiles() {
    this.driveService.getDriveFiles().subscribe({
      next: (resp) => {
        this.files.set(resp.filesList);
        console.log('fetchDriveFiles', resp.filesList);
      },
      error: (err) => console.error('Error trayendo los archivos:', err),
    });
  }
}
