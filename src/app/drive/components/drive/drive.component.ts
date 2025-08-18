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
  viewingFolderId: string | null = null;

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
        this.fetchDriveFiles();
      },
      error: (err) => console.error('Error subiendo archivos:', err),
    });
  }

  getFolderName(folderId: string): string {
    const folder = this.files().find((f) => f.id === folderId);
    return folder ? folder.name : 'Carpeta desconocida';
  }

  // Nueva función para mostrar archivos de una carpeta
  viewFolderContents(folderId: string) {
    this.viewingFolderId = this.viewingFolderId === folderId ? null : folderId;
  }

  // Nueva función para obtener archivos de una carpeta específica
  getFilesInFolder(folderId: string): FileDrive[] {
    const folder = this.files().find((f) => f.id === folderId);
    return folder?.children || [];
  }

  // Nueva función para formatear fecha
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  // Nueva función para obtener ícono según tipo de archivo
  getFileIcon(mimeType: string): string {
    console.log(mimeType);
    if (mimeType.includes('pdf'))
      return 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z';
    if (mimeType.includes('word'))
      return 'M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4Z';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet'))
      return 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M8,12V14H10V12H8M10,14V16H12V14H10M8,16V18H10V16H8M14,12V14H16V12H14M16,14V16H18V14H16M14,16V18H16V16H14M12,12V14H14V12H12M12,14V16H14V14H12M12,16V18H14V16H12';
    // Ícono genérico para otros archivos
    return 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z';
  }

  getFileTypeInfo(mimeType: string): {
    icon: string;
    color: string;
    type: string;
  } {
    console.log(mimeType);

    if (mimeType.includes('pdf')) {
      return {
        icon: 'M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M9.5,8.5C9.5,7.67 10.17,7 11,7H13C13.83,7 14.5,7.67 14.5,8.5V10.5C14.5,11.33 13.83,12 13,12H11C10.17,12 9.5,11.33 9.5,10.5V8.5M11,8.5V10.5H13V8.5H11M9.5,13H11V14.5H9.5V13M12.5,13H14.5V14.5H12.5V13M9.5,15.5H14.5V16.5H9.5V15.5Z',
        color: 'text-red-500',
        type: 'PDF',
      };
    }

    if (mimeType.includes('word') || mimeType.includes('document')) {
      return {
        icon: 'M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z',
        color: 'text-blue-600',
        type: 'DOC',
      };
    }

    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) {
      return {
        icon: 'M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,17V15H15V17H17M13,17V15H11V17H13M9,17V15H7V17H9M7,13V11H9V13H7M11,13V11H13V13H11M15,13V11H17V13H15M17,9V7H15V9H17M13,9V7H11V9H13M9,9V7H7V9H9Z',
        color: 'text-green-600',
        type: 'XLS',
      };
    }

    if (mimeType.includes('image')) {
      return {
        icon: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z',
        color: 'text-purple-500',
        type: 'IMG',
      };
    }

    if (mimeType.includes('video')) {
      return {
        icon: 'M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z',
        color: 'text-red-600',
        type: 'VID',
      };
    }

    if (mimeType.includes('audio')) {
      return {
        icon: 'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z',
        color: 'text-orange-500',
        type: 'AUD',
      };
    }

    if (mimeType.includes('text') || mimeType.includes('plain')) {
      return {
        icon: 'M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z',
        color: 'text-gray-600',
        type: 'TXT',
      };
    }

    // Ícono genérico para otros archivos
    return {
      icon: 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z',
      color: 'text-gray-500',
      type: 'FILE',
    };
  }
}
