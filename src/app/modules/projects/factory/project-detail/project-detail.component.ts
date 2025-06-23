import { Component, computed, inject, signal } from '@angular/core';
import { ProjectDetailUiComponent } from '../../ui/project-detail-ui/project-detail-ui.component';
import { ProjectsService } from '../../services/projects/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DynamicTabsComponent } from '../../../../shared/components/dynamic-tabs/dynamic-tabs.component';
import { ProjectInfoComponent } from '../../components/project-info/project-info.component';
import { CollaboratorListComponent } from '../../components/collaborator-list/collaborator-list.component';
import { ProjectItemsComponent } from '../../components/project-items/project-items.component';
import { forkJoin, tap } from 'rxjs';
import { ItemsService } from '../../services/items/items.service';
import { ActionPlanComponent } from '../../../action-plan/factory/action-plan/action-plan.component';
import { ApprovalFlowComponent } from '../../../approval-flow/factory/approval-flow/approval-flow.component';
import { ProjectApprovalComponent } from '../../components/project-approval/project-approval.component';
import { ApprovalFlowService } from '../../../approval-flow/services/approval-flow/approval-flow.service';
import { MatDialog } from '@angular/material/dialog';
import { BudgetUpsertDialogComponent } from '../../components/budget-upsert-dialog/budget-upsert-dialog.component';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { BudgetService } from '../../services/budget/budget.service';
import { HeroBarService } from '../../../nav/components/hero-bar/service/hero-bar.service';
import { ProjectStepsOverviewComponent } from '../../components/project-steps-overview/project-steps-overview.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    ProjectDetailUiComponent,
    ButtonComponent,
    DynamicTabsComponent,
  ],
  template: `
    @let project = project$ | async;
    <project-detail-ui [project]="project">
      <ng-container project-title>{{ project.name }}</ng-container>

      <ng-container
        *ngTemplateOutlet="projectActions"
        project-actions
      ></ng-container>

      <ng-container
        *ngTemplateOutlet="projectContent"
        project-content
      ></ng-container>
    </project-detail-ui>

    <ng-template #projectActions>
      <button-custom
        type="button"
        variant="success"
        label="Concluir o projeto"
        [disabled]="!project?.approval_is_approved || project.status == 4"
      ></button-custom>
    </ng-template>

    <ng-template #projectContent>
      <dynamic-tabs [tabs]="tabs()"></dynamic-tabs>
    </ng-template>
  `,
  providers: [
    ProjectsService,
    ItemsService,
    ApprovalFlowService,
    BudgetService,
  ],
})
export class ProjectDetailComponent {
  private router = inject(Router);
  private itemsService = inject(ItemsService);
  private dialogService = inject(MatDialog);
  private budgetService = inject(BudgetService);
  private approvalFlowService = inject(ApprovalFlowService);
  private activatedRoute = inject(ActivatedRoute);
  private loaderService = inject(LoaderService);
  private heroBarService = inject(HeroBarService);
  private projectId = computed(() =>
    this.activatedRoute.snapshot.paramMap.get('id')
  );
  private projectService = inject(ProjectsService);
  projectSignal$ = computed(() =>
    this.getProject(this.projectId()!).pipe(
      tap((project) => {
        this.project.set(project)
        this.heroBarService.setHeroBar({
          component: ProjectStepsOverviewComponent,
        });
      })
    )
  );
  project = signal<any>(null);

  tabs = computed(() => [
    {
      title: 'Detalhes',
      component: ProjectInfoComponent,
      data: { project: this.project() },
    },
    {
      title: 'Items',
      component: ProjectItemsComponent,
      data: {
        project: this.project(),
        items: this.itemsService.findAll(this.project().id),
      },
    },
    {
      title: 'Plano de Ação',
      component: ActionPlanComponent,
      data: { project: this.project() },
    },
    {
      title: 'Aprovação',
      component: ProjectApprovalComponent,
      data: {
        project: this.project(),
        approvals: this.approvalFlowService.getApprovalProject(
          this.project().id
        ),
      },
    },
    // {
    //   title: 'Comentários',
    //   component: ProjectInfoComponent,
    //   data: { project: this.project() },
    // },
  ]);

  get project$() {
    return this.projectSignal$();
  }

  constructor() {}

  getProject(id: string) {
    return this.projectService.getProject(this.projectId()!).pipe(
      tap((response) => {
        if (response.budget == null) this.budgetOpenDialog();
      })
    );
  }

  budgetOpenDialog() {
    let dialogRef = this.dialogService.open(BudgetUpsertDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const loader = this.loaderService.show();

      const [currency, amount] = result.amout.split('R$');

      const cleanedValue = amount.replace(/\./g, '').replace(',', '.');

      let amountNumber = parseFloat(cleanedValue);

      forkJoin([
        this.budgetService.create({
          project_id: +this.projectId()!,
          total_amount: amountNumber,
        }),
        this.projectService.patch({
          id: +this.projectId()!,
          budget: amountNumber,
        }),
      ]).subscribe(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.router.url]).then(() => {
              loader.hide();
            });
          });
      });
    });
  }
}
