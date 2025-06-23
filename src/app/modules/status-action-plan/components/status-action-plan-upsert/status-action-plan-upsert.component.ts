import { Component, inject } from '@angular/core';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-action-plan-upsert',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputCustomComponent,
    ButtonComponent,
    TextareaCustomComponent,
  ],
  templateUrl: './status-action-plan-upsert.component.html',
  styleUrl: './status-action-plan-upsert.component.scss',
})
export class StatusActionPlanUpsertComponent {
  dialogRef = inject(MatDialogRef<StatusActionPlanUpsertComponent>);
  fb = inject(FormBuilder);
  statusToEdit = inject(MAT_DIALOG_DATA);

  status = this.fb.group({
    id: [this.statusToEdit?.id ?? null],
    name: [
      this.statusToEdit?.name ?? '',
      [Validators.required, Validators.minLength(3)],
    ],
    description: [this.statusToEdit?.description ?? '', [Validators.required]],
    color: [this.statusToEdit?.color ?? '#546de5', [Validators.required]],
  });

  constructor() {
    if (this.statusToEdit.isShowable) {
      this.status.disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.status.value);
  }
}
