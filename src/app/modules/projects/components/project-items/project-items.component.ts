import {
  Component,
  computed,
  inject,
  Input,
  input,
  signal,
} from '@angular/core';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { STATUS_DICTIONARY } from '../../../../core/dictionaries/status.dict';
import { ItemsService } from '../../services/items/items.service';
import { CATEGORY_DICTIONARY } from '../../../../core/dictionaries/category.dict';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemFormComponent } from '../../factory/item-form/item-form.component';
import { catchError, map, tap, throwError } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { DialogService } from '../../../../shared/components/dialog/dialog.service';
import { ItemDetailComponent } from '../../factory/item-detail/item-detail.component';

@Component({
  selector: 'app-project-items',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './project-items.component.html',
  styleUrl: './project-items.component.scss',
  providers: [ItemsService],
})
export class ProjectItemsComponent {
  private dialogService = inject(MatDialog);
  private dialogCustomService = inject(DialogService);
  private itemService = inject(ItemsService);
  private toastService = inject(ToastService);

  @Input() set data(value: any) {
    const project = value.project;
    const items$ = value.items;
    console.log(value);

    this.project.set(project);
    this.items$.set(items$);
  }

  items$ = signal<any>(null);
  project = signal<any>(null);

  STATUS_DICTIONARY = STATUS_DICTIONARY;
  CATEGORY_DICTIONARY = CATEGORY_DICTIONARY;

  constructor() {}

  newItemDialog() {
    const projectId = this.project().id;

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

            const items$ = this.itemService.findAll(this.project().id);

            this.items$.set(items$);
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

  openItemDetailDialog(item: any) {
    const dialogRef = this.dialogCustomService.open(ItemDetailComponent, {
      data: {
        itemId: item.id,
        projectId: item.project_id,
        item: item,
      },
      config: {
        disabledClosable: false,
      },
    });

    
  }
}
