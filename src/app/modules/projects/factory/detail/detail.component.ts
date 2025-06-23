import { Component, computed, inject, OnInit } from '@angular/core';
import { DetailUiComponent } from '../../ui/detail-ui/detail-ui.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects/projects.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { BudgetUpsertDialogComponent } from '../../components/budget-upsert-dialog/budget-upsert-dialog.component';
import { BudgetService } from '../../services/budget/budget.service';
import { catchError, forkJoin, map, tap, throwError } from 'rxjs';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { TableSource } from '../../../../shared/components/table/table.component';
import { ItemsService } from '../../services/items/items.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { formatToCurrencyBRL } from '../../../../core/functions/to-currency.function';
import { SubItemFormComponent } from '../sub-item-form/sub-item-form.component';
import { SubItemsService } from '../../services/sub-items/sub-items.service';
import { DialogService } from '../../../../shared/components/dialog/dialog.service';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CollaboratorComponent } from '../../../collaborator/factory/collaborator/collaborator.component';
import { CollaboratorListComponent } from '../../components/collaborator-list/collaborator-list.component';
import { ProjectStatsComponent } from '../../components/project-stats/project-stats.component';
import { ConfirmationDialogService } from '../../../../shared/components/confirmation-dialog/services/confirmation-dialog.service';

export const ITEM_STATUS_DICTIONARY: Record<string, string> = {
  blocked: 'Bloqueado',
  unlocked: 'Desbloqueado',
  in_progress: 'Em andamento',
  completed: 'Concluído',
  pending: 'Pendente',
  archived: 'Arquivado',
  cancel: 'Cancelado',
};

export const ITEMS_CATEGORIES_DICTIONARY: Record<string, string> = {
  materials: 'Materais',
  labor: 'Mão de Obra',
  equipment: 'Equipamentos',
  other: 'Outros',
};

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    DetailUiComponent,
    CommonModule,
    ButtonComponent,
    InputCustomComponent,
    CollaboratorListComponent,
    ProjectStatsComponent,
  ],
  template: `
    @let project = project$() | async; @let items = items$ | async;
    <detail-ui
      [project]="project"
      [items]="items"
      [subItemTemplate]="templateRefItemBudget"
    >
      <ng-container
        [ngTemplateOutlet]="templateRefProjectDetailActions"
        project-detail-actions
      ></ng-container>
      <ng-container
        [ngTemplateOutlet]="templateRefProjectDetailBudget"
        project-detail-budget
      ></ng-container>

      <ng-container collaborators-list>
        <collaborator-list [data]="items!"></collaborator-list>
      </ng-container>

      <ng-container project-stats>
        <project-stats [data]="items!"></project-stats>
      </ng-container>

      <ng-container project-actions-button>
        <ng-container
          [ngTemplateOutlet]="templateRefCompleteProjectButton"
        ></ng-container>
      </ng-container>
    </detail-ui>

    <ng-template #templateRefProjectDetailActions>
      <button-custom
        type="button"
        label="Adicionar um item"
        icon="fa-solid fas fa-plus plus"
        iconPosition="right"
        size="sm"
        (click)="newItemDialog()"
      ></button-custom>
      <input-custom
        type="text"
        placeholder="Pesquisar..."
        class="input--search"
        (change)="onSearch($event)"
      ></input-custom>
    </ng-template>

    <ng-template #templateRefProjectDetailBudget>
      <button-custom
        type="button"
        label="Adicionar um orçamento"
        icon="fa-solid fas fa-plus plus"
        iconPosition="right"
        size="sm"
        (click)="budgetOpenDialog()"
      ></button-custom>
    </ng-template>
    <ng-template #templateRefItemBudget let-id>
      <button-custom
        type="button"
        size="sm"
        label="Adicionar um subitem"
        (click)="newSubItemDialog(+id)"
      ></button-custom>
    </ng-template>

    <ng-template #templateRefCompleteProjectButton>
      <button-custom
        type="button"
        size="sm"
        variant="primary"
        label="Enviar para aprovação"
        [disabled]="!projectIsCompleted(project)"
        (click)="sendProjectApproval(project)"
      ></button-custom>
      <button-custom
        type="button"
        size="sm"
        variant="success"
        label="Concluir o projeto"
        [disabled]="!project.approval_is_approved || project.status == 4"
        (click)="completeProject(project)"
      ></button-custom>
    </ng-template>
  `,
  providers: [
    ProjectsService,
    BudgetService,
    ItemsService,
    SubItemsService,
    InputCustomComponent,
  ],
})
export class DetailComponent {
  dialogService = inject(MatDialog);
  loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private budgetService = inject(BudgetService);
  private itemService = inject(ItemsService);
  private subItemsService = inject(SubItemsService);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private toastService = inject(ToastService);
  private projectsService = inject(ProjectsService);
  private tableSourceService = inject(TableDataSourceService);
  private dialogCustomService = inject(DialogService);

  projectId = computed(() => this.route.snapshot.paramMap.get('id'));
  project$ = computed(() => this.projectsService.getProject(this.projectId()!));

  items$ = this.getItemsByProject();

  getItemsByProject() {
    const projectId = this.projectId();
    const toastrRef = this.loaderService.show();

    return this.itemService.findAll(projectId!).pipe(
      map((_) => _.map((item) => ({ ...item, isOpen: false }))),
      tap((response) => {
        toastrRef.hide();
      }),
      catchError(({ error }) => {
        this.toastService.addToast(
          'error',
          `Erro ao buscar itens: ${error.message}`
        );
        return throwError(() => error);
      })
    );
  }

  newItemDialog() {
    const projectId = this.projectId();

    const dialogRef = this.dialogService.open(ItemFormComponent, {
      data: {
        projectId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.itemService
        .createItem(result)
        .pipe(
          tap((response) => {
            this.tableSourceService.reload();

            const loader = this.loaderService.show();

            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([window.location.pathname]).then(() => {
                  this.toastService.addToast(
                    'success',
                    'Item criado com sucesso'
                  );

                  loader.hide();
                });
              });
          }),
          catchError(({ error }) => {
            this.toastService.addToast(
              'success',
              `Erro ao criar item: ${error.message}`
            );
            return throwError(() => error);
          })
        )
        .subscribe();
    });
  }

  budgetOpenDialog() {
    let dialogRef = this.dialogService.open(BudgetUpsertDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const loader = this.loaderService.show();

      const [currency, amount] = result.amout.split('R$');

      const cleanedValue = amount.replace(/\./g, '').replace(',', '.');

      let amountNumber = parseFloat(cleanedValue);

      forkJoin([
        this.budgetService.create({
          project_id: +this.projectId()!,
          total_amount: amountNumber,
        }),
        this.projectsService.patch({
          id: +this.projectId()!,
          budget: amountNumber,
        }),
      ]).subscribe(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.router.url]).then(() => {
              loader.hide();
            });
          });
      });
    });
  }

  newSubItemDialog(itemId: number) {
    const dialogRef = this.dialogService.open(SubItemFormComponent, {
      data: {
        itemId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.subItemsService
        .createSubItem(result)
        .pipe(
          tap((response) => {
            this.tableSourceService.reload();

            const loader = this.loaderService.show();

            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([this.router.url]).then(() => {
                  this.toastService.addToast(
                    'success',
                    'Sub item criado com sucesso'
                  );
                  loader.hide();
                });
              });
          }),
          catchError(({ error }) => {
            this.toastService.addToast(
              'success',
              `Erro ao criar sub item: ${error.message}`
            );
            return throwError(() => error);
          })
        )
        .subscribe();
    });
  }

  onSearch(search: any) {
    console.log(search);
  }

  projectIsCompleted(project: any) {
    if (project.has_approval_flow) return false;

    const allItemsAreCompleted = project.items.every(
      (item: any) => item.status === 'completed'
    );

    const allSubitemsAreCompleted = project.items
      .flatMap((item: any) => item.subitems)
      .every((subitem: any) => subitem.status === 'completed');

    return allItemsAreCompleted && allSubitemsAreCompleted;
  }

  sendProjectApproval(project: any) {
    const dialogRef = this.confirmationDialogService.open({
      title: 'Enviar Projeto para aprovação',
      messageHTML: `Deseja realmente enviar o projecto <strong>${project.name}</strong>?`,
      cancelButton: {
        text: 'Fechar',
        color: 'transparent',
      },
      confirmButton: {
        text: 'Enviar',
        color: 'primary',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      let loader = this.loaderService.show();

      this.projectsService
        .sendProjectApproval(project.id)
        .pipe(
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([window.location.pathname]).then(() => {
                  loader.hide();
                  this.toastService.addToast(
                    'Sucesso',
                    'Projecto finalizado com sucesso!'
                  );
                });
              });
          })
        )
        .subscribe();
    });
  }

  completeProject(project: any) {
    const dialogRef = this.confirmationDialogService.open({
      title: 'Finalizar Projeto',
      messageHTML: `Você tem certeza que deseja finalizar este projeto <strong>${project.name}</strong>?`,
      cancelButton: {
        text: 'Fechar',
        color: 'transparent',
      },
      confirmButton: {
        text: 'Concluir',
        color: 'success',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      let loader = this.loaderService.show();

      this.projectsService
        .completeProject(project.id)
        .pipe(
          tap(() => {
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([window.location.pathname]).then(() => {
                  loader.hide();
                  this.toastService.addToast(
                    'Sucesso',
                    'Projecto finalizado com sucesso!'
                  );
                });
              });
          })
        )
        .subscribe();
    });
  }
}
