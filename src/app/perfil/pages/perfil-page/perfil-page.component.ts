import { Component } from '@angular/core';
import { CalendarComponent } from '../../../calendar/components/calendar/calendar.component';
import { TasksComponent } from '../../../calendar/components/tasks/tasks.component';
import { DriveComponent } from '../../../drive/components/drive/drive.component';
import { PaystubSignerComponent } from '../../../paystub/paystub-signer/paystub-signer.component';
import { NavPageComponent } from "../../../shared/pages/nav-page/nav-page/nav-page.component";

@Component({
  selector: 'app-perfil-page',
  imports: [CalendarComponent, TasksComponent, DriveComponent, PaystubSignerComponent, NavPageComponent],
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.css'
})
export class PerfilPageComponent {
  /*router = inject(Router);
  route = inject(ActivatedRoute);
  auth = inject(AuthService)*/
}
