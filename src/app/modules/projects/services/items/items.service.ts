import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class ItemsService {
  apiService = inject(ApiService);
  constructor() {}

  createItem(item: any) {
    return this.apiService.post('items', item);
  }

  findAll(projectId: string) {
    return this.apiService.get<any>(`items/project/${projectId}`);
  }

  completeItem(id: string) {
    return this.apiService.post(`items/${id}/complete`, {});
  }
}
