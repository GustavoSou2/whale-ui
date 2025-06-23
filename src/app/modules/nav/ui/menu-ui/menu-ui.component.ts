import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Roles } from '../../../roles/factory/roles/roles.component';
import { AdminService } from '../../../../core/services/admin/admin.service';
import { TapBarService } from '../../components/top-bar/subservice/tap-bar.service';

@Component({
  selector: 'menu-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-ui.component.html',
  styleUrl: './menu-ui.component.scss',
})
export class MenuUiComponent {
  router = inject(Router);
  adminService = inject(AdminService);
  @Input() set modules(modules: any) {
    this._modules.set(modules);

    this.identifyRouteInModule(modules);
  }
  @Input() set adminModules(modules: any) {
    this._modulesAdmin.set(modules);

    this.identifyRouteInModule(modules);
  }
  cookieService = inject(CookieService);
  tapBarService = inject(TapBarService);

  _modules = signal<any>(null);
  _modulesAdmin = signal<any>(null);

  currentPatch = signal('home');

  get menu() {
    return <any[]>this._modules() ?? [];
  }

  get adminMenu() {
    return <any[]>this._modulesAdmin() ?? [];
  }

  get isAdmin() {
    return this.adminService.isAdmin();
  }

  itemClass(item: any) {
    return `${item.isCurrentRoute ? 'current' : ''} ${item.state}`;
  }

  handleClick(route: any) {
    const path = route.path;

    this.tapBarService.setStateCurrentRoute(route);
    this.currentPatch.set(path);
    this.router.navigateByUrl(path);
  }

  identifyRouteInModule(modules: any) {
    const url = this.router.url.split('?')[0]; // remove query params
    const firstSegment = url.split('/').filter(Boolean)[0];

    const route = modules.find((route: any) => route.path === firstSegment);

    if (!route) {
      return;
    }

    const path = route.path;

    this.tapBarService.setStateCurrentRoute(route);
    this.currentPatch.set(path);
    // this.router.navigateByUrl(path);
  }
}
