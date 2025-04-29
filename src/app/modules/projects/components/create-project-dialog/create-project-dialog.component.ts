import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputCustomComponent,
    ButtonComponent,
    TextareaCustomComponent,
    SelectComponent,
  ],
  templateUrl: './create-project-dialog.component.html',
  styleUrl: './create-project-dialog.component.scss',
})
export class CreateProjectDialogComponent {
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<CreateProjectDialogComponent>);

  project = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    client_id: ['', [Validators.required]],
    status: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    init_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    city: [''],
    state: [''],
    country: [''],
    zip_code: [''],
    neighborhood: [''],
    street: [''],
    number: [''],
  });

  onSubmit() {
    this.dialogRef.close(this.project.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
