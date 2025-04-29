import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatDialogRef } from '@angular/material/dialog';
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

  status = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    color: ['#546de5', [Validators.required]],
  });

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.status.value);
  }
}
