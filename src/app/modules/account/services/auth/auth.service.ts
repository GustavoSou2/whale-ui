import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';


export interface Company {
  companyName: string;
  document: string;
}

export interface UserCompany extends Company {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private apiService = inject(ApiService);
  private readonly resource = 'auth';

  login(email: string, password: string) {
    return this.apiService.post(`${this.resource}/login`, { email, password });
  }

  register(userCompany: UserCompany) {
    return this.apiService.post(`${this.resource}/register`, userCompany);
  }

  confirm(token: string) {
    return this.apiService.get(`${this.resource}/confirm`, {
      token ,
    });
  }

  collaboratorInvite(invite: { email: string; role: string }) {
    return this.apiService.post(`users/emplooyes/invite`, invite);
  }

  collaboratorFinalize(data: {token: string, username: string, password: string}) {
    return this.apiService.post(`users/emplooyes/invite/complete`, data);
  }
}
