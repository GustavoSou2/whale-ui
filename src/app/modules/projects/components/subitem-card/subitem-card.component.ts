import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CATEGORY_DICTIONARY } from '../../../../core/dictionaries/category.dict';
import { STATUS_DICTIONARY } from '../../../../core/dictionaries/status.dict';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ConfirmationDialogService } from '../../../../shared/components/confirmation-dialog/services/confirmation-dialog.service';
import {
  ActionPlanPriority,
  ActionPlanService,
  ActionPlanType,
} from '../../../action-plan/services/action-plan.service';
import { catchError, tap, throwError } from 'rxjs';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { ActionPlanStatus } from '../../../action-plan/action-plan.types';
import { getTextColor } from '../../../../core/functions/text-color.functino';
import { SubItemsService } from '../../services/sub-items/sub-items.service';

const initActionPlan = (name: string, type: 'item' | 'subitem') => {
  return `<p>
    O <strong>plano de ação</strong> é um conjunto estruturado de etapas, tarefas e validações que visam garantir o cumprimento de requisitos técnicos, legais e operacionais dentro da obra. Ele permite o <strong>acompanhamento detalhado</strong> do progresso, com responsáveis designados, prazos definidos e status personalizados para cada fase do processo.
  </p><p>
    Neste caso, você está prestes a iniciar o plano de ação para o seguinte elemento:<br>
    Referente ao ${type}: <strong>${name}</strong><br>
  </p><p><strong>Deseja realmente iniciar o plano de ação para este item/subitem?</strong></p>`;
};

@Component({
  selector: 'subitem-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './subitem-card.component.html',
  styleUrl: './subitem-card.component.scss',
  providers: [ActionPlanService, DatePipe, SubItemsService],
})
export class SubitemCardComponent {
  @Input() subitems: any[] = []; //[1].actionPlanTarget.action_plan.action_plan_status.name_code

  confirmationDialogService = inject(ConfirmationDialogService);
  actionPlanService = inject(ActionPlanService);
  datePipe = inject(DatePipe);
  loaderService = inject(LoaderService);
  toastService = inject(ToastService);
  router = inject(Router);
  subItemsService = inject(SubItemsService);

  CATEGORY_DICTIONARY = CATEGORY_DICTIONARY;
  STATUS_DICTIONARY = STATUS_DICTIONARY;

  getStatusLabelColor(status: string): string {
    const colors: Record<string, string> = {
      conclusao: '#22C55E',
      execucao: '#6366F1',
      in_progress: '#F59E0B',
    };
    return colors[status] || '#9CA3AF'; // default: gray-400
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getCostDifference(task: any): number {
    return Number(task.actual_cost) - Number(task.estimated_cost);
  }

  getCostPercentageDiff(task: any): number {
    const estimated = Number(task.estimated_cost);
    const actual = Number(task.actual_cost);
    if (estimated === 0) return 0;
    return ((actual - estimated) / estimated) * 100;
  }

  isOverBudget(task: any): boolean {
    return this.getCostDifference(task) > 0;
  }

  startActionPlan(task: any): void {
    const dialogRef = this.confirmationDialogService.open({
      title: 'Iniciar Plano de Ação',
      messageHTML: initActionPlan(task.name, 'subitem'),
      cancelButton: {
        text: 'Não',
        color: 'transparent',
      },
      confirmButton: {
        text: 'Iniciar plano de ação',
        color: 'primary',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.actionPlanService
          .createActionPlan({
            project_id: task.items.project_id,
            responsible_user_id: task.responsible_user_id,
            action_type: ActionPlanType.EXECUTION,
            priority: ActionPlanPriority.LOW,
            name: `[${task.id}${this.datePipe.transform(
              new Date(),
              'HHmmss'
            )}] Plano de Ação - ${task.name}`,
            description: task.description,
            targets: [
              {
                target_id: task.id,
                target_type: 'subitem',
              },
            ],
          })
          .pipe(
            tap((actionPlan) => {
              const loader = this.loaderService.show();

              this.toastService.addToast(
                'success',
                'Plano de ação iniciado com sucesso'
              );

              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([window.location.pathname]).then(() => {
                    this.toastService.addToast(
                      'success',
                      'Item criado com sucesso'
                    );

                    loader.hide();
                  });
                });
            }),
            catchError((error) => {
              this.toastService.addToast(
                'success',
                `Erro ao iniciar o plano de ação: ${error.error.message}`
              );
              return throwError(() => error);
            })
          )
          .subscribe();
      }
    });
  }

  goToActionPlan(task: any): void {
    this.router
      .navigateByUrl('/action-plan', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/action-plan'], {
          queryParams: {
            action_id: task.action_plan_target.id,
            target_id: task.id,
            target_type: 'subitem',
          },
        });
      });
  }

  validateIsSubitemCanBeCompleted(task: any): boolean {
    const actionPlanStatusNameCode =
      task.action_plan_target.action_plan.action_plan_status.name_code;

    return (
      actionPlanStatusNameCode === ActionPlanStatus.CONCLUSAO &&
      task.status !== 'completed'
    );
  }

  validateIsSubitemHasActionPlan(task: any): boolean {
    return !!task.action_plan_target && !!task.action_plan_target.id;
  }

  getActionPlanStatusBySubitem(task: any): any {
    const actionPlan = this.getActionPlanBySubitem(task);
    const actionPlanStatus = actionPlan.action_plan_status;
    const text_color = getTextColor(actionPlanStatus.color);

    return { ...actionPlanStatus, text_color };
  }

  getActionPlanBySubitem(task: any): any {
    return task.action_plan_target.action_plan;
  }

  completeSubitem(task: any): void {
    if (!this.validateIsSubitemCanBeCompleted(task)) {
      this.toastService.addToast(
        'error',
        'Este subitem não pode ser concluído, pois o plano de ação não está na fase de conclusão.'
      );

      return;
    }

    const dialogRef = this.confirmationDialogService.open({
      title: 'Concluir Subitem',
      message: 'Você tem certeza que deseja concluir este subitem?',
      cancelButton: {
        text: 'Cancelar',
        color: 'transparent',
      },
      confirmButton: {
        text: 'Concluir subitem',
        color: 'success',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const loader = this.loaderService.show();

      this.subItemsService
        .completeSubitem(task.id)
        .pipe(
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([window.location.pathname]).then(() => {
                  this.toastService.addToast(
                    'success',
                    'Subitem concluido com sucesso'
                  );

                  loader.hide();
                });
              });
          })
        )
        .subscribe();
    });
  }
}
