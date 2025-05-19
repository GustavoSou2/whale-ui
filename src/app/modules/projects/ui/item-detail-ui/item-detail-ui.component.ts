import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CATEGORY_DICTIONARY } from '../../../../core/dictionaries/category.dict';
import { STATUS_DICTIONARY } from '../../../../core/dictionaries/status.dict';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'item-detail-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail-ui.component.html',
  styleUrl: './item-detail-ui.component.scss',
  animations: [
    trigger('collapseAnimation', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ItemDetailUiComponent {
  @Input() item: any;
  @Input() subitems: any;

  CATEGORY_DICTIONARY = CATEGORY_DICTIONARY;
  STATUS_DICTIONARY = STATUS_DICTIONARY;

  get actualCost() {
    return (
      this.subitems?.reduce((acc: number, subitem: any) => {
        return acc + +subitem.actual_cost;
      }, 0) || 0
    );
  }
  
  get estimatedCost() {
    return (
      this.subitems?.reduce((acc: number, subitem: any) => {
        return acc + +subitem.estimated_cost;
      }, 0) || 0
    );
  }
}
