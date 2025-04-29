import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Roles } from '../../../roles/factory/roles/roles.component';
import { AdminService } from '../../../../core/services/admin/admin.service';

@Component({
  selector: 'menu-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-ui.component.html',
  styleUrl: './menu-ui.component.scss',
})
export class MenuUiComponent {
  router = inject(Router);
  modules = input();
  adminModules = input();
  cookieService = inject(CookieService);
  adminService = inject(AdminService);

  get menu() {
    return <any[]>this.modules() ?? [];
  }

  get adminMenu() {
    return <any[]>this.adminModules() ?? [];
  }

  get isAdmin() {
    return this.adminService.isAdmin();
  }

  itemClass(item: any) {
    return `${item.isCurrentRoute ? 'current' : ''} ${item.state}`;
  }

  handleClick(path: string) {
    this.router.navigateByUrl(path);
  }
}
