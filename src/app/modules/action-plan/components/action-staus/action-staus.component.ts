import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { getTextColor } from '../../../../core/functions/text-color.functino';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-action-staus',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './action-staus.component.html',
  styleUrl: './action-staus.component.scss',
})
export class ActionStatusComponent {
  @Input() data: any;
  @Input() rowData: any;

  get status() {
    return this.data;
  }

  getTextColor = (bgColor: string): string => getTextColor(bgColor);

  constructor() {}
}
