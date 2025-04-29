import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'action-plan-status',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './action-plan-status.component.html',
  styleUrl: './action-plan-status.component.scss',
})
export class ActionPlanStatusComponent {
  status = input<any>();
  onclick = output();

  get statusList() {
    return this.status();
  }

  selectStatus(status: any) {
    this.onclick.emit(status);
  }
}
