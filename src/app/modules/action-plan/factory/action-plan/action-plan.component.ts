import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Type,
} from '@angular/core';
import { ActionApprovalCrateDialogComponent } from '../../components/action-approval-crate-dialog/action-approval-crate-dialog.component';
import { ActionPlanUiComponent } from '../../ui/action-plan-ui/action-plan-ui.component';
import { StatusActionPlanService } from '../../../status-action-plan/services/status-action-plan/status-action-plan.service';
import { BehaviorSubject, first, tap } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ActionPlanMetricsComponent } from '../../components/action-plan-metrics/action-plan-metrics.component';
import { ActionPlanStatusComponent } from '../../components/action-plan-status/action-plan-status.component';
import { HttpParams } from '@angular/common/http';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { ActionStatusComponent } from '../../components/action-staus/action-staus.component';
import { ActionPriorityComponent } from '../../components/action-priority/action-priority.component';
import { ActionDueDateComponent } from '../../components/action-due-date/action-due-date.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../../../../shared/components/confirmation-dialog/services/confirmation-dialog.service';
import { ActionPlanService } from '../../services/action-plan.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { ActionReprovalCrateDialogComponent } from '../../components/action-reproval-crate-dialog/action-reproval-crate-dialog.component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {
  ActionPlanApprovalStatus,
  ActionPlanConfirmationDicts,
  ActionPlanReprovalStatus,
  ActionPlanStatus,
} from '../../action-plan.types';
import { DialogService } from '../../../../shared/components/dialog/dialog.service';
import { ActionPlanDetailComponent } from '../../components/action-plan-detail/action-plan-detail.component';

const cancelActionPlan = (name: string, type: 'item' | 'subitem') => {
  return `<p>
  Cancelar um <strong>plano de ação</strong> implica encerrar o acompanhamento, as validações e as tarefas relacionadas a este processo. Essa ação é <strong>irreversível</strong> e pode impactar o controle de conformidade e o histórico de execução da obra.
</p><p>
  Você está prestes a cancelar o plano de ação referente ao ${type}: <strong>${name}</strong>.<br>
</p><p><strong>Deseja realmente cancelar o plano de ação para este item/subitem?</strong></p>`;
};

@Component({
  selector: 'app-action-plan',
  standalone: true,
  imports: [
    ActionPlanUiComponent,
    CommonModule,
    TableDataSource,
    ActionPlanMetricsComponent,
    ActionPlanStatusComponent,
  ],
  template: `
    <action-plan-ui>
      <ng-container
        [ngTemplateOutlet]="actionPlanHeaderRef"
        action-plan-header
      ></ng-container>
      <ng-container
        [ngTemplateOutlet]="actionPlanContentRef"
        action-plan-content
      ></ng-container>
    </action-plan-ui>

    <ng-template #actionPlanHeaderRef>
      <action-plan-status
        [status]="actionPlanStatus$ | async"
        (onclick)="actionPlanStatusToFilter.set($event)"
      ></action-plan-status>
      <action-plan-metrics [metrics]="metrics"></action-plan-metrics>
    </ng-template>

    <ng-template #actionPlanContentRef>
      <table-custom
        [tableSource]="tableSource"
        [tableFullWidth]="false"
      ></table-custom>
    </ng-template>
  `,
  providers: [StatusActionPlanService, ActionPlanService, DatePipe],
})
export class ActionPlanComponent {
  confirmationDialogService = inject(ConfirmationDialogService);
  statusActionPlanService = inject(StatusActionPlanService);
  tableDataSourceService = inject(TableDataSourceService);
  actionPlanService = inject(ActionPlanService);
  dialogCustomService = inject(DialogService);
  toastService = inject(ToastService);
  dialogService = inject(MatDialog);
  datePipe = inject(DatePipe);

  actionPlanMetrics = signal<any>(null);

  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();

  actionPlanStatus = signal<any>(null);
  actionPlanStatus$ = this.statusActionPlanService
    .getActionStatus()
    .pipe(tap((response) => this.actionPlanStatus.set(response)));

  actionPlanStatusToFilter = signal<any>(null);
  actionPlanFilterByStatusComputed = effect(() => {
    const status = this.actionPlanStatusToFilter();

    if (status) {
      this.filterByStatus(status?.id);
    }
  });

  params = new BehaviorSubject<HttpParams>(new HttpParams());

  get metrics() {
    return this.actionPlanMetrics();
  }

  tableSource: TableSource<any> = {
    api: {
      url: 'action-plan',
      method: 'GET',
      params: this.params.getValue(),
      onFormatterResponse: (response: any) => {
        this.actionPlanMetrics.set(response?.metrics);

        return response.data;
      },
    },
    columns: [
      { key: 'name', header: 'Titulo', width: 'max-content' },

      {
        key: 'action_plan_status',
        header: 'Status',
        width: 'max-content',
        loadComponent: ActionStatusComponent,
      },
      {
        key: 'users',
        header: 'Responsável',
        width: 'max-content',
        onFormatter: (col: any) => {
          return `@${col?.username}`;
        },
      },
      {
        key: 'priority',
        header: 'Prioridade',
        width: 'max-content',
        loadComponent: ActionPriorityComponent,
      },
      {
        key: 'start_date',
        header: 'Data de inicio',
        width: 'max-content',
        onFormatter: (col: any) => {
          return this.datePipe.transform(col, 'dd/MM/yyyy');
        },
      },
      {
        key: 'end_date',
        header: 'Data Fim',
        width: 'max-content',
        loadComponent: ActionDueDateComponent,
      },
      {
        key: 'actual_cost',
        header: 'Gasto real',
        width: 'max-content',
        onFormatter: (col: any) => {
          return (+col).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
        },
      },
      {
        key: 'estimated_cost',
        header: 'Gasto Estimado',
        width: 'max-content',
        onFormatter: (col: any) => {
          return (+col).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
        },
      },
    ],
    actionsPosition: 'left',
    actions: [
      {
        icon: 'Check.svg',
        hidden: (row: any) => {
          return (
            (!!row.has_approval_flow &&
              row?.approval_flow.approval_status.name_code != 'approved') ||
            row.action_plan_status.name_code == ActionPlanStatus.CONCLUSAO
          );
        },
        onClick: (row: any) => {
          const statusCode: ActionPlanStatus = row.action_plan_status.name_code;
          const dialogComponent = ActionPlanApprovalStatus[statusCode];

          if (!dialogComponent) return;

          let data = row;

          if (statusCode != ActionPlanStatus.CRIACAO) {
            data = {
              ...row,
              ...ActionPlanConfirmationDicts[statusCode],
            };
          }

          const dialogRef = this.dialogService.open(dialogComponent, {
            data,
            panelClass:
              ActionPlanStatus.EXECUCAO == statusCode
                ? 'action-plan-dialog'
                : '',
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;

            if (statusCode != ActionPlanStatus.CRIACAO) {
              this.actionPlanNextStatus(row)
                .pipe(
                  tap((response: any) => {
                    this.toastService.addToast(
                      'Plano de Ação',
                      response.values.message
                    );

                    this.actionPlanStatus$ = this.statusActionPlanService
                      .getActionStatus()
                      .pipe(
                        tap(() => {
                          this.tableDataSourceService.reload();
                        })
                      );
                  })
                )
                .subscribe();

              return;
            }

            this.actionPlanStatus$ = this.statusActionPlanService
              .getActionStatus()
              .pipe(
                tap(() => {
                  this.tableDataSourceService.reload();
                })
              );
          });
        },
      },
      {
        icon: 'Close.svg',

        hidden: (row: any) => {
          return (
            row?.action_plan_status?.name_code == ActionPlanStatus.CRIACAO ||
            (!!row.has_approval_flow &&
              row?.approval_flow.approval_status.name_code != 'approved') ||
            row.action_plan_status.name_code == ActionPlanStatus.CONCLUSAO
          );
        },
        onClick: (row: any) => {
          const statusCode: ActionPlanStatus = row.action_plan_status.name_code;
          const dialogComponent = ActionPlanReprovalStatus[statusCode];

          if (!dialogComponent) return;

          const dialogRef = this.dialogService.open(dialogComponent, {
            data: {
              action_plan: row,
              ...ActionPlanConfirmationDicts[statusCode],
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;

            if (statusCode == ActionPlanStatus.ANALISE_TECNICA) {
              const previusStatus = this.actionPlanStatus()[0];

              this.backToInitialStatus(row, previusStatus);
            } else {
              this.cancelActionPlan(row);
            }
          });
        },
      },
      {
        icon: 'Show.svg',
        onClick: (row: any) => {
          this.dialogCustomService.open(ActionPlanDetailComponent, {
            data: {
              action_plan: row,
            },
          });
        },
      },
    ],
  };

  constructor() {
    this.params.subscribe((newParams: any) => {
      if (this.tableSource?.api) {
        this.tableSource.api.params = newParams;
      }

      this.tableDataSourceService.reload();
    });
  }

  filterByStatus(status: any) {
    const paramsStatusSet = this.params
      .getValue()
      .set('action_plan_status', status);

    this.params.next(paramsStatusSet);

    this.tableDataSourceService.reload();
  }

  backToInitialStatus(actionPlan: any, status: any) {
    this.actionPlanService
      .backToInitialStatus(actionPlan.id, status.id)
      .pipe(
        tap(() => {
          this.toastService.addToast(
            'Plano de Ação',
            'Este plano de ação foi devolvido ao status de criação para redirecionamento'
          );

          this.actionPlanStatus$ = this.statusActionPlanService
            .getActionStatus()
            .pipe(
              tap(() => {
                this.tableDataSourceService.reload();
              })
            );
        })
      )
      .subscribe();
  }

  cancelActionPlan(actionPlan: any) {
    this.actionPlanService
      .cancelActionPlan(actionPlan.id)
      .pipe(
        tap(() => {
          this.toastService.addToast(
            'Plano de Ação',
            'Plano de ação cancelado com sucesso'
          );

          this.actionPlanStatus$ = this.statusActionPlanService
            .getActionStatus()
            .pipe(
              tap(() => {
                this.tableDataSourceService.reload();
              })
            );
        })
      )
      .subscribe();
  }

  actionPlanNextStatus(row: any) {
    return this.actionPlanService.advancedActionPlanStatus(row.id);
  }
}
