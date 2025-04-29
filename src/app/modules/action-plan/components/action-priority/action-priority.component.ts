import { Component, Input } from '@angular/core';

const ACTION_PLAN_PRIORITY: Record<string, { title: string; color: string }> = {
  hight: {
    title: 'Alta',
    color: '#b73b1e',
  },
  medium: {
    title: 'Média',
    color: '#FFA500',
  },
  low: {
    title: 'Baixa',
    color: '#7595bb',
  },
};

@Component({
  selector: 'app-action-priority',
  standalone: true,
  imports: [],
  templateUrl: './action-priority.component.html',
  styleUrl: './action-priority.component.scss',
})
export class ActionPriorityComponent {
  @Input() data: any;
  @Input() rowData: any;

  get priority() {
    return ACTION_PLAN_PRIORITY[this.data];
  }

  get priorityTitle() {
    return this.priority?.title || 'Nenhuma';
  }

  get priorityColor() {
    return this.priority?.color || '#d2d9e5';
  }
}
