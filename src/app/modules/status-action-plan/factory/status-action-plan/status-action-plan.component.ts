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

@Component({
  selector: 'app-status-action-plan',
  standalone: true,
  imports: [
    StatusActionPlanUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
  ],
  template: `<status-action-plan-ui [tableSource]="tableSource">
      <ng-container
        *ngTemplateOutlet="statusHeader"
        status-header
      ></ng-container>
    </status-action-plan-ui>
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
  providers: [StatusActionPlanService],
})
export class StatusActionPlanComponent {
  dialogService = inject(MatDialog);
  loaderService = inject(LoaderService);
  statusService = inject(StatusActionPlanService);
  tableDataSource = inject(TableDataSourceService);
  toastService = inject(ToastService);

  tableSource: TableSource<any> = {
    api: {
      url: 'action-plan-status',
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

  createStatus() {}
}
