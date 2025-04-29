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

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
    StatusUiComponent,
  ],
  template: `<status-ui [tableSource]="tableSource">
      <ng-container
        *ngTemplateOutlet="statusHeader"
        status-header
      ></ng-container>
    </status-ui>
    <ng-template #statusHeader>
      <button-custom
        type="button"
        label="Novo Status"
        (clicked)="createStatus()"
      ></button-custom>
      <input-custom
        type="text"
        placeholder="Pesquisar"
        name="text"
        icon="Search.svg"
        required
      ></input-custom>
    </ng-template>`,
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
      { key: 'name_code', header: 'Código do Status' },
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

  ngOnInit() {}

  createStatus() {
    let dialogRef = this.dialogService.open(StatusUpsertUiComponent);

    dialogRef
      .afterClosed()
      .subscribe((status: { name: string; description: string, color: string } | null) => {
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
            this.toastService.addToast('success', 'Status criado com sucesso');
            this.tableDataSource.reload();
            loader.hide();
          });
      });
  }
}
