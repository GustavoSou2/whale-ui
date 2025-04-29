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
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'detail-ui',
  standalone: true,
  imports: [
    CommonModule,
    TableDataSource,
    AvatarComponent,
    NgxChartsModule,
    FormsModule,
    CommentsComponent,
  ],
  templateUrl: './detail-ui.component.html',
  styleUrl: './detail-ui.component.scss',
  animations: [
    trigger('toggleDescription', [
      state('void', style({ height: '0' })),
      state('*', style({ height: '*' })),
      transition('void <=> *', [animate('300ms ease-in-out')]), // Animação suave de 300ms
    ]),
  ],
})
export class DetailUiComponent {
  @Input() project: any;
  @Input() tableSource!: any;
  @Input() items!: any;

  @Input() subItemTemplate!: TemplateRef<any>;

  dialogCustomService = inject(DialogService);

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
}

