import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-beta-ended-ui',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beta-ended-ui.component.html',
  styleUrl: './beta-ended-ui.component.scss',
})
export class BetaEndedUiComponent {
  dialogRef = inject(MatDialogRef<BetaEndedUiComponent>);
  name = '';
  email = '';

  onSubmit() {
    this.dialogRef.close({ name: this.name, email: this.email });
  }
}
