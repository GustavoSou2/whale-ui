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
  services = [
    {
      name: 'Projetos',
      description:
        'Centralize todas as informações dos seus projetos em um só lugar e descubra como gerenciar com mais organização, controle e agilidade.',
      img: './landing/Projetos.png',
    },
    {
      name: 'Gerenciamento de Obras',
      description:
        'Visualize o andamento da obra, identifique gargalos e mantenha tudo sob controle com ferramentas práticas pensadas para o dia a dia da construção.',
      img: './landing/gerenciamento de projeto.png',
    },
    {
      name: 'Plano de Ação',
      description:
        'Saia do papel e coloque cada etapa em movimento com planos de ação automatizados, estruturados para acelerar a execução e reduzir erros.',
      img: './landing/plano de ação.png',
    },
    {
      name: 'Orçamentos Inteligentes',
      description:
        'Crie orçamentos detalhados com validações automáticas, evitando desperdícios e garantindo que tudo esteja dentro das normas desde o início.',
      img: './landing/orçamentos.png',
    },
    {
      name: 'Fluxo de aprovação',
      description:
        'Controle e registre aprovações em cada etapa da obra, garantindo transparência, agilidade nas decisões e conformidade com o planejamento.',
      img: './landing/fluxo de aprovação.png',
    },
  ];

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
