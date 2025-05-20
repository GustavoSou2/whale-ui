import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { tap } from 'rxjs';

@Injectable()
export class PreLaunchService {
  private apiService = inject(ApiService);

  constructor() {}

  sendPreLaunch(body: { name: string; email: string }) {
    return this.apiService.post('mail/pre-launch', body);
  }
}
