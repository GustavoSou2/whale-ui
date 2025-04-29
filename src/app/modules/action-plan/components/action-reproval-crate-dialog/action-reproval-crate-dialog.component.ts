import { CommonModule } from '@angular/common';
import { Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-action-reproval-crate-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './action-reproval-crate-dialog.component.html',
  styleUrl: './action-reproval-crate-dialog.component.scss',
})
export class ActionReprovalCrateDialogComponent {
  dialogRef = inject(MatDialogRef<ActionReprovalCrateDialogComponent>);
  actionPlanDetail = signal({});
  previusStatus = signal({});

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.actionPlanDetail.set(this.data.action_plan);
  }

  get actionPlan() {
    return <any>this.actionPlanDetail();
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onClose() {
    this.dialogRef.close(this.actionPlan);
  }
}
