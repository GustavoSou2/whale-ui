import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class CollaboratorService {
  private apiService = inject(ApiService);

  constructor() {}

  updateCollaborator(id: string, data: any) {
    return this.apiService.patch(`users/emplooyes/${id}`, data);
  }

  deleteCollaborator(id: string) {
    return this.apiService.delete(`users/emplooyes/${id}`);
  }
}
