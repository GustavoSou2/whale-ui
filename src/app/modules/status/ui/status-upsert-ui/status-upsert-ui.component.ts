import { CommonModule } from '@angular/common';
import { Component, Inject, inject, Injector } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';

@Component({
  selector: 'app-status-upsert-ui',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputCustomComponent,
    ButtonComponent,
    TextareaCustomComponent,
  ],
  templateUrl: './status-upsert-ui.component.html',
  styleUrl: './status-upsert-ui.component.scss',
})
export class StatusUpsertUiComponent {
  dialogRef = inject(MatDialogRef<StatusUpsertUiComponent>);
  fb = inject(FormBuilder);
  statusToEdit = inject(MAT_DIALOG_DATA);

  status = this.fb.group({
    id: [this.statusToEdit?.id ?? ''],
    name: [
      this.statusToEdit?.name ?? '',
      [Validators.required, Validators.minLength(3)],
    ],
    description: [this.statusToEdit?.description ?? '', [Validators.required]],
    color: [this.statusToEdit?.color ?? '', [Validators.required]],
  });

  constructor() {
    console.log(this.statusToEdit.isShowable);
    if (this.statusToEdit.isShowable) {
      this.status?.disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.status.value);
  }
}
