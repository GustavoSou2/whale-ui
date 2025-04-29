import { Type } from '@angular/core';
import { ActionApprovalCrateDialogComponent } from './components/action-approval-crate-dialog/action-approval-crate-dialog.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ActionReprovalCrateDialogComponent } from './components/action-reproval-crate-dialog/action-reproval-crate-dialog.component';

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
  };
};

export const ActionPlanApprovalStatus: Record<ActionPlanStatus, Type<any>> = {
  [ActionPlanStatus.CRIACAO]: ActionApprovalCrateDialogComponent,
  [ActionPlanStatus.ANALISE_TECNICA]: ConfirmationDialogComponent,
  [ActionPlanStatus.VALIDACAO_DOCUMENTOS]: ConfirmationDialogComponent,
  [ActionPlanStatus.VALIDACAO_ORCAMENTOS]: ConfirmationDialogComponent,
  [ActionPlanStatus.CHECKLIST_EXECUCAO]: ConfirmationDialogComponent,
  [ActionPlanStatus.APROVACAO_FINAL]: ConfirmationDialogComponent,
  [ActionPlanStatus.EXECUCAO]: ConfirmationDialogComponent,
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
  [ActionPlanStatus.ANALISE_TECNICA]: createConfirmationContent('Plano de Ação', 'Deseja realmente aprovar o plano de ação?'),
  [ActionPlanStatus.VALIDACAO_DOCUMENTOS]: undefined,
  [ActionPlanStatus.VALIDACAO_ORCAMENTOS]: undefined,
  [ActionPlanStatus.CHECKLIST_EXECUCAO]: undefined,
  [ActionPlanStatus.APROVACAO_FINAL]: undefined,
  [ActionPlanStatus.EXECUCAO]: undefined,
  [ActionPlanStatus.REVISAO_CONCLUSAO]: undefined,
  [ActionPlanStatus.ARQUIVADO]: undefined,
  [ActionPlanStatus.CANCELADO]: undefined,
};

