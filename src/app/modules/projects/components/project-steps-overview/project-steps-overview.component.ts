import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-project-steps-overview',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './project-steps-overview.component.html',
  styleUrl: './project-steps-overview.component.scss',
})
export class ProjectStepsOverviewComponent {
  openStep: number | null = null;

  steps = [
    {
      name: 'Inserção do valor do orçamento',
      description:
        'Definir o valor total previsto para a execução do projeto, incluindo mão de obra, materiais e encargos.',
      step: 1,
      completed: false,
      action: 'Preencha o campo de valor total do orçamento no sistema.',
    },
    {
      name: 'Criação dos Items e sub items',
      description:
        'Detalhar os itens principais do projeto e quebrá-los em subitens para melhor controle e estimativa de custo.',
      step: 2,
      completed: true,
      action:
        'Crie os itens e subitens com seus respectivos dados (quantidade, custo estimado, unidade, etc.).',
    },
    {
      name: 'Enviar orçamento para aprovação',
      description:
        'Submeter o orçamento para análise e aprovação por parte do responsável ou cliente.',
      step: 3,
      completed: false,
      action:
        'Clique em "Enviar para aprovação" após finalizar a estrutura do orçamento.',
    },
    {
      name: 'Envio os items para o plano de ação',
      description:
        'Transformar os itens aprovados em etapas executáveis dentro de um plano de ação.',
      step: 4,
      completed: false,
      action:
        'Selecione os itens aprovados e os envie para o plano de ação correspondente.',
    },
    {
      name: 'Validação Final do projeto',
      description:
        'Revisar e aprovar todas as etapas, garantindo que o projeto esteja pronto para ser executado.',
      step: 5,
      completed: false,
      action: 'Revise o plano e clique em "Validar projeto".',
    },
    {
      name: 'Conclusão',
      description:
        'Encerramento do processo de planejamento. O projeto está pronto para iniciar sua execução.',
      step: 6,
      completed: false,
      action: 'Finalize o projeto clicando em "Concluir".',
    },
  ];

  toggleStep(index: number) {
    this.openStep = this.openStep === index ? null : index;
  }
}
