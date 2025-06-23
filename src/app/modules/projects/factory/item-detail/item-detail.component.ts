import {
  AfterViewInit,
  Component,
  inject,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { ItemDetailUiComponent } from '../../ui/item-detail-ui/item-detail-ui.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentsComponent } from '../../../../shared/components/comments/comments.component';
import { SubItemsService } from '../../services/sub-items/sub-items.service';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { CATEGORY_DICTIONARY } from '../../../../core/dictionaries/category.dict';
import { STATUS_DICTIONARY } from '../../../../core/dictionaries/status.dict';
import { UNITS_DICTIONARY } from '../../../../core/dictionaries/units.dict';
import { ConfirmationDialogService } from '../../../../shared/components/confirmation-dialog/services/confirmation-dialog.service';
import {
  ActionPlanPriority,
  ActionPlanService,
  ActionPlanType,
} from '../../../action-plan/services/action-plan.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { SubitemCardComponent } from '../../components/subitem-card/subitem-card.component';
import { DialogService } from '../../../../shared/components/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { SubItemFormComponent } from '../sub-item-form/sub-item-form.component';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { ItemsService } from '../../services/items/items.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    ItemDetailUiComponent,
    CommonModule,
    ButtonComponent,
    CommentsComponent,
    TableDataSource,
  ],
  template: `
    <item-detail-ui [item]="item" [subitems]="subItems$ | async">
      <ng-container
        [ngTemplateOutlet]="itemActionsRef"
        item-actions
      ></ng-container>

      <ng-container
        [ngTemplateOutlet]="commentsRef"
        item-comments
      ></ng-container>

      <ng-container
        [ngTemplateOutlet]="itemGroupAction"
        item-group-action
      ></ng-container>
    </item-detail-ui>

    <ng-template #itemGroupAction>
      <button-custom
        type="button"
        label="Concluir item"
        style="width: max-content"
        variant="success"
        size="sm"
        [disabled]="itemCanComplete"
        (click)="completeItem()"
      ></button-custom>
      <button-custom
        type="button"
        label="Adicionar um subitem"
        size="sm"
        [disabled]="item.status === 'completed'"
        (clicked)="newSubItem()"
        style="width: 280px"
      ></button-custom>
    </ng-template>

    <ng-template #itemActionsRef> </ng-template>

    <ng-template #commentsRef>
      <!-- <comments [bgDetail]="'white'"></comments> -->
    </ng-template>
  `,
  providers: [SubItemsService, DatePipe, ActionPlanService, ItemsService],
})
export class ItemDetailComponent {
  @Input() set data(value: any) {
    this.selfData = value;
    this.subItems$ = this.getSubitemByItemBy(value.item.id);
  }

  selfData: any;
  get item() {
    return this.selfData?.item;
  }

  get itemCanComplete() {
    const allSubitemsCompleted = this.item.subitems.every(
      (subitem: any) => subitem.status === 'completed'
    );

    return (
      !allSubitemsCompleted ||
      this.item.status === 'completed' ||
      this.item.status === 'in_progress' ||
      this.item.status === 'cancel' ||
      this.item.status === 'blocked'
    );
  }

  private router = inject(Router);
  private subItemsService = inject(SubItemsService);
  private actionPlanService = inject(ActionPlanService);
  private toastService = inject(ToastService);
  private loaderService = inject(LoaderService);
  private dialogService = inject(MatDialog);
  private itemsService = inject(ItemsService);
  private tableSourceService = inject(TableDataSourceService);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private datePipe = inject(DatePipe);
  subItems$!: Observable<any>;

  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();

  getSubitemByItemBy(itemId: any) {
    return this.subItemsService.findAll(itemId).pipe(
      map((res: any) =>
        res.map((item: any) => ({ ...item, isCollapsed: false }))
      ),
      tap(() => {
        this.isLoading.next(false);
      })
    );
  }

  validateIfSubitemHasActionPlan = (row: any) => {
    const itemSubitems = this.data?.item?.subitems || [];
    const rowSubitemId = row.id;

    const subitem = itemSubitems.find(
      (subitem: any) => subitem.id === rowSubitemId
    );

    const subitemHasActionPlan =
      !!subitem?.action_plan_targets &&
      subitem?.action_plan_targets?.length > 0;

    return subitemHasActionPlan;
  };

  getActionPlanBySubitemId = (subitemId: number) => {
    const itemSubitems = this.data?.item?.subitems || [];
    const subitem = itemSubitems.find(
      (subitem: any) => subitem.id === subitemId
    );

    return subitem?.action_plan_targets || null;
  };

  newSubItem() {
    const dialogRef = this.dialogService.open(SubItemFormComponent, {
      data: {
        itemId: this.item.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.subItemsService
        .createSubItem(result)
        .pipe(
          tap((response) => {

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

  completeItem() {
    const dialogRef = this.confirmationDialogService.open({
      title: 'Concluir item',
      message: 'Tem certeza que deseja concluir este item?',
      cancelButton: {
        text: 'Cancelar',
        color: 'transparent',
      },
      confirmButton: {
        text: 'Concluir item',
        color: 'success',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const loader = this.loaderService.show();

      this.itemsService
        .completeItem(this.item.id)
        .pipe(
          tap((response) => {
            this.tableSourceService.reload();

            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([this.router.url]).then(() => {
                  this.toastService.addToast(
                    'success',
                    'Item concluido com sucesso'
                  );
                  loader.hide();
                });
              });
          }),
          catchError(({ error }) => {
            this.toastService.addToast(
              'success',
              `Erro ao concluir item: ${error.message}`
            );
            return throwError(() => error);
          })
        )
        .subscribe();
    });
  }
}
