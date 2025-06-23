import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clients-upsert-ui',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputCustomComponent,
    ButtonComponent,
  ],
  templateUrl: './clients-upsert-ui.component.html',
  styleUrl: './clients-upsert-ui.component.scss',
})
export class ClientsUpsertUiComponent {
  dialogRef = inject(MatDialogRef<ClientsUpsertUiComponent>);
  fb = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA);

  get isView() {
    return this.data?.isView || false;
  }

  get dialogTitle() {
    if (this.isView && this.data?.client) {
      return `Detalhes do Cliente`;
    } else if (!this.isView && this.data?.client) {
      return `Editar Cliente`;
    } else {
      return `Novo Cliente`;
    }
  }

  client = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(14)]],
    city: [''],
    state: [''],
    country: [''],
    postal_code: [''],
    neighborhood: [''],
    street: [''],
    number: [''],
    complement: [''],
  });

  constructor() {
    if (this.data?.client) {
      this.client.patchValue(this.data.client);
    }

    if (this.isView) {
      this.client.disable();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.client.value);
  }
}
