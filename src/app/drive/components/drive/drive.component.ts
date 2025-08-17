import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DriveService, FileDrive } from '../../services/drive.service';

@Component({
  selector: 'drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css'],
  imports: [CommonModule],
})
export class DriveComponent implements OnInit {
  accessToken = sessionStorage.getItem('access_token');

  files = signal<FileDrive[]>([]);
  selectedFile: File | null = null;
  selectedFolderId: string | null = null;

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  selectFolder(folderId: string) {
    this.selectedFolderId = folderId;
  }

  sendFileToBackend() {
    if (!this.selectedFile) {
      alert('Selecciona un archivo primero');
      return;
    }
    if (!this.selectedFolderId) {
      alert('Selecciona una carpeta destino');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const base64Data = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      const payload = {
        fileName: this.selectedFile!.name,
        mimeType: this.selectedFile!.type,
        fileContent: base64Data,
        folderId: this.selectedFolderId,
      };

      this.uploadFile(payload);
    };

    reader.readAsArrayBuffer(this.selectedFile);
  }

  uploadFile(payload: any) {
    this.driveService.uploadFile(payload, this.selectedFolderId!).subscribe({
      next: (resp) => {
        console.log('uploadFile', resp.filesList);
        alert('Archivo subido con éxito!');
        this.selectedFile = null;
        this.selectedFolderId = null;
      },
      error: (err) => console.error('Error subiendo archivos:', err),
    });
  }
}
