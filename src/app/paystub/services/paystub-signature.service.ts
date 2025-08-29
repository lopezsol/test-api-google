import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignatureResponse } from '../interfaces/signature-response.interface';
import { environment } from '../../../environments/environment';

const baseUrl = environment.mobyUrl;

@Injectable({
  providedIn: 'root',
})
export class PaystubSignatureService {
  private http = inject(HttpClient);

  signPaystub(
    pdfFileId: string,
    signatureFileId: string,
    parentFolderId?: string
  ): Observable<SignatureResponse> {


    let params = new HttpParams()
      .set('pdfFileId', pdfFileId)
      .set('signatureFileId', signatureFileId);

    if (parentFolderId) {
      params = params.set('parentFolderId', parentFolderId);
    }

    const apiUrl = `${baseUrl}/pdf/sign-from-drive`;

    return this.http.post<SignatureResponse>(apiUrl, {}, { params });
  }
}
