import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class RolesService {
  apiService = inject(ApiService);
  constructor() {}

  createRole(body: any) {
    return this.apiService.post('roles', body)
  }
}
