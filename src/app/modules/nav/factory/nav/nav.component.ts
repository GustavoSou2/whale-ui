import { Component, inject } from '@angular/core';
import { NavUiComponent } from '../../ui/nav-ui/nav-ui.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { MenuComponent } from '../menu/menu.component';
import { ProjectsService } from '../../../projects/services/projects/projects.service';
import { catchError, tap, throwError } from 'rxjs';
import { StatusActionPlanService } from '../../../status-action-plan/services/status-action-plan/status-action-plan.service';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { HeroBarComponent } from '../../components/hero-bar/hero-bar.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NavUiComponent,
    CommonModule,
    ButtonComponent,
    AvatarComponent,
    MenuComponent,
    TopBarComponent,
    HeroBarComponent,
  ],
  providers: [ProjectsService],
  template: `
    <nav-ui>
      <ng-container *ngTemplateOutlet="navActions" nav-actions></ng-container>
      <ng-container *ngTemplateOutlet="asideMenu" nav-aside-menu></ng-container>
    
      <ng-container *ngTemplateOutlet="topBarRef" nav-top-bar></ng-container>
      <ng-container *ngTemplateOutlet="heroBarRef" nav-hero-bar></ng-container>
    </nav-ui>

    <ng-template #topBarRef> <top-bar [user]="user"></top-bar></ng-template>
    <ng-template #heroBarRef> <hero-bar></hero-bar></ng-template>

    <ng-template #navActions>
      <button-custom
        type="button"
        *ngFor="let action of navTopBarActions"
        variant="transparent"
        [icon]="action.icon"
        (clicked)="action.action()"
      ></button-custom>
    </ng-template>
    <ng-template #asideMenu>
      <menu></menu>
    </ng-template>
   
  `,
})
export class NavComponent {
  projectsService = inject(ProjectsService);
  statusActionPlanService = inject(StatusActionPlanService);
  private cookieService = inject(CookieService);

  userstringfy = this.cookieService.get('user');
  actionStatus$ = this.statusActionPlanService.loadActionStatus();

  get user() {
    return JSON.parse(this.userstringfy);
  }

  navTopBarActions = [
    {
      icon: 'Notifications.svg',
      action: () => {},
    },
    {
      icon: 'Update.svg',
      action: () => {},
    },
    {
      icon: 'Search.svg',
      action: () => {},
    },
    {
      icon: 'Help.svg',
      action: () => {},
    },
  ];

  createProject() {
    let dialogRef = this.projectsService.openCreateProjectDialog();

    dialogRef.afterClosed().subscribe((project) => {
      if (!project) return;

      this.projectsService
        .createProject({
          ...project,
          init_date: new Date(project.init_date),
          end_date: new Date(project.end_date),
          type: 'project',
          stage: 'draft',
        })
        .pipe(
          tap((project) => console.log(project)),
          catchError((error) => {
            return throwError(() => error);
          })
        )
        .subscribe((project) => {
          console.log(project);
        });
    });
  }
}
