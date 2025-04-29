import { Component, inject, input, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { MatDialogRef } from '@angular/material/dialog';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { parseCurrencyToFloat } from '../../../../core/functions/parse-float.function';

@Component({
  selector: 'item-form-ui',
  standalone: true,
  imports: [
    ButtonComponent,
    InputCustomComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    TextareaCustomComponent,
  ],
  templateUrl: './item-form-ui.component.html',
  styleUrl: './item-form-ui.component.scss',
})
export class ItemFormUiComponent {
  form = input<FormGroup<any>>();
  submit = output<any>();

  get itemForm() {
    return <FormGroup<any>>this.form();
  }

  onCancel() {
    this.submit.emit(null);
  }

  onSubmit() {
    const formValue = this.itemForm.value;

    const budget = parseCurrencyToFloat(formValue.budget);

    this.submit.emit({
      ...formValue,
      start_date: new Date(formValue.start_date),
      end_date: new Date(formValue.end_date),
      budget: budget,
    });
  }
}
