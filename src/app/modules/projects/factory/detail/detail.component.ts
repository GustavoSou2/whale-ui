import { Component, computed, inject, OnInit } from '@angular/core';
import { DetailUiComponent } from '../../ui/detail-ui/detail-ui.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects/projects.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardBudgetUiComponent } from '../../components/card-budget-ui/card-budget-ui.component';
import { MatDialog } from '@angular/material/dialog';
import { BudgetUpsertDialogComponent } from '../../components/budget-upsert-dialog/budget-upsert-dialog.component';
import { BudgetService } from '../../services/budget/budget.service';
import { catchError, forkJoin, tap, throwError } from 'rxjs';
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
    CardBudgetUiComponent,
    InputCustomComponent,
  ],
  template: `
    @let project = project$() | async;
    <detail-ui
      [project]="project"
      [items]="items$ | async"
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
    </detail-ui>

    <ng-template #templateRefProjectDetailActions>
      <button-custom
        type="button"
        label="Adicionar um item"
        icon="fa-solid fas fa-plus plus"
        iconPosition="right"
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
  private toastService = inject(ToastService);
  private projectsService = inject(ProjectsService);
  private tableSourceService = inject(TableDataSourceService);
  private dialogCustomService = inject(DialogService);

  projectId = computed(() => this.route.snapshot.paramMap.get('id'));
  project$ = computed(() => this.projectsService.getProject(this.projectId()!));

  items$ = this.itemService.findAll(this.projectId()!);

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
            this.toastService.addToast('success', 'Item criado com sucesso');

            this.tableSourceService.reload();
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
            this.toastService.addToast(
              'success',
              'Sub item criado com sucesso'
            );

            this.tableSourceService.reload();
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
}

