import { Component, Input, input } from '@angular/core';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { Client } from '../../services/clients/clients.service';

@Component({
  selector: 'clients-ui',
  standalone: true,
  imports: [CommonModule, LayoutComponent, TableDataSource],
  templateUrl: './clients-ui.component.html',
  styleUrl: './clients-ui.component.scss',
})
export class ClientsUiComponent {
  @Input() tableSource!: TableSource<Client>;
}
