import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css'],
  imports: [CommonModule]
})
export class DriveComponent implements OnInit {
  accessToken = sessionStorage.getItem('access_token');

  folders: Array<{ id: string; name: string }> = [];
  files: Array<{ id: string; name: string; mimeType: string }> = [];
  selectedFolderId: string | null = null;

  selectedFile: File | null = null;

  ngOnInit() {
    if (!this.accessToken) {
      alert('No hay token de acceso. Autenticar primero.');
      return;
    }
    this.listFolders();
  }

  async listFolders() {
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set(
      'q',
      "mimeType = 'application/vnd.google-apps.folder' and trashed = false"
    );
    url.searchParams.set('fields', 'files(id,name)');
    url.searchParams.set('pageSize', '50');
    url.searchParams.set('includeItemsFromAllDrives', 'true');
    url.searchParams.set('supportsAllDrives', 'true');

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(
          `Error listando carpetas: ${
            response.status
          } - ${await response.text()}`
        );
      }
      const data = await response.json();
      this.folders = data.files || [];
      this.files = [];
      this.selectedFolderId = null;
      console.log('Carpetas encontradas:', this.folders);
    } catch (error) {
      console.error(error);
      alert('Error listando carpetas');
    }
  }

  async listFilesInFolder(folderId: string) {
    if (!this.accessToken) {
      alert('No hay token de acceso. Autenticar primero.');
      return;
    }
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.set(`q`, `'${folderId}' in parents and trashed = false`);
    url.searchParams.set('fields', 'files(id,name,mimeType)');
    url.searchParams.set('pageSize', '50');
    url.searchParams.set('includeItemsFromAllDrives', 'true');
    url.searchParams.set('supportsAllDrives', 'true');

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(
          `Error listando archivos: ${
            response.status
          } - ${await response.text()}`
        );
      }
      const data = await response.json();
      this.files = data.files || [];
      this.selectedFolderId = folderId;
      console.log('Archivos carpeta', folderId, this.files);
    } catch (error) {
      console.error(error);
      alert('Error listando archivos');
    }
  }

  async uploadFileToFolder(file: File, folderId: string) {
    if (!this.accessToken) {
      alert('No hay token de acceso. Autenticar primero.');
      return;
    }

    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [folderId],
    };

    const boundary = '-------314159265358979323846';
    const delimiter = '\r\n--' + boundary + '\r\n';
    const closeDelimiter = '\r\n--' + boundary + '--';

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async (e: any) => {
        const contentType = file.type || 'application/octet-stream';
        const base64Data = btoa(
          new Uint8Array(e.target.result).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        const multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' +
          contentType +
          '\r\n' +
          'Content-Transfer-Encoding: base64\r\n' +
          '\r\n' +
          base64Data +
          closeDelimiter;

        try {
          const response = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name',
            {
              method: 'POST',
              headers: new Headers({
                Authorization: 'Bearer ' + this.accessToken,
                'Content-Type':
                  'multipart/related; boundary="' + boundary + '"',
              }),
              body: multipartRequestBody,
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            reject('Error subiendo archivo: ' + errorText);
            return;
          }

          const data = await response.json();
          console.log('Archivo subido:', data);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadSelectedFile() {
    if (!this.selectedFile) {
      alert('Selecciona un archivo primero');
      return;
    }
    // Por defecto sube a esta carpeta (puede ser la tuya)
    const miCarpetaId = '1OyjaxcmOf8bIgbAn00nChC7nfAZc1dKb';
    this.uploadFileToFolder(this.selectedFile, miCarpetaId)
      .then((res: any) => alert('Archivo subido con ID: ' + res.id))
      .catch((err) => alert('Error: ' + err));
  }
}
