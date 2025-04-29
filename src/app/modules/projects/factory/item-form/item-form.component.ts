import { Component, inject, Inject, signal } from '@angular/core';
import { ItemFormUiComponent } from '../../ui/item-form-ui/item-form-ui.component';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ItemFormUiComponent, CommonModule],
  template: `<item-form-ui
    [form]="itemForm"
    (submit)="onSubmit($event)"
  ></item-form-ui>`,
})
export class ItemFormComponent {
  private dialogRef = inject(MatDialogRef<ItemFormComponent>);
  fb = inject(FormBuilder);

  projectId = signal(null);
  itemForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: { projectId: any }) {
    this.projectId.set(this.data.projectId);

    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      budget: [0, Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      project_id: [+this.projectId()!, Validators.required],
      responsible_user_id: ['', Validators.required],
    });
  }

  onSubmit($formValue: any) { 
    this.dialogRef.close($formValue);
  }
  
}
