import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'diff-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diff-ui.component.html',
  styleUrl: './diff-ui.component.scss',
})
export class DiffUiComponent {
  features = [
    {
      title: 'Gestão de Obras Unificada',
      description:
        'Controle o ciclo completo da obra em um só lugar: orçamentos, tarefas, documentos, status e aprovações.',
      icon: {
        name: 'project',
        url: './icons/cap-projecting.svg',
      },
    },
    {
      title: 'Fluxo de Aprovação de Planos de Ação',
      description:
        'Crie planos de ação com etapas de validação específicas para a construção civil, como NBA, documentação e orçamento.',
      icon: {
        name: 'workflow',
        url: 'https://iconduck.com/icons/162219/workflow',
      },
    },
    {
      title: 'Orçamento com Validação Inteligente',
      description:
        'Orce projetos e valide automaticamente se estão dentro dos padrões exigidos, reduzindo erros e retrabalhos.',
      icon: {
        name: 'wallet',
        url: 'https://tabler.io/icons/icon/wallet',
      },
    },
    {
      title: 'Checklists e Tarefas Automatizadas',
      description:
        'Crie tarefas e checklists para cada etapa da obra, garantindo que nenhum detalhe importante seja esquecido.',
      icon: {
        name: 'checklist',
        url: 'https://tabler.io/icons/icon/checklist',
      },
    },
    {
      title: 'Controle de Status Personalizado',
      description:
        'Configure e personalize os status dos projetos e obras para se adaptar a diferentes tipos de construção.',
      icon: {
        name: 'status-up',
        url: 'https://iconduck.com/icons/54002/collaboration',
      },
    },
    {
      title: 'Colaboração e Responsabilidades',
      description:
        'Gerencie equipes e colaboradores com funções, aprovações e responsabilidades bem definidas dentro dos projetos.',
      icon: {
        name: 'users',
        url: 'https://tabler.io/icons/icon/users',
      },
    },
  ];
}
