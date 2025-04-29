import {
  Component,
  Inject,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { CommonModule, DatePipe } from '@angular/common';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { parseCurrencyToFloat } from '../../../../core/functions/parse-float.function';
import { SubItemsService } from '../../../projects/services/sub-items/sub-items.service';
import { StatusActionPlanService } from '../../../status-action-plan/services/status-action-plan/status-action-plan.service';
import { ActionPlanService } from '../../services/action-plan.service';
import { catchError, forkJoin, tap, throwError } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-action-approval-crate-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    InputCustomComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    TextareaCustomComponent,
  ],
  templateUrl: './action-approval-crate-dialog.component.html',
  styleUrl: './action-approval-crate-dialog.component.scss',
  providers: [DatePipe, SubItemsService, ActionPlanService],
})
export class ActionApprovalCrateDialogComponent {
  private dialogRef = inject(MatDialogRef<ActionApprovalCrateDialogComponent>);
  private statusActionPlanService = inject(StatusActionPlanService);
  private actionPlanService = inject(ActionPlanService);
  private subItemsService = inject(SubItemsService);
  private toastService = inject(ToastService);
  datePipe = inject(DatePipe);
  fb = inject(FormBuilder);
  subItemForm!: FormGroup;

  actionPlan = signal<any>({});

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    const subitem = this.data.target_detail;
    const { start_date, end_date, estimated_cost, quantity } = subitem;
    const estimatedCostParsed = parseCurrencyToFloat(estimated_cost);
    const unit_price = estimatedCostParsed / (quantity || 1);

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
    });

    this.subItemForm.patchValue({
      ...subitem,
      unit_price,
      start_date: this.datePipe.transform(start_date, 'yyyy-MM-dd'),
      end_date: this.datePipe.transform(end_date, 'yyyy-MM-dd'),
    });

    this.actionPlan.set(this.data);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    const formValue = this.subItemForm.value;

    const actionPlan = this.actionPlan();
    const unitPriceTypeof = typeof formValue.unit_price;
    const unitPriceIsString = unitPriceTypeof == 'string';
    const unitPrice = unitPriceIsString
      ? parseCurrencyToFloat(formValue.unit_price)
      : formValue.unit_price;

    const estimated_cost = unitPrice * (+formValue.quantity || 1);

    delete formValue.unit_price;

    const nextageStatus = this.statusActionPlanService.getNextActionStatus(
      actionPlan.status_id
    );

    const subItemPatch = {
      ...formValue,
      start_date: new Date(formValue.start_date),
      end_date: new Date(formValue.end_date),
      quantity: formValue.quantity,
      estimated_cost: estimated_cost.toString(),
      actual_cost: '0',
    };

    const actionPlanPatch = {
      status_id: nextageStatus.id,
      responsible_user_id: formValue.responsible_user_id,
    };

    forkJoin([
      this.subItemsService.updateSubItem(
        actionPlan.target_detail.id,
        subItemPatch
      ),
      this.actionPlanService.updateActionPlan(actionPlan.id, actionPlanPatch),
    ])
      .pipe(
        tap(() => {
          this.toastService.addToast(
            'Plano de ação',
            'Status do Plano de Ação Atualizado com sucesso!'
          );

          this.dialogRef.close(true);
        }),
        catchError((error) => {
          this.toastService.addToast(
            'Plano de ação',
            `Erro ao atualizar status do Plano de Ação: ${error}`
          );
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
