import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class ApprovalFlowService {
  private apiService = inject(ApiService)
  constructor() { }

  approveApprovalFlow(id: string, body: any) {
    return this.apiService.post(`approval-flow/${id}/approve`, body);
  }
}
