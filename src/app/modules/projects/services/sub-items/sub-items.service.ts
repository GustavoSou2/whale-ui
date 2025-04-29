import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class SubItemsService {
  apiService = inject(ApiService);
  constructor() {}

  createSubItem(item: any) {
    return this.apiService.post('sub-item', item);
  }

  findAll(itemId: string) {
    return this.apiService.get<any>(`sub-item/item/${itemId}`);
  }

  updateSubItem(id: number, item: any) {
    return this.apiService.patch(`sub-item/${id}`, item);
  }
}
