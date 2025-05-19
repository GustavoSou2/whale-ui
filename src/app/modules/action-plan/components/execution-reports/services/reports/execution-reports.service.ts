import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../../../core/api/api.service';

@Injectable()
export class ExecutionReportsService {
  private apiService = inject(ApiService)
  constructor() { }

  getExecutionReports(actionPlanTargetId: string ) {
    return this.apiService.get(
      `action-plan/${actionPlanTargetId}/execution-reports`
    );
  }

  createExecutionReport(report: any) {
    return this.apiService.post('execution-reports', report);
  }

  updateExecutionReport(report: any) {
    return this.apiService.patch(`execution-reports/${report.id}`, report);
  }
}
