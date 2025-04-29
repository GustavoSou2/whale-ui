import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { BehaviorSubject } from 'rxjs';

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

    const currentIndex = actionStatus.findIndex(
      (status: any) => status.id === actualStatusId
    );

    if (currentIndex !== -1 && currentIndex < actionStatus.length - 1) {
      return actionStatus[currentIndex + 1];
    } else {
      return null;
    }
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
