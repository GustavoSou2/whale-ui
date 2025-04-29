import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class StatusService {
  apiService = inject(ApiService);
  constructor() {}

  createStatus(status: any) {
    return this.apiService.post('status', status);
  }

  findAll() {
    return this.apiService.get<any>('status');
  }
}
