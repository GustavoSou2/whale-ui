import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';

export interface Client {
  id: number; // ID do cliente
  company_id?: number; // ID da empresa (opcional)
  name: string; // Nome do cliente
  email: string; // Email do cliente (único)
  phone?: string; // Número de telefone (opcional)
  street?: string; // Rua (opcional)
  number?: string; // Número (opcional)
  complement?: string; // Complemento (opcional)
  neighborhood?: string; // Bairro (opcional)
  city?: string; // Cidade (opcional)
  state?: string; // Estado (opcional)
  country?: string; // País (opcional, valor padrão "Brasil")
  postal_code?: string; // CEP (opcional)
  created_at?: Date; // Data de criação (opcional)
  updated_at?: Date; // Data de atualização (opcional)
}

@Injectable()
export class ClientsService {
  apiService = inject(ApiService);
  constructor() {}

  createClient(client: Client) {
    return this.apiService.post('clients', client);
  }

  findAll() {
    return this.apiService.get<Client>('clients');
  }

  updateClient(id: number, client: Client) {
    return this.apiService.put(`clients/${id}`, client);
  }

  deleteClient(id: number) {
    return this.apiService.delete(`clients/${id}`);
  }
}
