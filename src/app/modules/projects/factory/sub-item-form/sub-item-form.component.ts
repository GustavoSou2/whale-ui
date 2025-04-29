import { Component, Inject, inject, signal } from '@angular/core';
import { SubItemFormUiComponent } from '../../ui/sub-item-form-ui/sub-item-form-ui.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-item-form',
  standalone: true,
  imports: [SubItemFormUiComponent, CommonModule],
  template: `<sub-item-form-ui
    [form]="subItemForm"
    (submit)="onSubmit($event)"
  ></sub-item-form-ui>`,
})
export class SubItemFormComponent {
  private dialogRef = inject(MatDialogRef<SubItemFormComponent>);
  fb = inject(FormBuilder);

  itemId = signal(null);
  subItemForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: { itemId: any }) {
    this.itemId.set(this.data.itemId);

    this.subItemForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: [null, [Validators.required]],
      unit_price: [0.0, [Validators.required, Validators.min(0)]],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      responsible_user_id: [null, Validators.required],
      item_id: [+this.itemId()!, Validators.required],
    });
  }

  onSubmit($formValue: any) {
    this.dialogRef.close($formValue);
  }
}
