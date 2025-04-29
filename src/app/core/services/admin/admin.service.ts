import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Roles } from '../../../modules/roles/factory/roles/roles.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  cookieService = inject(CookieService);
  isAdmin(currentUser?: any) {
    let userStringfy = this.cookieService.get('user');

    if (!userStringfy) return;

    let user = JSON.parse(userStringfy);

    let {
      role: { role_code },
    } = user;

    if (!!currentUser) role_code = currentUser.role_code;

    return role_code === Roles.ADMIN;
  }
}
