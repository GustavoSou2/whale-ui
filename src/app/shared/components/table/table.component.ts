import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  inject,
  QueryList,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Injector,
  NO_ERRORS_SCHEMA,
  output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TableDataSourceService } from './table.service';
import { environment } from '../../../../environment/environment';
import { LoaderService } from '../loader/loader.service';
import { ApiService } from '../../../core/api/api.service';
import {
  DynamicComponent,
  DynamicComponentInjectorToken,
  DynamicDirectivesModule,
  DynamicIoDirective,
  DynamicModule,
} from 'ng-dynamic-component';
import { ActionPlanStatus } from '../../../modules/status-action-plan/services/status-action-plan/status-action-plan.service';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Column {
  key: string;
  header: string;
  width?: string;
  onFormatter?: (value: any, row: any) => any;
  loadComponent?: Type<any>;
}

export interface Action {
  icon?: string;
  color?: string;
  loadComponent?: Type<any>;
  hidden?: (row: any) => boolean;
  onClick?: (row: any) => void;
}

export interface TableSourceApi<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  params?: HttpParams;
  onFormatterResponse?: (response: any) => any;
}

export interface TableSource<T> {
  api?: TableSourceApi<T>;
  data?: Observable<T[]>;
  columns: Column[];
  actionsPosition?: 'left' | 'right';
  actions?: Action[];
}

type ActionType = 'new' | 'aprovar' | 'reprovar' | 'deletar' | 'editar';

const ACTIONS_GROUPS: Record<ActionType, string> = {
  new: 'Novo',
  aprovar: 'Aprovar',
  reprovar: 'Reprovar',
  deletar: 'Excluir',
  editar: 'Editar',
};

@Component({
  selector: 'table-custom',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DynamicModule,
    DynamicIoDirective,
    MatTooltipModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [],
})
export class TableDataSource<T> implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef);
  private loaderService = inject(LoaderService);
  private apiService = inject(ApiService);
  private tableDataService = inject(TableDataSourceService<T>);

  private loader = this.loaderService.show();
  private baseUrl = `${environment.apiURL}/api`;

  ACTIONS_GROUPS: any = ACTIONS_GROUPS;

  @Input() tableFullWidth = true;
  @Input() tableHeaderNew = false;
  @Input() tableHeaderActions = false;
  @Input() tableSelectMultipleRows = false;
  @Input() set tableSource(source: TableSource<T | any>) {
    this.columns = source.columns;
    this.actions = source?.actions || [];
    this.actionsPosition = source?.actionsPosition || 'right';
    this.api = source.api;

    this.tableDataService.setData([]);

    if (source.api) {
      this.loadDataFromApi(source.api);
    } else if (source?.data) {
      this.data = source.data;
    }
  }

  onTableSelectRows = output<any>();

  api?: TableSourceApi<T>;
  data: Observable<any[]> = this.tableDataService.data$;
  columns: Column[] = [];
  actions: Action[] = [];
  selectedRows: number[] = [];
  actionsPosition: 'left' | 'right' = 'right';

  @ViewChild('vc', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  @ViewChild('vcAction', { read: ViewContainerRef })
  viewContainerActionRef!: ViewContainerRef;

  @ViewChild('vcCell', { read: ViewContainerRef })
  viewContainerCellRefs!: QueryList<ViewContainerRef>;

  constructor() {
    this.tableDataService.setState(false);
  }

  ngAfterViewInit() {
    this.tableDataService.listener.subscribe((state) => {
      if (!!state) this.loadDataFromApi(this.api!);
    });
  }

  loadDataFromApi(apiConfig: TableSourceApi<T>) {
    const { method, url, onFormatterResponse, params } = apiConfig;
    console.log('API URL:', url);

    const loader = this.loaderService.show();

    let httpParams = new HttpParams();

    if (params) {
      params.keys().forEach((key) => {
        const value = params.getAll(key);
        if (value) {
          value.forEach((v) => {
            httpParams = httpParams.append(key, v);
          });
        }
      });
    }
    let request: Observable<any>;

    switch (method) {
      case 'GET':
        request = this.apiService.get(url, httpParams);
        break;
      case 'POST':
        request = this.apiService.post(url, httpParams);
        break;
      case 'PUT':
        request = this.apiService.put(url, httpParams);
        break;
      case 'DELETE':
        request = this.apiService.delete(url);
        break;
      default:
        throw new Error('Método HTTP não suportado');
    }

    request.subscribe((response) => {
      const formattedData = onFormatterResponse
        ? onFormatterResponse(response)
        : response;

      this.tableDataService.setData(formattedData);
      this.loadActionComponents();
      this.cdr.markForCheck();

      loader.hide();
    });
  }

  loadActionComponents() {
    this.actions.forEach((action) => {
      if (action.loadComponent) {
        this.renderActionComponent(action.loadComponent);
      }
    });
  }

  renderComponent(component: Type<any>) {
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(component);
    componentRef.instance.data = component;
  }

  renderActionComponent(component: Type<any>) {
    this.viewContainerActionRef.clear();
    const componentRef = this.viewContainerActionRef.createComponent(component);
    componentRef.instance.data = component;
  }

  generateGridTemplate(): string {
    return this.columns
      .map((col) => (col.width ? `${col.width}px` : '1fr'))
      .join(' ');
  }

  get hasAction() {
    return this.actions.length > 0;
  }

  isString(value: any): value is string {
    return typeof value === 'string';
  }

  isHTML(value: any): value is string {
    return typeof value === 'string' && value.startsWith('<');
  }

  getInjector(row: any, key: string): Injector {
    return Injector.create({
      providers: [
        { provide: 'data', useValue: row[key] },
        { provide: 'rowData', useValue: row },
      ],
    });
  }

  getAvailableActions(): any[] {
    const data = this.tableDataService.data;

    const unadvanvedStatusToDelete = [
      ActionPlanStatus.CANCELADO,
      ActionPlanStatus.ARQUIVADO,
      ActionPlanStatus.ARQUIVADO,
    ];

    const selectedItems = data.filter((item: any) =>
      this.selectedRows.includes(item.id)
    );

    const allEditables = selectedItems.every(
      (item: any) => !unadvanvedStatusToDelete.includes(item.id)
    );

    const isEditable = selectedItems.length === 1;

    return [
      {
        type: 'aprovar',
        disabled: !allEditables,
        icon: 'Check.svg',
      },
      {
        type: 'reprovar',
        disabled: !allEditables,
        icon: 'Close.svg',
      },
      {
        type: 'deletar',
        disabled: !allEditables,
        icon: 'Delete.svg',
      },
      {
        type: 'editar',
        disabled: !isEditable,
        icon: 'Edit.svg',
      },
    ];
  }

  handleAction(action: ActionType) {
    this.emitTableAction(action);
  }

  emitTableAction(action: ActionType) {
    this.onTableSelectRows.emit({
      action,
      selectedRows: this.selectedRows,
    });
  }

  get allSelected(): boolean {
    const data = this.tableDataService.data;

    return this.selectedRows.length === data.length;
  }

  toggleSelectAll() {
    const data = this.tableDataService.data;

    if (this.allSelected) {
      this.selectedRows = [];
    } else {
      this.selectedRows = data.map((d: any) => d.id);
    }
  }

  toggleSelection(id: number) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter((rowId) => rowId !== id);
    } else {
      this.selectedRows.push(id);
    }
  }
}
