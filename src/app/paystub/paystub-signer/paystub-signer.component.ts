import { Component, inject } from '@angular/core';
import { PaystubSignatureService } from '../services/paystub-signature.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'paystub-signer',
  imports: [Toast, ButtonModule, ProgressSpinner],
  templateUrl: './paystub-signer.component.html',
  styleUrl: './paystub-signer.component.css',
  providers: [MessageService],
})
export class PaystubSignerComponent {
  paystubSignatureService = inject(PaystubSignatureService);
  constructor(private messageService: MessageService) {}

  loading: boolean = false;

  //TODO: esto debería ser dinámico. Se harcodea unicamente para la muestra del spike firmar recibo de sueldo
  pdfFileId = '1Vs-sICz4Z_hy5X8n4IhxnU8lqaS-omCU';
  signatureFileId = '10Lw8c8KN_RlpNxMv9RhC4T1fbS1L2_zw';
  parentFolderId = '1OyjaxcmOf8bIgbAn00nChC7nfAZc1dKb';

  sign() {
    console.log('me accione');
    this.loading = true;

    this.paystubSignatureService
      .signPaystub(this.pdfFileId, this.signatureFileId, this.parentFolderId)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.showSuccess();
        },
        error: (err) => {
          this.loading = false;
          console.error('Error al firmar', err);
          this.showError();
        },
      });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Recibo de sueldo firmado con éxito.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo firmar el recibo de sueldo.',
    });
  }
}
