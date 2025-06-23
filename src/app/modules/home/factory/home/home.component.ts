import { Component, inject } from '@angular/core';
import { HomeUiComponent } from '../../ui/home-ui/home-ui.component';
import { modules } from '../../../nav/factory/menu/menu.component';
import { NavCardUiComponent } from '../../../nav/ui/nav-card-ui/nav-card-ui.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProjectsService } from '../../../projects/services/projects/projects.service';
import { CookieService } from 'ngx-cookie-service';
import {
  CalendarComponent,
  CalendarEvent,
} from '../../../../shared/components/calendar/calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeUiComponent,
    NavCardUiComponent,
    CommonModule,
    CardComponent,
    CalendarComponent,
  ],
  template: `
    <home-ui>
      <ng-container *ngTemplateOutlet="homeContent" home-content></ng-container>
    </home-ui>

    <ng-template #homeContent>
      
    </ng-template>
  `,
  providers: [ProjectsService],
})
export class HomeComponent {
  private cookieService = inject(CookieService);
  userStringfy = this.cookieService.get('user');
  private user = JSON.parse(this.userStringfy);

  get username() {
    return this.user.username;
  }

  events: CalendarEvent[] = [
    { name: 'Evento único', date: '2025-06-01', color: '#007BFF' },
    {
      name: 'Evento por período',
      dateInit: '2025-06-03',
      dateEnd: '2025-06-05',
      color: '#28A745',
    },
  ];
}
