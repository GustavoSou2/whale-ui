import { Component, inject } from '@angular/core';
import { StatusUiComponent } from '../../ui/status-ui/status-ui.component';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { TableSource } from '../../../../shared/components/table/table.component';
import { StatusUpsertUiComponent } from '../../ui/status-upsert-ui/status-upsert-ui.component';
import { StatusService } from '../../services/status/status.service';
import { formatRole } from '../../../roles/factory/roles/roles.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, StatusUiComponent],
  template: `<status-ui [tableSource]="tableSource"> </status-ui> `,
  providers: [StatusService],
})
export class StatusComponent {
  dialogService = inject(MatDialog);
  loaderService = inject(LoaderService);
  statusService = inject(StatusService);
  tableDataSource = inject(TableDataSourceService);
  toastService = inject(ToastService);

  tableSource: TableSource<any> = {
    api: {
      url: 'status',
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
          let dialogRef = this.dialogService.open(StatusUpsertUiComponent, {
            data: { ...row, isShowable: true },
          });

          dialogRef.afterClosed().subscribe((response) => {
            if (!response) return;
          });
        },
      },
      {
        icon: 'Edit.svg',
        onClick: (row: any) => {
          let dialogRef = this.dialogService.open(StatusUpsertUiComponent, {
            data: row,
          });

          dialogRef.afterClosed().subscribe((response) => {
            if (!response) return;

            this.statusService
              .update(response)
              .pipe(
                tap((data) => {
                  this.toastService.addToast(
                    'success',
                    'Status atualizado com sucesso'
                  );
                  this.tableDataSource.reload();
                })
              )
              .subscribe();
          });
        },
      },
    ],
  };

  createStatus() {
    let dialogRef = this.dialogService.open(StatusUpsertUiComponent);

    dialogRef
      .afterClosed()
      .subscribe(
        (
          status: { name: string; description: string; color: string } | null
        ) => {
          if (!status) return;

          const name_code = formatRole(status.name);
          const loader = this.loaderService.show();

          this.statusService
            .createStatus({
              name: status.name,
              name_code,
              description: status.description,
              color: status.color,
            })
            .subscribe((data) => {
              this.toastService.addToast(
                'success',
                'Status criado com sucesso'
              );
              this.tableDataSource.reload();
              loader.hide();
            });
        }
      );
  }
}
