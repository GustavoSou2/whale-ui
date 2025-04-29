import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { StatusActionPlanService } from '../../status-action-plan/services/status-action-plan/status-action-plan.service';
import { throwError } from 'rxjs';

export class CreateActionPlan {
  project_id!: number;
  responsible_user_id!: number;
  action_type!: string;
  priority!: 'low' | 'medium' | 'high';
  name!: string;
  description?: string;
  targets!: CreateActionPlanTarget[];
}

export class CreateActionPlanTarget {
  target_id!: number;
  target_type!: 'item' | 'subitem';
}

export enum ActionPlanType {
  EXECUTION = 'execution',
  VALIDATION = 'validation',
  DOCUMENTATION = 'documentation',
  EXECUTION_STANDARD = 'execution_standard',
  BUDGET = 'budget',
  SAFETY = 'safety',
  ENVIRONMENTAL = 'environmental',
  CORRECTIVE = 'corrective',
  PLANNING = 'planning',
  TRAINING = 'training',
  AUDIT = 'audit'
}

export enum ActionPlanPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}


@Injectable()
export class ActionPlanService {
  private apiService = inject(ApiService);
  private statusActionPlanService = inject(StatusActionPlanService);

  constructor() {}

  getActionPlan(id: string) {
    return this.apiService.get(`action-plan/${id}`);
  }

  createActionPlan(data: CreateActionPlan) {
    return this.apiService.post('action-plan', data);
  }

  updateActionPlan(id: string, data: any) {
    return this.apiService.patch(`action-plan/${id}`, data);
  }

  cancelActionPlan(id: string) {
    const status = this.statusActionPlanService.getCancelStatus();
    
    if (!status) return throwError(() => new Error('Status cancelado não encontrado'));
    
    return this.updateActionPlan(id, { status_id: status.id });
  }

  backToInitialStatus(id: string, statusId: number) {
    
    return this.updateActionPlan(id, { status_id: statusId });
  }
}
