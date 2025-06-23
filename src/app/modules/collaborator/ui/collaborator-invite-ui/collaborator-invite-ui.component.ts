import { Component, inject } from '@angular/core';
import { CollaboratorUiComponent } from '../collaborator-ui/collaborator-ui.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-collaborator-invite-ui',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputCustomComponent,
    ButtonComponent,
    SelectComponent,
  ],
  templateUrl: './collaborator-invite-ui.component.html',
  styleUrl: './collaborator-invite-ui.component.scss',
})
export class CollaboratorInviteUiComponent {
  dialogRef = inject(MatDialogRef<CollaboratorUiComponent>);
  fb = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA);

  get isEdit() {
    return !!this.data?.user;
  }

  client = this.fb.group({
    role: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    const collaborator = this.data?.user;

    if (this.isEdit) {
      this.client.get('email')?.setValidators([]);
      this.client.patchValue({ role: collaborator.role_id });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.client.value);
  }
}
