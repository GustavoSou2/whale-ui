import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  data = inject(MAT_DIALOG_DATA);

  constructor() {
    const role = this.data?.role;

    if (!!role?.name) {
      this.role.patchValue({ role: role?.name });
    }

    if (this.data?.isShowable) {
      this.role.disable();
    }
  }

  role = this.fb.group({
    role: ['', [Validators.required, Validators.minLength(2)]],
  });

  get dialogTitle() {
    const role = this.data?.role;
    const isShowable = this.data?.isShowable;

    if (role && isShowable) return `Detalhes da Equipe`;
    else if (role && !isShowable) return `Editar Equipe`;
    else {
      return 'Nova Equipe';
    }
  }

  get isShowable() {
    const isShowable = this.data?.isShowable;

    return isShowable || false;
  }

  get hasRole() {
    const role = this.data?.role;

    console.log(role);
    return !!role;
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.role.value);
  }
}
