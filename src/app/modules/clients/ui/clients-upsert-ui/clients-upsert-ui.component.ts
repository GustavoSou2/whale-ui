import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { MatDialogRef } from '@angular/material/dialog';

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

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.client.value);
  }
}
