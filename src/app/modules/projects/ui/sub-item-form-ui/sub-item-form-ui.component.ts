import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { parseCurrencyToFloat } from '../../../../core/functions/parse-float.function';

@Component({
  selector: 'sub-item-form-ui',
  standalone: true,
  imports: [
    ButtonComponent,
    InputCustomComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    TextareaCustomComponent,
  ],
  templateUrl: './sub-item-form-ui.component.html',
  styleUrl: './sub-item-form-ui.component.scss',
})
export class SubItemFormUiComponent {
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

    const estimated_cost = parseCurrencyToFloat(formValue.unit_price) * (+formValue.quantity || 1);

    delete formValue.unit_price;

    this.submit.emit({
      ...formValue,
      start_date: new Date(formValue.start_date),
      end_date: new Date(formValue.end_date),
      quantity: formValue.quantity,
      estimated_cost: estimated_cost.toString(),
      actual_cost: "0",
    });
  }
}
