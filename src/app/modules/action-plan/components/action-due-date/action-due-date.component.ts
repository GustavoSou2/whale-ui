import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { isAfter, differenceInCalendarDays } from 'date-fns';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-action-due-date',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './action-due-date.component.html',
  styleUrl: './action-due-date.component.scss',
})
export class ActionDueDateComponent {
  @Input() set data(date: string) {
    const endDate = new Date(date);
    const today = new Date();

    this.date = date;

    if (isAfter(today, endDate)) {
      this.isLate = true;
      this.daysLate = differenceInCalendarDays(today, endDate);
    }
  }

  @Input() rowData: any;

  isLate = false;
  daysLate = 0;
  date = '';
}
