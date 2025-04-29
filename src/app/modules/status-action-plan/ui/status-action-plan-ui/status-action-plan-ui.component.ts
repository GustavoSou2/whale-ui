import { Component, Input } from '@angular/core';
import { TableDataSource, TableSource } from '../../../../shared/components/table/table.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'status-action-plan-ui',
  standalone: true,
  imports: [CommonModule, LayoutComponent, TableDataSource],
  templateUrl: './status-action-plan-ui.component.html',
  styleUrl: './status-action-plan-ui.component.scss',
})
export class StatusActionPlanUiComponent {
  @Input() tableSource!: TableSource<any>;
}
