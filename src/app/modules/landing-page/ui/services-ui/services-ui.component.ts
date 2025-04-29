import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'services-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-ui.component.html',
  styleUrl: './services-ui.component.scss',
})
export class ServicesUiComponent {
  metrics = [
    {
      value: '+400',
      label: 'Obras em gerenciamento',
    },
    {
      value: '+R$ 300.000',
      label: 'Economizados em orçamentos',
    },
    {
      value: '+1200',
      label: 'Planos de ação concluídos',
    },
    {
      value: '+95%',
      label: 'Aprovação de usuários',
    },
  ];

  functions = [
    'Criação de projetos',
    'Cadastro de clientes e equipes',
    'Gestão de planos de ação',
    'Fluxo de aprovação por etapa',
    'Status customizados por empresa',
    'Validação de orçamento',
    'Permissões por perfil',
    'Checklist por etapa',
    'Tarefas com responsáveis',
    'Controle de prazos',
    'Progresso da obra em tempo real',
    'Dashboard de métricas',
    'Histórico de ações',
    'Geração automática de fluxos',
    'Suporte a múltiplas obras',
    'Comentários com reações',
    'Notificações de pendências',
    'Upload de arquivos (em dev)',
    'Relatórios em PDF/Excel (em dev)',
    'Integração com calendário (planejado)',
  ];
}
