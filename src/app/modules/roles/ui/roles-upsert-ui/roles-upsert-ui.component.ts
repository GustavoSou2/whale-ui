import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-roles-upsert-ui',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputCustomComponent,
    ButtonComponent,
  ],
  templateUrl: './roles-upsert-ui.component.html',
  styleUrl: './roles-upsert-ui.component.scss',
})
export class RolesUpsertUiComponent {
  dialogRef = inject(MatDialogRef<RolesUpsertUiComponent>);
  fb = inject(FormBuilder);

  role = this.fb.group({
    role: ['', [Validators.required, Validators.minLength(3)]],
  });

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.role.value);
  }
}
