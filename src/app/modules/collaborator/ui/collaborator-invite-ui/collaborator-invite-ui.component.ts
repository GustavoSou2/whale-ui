import { Component, inject } from '@angular/core';
import { CollaboratorUiComponent } from '../collaborator-ui/collaborator-ui.component';
import { MatDialogRef } from '@angular/material/dialog';
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

  client = this.fb.group({
    role: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.client.value);
  }
}
