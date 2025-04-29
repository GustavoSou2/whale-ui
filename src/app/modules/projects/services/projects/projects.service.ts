import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../../components/create-project-dialog/create-project-dialog.component';
import { ApiService } from '../../../../core/api/api.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProjectsService {
  apiService = inject(ApiService);
  dialogService = inject(MatDialog);

  constructor() {}

  openCreateProjectDialog() {
    let dialogRef = this.dialogService.open(CreateProjectDialogComponent);

    return dialogRef;
  }

  findAll() {
    return this.apiService.get<any>('projects');
  }

  getProject(id: string) {
    return <Observable<any>>(
      this.apiService.get<any>(`projects/${id}`).pipe(map((project) => project))
    );
  }

  createProject(project: any) {
    return this.apiService.post('projects', project);
  }

  patch(project: any) {
    let projectId = project.id;
    delete project.id;
    return this.apiService.patch(`projects/${projectId}`, project);
  }
}
