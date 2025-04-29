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
import { ProjectStatusTableUiComponent } from '../../components/project-status-table-ui/project-status-table-ui.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ProjectsUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
  ],
  template: `<projects-ui [tableSource]="tableSource">
      <ng-container
        *ngTemplateOutlet="clientsHeader"
        clients-header
      ></ng-container
    ></projects-ui>
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
    </ng-template>`,
})
export class ProjectsComponent {
  dialogService = inject(MatDialog);
  projectService = inject(ProjectsService);
  tableDataSource = inject(TableDataSourceService);

  tableSource: TableSource<any> = {
    api: {
      url: 'projects',
      method: 'GET',
      onFormatterResponse: (projects: any) => {
        return projects.map((project: any) => ({
          ...project,
          client_name: project.clients.name,
          created_by_name: project.users.username,
        }));
      },
    },
    columns: [
      { key: 'name', header: 'Projeto', width: '300px' },
      {
        key: 'description',
        header: 'Descrição',
        onFormatter: (col: any, row: any) => {
          return col.length > 20 ? `${col.slice(0, 35)}...` : col;
        },
      },
      {
        key: 'project_status',
        header: 'status',
        loadComponent: ProjectStatusTableUiComponent,
      },
      {
        key: 'client_name',
        header: 'Cliente',
      },
      {
        key: 'created_by_name',
        header: 'Criado por',
      },
      {
        key: 'init_date',
        header: 'Data de inicio',
        onFormatter: (col: any) => {
          return new Date(col).toLocaleDateString('pt-BR');
        },
      },
      {
        key: 'end_date',
        header: 'Data de fim',
        onFormatter: (col: any) => {
          return new Date(col).toLocaleDateString('pt-BR');
        },
      },
    ],
    actions: [
      {
        icon: 'Show.svg',
        onClick: (row: any) => {
          console.log('Edit', row);
        },
      },
      {
        icon: 'Edit.svg',
        onClick: (row: any) => {
          console.log('Edit', row);
        },
      },
      {
        icon: 'Delete.svg',
        onClick: (row: any) => {
          console.log('Delete', row);
        },
      },
    ],
  };

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
