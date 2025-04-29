import { Component, Input } from '@angular/core';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'roles-ui',
  standalone: true,
  imports: [CommonModule, LayoutComponent, TableDataSource],
  templateUrl: './roles-ui.component.html',
  styleUrl: './roles-ui.component.scss',
})
export class RolesUiComponent {
  @Input() tableSource!: TableSource<any>;
}
