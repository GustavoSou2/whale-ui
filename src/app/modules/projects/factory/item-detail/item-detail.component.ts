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

const initActionPlan = (name: string, type: 'item' | 'subitem') => {
  return `<p>
    O <strong>plano de ação</strong> é um conjunto estruturado de etapas, tarefas e validações que visam garantir o cumprimento de requisitos técnicos, legais e operacionais dentro da obra. Ele permite o <strong>acompanhamento detalhado</strong> do progresso, com responsáveis designados, prazos definidos e status personalizados para cada fase do processo.
  </p><p>
    Neste caso, você está prestes a iniciar o plano de ação para o seguinte elemento:<br>
    Referente ao ${type}: <strong>${name}</strong><br>
  </p><p><strong>Deseja realmente iniciar o plano de ação para este item/subitem?</strong></p>`;
};

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
    <item-detail-ui [item]="data?.item" [subitems]="subItems$ | async">
      <ng-container
        [ngTemplateOutlet]="itemActionsRef"
        item-actions
      ></ng-container>
      <ng-container
        [ngTemplateOutlet]="tableSubitemsRef"
        item-subitems
      ></ng-container>
      <ng-container
        [ngTemplateOutlet]="commentsRef"
        item-comments
      ></ng-container>
    </item-detail-ui>
    <ng-template #itemActionsRef>
      <button-custom
        type="button"
        label="Adicionar um subitem"
        size="sm"
        (clicked)="newSubItem()"
        style="width: 280px; margin-top: 2rem"
      ></button-custom>
    </ng-template>

    <ng-template #commentsRef>
      <comments [bgDetail]="'white'"></comments>
    </ng-template>

    <ng-template #tableSubitemsRef>
      <table-custom
        class="detail--item__subitems-table-over"
        [tableFullWidth]="false"
        [tableSource]=" {
          api: {
            url: 'sub-item/item/' + data?.item.id,
            method: 'GET',
          },
          columns: columns,
          actions: actions,
        }"
      ></table-custom>
    </ng-template>
  `,
  providers: [SubItemsService, DatePipe, ActionPlanService],
})
export class ItemDetailComponent implements AfterViewInit {
  @Input() data!: any;

  private router = inject(Router);
  private subItemsService = inject(SubItemsService);
  private actionPlanService = inject(ActionPlanService);
  private toastService = inject(ToastService);
  private loaderService = inject(LoaderService);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private datePipe = inject(DatePipe);
  subItems$!: Observable<any>;

  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();

  columns = [
    { key: 'name', header: 'Titulo', width: 'max-content' },
    {
      key: 'description',
      header: 'Descrição',
      width: '300px',
      onFormatter: (col: any, row: any) => {
        return col?.length > 20 ? `${col.slice(0, 35)}...` : col;
      },
    },
    {
      key: 'category',
      header: 'Categoria',
      onFormatter: (col: any, row: any) => {
        return CATEGORY_DICTIONARY[col].label;
      },
    },
    {
      key: 'status',
      header: 'Status',
      width: 'max-content',
      onFormatter: (col: any, row: any) => {
        return STATUS_DICTIONARY[col].label;
      },
    },
    {
      key: 'estimated_cost',
      header: 'Valor unitário',
      width: 'max-content',
      onFormatter: (col: any, row: any) => {
        const quantity = row.quantity || 1;
        const unitCost = col / quantity;

        return unitCost.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
    {
      key: 'quantity',
      width: 'max-content',
      header: 'Quantidade',
    },
    {
      key: 'estimated_cost',
      header: 'Valor total',
      width: 'max-content',
      onFormatter: (col: any, row: any) => {
        return (+col).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },

    {
      key: 'actual_cost',
      header: 'Custo real',
      width: 'max-content',
      onFormatter: (col: any) => {
        return (+col).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
    {
      key: 'unit',
      header: 'Unidade',
      width: 'max-content',
      onFormatter: (col: any, row: any) => {
        return UNITS_DICTIONARY[col];
      },
    },
    {
      key: 'start_date',
      header: 'Data de inicio',
      width: 'max-content',
      onFormatter: (col: any) => {
        return this.datePipe.transform(col, 'dd/MM/yyyy');
      },
    },
    {
      key: 'end_date',
      header: 'Data de fim',
      width: 'max-content',
      onFormatter: (col: any) => {
        return this.datePipe.transform(col, 'dd/MM/yyyy');
      },
    },
  ];
  actions = [
    {
      icon: 'Play.svg',
      hidden: (row: any) => {
        const subitemHasActionPlan = this.validateIfSubitemHasActionPlan(row);

        return subitemHasActionPlan;
      },
      onClick: (row: any) => {
        const dialogRef = this.confirmationDialogService.open({
          title: 'Iniciar Plano de Ação',
          messageHTML: initActionPlan(row.name, 'subitem'),
          cancelButton: {
            text: 'Não',
            color: 'transparent',
          },
          confirmButton: {
            text: 'Iniciar plano de ação',
            color: 'primary',
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (!!result) {
            this.actionPlanService
              .createActionPlan({
                project_id: this.data?.item.project_id,
                responsible_user_id: row.responsible_user_id,
                action_type: ActionPlanType.EXECUTION,
                priority: ActionPlanPriority.LOW,
                name: `[${row.id}${this.datePipe.transform(
                  new Date(),
                  'HHmmss'
                )}] Plano de Ação - ${row.name}`,
                description: row.description,
                targets: [
                  {
                    target_id: row.id,
                    target_type: 'subitem',
                  },
                ],
              })
              .pipe(
                tap((actionPlan) => {
                  const loader = this.loaderService.show();

                  this.toastService.addToast(
                    'success',
                    'Plano de ação iniciado com sucesso'
                  );

                  this.router
                    .navigateByUrl('/', { skipLocationChange: true })
                    .then(() => {
                      this.router
                        .navigate([window.location.pathname])
                        .then(() => {
                          this.toastService.addToast(
                            'success',
                            'Item criado com sucesso'
                          );

                          loader.hide();
                        });
                    });
                }),
                catchError((error) => {
                  this.toastService.addToast(
                    'success',
                    `Erro ao iniciar o plano de ação: ${error.error.message}`
                  );
                  return throwError(() => error);
                })
              )
              .subscribe();
          }
        });
      },
    },
    {
      icon: 'Table.svg',
      hidden: (row: any) => {
        const subitemHasActionPlan = this.validateIfSubitemHasActionPlan(row);

        return !subitemHasActionPlan;
      },
      onClick: (row: any) => {
        const actionPlan = this.getActionPlanBySubitemId(row.id);

        this.router
          .navigateByUrl('/action-plan', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/action-plan'], {
              queryParams: {
                action_id: actionPlan.id,
                target_id: row.id,
                target_type: 'subitem',
              },
            });
          });
      },
    },
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
  ];

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

  newSubItem() {}

  ngAfterViewInit(): void {
    this.subItems$ = this.subItemsService.findAll(this.data?.item.id).pipe(
      map((res: any) =>
        res.map((item: any) => ({ ...item, isCollapsed: false }))
      ),
      tap(() => {
        this.isLoading.next(false);
      })
    );
  }
}
