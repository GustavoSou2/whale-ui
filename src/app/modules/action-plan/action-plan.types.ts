import { Type } from '@angular/core';
import { ActionApprovalCrateDialogComponent } from './components/action-approval-crate-dialog/action-approval-crate-dialog.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ActionReprovalCrateDialogComponent } from './components/action-reproval-crate-dialog/action-reproval-crate-dialog.component';
import { ActionPlanValidateBudgetTabComponent } from './components/action-plan-validate-budget-tab/action-plan-validate-budget-tab.component';
import { ActionPlanValidateDocumentStageComponent } from './components/action-plan-validate-document-stage/action-plan-validate-document-stage.component';
import { ActionPlanValidateChecklistComponent } from './components/action-plan-validate-checklist/action-plan-validate-checklist.component';
import { ExecutionReportsComponent } from './components/execution-reports/execution-reports.component';

export enum ActionPlanStatus {
  CRIACAO = 'criacao',
  ANALISE_TECNICA = 'analise_tecnica',
  VALIDACAO_DOCUMENTOS = 'validacao_documentos',
  VALIDACAO_ORCAMENTOS = 'validacao_orcamento',
  CHECKLIST_EXECUCAO = 'checklist_execucao',
  APROVACAO_FINAL = 'aprovacao_final',
  EXECUCAO = 'execucao',
  REVISAO_CONCLUSAO = 'revisao_conclusao',
  ARQUIVADO = 'arquivado',
  CANCELADO = 'cancelado',
}

const createConfirmationContent = (title: string, message: string) => {
  return {
    title,
    message,
    cancelButton: {
      text: 'Cancelar',
      color: 'transparent',
    },
    confirmButton: {
      text: 'Confirmar',
      color: 'primary',
    },
  };
};

export const ActionPlanApprovalStatus: Record<ActionPlanStatus, Type<any>> = {
  [ActionPlanStatus.CRIACAO]: ActionApprovalCrateDialogComponent,
  [ActionPlanStatus.ANALISE_TECNICA]: ConfirmationDialogComponent,
  [ActionPlanStatus.VALIDACAO_DOCUMENTOS]:
    ActionPlanValidateDocumentStageComponent,
  [ActionPlanStatus.VALIDACAO_ORCAMENTOS]: ActionPlanValidateBudgetTabComponent,
  [ActionPlanStatus.CHECKLIST_EXECUCAO]: ActionPlanValidateChecklistComponent,
  [ActionPlanStatus.APROVACAO_FINAL]: ConfirmationDialogComponent,
  [ActionPlanStatus.EXECUCAO]: ExecutionReportsComponent,
  [ActionPlanStatus.REVISAO_CONCLUSAO]: ConfirmationDialogComponent,
  [ActionPlanStatus.ARQUIVADO]: ConfirmationDialogComponent,
  [ActionPlanStatus.CANCELADO]: ConfirmationDialogComponent,
};

export const ActionPlanReprovalStatus: Record<ActionPlanStatus, Type<any>> = {
  [ActionPlanStatus.CRIACAO]: ActionReprovalCrateDialogComponent,
  [ActionPlanStatus.ANALISE_TECNICA]: ActionReprovalCrateDialogComponent,
  [ActionPlanStatus.VALIDACAO_DOCUMENTOS]: ConfirmationDialogComponent,
  [ActionPlanStatus.VALIDACAO_ORCAMENTOS]: ConfirmationDialogComponent,
  [ActionPlanStatus.CHECKLIST_EXECUCAO]: ConfirmationDialogComponent,
  [ActionPlanStatus.APROVACAO_FINAL]: ConfirmationDialogComponent,
  [ActionPlanStatus.EXECUCAO]: ConfirmationDialogComponent,
  [ActionPlanStatus.REVISAO_CONCLUSAO]: ConfirmationDialogComponent,
  [ActionPlanStatus.ARQUIVADO]: ConfirmationDialogComponent,
  [ActionPlanStatus.CANCELADO]: ConfirmationDialogComponent,
};

export const ActionPlanConfirmationDicts: Record<ActionPlanStatus, any> = {
  [ActionPlanStatus.CRIACAO]: undefined,
  [ActionPlanStatus.ANALISE_TECNICA]: createConfirmationContent(
    'Plano de Ação',
    'Realizada a aprovação da análise técnica, deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.VALIDACAO_DOCUMENTOS]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.VALIDACAO_ORCAMENTOS]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.CHECKLIST_EXECUCAO]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.APROVACAO_FINAL]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.EXECUCAO]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.REVISAO_CONCLUSAO]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.ARQUIVADO]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
  [ActionPlanStatus.CANCELADO]: createConfirmationContent(
    'Plano de Ação',
    'Deseja realmente aprovar o plano de ação?'
  ),
};
