import { Component, inject } from '@angular/core';
import { NavUiComponent } from '../../ui/nav-ui/nav-ui.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { MenuComponent } from '../menu/menu.component';
import { ProjectsService } from '../../../projects/services/projects/projects.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NavUiComponent,
    CommonModule,
    ButtonComponent,
    AvatarComponent,
    MenuComponent,
  ],
  providers: [ProjectsService],
  template: `
    <nav-ui>
      <ng-container *ngTemplateOutlet="navActions" nav-actions></ng-container>
      <ng-container *ngTemplateOutlet="avatar" nav-avatar></ng-container>
      <ng-container *ngTemplateOutlet="asideMenu" nav-aside-menu></ng-container>
      <ng-container
        *ngTemplateOutlet="addButton"
        nav-aside-add-button
      ></ng-container>
    </nav-ui>
    <ng-template #navActions>
      <button-custom
        type="button"
        *ngFor="let action of navTopBarActions"
        variant="transparent"
        [icon]="action.icon"
        (clicked)="action.action()"
      ></button-custom>
    </ng-template>
    <ng-template #avatar><avatar /></ng-template>
    <ng-template #asideMenu>
      <menu></menu>
    </ng-template>
    <ng-template #addButton>
      <button-custom
        type="button"
        variant="primary"
        label="Novo Projeto"
        (clicked)="createProject()"
      ></button-custom>
    </ng-template>
  `,
})
export class NavComponent {
  projectsService = inject(ProjectsService);
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
