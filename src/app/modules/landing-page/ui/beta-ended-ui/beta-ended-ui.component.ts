import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-beta-ended-ui',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './beta-ended-ui.component.html',
  styleUrl: './beta-ended-ui.component.scss',
})
export class BetaEndedUiComponent {
  dialogRef = inject(MatDialogRef<BetaEndedUiComponent>);
  fb = inject(FormBuilder);
  betaEndedForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.dialogRef.close(this.betaEndedForm.value);
  }
}
