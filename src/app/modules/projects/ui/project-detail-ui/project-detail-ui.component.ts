import { Component, input } from '@angular/core';

@Component({
  selector: 'project-detail-ui',
  standalone: true,
  imports: [],
  templateUrl: './project-detail-ui.component.html',
  styleUrl: './project-detail-ui.component.scss'
})
export class ProjectDetailUiComponent {
  project = input.required<any>()
}
