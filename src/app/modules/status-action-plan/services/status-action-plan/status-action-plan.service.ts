import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { BehaviorSubject } from 'rxjs';

export enum ActionPlanStatus {
  CRIACAO_DA_ACAO = 1,
  ANALISE_TECNICA = 2,
  VALIDACAO_DE_DOCUMENTACAO = 3,
  VALIDACAO_DE_ORCAMENTO = 4,
  CHECKLIST_TECNICO_LIBERACAO_EXECUCAO = 5,
  EXECUCAO = 6,
  APROVACAO_FINAL = 7,
  CONCLUSAO = 8,
  ARQUIVADO = 9,
  CANCELADO = 10,
}

@Injectable({
  providedIn: 'root',
})
export class StatusActionPlanService {
  private apiService = inject(ApiService);

  private actionStatus = new BehaviorSubject<any>([]);
  actionStatus$ = this.actionStatus.asObservable();

  getActionStatus() {
    return this.apiService.get('action-plan-status');
  }

  loadActionStatus() {
    this.getActionStatus().subscribe((data: any) => {
      this.actionStatus.next(data);
    });
  }

  get actionStatusValue() {
    return this.actionStatus.getValue();
  }

  getNextActionStatus(actualStatusId: any) {
    const actionStatus = this.actionStatus.getValue();

    if (!actionStatus) return null;

    const currentIndex = actionStatus.findIndex(
      (status: any) => status.id === actualStatusId
    );

    if (currentIndex !== -1 && currentIndex < actionStatus.length - 1) {
      return actionStatus[currentIndex + 1];
    } else {
      return null;
    }
  }

  update({id, ...status}: any) {
    return this.apiService.patch(`action-plan-status/${id}`, status);
  }

  getCancelStatus() {
    const actionStatus = this.actionStatus.getValue();

    return actionStatus.find((status: any) => status.name_code === 'cancelado');
  }

  getInitialStatus() {
    const actionStatus = this.actionStatus.getValue();

    return actionStatus[0];
  }
}
