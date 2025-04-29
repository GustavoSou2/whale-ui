import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { TimeAgoPipe } from '../../pipes/time-ago/time-ago.pipe';
import { NotificationService } from './service/notification.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

const MODULE_DICT: any = {
  repayments: 'Prestação de Contas',
  'down-payments': 'Adiantamento de Despesas',
  reimbursement: 'Reembolso de Despesas',
  reimbursements: 'Reembolso de Despesas',
  approval: 'Fluxo de Aprovação',
};

const TYPE_DICT: any = {
  success: 'Sucesso',
  error: 'Erro',
  complete: 'Finalizado',
  update: 'Atualizado',
  create: 'Gerado',
  cancel: 'Cancelado',
  refused: 'Recusado',
};

@Component({
  selector: 'notification',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
    trigger('expandText', [
      state(
        'collapsed',
        style({
          height: '*',
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
        })
      ),
      transition('collapsed <=> expanded', [
        style({ overflow: 'hidden' }),
        animate('300ms ease'),
      ]),
    ]),
  ],
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  private eRef = inject(ElementRef);
  private router = inject(Router);

  notifications$ = this.notificationService.notifications$;

  MODULE_DICT = MODULE_DICT;
  TYPE_DICT = TYPE_DICT;

  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();

  setLoading(value: boolean) {
    this.isLoading.next(value);
  }

  get notificationToastr$() {
    return this.notificationService.notificationToastr$;
  }

  set toastr(value: boolean) {
    this.notificationService.setNotificationToastr = value;
  }

  showToastr() {
    this.toastr = true;
  }

  validateIfHasNotificationsToRead() {
    return this.notifications$.pipe(
      map((notifications) => {
        const hasNotificationsToRead = notifications.some(
          (notification: any) => !notification.readAt
        );

        return hasNotificationsToRead;
      })
    );
  }

  navigateToDoc({ actionUrl }: any) {
    this.notificationService.setNotificationToastr = false;
    this.router.navigate([actionUrl]);
  }

  /**
   * Valida o scroll para carregar mais notificação
   *
   * @param event
   */
  onScroll(event: any) {
    const element = event.target;

    if (
      element.scrollTop + element.clientHeight >=
      (element.scrollHeight - 300)
    ) {
      this.notificationService.nextSkip();
    }
  }

  /**
   * Atualiza o item clicado para já lido
   *
   * @param notificationId
   */
  markAsRead(notification: any) {
    if (!notification.readAt) {
      notification.readAt = true;
      this.notificationService.markAsRead(notification.code).subscribe();
    }
  }

  /**
   * Pega a diferença entre as datas
   */
  getTimeAgo(createdAt: string): string {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffYear = Math.floor(diffDay / 365);

    if (diffMin < 1) return 'agora mesmo';
    if (diffMin < 60) return `${diffMin} min atrás`;
    if (diffHr < 24) return `${diffHr}h atrás`;
    if (diffDay < 7) return `${diffDay} dia${diffDay > 1 ? 's' : ''} atrás`;
    if (diffWeek < 52)
      return `${diffWeek} semana${diffWeek > 1 ? 's' : ''} atrás`;
    return `${diffYear} ano${diffYear > 1 ? 's' : ''} atrás`;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.toastr = false;
    }
  }
}
