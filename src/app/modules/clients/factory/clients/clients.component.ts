import { Component, inject, OnInit } from '@angular/core';
import { ClientsUiComponent } from '../../ui/clients-ui/clients-ui.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientsUpsertUiComponent } from '../../ui/clients-upsert-ui/clients-upsert-ui.component';
import { Client, ClientsService } from '../../services/clients/clients.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { map } from 'rxjs';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ClientsUiComponent,
    ButtonComponent,
    InputCustomComponent,
  ],
  template: `
    <clients-ui [tableSource]="tableSource">
      <ng-container
        *ngTemplateOutlet="clientsHeader"
        clients-header
      ></ng-container>
    </clients-ui>

    <ng-template #clientsHeader>
      <button-custom
        type="button"
        label="Novo Cliente"
        (clicked)="createClient()"
      ></button-custom>
      <input-custom
        type="text"
        placeholder="Pesquisar"
        name="text"
        icon="Search.svg"
        required
      ></input-custom>
    </ng-template>
  `,
  providers: [ClientsService],
})
export class ClientsComponent implements OnInit {
  dialogService = inject(MatDialog);
  clientsService = inject(ClientsService);
  loaderService = inject(LoaderService);
  tableDataSource = inject(TableDataSourceService);

  loader = this.loaderService.show();

  tableSource: TableSource<Client> = {
    api: {
      url: 'clients',
      method: 'GET',
    },
    columns: [
      { key: 'name', header: 'Client', width: '300px' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Telefone' },
      { key: 'city', header: 'Cidade' },
      { key: 'state', header: 'Estado' },
      { key: 'country', header: 'País' },
      { key: 'postal_code', header: 'CEP', width: 'max-content' },
    ],
    actions: [
      {
        icon: 'Show.svg',
        onClick: (row: any) => {
          console.log('Edit', row);
        },
      },
      {
        icon: 'Edit.svg',
        onClick: (row: any) => {
          console.log('Edit', row);
        },
      },
      {
        icon: 'Delete.svg',
        onClick: (row: any) => {
          console.log('Delete', row);
        },
      },
    ],
  };

  ngOnInit() {}

  createClient() {
    let dialogRef = this.dialogService.open(ClientsUpsertUiComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      let loader = this.loaderService.show();

      this.clientsService.createClient(result).subscribe((data) => {
        console.log(data);
        this.tableDataSource.reload();
        loader.hide();
      });
    });
  }
}
