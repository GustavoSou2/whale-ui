import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-upsert-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, InputCustomComponent, ButtonComponent],
  templateUrl: './budget-upsert-dialog.component.html',
  styleUrl: './budget-upsert-dialog.component.scss',
})
export class BudgetUpsertDialogComponent {
  dialogRef = inject(MatDialogRef<BudgetUpsertDialogComponent>);
  submit = output<any>();

  fb = inject(FormBuilder);

  budget = this.fb.group({
    amout: ['', [Validators.required]],
  });

  onSubmit() {
    this.dialogRef.close(this.budget.value);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
