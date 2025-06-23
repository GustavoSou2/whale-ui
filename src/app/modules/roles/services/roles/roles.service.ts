import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class RolesService {
  apiService = inject(ApiService);
  constructor() {}

  createRole(body: any) {
    return this.apiService.post('roles', body);
  }

  updateRole(id: string, body: any) {
    return this.apiService.patch(`roles/${id}`, body);
  }

  deleteRole(id: string) {
    return this.apiService.delete(`roles/${id}`);
  }
}
