import { Component, Input } from '@angular/core';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'projects-ui',
  standalone: true,
  imports: [CommonModule, LayoutComponent, TableDataSource],
  templateUrl: './projects-ui.component.html',
  styleUrl: './projects-ui.component.scss',
})
export class ProjectsUiComponent {
  @Input() tableSource!: TableSource<any>;
}
