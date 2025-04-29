import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const METHOD_DICT: Record<string, string> = {
  POST: 'Criado',
  PUT: 'Atualizado',
  PATCH: 'Atualizado',
  DELETE: 'Deletado',
};

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  private router = inject(Router);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const method = req.method.toUpperCase();
    const notifyMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

    const shouldNotify = notifyMethods.includes(method);

    return next.handle(req).pipe(
      tap((event) => {
        if (shouldNotify && event instanceof HttpResponse) {
          const urlOrigin = this.router.url;
          const urlParts = req.url.split('/');
          const methodTyped = METHOD_DICT[method];
          const title = req.headers.get('X-Notification-Title');
          const message = req.headers.get('X-Notification-Message');
          const module = req.headers.get('X-Notification-Module');

          console.log('Origin', urlOrigin);
          console.log('Endpoint', urlParts);
          console.log('Method Type', methodTyped);
          console.log('Notify', {
            title,
            message,
            module,
          });

          req.headers.delete('X-Notification-Title');
          req.headers.delete('X-Notification-Message');
          req.headers.delete('X-Notification-Module');
        }
      })
    );
  }
}
