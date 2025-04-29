import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-status-table-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-status-table-ui.component.html',
  styleUrl: './project-status-table-ui.component.scss',
})
export class ProjectStatusTableUiComponent implements OnInit {
  @Input() data: any;
  @Input() rowData: any;

  ngOnInit(): void {
    console.log(this.data);
  }
}
