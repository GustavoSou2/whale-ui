import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ApprovalFlowStatusComponent } from '../approval-flow-status/approval-flow-status.component';
import { MatTooltipModule } from '@angular/material/tooltip';
export const ApprovalFlowEntityType = {
  action_plan: {
    name: 'Plano de Ação',
  },
}

@Component({
  selector: 'app-approval-flow-approval-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ApprovalFlowStatusComponent,
    MatTooltipModule,
  ],
  templateUrl: './approval-flow-approval-dialog.component.html',
  styleUrl: './approval-flow-approval-dialog.component.scss',
})
export class ApprovalFlowApprovalDialogComponent {
  private dialogRef = inject(MatDialogRef<ApprovalFlowApprovalDialogComponent>);

  ApprovalFlowEntityType: Record<string, any> = ApprovalFlowEntityType;

  get approvalItem() {
    return this.data;
  }

  get approvalStatus(): string {
    const { approved_by, rejected_by, deadline } = this.approvalItem;
    const now = new Date();

    if (rejected_by) return 'Reprovado';
    if (approved_by) return 'Aprovado';
    if (new Date(deadline) < now) return 'Atrasado';
    return 'Pendente';
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  get statusClass(): string {
    return this.approvalStatus.toLowerCase(); // usado na SCSS
  }

  onClose() {
    this.dialogRef.close();
  }

  onApprove() {
    this.dialogRef.close(true);
  }
}
