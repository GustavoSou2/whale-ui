import { Component, Input } from '@angular/core';
import { PRIORITY } from '../../../action-plan/components/action-priority/action-priority.component';

@Component({
  selector: 'app-approval-flow-priority',
  standalone: true,
  imports: [],
  templateUrl: './approval-flow-priority.component.html',
  styleUrl: './approval-flow-priority.component.scss'
})
export class ApprovalFlowPriorityComponent {
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
