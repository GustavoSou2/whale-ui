import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { flatMap, map, tap } from 'rxjs';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago/time-ago.pipe';

function groupByApprovalStatus(data: any) {
  const groupedMap = data.reduce((acc: any, item: any) => {
    const status = item.approval_flow?.approval_status;
    const statusCode = status?.name_code || 'unknown';

    if (!acc[statusCode]) {
      acc[statusCode] = {
        approval_status: status || {
          name: 'Desconhecido',
          name_code: 'unknown',
          color: '#CCCCCC',
        },
        items: [],
      };
    }

    acc[statusCode].items.push(item);
    return acc;
  }, {});

  // Converte o objeto em array
  return Object.values(groupedMap);
}

@Component({
  selector: 'app-project-approval',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './project-approval.component.html',
  styleUrl: './project-approval.component.scss',
})
export class ProjectApprovalComponent {
  @Input() set data(value: any) {
    const project = value.project;
    const approvals$ = value.approvals;
    console.log(value);

    const approvalsTimeline = approvals$.pipe(
      map((approvals: any) =>
        approvals
          .sort(
            (a: any, b: any) =>
              new Date(a.approval_flow.created_at).getTime() -
              new Date(b.approval_flow.created_at).getTime()
          )
          .map((approval: any) => ({ ...approval, isCollapsed: true }))
      ),
      map(groupByApprovalStatus),
      tap(console.log)
    );
    this.project.set(project);
    this.approvals$.set(approvalsTimeline);
  }

  approvals$ = signal<any>(null);
  project = signal<any>(null);

  approval = {
    approval_status: {
      name: 'Aprovado',
      name_code: 'approved',
      color: '#A8E6CF',
    },
    items: [
      {
        target: {
          id: 7,
          action_plan_id: 8,
          target_id: 7,
          target_type: 'subitem',
          action_plan: {
            id: 8,
            project_id: 2,
            name: '[7093209] Plano de Ação - Remoção de parede (alvenaria leve)',
            description: 'Remoção de parede ',
            status_id: 8,
            company_id: 1,
            created_at: '2025-05-16T12:32:10.000Z',
            updated_at: '2025-05-30T09:19:03.000Z',
            responsible_user_id: 1,
            completed_at: null,
            action_type: 'execution',
            priority: 'low',
            notes: null,
          },
          execution_reports: [
            {
              id: 16,
              action_plan_target_id: 7,
              name: 'TESTE',
              description: 'TESTE',
              start_date: '2025-05-30T00:00:00.000Z',
              end_date: '2025-05-23T00:00:00.000Z',
              current_progress: '0',
              expected_progress: '0',
              revaluation_reason: null,
              created_at: '2025-05-30T12:15:44.000Z',
              updated_at: '2025-05-30T12:15:44.000Z',
              execution_history: [],
            },
            {
              id: 17,
              action_plan_target_id: 7,
              name: 'Teste',
              description: 'Teste',
              start_date: '2025-05-30T00:00:00.000Z',
              end_date: '2025-05-30T00:00:00.000Z',
              current_progress: '0',
              expected_progress: '0',
              revaluation_reason: null,
              created_at: '2025-05-30T12:16:12.000Z',
              updated_at: '2025-05-30T12:16:12.000Z',
              execution_history: [
                {
                  id: 20,
                  execution_report_id: 17,
                  date: '2025-05-30T00:00:00.000Z',
                  progress: '100',
                  notes: 'TESTE',
                  created_at: '2025-05-30T12:16:23.000Z',
                },
              ],
            },
            {
              id: 18,
              action_plan_target_id: 7,
              name: 'TESTE',
              description: 'TESTE',
              start_date: '2025-05-30T00:00:00.000Z',
              end_date: '2025-05-30T00:00:00.000Z',
              current_progress: '0',
              expected_progress: '0',
              revaluation_reason: null,
              created_at: '2025-05-30T12:17:56.000Z',
              updated_at: '2025-05-30T12:17:56.000Z',
              execution_history: [
                {
                  id: 21,
                  execution_report_id: 18,
                  date: '2025-05-30T00:00:00.000Z',
                  progress: '100',
                  notes: 'TESTE',
                  created_at: '2025-05-30T12:18:01.000Z',
                },
              ],
            },
          ],
        },
        subitem: {
          id: 7,
          name: 'Remoção de parede (alvenaria leve)',
          description: 'Remoção de parede ',
          category: 'labor',
          status: 'completed',
          quantity: '8',
          unit: 'm2',
          estimated_cost: '520',
          actual_cost: '473',
          start_date: '2025-05-14T00:00:00.000Z',
          end_date: '2025-05-22T00:00:00.000Z',
          responsible_user_id: 1,
          item_id: 3,
          created_at: '2025-05-15T12:53:13.000Z',
          updated_at: '2025-05-15T12:53:13.000Z',
        },
        has_approval_flow: true,
        approval_flow: {
          id: 1,
          entity_type: 'action_plan',
          entity_id: 7,
          parent_entity_id: null,
          current_status_id: 4,
          next_status_id: 6,
          approval_type: 'individual',
          responsible_id: 1,
          responsible_group_id: null,
          created_by: 1,
          approved_by: 1,
          approved_date: '2025-05-16T17:59:41.000Z',
          rejected_by: null,
          rejection_reason: null,
          deadline: '2025-05-21T12:42:20.000Z',
          approval_order: 1,
          approval_priority: 'medium',
          auto_approval: false,
          last_reminder_sent_at: null,
          created_at: '2025-05-16T12:42:20.000Z',
          company_id: 1,
          users: {
            id: 1,
            username: 'Gustavo Souza',
            email: 'contato@constru-max.com.br',
            password:
              '$2b$10$cpwa/Ppr.7t9OW3ANspZGuNBSyaDTjdwjE1GiuNBElAxZq4VPlMXi',
            role_id: 1,
            created_at: '2025-04-24T12:42:00.000Z',
            company_id: 1,
          },
          approved_by_user: {
            id: 1,
            username: 'Gustavo Souza',
            email: 'contato@constru-max.com.br',
            password:
              '$2b$10$cpwa/Ppr.7t9OW3ANspZGuNBSyaDTjdwjE1GiuNBElAxZq4VPlMXi',
            role_id: 1,
            created_at: '2025-04-24T12:42:00.000Z',
            company_id: 1,
          },
          rejected_by_user: null,
          approval_status: {
            name: 'Aprovado',
            name_code: 'approved',
            color: '#A8E6CF',
          },
          logged_user_is_approver: true,
        },
        isCollapsed: true,
      },
      {
        target: {
          id: 8,
          action_plan_id: 9,
          target_id: 8,
          target_type: 'subitem',
          action_plan: {
            id: 9,
            project_id: 2,
            name: '[8093415] Plano de Ação - Retirada de revestimento cerâmico antigo',
            description: 'Retirada de revestimento cerâmico antigo',
            status_id: 8,
            company_id: 1,
            created_at: '2025-05-16T12:34:15.000Z',
            updated_at: '2025-05-30T11:17:11.000Z',
            responsible_user_id: 1,
            completed_at: null,
            action_type: 'execution',
            priority: 'low',
            notes: null,
          },
          execution_reports: [
            {
              id: 19,
              action_plan_target_id: 8,
              name: 'TESTE',
              description: 'TESTE',
              start_date: '2025-05-30T00:00:00.000Z',
              end_date: '2025-05-30T00:00:00.000Z',
              current_progress: '0',
              expected_progress: '0',
              revaluation_reason: null,
              created_at: '2025-05-30T14:16:54.000Z',
              updated_at: '2025-05-30T14:16:54.000Z',
              execution_history: [
                {
                  id: 22,
                  execution_report_id: 19,
                  date: '2025-05-30T00:00:00.000Z',
                  progress: '100',
                  notes: 'TESTE',
                  created_at: '2025-05-30T14:16:59.000Z',
                },
              ],
            },
          ],
        },
        subitem: {
          id: 8,
          name: 'Retirada de revestimento cerâmico antigo',
          description: 'Retirada de revestimento cerâmico antigo',
          category: 'labor',
          status: 'in_progress',
          quantity: '20',
          unit: 'm2',
          estimated_cost: '800',
          actual_cost: '930',
          start_date: '2025-05-21T00:00:00.000Z',
          end_date: '2025-05-22T00:00:00.000Z',
          responsible_user_id: 1,
          item_id: 3,
          created_at: '2025-05-15T12:54:31.000Z',
          updated_at: '2025-05-15T12:54:31.000Z',
        },
        has_approval_flow: true,
        approval_flow: {
          id: 13,
          entity_type: 'action_plan',
          entity_id: 8,
          parent_entity_id: null,
          current_status_id: 4,
          next_status_id: 6,
          approval_type: 'individual',
          responsible_id: 1,
          responsible_group_id: null,
          created_by: 1,
          approved_by: 1,
          approved_date: '2025-05-16T19:03:27.000Z',
          rejected_by: null,
          rejection_reason: null,
          deadline: '2025-05-21T19:02:40.000Z',
          approval_order: 1,
          approval_priority: 'medium',
          auto_approval: false,
          last_reminder_sent_at: null,
          created_at: '2025-05-16T19:02:40.000Z',
          company_id: 1,
          users: {
            id: 1,
            username: 'Gustavo Souza',
            email: 'contato@constru-max.com.br',
            password:
              '$2b$10$cpwa/Ppr.7t9OW3ANspZGuNBSyaDTjdwjE1GiuNBElAxZq4VPlMXi',
            role_id: 1,
            created_at: '2025-04-24T12:42:00.000Z',
            company_id: 1,
          },
          approved_by_user: {
            id: 1,
            username: 'Gustavo Souza',
            email: 'contato@constru-max.com.br',
            password:
              '$2b$10$cpwa/Ppr.7t9OW3ANspZGuNBSyaDTjdwjE1GiuNBElAxZq4VPlMXi',
            role_id: 1,
            created_at: '2025-04-24T12:42:00.000Z',
            company_id: 1,
          },
          rejected_by_user: null,
          approval_status: {
            name: 'Aprovado',
            name_code: 'approved',
            color: '#A8E6CF',
          },
          logged_user_is_approver: true,
        },
        isCollapsed: true,
      },
    ],
  };
}

/**
 *
{
    "target": {
        "id": 4,
        "action_plan_id": 5,
        "target_id": 4,
        "target_type": "subitem",
        "action_plan": {
            "id": 5,
            "project_id": 1,
            "name": "[4091338] Plano de Ação - Aterramento e Compactação do Solo",
            "description": "Aterramento e compactação para garantir a estabilidade da fundação.",
            "status_id": 8,
            "company_id": 1,
            "created_at": "2025-04-26T12:13:38.000Z",
            "updated_at": "2025-05-27T15:26:54.000Z",
            "responsible_user_id": 2,
            "completed_at": null,
            "action_type": "execution",
            "priority": "low",
            "notes": null
        },
        "execution_reports": [
            {
                "id": 13,
                "action_plan_target_id": 4,
                "name": "Teste",
                "description": "teste",
                "start_date": "2025-05-27T00:00:00.000Z",
                "end_date": "2025-05-27T00:00:00.000Z",
                "current_progress": "0",
                "expected_progress": "0",
                "revaluation_reason": null,
                "created_at": "2025-05-27T17:14:29.000Z",
                "updated_at": "2025-05-27T17:14:29.000Z",
                "execution_history": [
                    {
                        "id": 16,
                        "execution_report_id": 13,
                        "date": "2025-05-27T00:00:00.000Z",
                        "progress": "100",
                        "notes": "TEste",
                        "created_at": "2025-05-27T17:14:38.000Z"
                    }
                ]
            }
        ]
    },
    "subitem": {
        "id": 4,
        "name": "Aterramento e Compactação do Solo",
        "description": "Aterramento e compactação para garantir a estabilidade da fundação.",
        "category": "labor",
        "status": "completed",
        "quantity": "1000",
        "unit": "m3",
        "estimated_cost": "90000",
        "actual_cost": "97000",
        "start_date": "2025-04-12T00:00:00.000Z",
        "end_date": "2025-04-14T00:00:00.000Z",
        "responsible_user_id": 2,
        "item_id": 1,
        "created_at": "2025-04-24T13:41:02.000Z",
        "updated_at": "2025-04-24T13:41:02.000Z"
    },
    "has_approval_flow": true,
    "approval_flow": {
        "id": 12,
        "entity_type": "action_plan",
        "entity_id": 4,
        "parent_entity_id": null,
        "current_status_id": 4,
        "next_status_id": 6,
        "approval_type": "individual",
        "responsible_id": 2,
        "responsible_group_id": null,
        "created_by": 1,
        "approved_by": 1,
        "approved_date": "2025-05-16T19:03:01.000Z",
        "rejected_by": null,
        "rejection_reason": null,
        "deadline": "2025-05-21T19:02:30.000Z",
        "approval_order": 1,
        "approval_priority": "medium",
        "auto_approval": false,
        "last_reminder_sent_at": null,
        "created_at": "2025-05-16T19:02:30.000Z",
        "company_id": 1
    },
    "isCollapsed": true
}
*/
