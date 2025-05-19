import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CATEGORY_DICTIONARY } from '../../../../core/dictionaries/category.dict';
import { STATUS_DICTIONARY } from '../../../../core/dictionaries/status.dict';
import { ActionPlanStatusComponent } from '../action-plan-status/action-plan-status.component';
import { ActionStatusComponent } from '../action-staus/action-staus.component';
import { DynamicTabsComponent } from '../../../../shared/components/dynamic-tabs/dynamic-tabs.component';
import { ActionPlanValidateBudgetTabComponent } from '../action-plan-validate-budget-tab/action-plan-validate-budget-tab.component';
import { CommentsComponent } from '../../../../shared/components/comments/comments.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-plan-detail',
  standalone: true,
  imports: [CommonModule, ActionStatusComponent, DynamicTabsComponent, ButtonComponent],
  templateUrl: './action-plan-detail.component.html',
  styleUrl: './action-plan-detail.component.scss',
})
export class ActionPlanDetailComponent implements OnInit {
  @Input() data!: any;

  private router = inject(Router)

  CATEGORY_DICTIONARY = CATEGORY_DICTIONARY;
  STATUS_DICTIONARY = STATUS_DICTIONARY;

  get actualCost() {
    return (
      this.data.subitems?.reduce((acc: number, subitem: any) => {
        return acc + +subitem.estimated_cost;
      }, 0) || 0
    );
  }

  get actionPlan() {
    return this.data?.action_plan;
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  get actionPlanStatusName() {
    return this.data.action_plan?.action_plan_status?.name;
  }

  createDynamicTabs(actionPlan: any) {
    return [
      {
        title: 'Comentários',
        component: CommentsComponent,
        data: { bgDetail: 'white' },
        outputs: {
          event: (res: any) => {
            console.log('Evento A:', res);
          },
        },
      },
    ];
  }

  directToApproval(approvalFlow: any) {
    this.router.navigate([`/approval-flow/${approvalFlow.id}`]);
  }
}
