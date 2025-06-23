import { Component, inject, Input } from '@angular/core';
import { ApprovalFlowUiComponent } from '../../ui/approval-flow-ui/approval-flow-ui.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { Client } from '../../../clients/services/clients/clients.service';
import { TableSource } from '../../../../shared/components/table/table.component';
import { ActionPriorityComponent } from '../../../action-plan/components/action-priority/action-priority.component';
import { ActionStatusComponent } from '../../../action-plan/components/action-staus/action-staus.component';
import { ActionDueDateComponent } from '../../../action-plan/components/action-due-date/action-due-date.component';
import { ApprovalFlowStatusComponent } from '../../components/approval-flow-status/approval-flow-status.component';
import { ApprovalFlowPriorityComponent } from '../../components/approval-flow-priority/approval-flow-priority.component';
import { ApprovalFlowApprovalDialogComponent } from '../../components/approval-flow-approval-dialog/approval-flow-approval-dialog.component';
import { ApprovalFlowService } from '../../services/approval-flow/approval-flow.service';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

export const ApprovalFlowType = {
  action_plan: {},
};

@Component({
  selector: 'app-approval-flow',
  standalone: true,
  imports: [
    ApprovalFlowUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
  ],
  template: ` <approval-flow-ui [tableSource]="tableSource" [stats]="stats">
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
  providers: [ApprovalFlowService],
})
export class ApprovalFlowComponent {
  dialogService = inject(MatDialog);
  loaderService = inject(LoaderService);
  approvalFlowService = inject(ApprovalFlowService);
  tableDataSource = inject(TableDataSourceService);

  stats: any = [];

  approvalFlowStats: any = {
    approved: 0,
    pending: 0,
    rejected: 0,
    late: 0,
  };

  approvalStatus: any = {
    approved: {
      name: 'Aprovado',
      name_code: 'approved',
      color: '#A8E6CF',
      icon: 'fa-solid fa-check',
    },
    rejected: {
      name: 'Rejeitado',
      name_code: 'rejected',
      color: '#FF8B94',
      icon: 'fa-solid fa-xmark',
    },
    late: {
      name: 'Atrasado',
      name_code: 'late',
      color: '#FFD3B6',
      icon: 'fa-solid fa-clock',
    },

    pending: {
      name: 'Pendente',
      name_code: 'pending',
      color: '#D3E0EA',
      icon: 'fa-solid fa-hourglass',
    },
  };

  tableSource: TableSource<any> = {
    api: {
      url: 'approval-flow',
      method: 'GET',
      onFormatterResponse: (response: any) => {
        const statusarray = Object.keys(this.approvalFlowStats);

        this.stats = [];
        console.log(statusarray);

        statusarray.forEach((status: any) => {
          this.stats.push({
            ...this.approvalStatus[status],
            count:
              response.filter(
                (item: any) => item.approval_status.name_code == status
              ).length || 0,
          });
        });

        console.log(this.stats);

        return response;
      },
    },
    columns: [
      {
        key: 'entity_type',
        header: 'Módulo',
        width: 'max-content',
        onFormatter: (col: any) => {
          const entityTypeDict: Record<string, string> = {
            action_plan: 'Planejamento de Ação',
            project: 'Projeto',
          };

          return entityTypeDict[col];
        },
      },
      {
        key: 'users',
        header: 'Criado por',
        width: 'max-content',
        onFormatter: (col: any) => {
          return `@${col?.username}`;
        },
      },
      {
        key: 'approval_status',
        header: 'Status',
        width: 'max-content',
        loadComponent: ApprovalFlowStatusComponent,
      },
      {
        key: 'responsible_user',
        header: 'Responsável',
        width: 'max-content',
        onFormatter: (col: any) => {
          return `@${col?.username}`;
        },
      },
      {
        key: 'approval_priority',
        header: 'Prioridade',
        width: 'max-content',
        loadComponent: ApprovalFlowPriorityComponent,
      },
      {
        key: 'deadline',
        header: 'Prazo',
        width: 'max-content',
        loadComponent: ActionDueDateComponent,
      },
      {
        key: 'current_status',
        header: 'Status Atual',
        width: 'max-content',
        onFormatter: (col: any, row: any) => {
          return col?.name;
        },
      },
      {
        key: 'next_status',
        header: 'Próximo Status',
        width: 'max-content',
        onFormatter: (col: any, row: any) => {
          return col?.name;
        },
      },

      {
        key: 'approval_type',
        header: 'Tipo de Aprovação',
        width: 'max-content',
      },
    ],
    actionsPosition: 'left',
    actions: [
      {
        icon: 'Check.svg',
        hidden: (row: any) => {
          return (
            !row?.logged_user_is_approver ||
            row.approval_status.name_code == 'approved' ||
            row.approval_status.name_code == 'rejected'
          );
        },
        onClick: (row: any) => {
          const dialogRef = this.dialogService.open(
            ApprovalFlowApprovalDialogComponent,
            {
              data: row,
            }
          );

          dialogRef.afterClosed().subscribe((data) => {
            if (!data) return;

            this.approvalFlowService
              .approveApprovalFlow(row.id, {
                approved_date: new Date(),
              })
              .pipe(
                tap(() => {
                  this.tableDataSource.reload();
                })
              )
              .subscribe();
          });
        },
      },
      {
        icon: 'Close.svg',
        hidden: (row: any) => {
          return (
            !row?.logged_user_is_approver ||
            row.approval_status.name_code == 'approved' ||
            row.approval_status.name_code == 'rejected'
          );
        },
        onClick: (row: any) => {
          console.log('Edit', row);
        },
      },
      {
        icon: 'Show.svg',
        onClick: (row: any) => {
          console.log('Delete', row);
        },
      },
    ],
  };
}
