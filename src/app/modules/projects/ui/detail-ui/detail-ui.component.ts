import { CommonModule } from '@angular/common';
import { Component, inject, Input, TemplateRef } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TipseenDirective } from '../../../../shared/components/tipseen/tipseen.directive';
import {
  TableDataSource,
  TableSource,
} from '../../../../shared/components/table/table.component';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { STATUS_DICTIONARY } from '../../../../core/dictionaries/status.dict';
import { CATEGORY_DICTIONARY } from '../../../../core/dictionaries/category.dict';
import { ItemDetailComponent } from '../../factory/item-detail/item-detail.component';
import { DialogService } from '../../../../shared/components/dialog/dialog.service';
import { CommentsComponent } from '../../../../shared/components/comments/comments.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CollaboratorListComponent } from '../../components/collaborator-list/collaborator-list.component';

@Component({
  selector: 'detail-ui',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule, ButtonComponent],
  templateUrl: './detail-ui.component.html',
  styleUrl: './detail-ui.component.scss',
  animations: [
    trigger('toggleDescription', [
      state('void', style({ height: '0' })),
      state('*', style({ height: '*' })),
      transition('void <=> *', [animate('300ms ease-in-out')]), // Animação suave de 300ms
    ]),
    trigger('collapseAnimation', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class DetailUiComponent {
  @Input('project') set _project(data: any) {
    let estimated = 0;
    let actualEstimated = 0;
    let actual = 0;

    this.project = data;

    for (const item of data.items) {
      actual += parseFloat(item.actual_cost || 0);

      for (const subitem of item.subitems || []) {
        estimated += parseFloat(subitem.estimated_cost || 0);
        actualEstimated += parseFloat(subitem.actual_cost || 0);
      }
    }

    this.totalEstimated = estimated;
    this.totalActualEstimated = actualEstimated;
    this.totalActual = actual;
  }
  @Input() tableSource!: any;
  @Input() set items(itemAgroupedByStatus: any) {
    this.itemAgroupedByStatus = itemAgroupedByStatus;
    this.calculateProgress();
  }
  @Input() subItemTemplate!: TemplateRef<any>;

  dialogCustomService = inject(DialogService);

  itemAgroupedByStatus: any = [];
  totalItems: number = 0;
  completedItems: number = 0;
  progressPercentage: number = 0;
  totalEstimated = 0;
  totalActual = 0;
  totalActualEstimated = 0;

  project: any = {};

  get projectName() {
    return this.project?.name ?? '';
  }

  get budget() {
    return this.project?.budget;
  }

  get shortDescription(): string {
    return this.project.description.length > 255
      ? this.project.description.substring(0, 255) + '...'
      : this.project.description;
  }

  STATUS_DICTIONARY: Record<string, any> = STATUS_DICTIONARY;
  CATEGORY_DICTIONARY: Record<string, any> = CATEGORY_DICTIONARY;

  tab = 'not_generated';

  colorScheme: any = { domain: ['#7768c3', '#3c4d68', '#da4a28', '#7d8197'] };

  showFullDescription = false;

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  openItemDetailDialog(item: any) {
    const dialogRef = this.dialogCustomService.open(ItemDetailComponent, {
      data: {
        itemId: item.id,
        projectId: item.project_id,
        item: item,
      },
    });
  }

  calculateProgress(): void {
    let total = 0;
    let completed = 0;

    this.itemAgroupedByStatus.forEach((group: any) => {
      if (group.items && Array.isArray(group.items)) {
        total += group.items.length;
        completed += group.items.filter(
          (item: any) => item.status === 'completed'
        ).length;
      }
    });

    this.totalItems = total;
    this.completedItems = completed;
    this.progressPercentage =
      total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  actualCost(item: any) {
    return (
      item.subitems?.reduce((acc: number, subitem: any) => {
        return acc + +subitem.actual_cost;
      }, 0) || 0
    );
  }

  estimatedCost(item: any) {
    return (
      item.subitems?.reduce((acc: number, subitem: any) => {
        return acc + +subitem.estimated_cost;
      }, 0) || 0
    );
  }

  calculatePercentage(subitems: any[] = []) {
    const completed = subitems.filter((item) => item.status === 'completed');
    return Math.round((completed.length / subitems.length) * 100);
  }

  totalSubitems(items: any) {
    return items.reduce((acc: number, item: any) => {
      return acc + (item.subitems ? item.subitems.length : 0);
    }, 0);
  }

 
}
