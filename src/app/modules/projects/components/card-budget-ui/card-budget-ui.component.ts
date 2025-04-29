import { Component, Input, output } from '@angular/core';
import { TipseenDirective } from '../../../../shared/components/tipseen/tipseen.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-budget-ui',
  standalone: true,
  imports: [TipseenDirective, CommonModule],
  templateUrl: './card-budget-ui.component.html',
  styleUrl: './card-budget-ui.component.scss',
})
export class CardBudgetUiComponent {
  @Input() type!: 'add' | 'revenue' | 'expense' | 'budget';
  @Input() budget: any = 0;

  onclick = output<any>();

  BUDGET_DICT: any = {
    revenue: {
      title: 'Valor restante',
      message: '',
      color: '#357094',
    },
    expense: {
      title: 'Valor gasto',
      message: '',
      color: '#b73b1e',
    },
    budget: {
      title: 'Orçamento total',
      message: '',
      color: '#546de5',
    },
  };

  tipseen: any = {
    title: 'Criar um Orçamento',
    message:
      'Criar um orçamento para um projeto é fundamental para garantir controle financeiro e evitar surpresas durante a execução. Esse processo envolve estimar custos, alocar recursos, definir prazos e prever possíveis imprevistos. Um orçamento bem estruturado permite uma gestão eficiente, ajudando na tomada de decisões e no sucesso do projeto.',
    imgPath: './money.svg',
  };

  get label() {
    return this.BUDGET_DICT[this.type].title;
  }

  get color() {
    return this.BUDGET_DICT[this.type].color;
  }
}
