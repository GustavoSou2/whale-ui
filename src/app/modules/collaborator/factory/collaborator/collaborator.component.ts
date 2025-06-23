import { Component, inject } from '@angular/core';
import { CollaboratorUiComponent } from '../../ui/collaborator-ui/collaborator-ui.component';
import { MatDialog } from '@angular/material/dialog';
import {
  CommonModule,
  DATE_PIPE_DEFAULT_OPTIONS,
  DatePipe,
} from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CollaboratorInviteUiComponent } from '../../ui/collaborator-invite-ui/collaborator-invite-ui.component';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { AdminService } from '../../../../core/services/admin/admin.service';
import { AuthService } from '../../../account/services/auth/auth.service';
import { catchError, of, tap, throwError } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { CollaboratorService } from '../../services/collaborator/collaborator.service';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { UserDetailDialogComponent } from '../../components/user-detail-dialog/user-detail-dialog.component';
import { ConfirmationDialogService } from '../../../../shared/components/confirmation-dialog/services/confirmation-dialog.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-collaborator',
  standalone: true,
  imports: [
    CollaboratorUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
  ],
  template: ` <collaborator-ui [tableSource]="tableSource">
      <ng-container
        *ngTemplateOutlet="collaboratorHeader"
        clients-header
      ></ng-container
    ></collaborator-ui>
    <ng-template #collaboratorHeader>
      <button-custom
        type="button"
        label="Convidar colaborador"
        (clicked)="createClient()"
      ></button-custom>
      <input-custom
        type="text"
        placeholder="Pesquisar"
        name="text"
        icon="Search.svg"
        required
      ></input-custom>
    </ng-template>`,
  providers: [DatePipe, AuthService, CollaboratorService],
})
export class CollaboratorComponent {
  dialogService = inject(MatDialog);
  datePipe = inject(DatePipe);
  adminService = inject(AdminService);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  loaderService = inject(LoaderService);
  collaboratorService = inject(CollaboratorService);
  tableDataSourceService = inject(TableDataSourceService);
  confirmationDialogService = inject(ConfirmationDialogService);

  isAdmin(user: any) {
    return this.adminService.isAdmin(user);
  }

  tableSource: TableSource<any> = {
    api: {
      url: 'users/emplooyes',
      method: 'GET',
      onFormatterResponse: (response) => {
        return response.map((emplooyes: any) => ({
          ...emplooyes,
          ...emplooyes.role,
          emplooye_created_at: this.datePipe.transform(
            emplooyes.created_at,
            'dd MMMM YYYY HH:MM:ss',
            'UTC-3',
            'pt-BR'
          ),
        }));
      },
    },
    columns: [
      { key: 'username', header: 'Colaborador', width: '300px' },
      { key: 'email', header: 'Email', width: '300px' },
      { key: 'name', header: 'Regra' },
      { key: 'phone', header: 'Telefone' },
      { key: 'document', header: 'CPF/RG' },
      { key: 'emplooye_created_at', header: 'Data de Cadastro' },
      { key: 'is_active', header: 'Ativo' },
    ],
    actions: [
      {
        icon: 'Show.svg',
        onClick: (row: any) => {
          let dialogRef = this.dialogService.open(UserDetailDialogComponent, {
            data: row,
            width: '600px',
          });
        },
      },
      {
        icon: 'Edit.svg',
        onClick: (row: any) => {
          let dialogRef = this.dialogService.open(
            CollaboratorInviteUiComponent,
            {
              data: {
                user: row,
              },
            }
          );

          dialogRef.afterClosed().subscribe((result) => {
            if (!result) return;

            this.collaboratorService
              .updateCollaborator(row.id, { role_id: result.role })
              .pipe(
                tap(() => {
                  this.toastService.addToast(
                    'success',
                    'Colaborador atualizado com sucesso'
                  );
                  this.tableDataSourceService.reload();
                })
              )
              .subscribe();
          });
        },
        hidden: (row: any) => {
          return this.isAdmin(row)!;
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

            this.collaboratorService.deleteCollaborator(row.id).subscribe(() => {
              loader.hide();
              this.toastService.addToast(
                'Sucesso',
                'Colaborador deletada com sucesso!'
              );
              this.tableDataSourceService.reload();
            });
          });
        },
        hidden: (row: any) => {
          return this.isAdmin(row)!;
        },
      },
    ],
  };

  createClient() {
    let dialogRef = this.dialogService.open(CollaboratorInviteUiComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.authService
        .collaboratorInvite(result)
        .pipe(
          tap((invite) => {
            this.toastService.addToast(
              'success',
              'Colaborador convidado com sucesso'
            );
          }),
          catchError((error) => {
            this.toastService.addToast(
              'success',
              `Erro ao convidar colaborador: ${error.error.message}`
            );
            return throwError(() => error);
          })
        )
        .subscribe();
    });
  }
}
