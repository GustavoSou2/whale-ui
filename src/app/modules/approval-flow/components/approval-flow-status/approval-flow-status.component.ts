import { Component, Input } from '@angular/core';
import { getTextColor } from '../../../../core/functions/text-color.functino';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'approval-flow-status',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './approval-flow-status.component.html',
  styleUrl: './approval-flow-status.component.scss',
})
export class ApprovalFlowStatusComponent {
  @Input() data: any;
  @Input() rowData: any;

  get status() {
    return this.data;
  }

  getTextColor = (bgColor: string): string => getTextColor(bgColor);

  constructor() {}
}
