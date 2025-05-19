import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

@Injectable()
export class ContactService {
  private apiService = inject(ApiService);

  constructor() {}

  sendContactForm(data: {
    name: string;
    phone: string;
    email: string;
    message: string;
    origin: string;
  }) {
    return this.apiService.post('mail/contact', data);
  }
}
