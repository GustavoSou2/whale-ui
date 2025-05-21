import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-stats',
  standalone: true,
  imports: [],
  templateUrl: './project-stats.component.html',
  styleUrl: './project-stats.component.scss',
})
export class ProjectStatsComponent {
  @Input({ required: true }) set data(values: any) {
    this.totalItems = 0;
    this.totalSubitems = 0;

    for (const plan of values) {
      this.totalItems += plan.items.length;

      for (const item of plan.items) {
        this.totalSubitems += item.subitems?.length || 0;
      }
    }
  }

  totalItems = 0;
  totalSubitems = 0;
}
