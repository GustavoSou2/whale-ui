import { CommonModule } from '@angular/common';
import { Component, Inject, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { UploaderComponent } from '../../../../shared/components/uploader/uploader.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FileManagerService } from '../../../../core/handlers/file-manager/file-manager.service';
import { ActionPlanService } from '../../services/action-plan.service';
import { SubItemsService } from '../../../projects/services/sub-items/sub-items.service';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { parseCurrencyToFloat } from '../../../../core/functions/parse-float.function';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-action-plan-validate-budget-tab',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCustomComponent,
    TextareaCustomComponent,
    UploaderComponent,
    ButtonComponent,
  ],
  templateUrl: './action-plan-validate-budget-tab.component.html',
  styleUrl: './action-plan-validate-budget-tab.component.scss',
  providers: [SubItemsService],
})
export class ActionPlanValidateBudgetTabComponent {
  formBuilder = inject(FormBuilder);
  fileManager = inject(FileManagerService);
  dialogService = inject(MatDialogRef<ActionPlanValidateBudgetTabComponent>);
  subItemsService = inject(SubItemsService);
  tableDataSourceService = inject(TableDataSourceService);
  toastService = inject(ToastService);
  actionPlan: any;

  validateBudgetForm = this.formBuilder.group<any>({
    actual_cost: [0, [Validators.required, Validators.min(0)]],
    has_nf: [false],
    nf_attachment: [{}],
    attachment: [{}],
    reason_not_nf: [''],
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.actionPlan = data;
  }

  get hasNF() {
    return this.validateBudgetForm.get('has_nf')?.value;
  }

  onCancel() {
    this.validateBudgetForm.reset();
  }

  onApprove() {
    const validateBudget: any = this.validateBudgetForm.value;
    const actionPlan = this.actionPlan;

    const actualCost = parseCurrencyToFloat(validateBudget.actual_cost);

    if (actionPlan.target_type == 'subitem') {
      this.subItemsService
        .updateSubItem(actionPlan.target_id, {
          actual_cost: actualCost,
        })
        .pipe(
          tap((result) => {
            this.dialogService.close(result);
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

  onSingleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.fileManager.uploadSingle(input.files[0]).then(() => {
        const { single } = this.fileManager.fileValues;
        this.validateBudgetForm.get('attachment')?.setValue(single);
      });
    }
  }

  onMultipleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.fileManager.uploadMultiple(input.files).then(() => {
        const { multiple } = this.fileManager.fileValues;
        this.validateBudgetForm.get('attachment')?.setValue(multiple);
      });
    }
  }
}
