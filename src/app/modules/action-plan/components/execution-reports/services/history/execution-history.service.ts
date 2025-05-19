import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../../../core/api/api.service';

@Injectable()
export class ExecutionHistoryService {
  private apiService = inject(ApiService);
  constructor() {}

  getExecutionHistory(actionPlanTargetId: string) {
    return this.apiService.get(
      `action-plan/${actionPlanTargetId}/execution-history`
    );
  }

  createExecutionHistory(history: any) {
    return this.apiService.post('execution-history', history);
  }

  updateExecutionHistory(history: any) {
    return this.apiService.patch(`execution-history/${history.id}`, history);
  }
}
