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
        label="Nova Regra de acesso"
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

  isAdmin(user: any) {
    return this.adminService.isAdmin(user);
  }
  // loader = this.loaderService.show();

  tableSource: TableSource<any> = {
    api: {
      url: 'roles',
      method: 'GET',
    },
    columns: [
      { key: 'name', header: 'Regra', width: '300px' },
      { key: 'role_code', header: 'Código da regra' },
    ],
    actions: [
      {
        icon: 'Show.svg',
        onClick: (row: any) => {},
      },
      {
        icon: 'Edit.svg',
        hidden: (row: any) => {
          return this.isAdmin(row)!;
        },
        onClick: (row: any) => {},
      },
      {
        icon: 'Delete.svg',
        hidden: (row: any) => {
          return this.isAdmin(row)!;
        },
        onClick: (row: any) => {
          console.log('Delete', row);
        },
      },
    ],
  };

  ngOnInit() {}

  createRole() {
    let dialogRef = this.dialogService.open(RolesUpsertUiComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      let { role: name } = result;
      let role_code = formatRole(result.role);

      let loader = this.loaderService.show();
      loader.hide();

      this.rolesService.createRole({ name, role_code }).subscribe((data) => {
        console.log(data);
        this.tableDataSource.reload();
      });
    });
  }
}
