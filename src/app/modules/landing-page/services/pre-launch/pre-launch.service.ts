import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class PreLaunchService {
  private apiService = inject(ApiService);

  constructor() {}

  sendPreLaunch(body: { name: string; email: string }) {
    return this.apiService.post('mail/pre-launch', body);
  }
}
