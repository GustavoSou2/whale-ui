import { Component, Input } from '@angular/core';

export const PRIORITY: Record<string, { title: string; color: string }> = {
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
  urgent: {
    title: 'Urgente',
    color: '#0b1215',
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
    return PRIORITY[this.data];
  }

  get priorityTitle() {
    return this.priority?.title || 'Nenhuma';
  }

  get priorityColor() {
    return this.priority?.color || '#d2d9e5';
  }
}
