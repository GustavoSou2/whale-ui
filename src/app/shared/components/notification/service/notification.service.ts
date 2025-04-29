import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CookieService } from '../../../../core/handlers/cookie/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiService = inject(ApiService);
  private cookieService = inject(CookieService);

  private notificationToastr = new BehaviorSubject<boolean>(false);
  private skip = signal(20);

  private userJson = JSON.parse(this.cookieService.getCookie('user') || '{}');
  private userSubject = new BehaviorSubject<any>(this.userJson);

  private user$ = this.userSubject.asObservable();

  private notifications = new BehaviorSubject<any>([]);
  notifications$ = this.notifications.asObservable();
  notificationsComputed$ = computed(() => this.updateListOnScroll(this.skip()));
  // notificationsScroll = computed(
  //   () => this.updateListOnScroll(this.skip()).subscribe
  // );
  notificationToastr$ = this.notificationToastr.asObservable();

  constructor() {
    // this.user$.subscribe((user: any) => {
    //   this.updateListOnScroll(this.skip(), user).subscribe();
    // });
  }

  set setUser(value: any) {
    this.userSubject.next(value);
  }

  get user() {
    return this.userSubject.getValue();
  }

  set setNotifications(value: any) {
    this.notifications.next(value);
  }

  get getNotifications() {
    return this.notifications.getValue();
  }

  set setNotificationToastr(value: boolean) {
    this.notificationToastr.next(value);
  }

  /**
   * Metodo para mostrar as notificações - Dialog
   *
   * @returns
   */
  show() {
    this.notificationToastr.next(true);

    return {
      hide: () => this.hide(),
    };
  }

  /**
   * Método para esconder as notificações - Dialog
   *
   */
  hide() {
    this.notificationToastr.next(false);
  }

  /**
   * Atualiza o skip e notificações
   *
   */
  nextSkip() {
    this.skip.set(this.skip() + 20);
  }

  /**
   * Cria uma nova notificação e atualiza a lista de notificação
   *
   * @param data
   * @returns
   */
  create(data: any) {
  }

  /**
   * Lista todas as notificações
   *
   * @param params
   * @returns
   */
  get(params?: any) {
    let httpParams = new HttpParams().appendAll({
      ...params,
      name: 'notifications',
    });

  }

  /**
   * Marca a notificação como lida
   *
   * @param notificationId
   * @returns
   */
  markAsRead(notificationId: number) {
    // return this.apiService
    //   .patch(`EXAPP_LOG`, +notificationId, {
    //     updates: {
    //       readAt: true,
    //     },
    //   })
    //   .pipe(tap(() => this.updateNotificationsArr()));
  }

  /**
   * Atualiza uma notificação
   *
   * @param data
   * @returns
   */
  update(data: any) {
    
  }

  /**
   * LazyLoader das lista de notificações de acordo com o scroll
   *
   * @param skip
   */
  updateListOnScroll(skip: number, user = this.user) {
    
  }

  /**
   *
   * Atualiza o array de notificação com os dados atualizados do banco
   */
  updateNotificationsArr() {
    
  }

  /**
   *
   * Cria a estrutura de notificação
   *
   * @param param
   * @returns
   */
  notificationSchedule({
    title,
    message,
    type,
    origin,
    actionURL,
    metadata,
    targetUserId,
  }: any) {
    return {
      title,
      message,
      type,
      createdBy: {
        ...this.user,
      },
      createdAt: new Date().toISOString(),
      origin,
      actionUrl: actionURL ?? null,
      metadata: metadata ?? null,
      targetUserId: targetUserId ?? null,
      readAt: false,
    };
  }
}
