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
import { map, tap } from 'rxjs';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { ConfirmationDialogService } from '../../../../shared/components/confirmation-dialog/services/confirmation-dialog.service';

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
export class ClientsComponent {
  dialogService = inject(MatDialog);
  clientsService = inject(ClientsService);
  loaderService = inject(LoaderService);
  toastService = inject(ToastService);
  tableDataSource = inject(TableDataSourceService);
  confirmationDialogService = inject(ConfirmationDialogService);

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
          const dialogRef = this.dialogService.open(ClientsUpsertUiComponent, {
            data: {
              client: row,
              isView: true,
            },
          });
        },
      },
      {
        icon: 'Edit.svg',
        onClick: (row: any) => {
          const dialogRef = this.dialogService.open(ClientsUpsertUiComponent, {
            data: {
              client: row,
              isView: false,
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
              return;
            }

            let loader = this.loaderService.show();
            this.clientsService
              .updateClient(row.id, result)
              .pipe(
                tap((data) => {
                  this.tableDataSource.reload();
                  loader.hide();
                  this.toastService.addToast(
                    'success',
                    'Cliente atualizado com sucesso!'
                  );
                })
              )
              .subscribe();
          });
        },
      },
      {
        icon: 'Delete.svg',
        onClick: (row: any) => {
          const dialogRef = this.confirmationDialogService.open({
            title: 'Deletar Equipe',
            messageHTML: `Você tem certeza que deseja deletar a equipe <strong>${row.name}</strong>?`,
            cancelButton: {
              text: 'Não',
              color: 'transparent',
            },
            confirmButton: {
              text: 'Deletar',
              color: 'danger',
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
              return;
            }

            let loader = this.loaderService.show();

            this.clientsService.deleteClient(row.id).subscribe(() => {
              loader.hide();
              this.toastService.addToast(
                'Sucesso',
                'Cliente deletado com sucesso!'
              );
              this.tableDataSource.reload();
            });
          });
        },
      },
    ],
  };

  createClient() {
    let dialogRef = this.dialogService.open(ClientsUpsertUiComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      const loader = this.loaderService.show();

      this.clientsService.createClient(result).subscribe((data) => {
        this.tableDataSource.reload();
        loader.hide();
        this.toastService.addToast('success', 'Cliente Criado com sucesso!');
      });
    });
  }
}
