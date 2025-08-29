import { Component } from '@angular/core';
import { CalendarComponent } from '../../../calendar/components/calendar/calendar.component';
import { TasksComponent } from '../../../calendar/components/tasks/tasks.component';
import { DriveComponent } from '../../../drive/components/drive/drive.component';
import { PaystubSignerComponent } from '../../../paystub/paystub-signer/paystub-signer.component';

@Component({
  selector: 'app-perfil-page',
  imports: [CalendarComponent, TasksComponent, DriveComponent, PaystubSignerComponent],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.css'
})
export class PerfilPageComponent {
  /*router = inject(Router);
  route = inject(ActivatedRoute);
  auth = inject(AuthService)*/
}
