import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class BudgetService {
  apiService = inject(ApiService);

  constructor() {}

  findOne(projectId: string): Observable<any> {
    return this.apiService.get<any>(`budget/${projectId}`);
  }

  create(budget: any) {
    return this.apiService.post('budget', budget);
  }
}
