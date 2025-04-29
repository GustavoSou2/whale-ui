import { Component, Input } from '@angular/core';
import { TableDataSource, TableSource } from '../../../../shared/components/table/table.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'status-ui',
  standalone: true,
  imports: [CommonModule, LayoutComponent, TableDataSource],
  templateUrl: './status-ui.component.html',
  styleUrl: './status-ui.component.scss',
})
export class StatusUiComponent {
  @Input() tableSource!: TableSource<any>;
}
