import { Component, Input } from '@angular/core';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'approval-flow-ui',
  standalone: true,
  imports: [CommonModule, LayoutComponent, TableDataSource],
  templateUrl: './approval-flow-ui.component.html',
  styleUrl: './approval-flow-ui.component.scss',
})
export class ApprovalFlowUiComponent {
  @Input() tableSource!: TableSource<any>;
  @Input() stats!: any[];
}
