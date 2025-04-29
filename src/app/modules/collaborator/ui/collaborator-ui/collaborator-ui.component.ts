import { Component, Input } from '@angular/core';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'collaborator-ui',
  standalone: true,
  imports: [CommonModule, LayoutComponent, TableDataSource],
  templateUrl: './collaborator-ui.component.html',
  styleUrl: './collaborator-ui.component.scss',
})
export class CollaboratorUiComponent {
  @Input() tableSource!: TableSource<any>;
}
