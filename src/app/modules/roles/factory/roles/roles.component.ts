import { Component, inject } from '@angular/core';
import { RolesUiComponent } from '../../ui/roles-ui/roles-ui.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { TableSource } from '../../../../shared/components/table/table.component';
import { RolesUpsertUiComponent } from '../../ui/roles-upsert-ui/roles-upsert-ui.component';
import { RolesService } from '../../services/roles/roles.service';
import { AdminService } from '../../../../core/services/admin/admin.service';
import { tap } from 'rxjs';
import { ConfirmationDialogService } from '../../../../shared/components/confirmation-dialog/services/confirmation-dialog.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';

export enum Roles {
  ADMIN = 'admin',
}

export function formatRole(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    RolesUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
  ],
  template: `<roles-ui [tableSource]="tableSource">
      <ng-container *ngTemplateOutlet="rolesHeader" roles-header></ng-container>
    </roles-ui>
    <ng-template #rolesHeader>
      <button-custom
        type="button"
        label="Nova Equipe de Acesso"
        (clicked)="createRole()"
      ></button-custom>
      <input-custom
        type="text"
        placeholder="Pesquisar"
        name="text"
        icon="Search.svg"
        required
      ></input-custom>
    </ng-template>`,
  providers: [RolesService],
})
export class RolesComponent {
  dialogService = inject(MatDialog);
  rolesService = inject(RolesService);
  loaderService = inject(LoaderService);
  adminService = inject(AdminService);
  tableDataSource = inject(TableDataSourceService);
  toastService = inject(ToastService);
  confirmationDialogService = inject(ConfirmationDialogService);

  isAdmin(user: any) {
    return this.adminService.isAdmin(user);
  }
  // loader = this.loaderService.show();

  tableSource: TableSource<any> = {
    api: {
      url: 'roles',
      method: 'GET',
    },
    columns: [{ key: 'name', header: 'Equipe', width: '300px' }],
    actions: [
      {
        icon: 'Show.svg',
        onClick: (row: any) => {
          let dialogRef = this.dialogService.open(RolesUpsertUiComponent, {
            data: {
              role: row,
              isShowable: true,
            },
          });
        },
      },
      {
        icon: 'Edit.svg',
        hidden: (row: any) => {
          return this.isAdmin(row)!;
        },
        onClick: (row: any) => {
          let dialogRef = this.dialogService.open(RolesUpsertUiComponent, {
            data: {
              role: row,
              isShowable: false,
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (!result) {
              return;
            }

            let { role: name } = result;
            let role_code = formatRole(result.role);

            let loader = this.loaderService.show();

            this.rolesService
              .updateRole(row.id, { name, role_code })
              .pipe(
                tap(() => {
                  this.tableDataSource.reload();
                  loader.hide();
                  this.toastService.addToast('Sucesso','Equipe atualizada com sucesso!')
                })
              )
              .subscribe();
          });
        },
      },
      {
        icon: 'Delete.svg',
        hidden: (row: any) => {
          return this.isAdmin(row)!;
        },
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

            this.rolesService.deleteRole(row.id).subscribe(() => {
              loader.hide();
              this.toastService.addToast(
                'Sucesso',
                'Equipe deletada com sucesso!'
              );
              this.tableDataSource.reload();
            });
          });
        },
      },
    ],
  };

  createRole() {
    let dialogRef = this.dialogService.open(RolesUpsertUiComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      let { role: name } = result;
      let role_code = formatRole(result.role);

      let loader = this.loaderService.show();

      this.rolesService.createRole({ name, role_code }).subscribe((data) => {
        loader.hide();
        this.toastService.addToast('Sucesso', 'Equipe criada com sucesso!');

        this.tableDataSource.reload();
      });
    });
  }
}
