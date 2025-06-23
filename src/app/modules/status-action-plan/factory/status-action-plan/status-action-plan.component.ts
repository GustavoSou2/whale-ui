import { Component, inject } from '@angular/core';
import { StatusActionPlanUiComponent } from '../../ui/status-action-plan-ui/status-action-plan-ui.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { StatusUpsertUiComponent } from '../../../status/ui/status-upsert-ui/status-upsert-ui.component';
import { formatRole } from '../../../roles/factory/roles/roles.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { StatusService } from '../../../status/services/status/status.service';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { TableSource } from '../../../../shared/components/table/table.component';
import { StatusActionPlanService } from '../../services/status-action-plan/status-action-plan.service';
import { StatusActionPlanUpsertComponent } from '../../components/status-action-plan-upsert/status-action-plan-upsert.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-status-action-plan',
  standalone: true,
  imports: [StatusActionPlanUiComponent, CommonModule],
  template: `<status-action-plan-ui [tableSource]="tableSource">
  </status-action-plan-ui> `,
  providers: [StatusActionPlanService],
})
export class StatusActionPlanComponent {
  dialogService = inject(MatDialog);
  loaderService = inject(LoaderService);
  statusService = inject(StatusActionPlanService);
  tableDataSource = inject(TableDataSourceService);
  statusActionPlanService = inject(StatusActionPlanService);
  toastService = inject(ToastService);

  tableSource: TableSource<any> = {
    api: {
      url: 'action-plan-status',
      method: 'GET',
    },
    columns: [
      { key: 'name', header: 'Status' },
      {
        key: 'description',
        header: 'Descrição',
        width: '300px',
        onFormatter: (col: any) => {
          return col?.length > 20 ? `${col.slice(0, 35)}...` : col;
        },
      },
    ],
    actions: [
      {
        icon: 'Show.svg',
        onClick: (row: any) => {
          this.dialogService.open(StatusActionPlanUpsertComponent, {
            data: { ...row, isShowable: true },
          });
        },
      },
      {
        icon: 'Edit.svg',
        onClick: (row: any) => {
          const dialogRef = this.dialogService.open(
            StatusActionPlanUpsertComponent,
            {
              data: { ...row },
            }
          );

          dialogRef.afterClosed().subscribe((response) => {
            if (!response) return;

            this.statusActionPlanService
              .update(response)
              .pipe(
                tap(() => {
                  this.tableDataSource.reload();
                  this.toastService.addToast(
                    'Sucesso',
                    'Status atualizado com sucesso'
                  );
                })
              )
              .subscribe();
          });
        },
      },
    ],
  };

  createStatus() {}
}
