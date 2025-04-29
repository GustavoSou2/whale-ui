import { Component, Input } from '@angular/core';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'action-plan-ui',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './action-plan-ui.component.html',
  styleUrl: './action-plan-ui.component.scss'
})
export class ActionPlanUiComponent {
  @Input() metrics: any;
  @Input() status: any;
}
