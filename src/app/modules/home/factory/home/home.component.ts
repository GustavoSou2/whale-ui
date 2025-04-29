import { Component, inject } from '@angular/core';
import { HomeUiComponent } from '../../ui/home-ui/home-ui.component';
import { modules } from '../../../nav/factory/menu/menu.component';
import { NavCardUiComponent } from '../../../nav/ui/nav-card-ui/nav-card-ui.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProjectsService } from '../../../projects/services/projects/projects.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeUiComponent, NavCardUiComponent, CommonModule, CardComponent],
  template: `
    <home-ui>
      <ng-container *ngTemplateOutlet="homeModules" home-modules></ng-container>
      <ng-container
        *ngTemplateOutlet="homeRecentelyProjects"
        home-recentely-project
      ></ng-container>
    </home-ui>
    <ng-template #homeModules
      ><nav-card-ui
        *ngFor="let module of modules;"
        [module]="module"
      ></nav-card-ui
    ></ng-template>
    <ng-template #homeRecentelyProjects>
      <card
        *ngFor="let project of projects | async;"
        [project]="project"
        type="project"
      ></card>
    </ng-template>
  `,
  providers: [ProjectsService],
})
export class HomeComponent {
  projectsService = inject(ProjectsService);
  modules = modules;
  projects = this.projectsService.findAll();
}
