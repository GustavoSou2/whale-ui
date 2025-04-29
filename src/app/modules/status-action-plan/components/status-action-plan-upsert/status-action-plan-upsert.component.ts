import { Component, inject } from '@angular/core';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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

  status = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    rank: ['', [Validators.required]],
    color: ['#546de5', [Validators.required]],
  });

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.status.value);
  }
}
