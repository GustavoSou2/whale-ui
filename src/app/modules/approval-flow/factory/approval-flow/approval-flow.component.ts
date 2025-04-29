import { Component, inject } from '@angular/core';
import { ApprovalFlowUiComponent } from '../../ui/approval-flow-ui/approval-flow-ui.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { Client } from '../../../clients/services/clients/clients.service';
import { TableSource } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-approval-flow',
  standalone: true,
  imports: [
    ApprovalFlowUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
  ],
  template: ` <approval-flow-ui [tableSource]="tableSource">
      <ng-container
        *ngTemplateOutlet="approvalFlowHeader"
        approval-header
      ></ng-container>
    </approval-flow-ui>
    <ng-template #approvalFlowHeader>
      <input-custom
        type="text"
        placeholder="Pesquisar"
        name="text"
        icon="Search.svg"
        required
      ></input-custom>
    </ng-template>`,
})
export class ApprovalFlowComponent {
  dialogService = inject(MatDialog);
  loaderService = inject(LoaderService);
  tableDataSource = inject(TableDataSourceService);

  tableSource: TableSource<any> = {
    api: {
      url: 'approval-flow',
      method: 'GET',
    },
    columns: [
      { key: 'name', header: 'Client', width: '300px' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Telefone' },
      { key: 'city', header: 'Cidade' },
      { key: 'state', header: 'Estado' },
      { key: 'country', header: 'País' },
      { key: 'postal_code', header: 'CEP', width: 'max-content' },
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
}
