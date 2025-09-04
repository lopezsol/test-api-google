import { Component, inject, signal} from '@angular/core';
import { AirtableFields, AirtableListResponse } from '../../../auth/interfaces/Airtable';
import { AirtableService } from '../../../services/airtableservice/airtable.service';
import { LoginPageComponent } from "../../../auth/pages/login-page/login-page.component";
import { LoginButtonComponent } from "../../../auth/components/login-button/login-button.component";

@Component({
  selector: 'home-page',
  imports: [LoginPageComponent, LoginButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

 private api = inject(AirtableService);

  records = signal<AirtableFields[]>([]);


  ngOnInit(): void {
    // this.fetchRecords();
  }

  private fetchRecords(): void {

    this.api.getAirtableRecords().subscribe({
      next: (res: AirtableListResponse) => {
        console.log(res);
        // Mapeamos solo los fields de cada record
        const mapped = res.records.map(r => r.fields);
        this.records.set(mapped);

      },
      error: (err) => {
        console.error('Error obteniendo registros', err);
        this.records.set([]);
      }
    });
  }
}


