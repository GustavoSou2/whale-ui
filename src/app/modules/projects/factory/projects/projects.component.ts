import { Component, inject } from '@angular/core';
import { ProjectsUiComponent } from '../../ui/projects-ui/projects-ui.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from '../../services/projects/projects.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { TableSource } from '../../../../shared/components/table/table.component';
import { catchError, tap, throwError } from 'rxjs';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { modules } from '../../../nav/factory/menu/menu.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ProjectsUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
    CardComponent,
  ],
  template: `<projects-ui>
      <ng-container
        *ngTemplateOutlet="clientsHeader"
        project-header
      ></ng-container>
      <ng-container
        [ngTemplateOutlet]="projectContent"
        project-content
      ></ng-container>
    </projects-ui>
    <ng-template #clientsHeader>
      <button-custom
        type="button"
        label="Novo Project"
        (clicked)="createClient()"
      ></button-custom>
      <input-custom
        type="text"
        placeholder="Pesquisar"
        name="text"
        icon="Search.svg"
        required
      ></input-custom>
    </ng-template>
    <ng-template #projectContent>
      <card
        *ngFor="let project of projects | async"
        [project]="project"
        type="project"
      ></card>
    </ng-template> `,
})
export class ProjectsComponent {
  dialogService = inject(MatDialog);
  projectService = inject(ProjectsService);
  tableDataSource = inject(TableDataSourceService);
  projectsService = inject(ProjectsService);
  modules = modules;
  projects = this.projectsService.findAll();

  createClient() {
    let dialogRef = this.projectService.openCreateProjectDialog();

    dialogRef.afterClosed().subscribe((project) => {
      if (!project) return;

      this.projectService
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
          this.tableDataSource.reload();
          console.log(project);
        });
    });
  }
}
