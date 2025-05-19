import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

function allRequiredCheckedValidator(
  control: AbstractControl
): ValidationErrors | null {
  const formArray = control as FormArray;

  const hasUnCheckedRequired = formArray.controls.some((ctrl) => {
    const isRequired = ctrl.get('is_required')?.value;
    const isChecked = ctrl.get('is_checked')?.value;
    return isRequired && !isChecked;
  });

  return hasUnCheckedRequired ? { requiredItemsUnchecked: true } : null;
}

@Component({
  selector: 'app-action-plan-validate-checklist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './action-plan-validate-checklist.component.html',
  styleUrl: './action-plan-validate-checklist.component.scss',
})
export class ActionPlanValidateChecklistComponent {
  private dialogRef = inject(
    MatDialogRef<ActionPlanValidateChecklistComponent>
  );
  private fb = inject(FormBuilder) as FormBuilder;
  subitem!: any;
  checklistForm: FormGroup = this.fb.group({
    checklist: this.fb.array([], [allRequiredCheckedValidator]),
  });

  private checklistTemplates: any = {
    materials: [
      {
        id: 1,
        name: 'Conferir especificações técnicas',
        name_code: 'material_spec_check',
        description: 'Material está conforme planta ou memorial descritivo?',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 2,
        name: 'Verificar quantidade recebida',
        name_code: 'material_qty_check',
        description: 'A quantidade recebida confere com o pedido?',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 3,
        name: 'Avaliar condições do material (visuais e funcionais)',
        name_code: 'material_condition_check',
        description: 'Sem avarias, rachaduras, danos ou má qualidade',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 4,
        name: 'Registrar nota fiscal e fornecedor',
        name_code: 'material_invoice_register',
        description: 'NF e fornecedor arquivados',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 5,
        name: 'Validar armazenamento adequado',
        name_code: 'material_storage',
        description: 'Protegido contra umidade e exposição',
        is_required: false,
        is_approved: false,
        is_checked: false,
      },
    ],
    labor: [
      {
        id: 6,
        name: 'Verificar documentação contratual',
        name_code: 'labor_contract_check',
        description: 'Contrato assinado ou RPA emitido',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 7,
        name: 'Conferir qualificação técnica',
        name_code: 'labor_certification_check',
        description: 'Profissional habilitado para a atividade',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 8,
        name: 'Registrar entrega de EPI',
        name_code: 'labor_epi_delivery',
        description: 'Registro assinado com data e tipo de EPI',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 9,
        name: 'Realizar integração de segurança',
        name_code: 'labor_safety_training',
        description: 'Treinamento com normas da obra',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 10,
        name: 'Delegar responsável técnico/supervisão',
        name_code: 'labor_supervisor_assigned',
        description: 'Pessoa de referência atribuída',
        is_required: false,
        is_approved: false,
        is_checked: false,
      },
    ],
    other: [
      {
        id: 16,
        name: 'Verificar contrato/documento de autorização',
        name_code: 'other_doc_auth',
        description: 'Atividade está autorizada com contrato/formalização?',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 17,
        name: 'Checar compatibilidade com outras etapas da obra',
        name_code: 'other_dependency_check',
        description: 'Não interfere ou depende de outra etapa não finalizada?',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 18,
        name: 'Registrar responsável pela tarefa/serviço',
        name_code: 'other_responsible_assigned',
        description: 'Pessoa responsável pelo andamento dessa atividade',
        is_required: false,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 19,
        name: 'Validar impactos no orçamento',
        name_code: 'other_budget_impact',
        description: 'Atividade está dentro do previsto no orçamento?',
        is_required: false,
        is_approved: false,
        is_checked: false,
      },
    ],
    equipament: [
      {
        id: 11,
        name: 'Checar certificado de inspeção ou licenciamento',
        name_code: 'equip_cert_check',
        description: 'Validade do equipamento e/ou contrato de locação',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 12,
        name: 'Testar funcionamento em ambiente controlado',
        name_code: 'equip_functional_test',
        description: 'Funcionamento validado antes de operar',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 13,
        name: 'Verificar plano de manutenção preventiva',
        name_code: 'equip_maintenance_plan',
        description: 'Planejamento de manutenção está em dia?',
        is_required: false,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 14,
        name: 'Confirmar operador qualificado',
        name_code: 'equip_operator_check',
        description: 'Responsável habilitado para operar o equipamento',
        is_required: true,
        is_approved: false,
        is_checked: false,
      },
      {
        id: 15,
        name: 'Verificar EPIs específicos exigidos para operação',
        name_code: 'equip_epi_check',
        description: 'Exemplo: abafadores, luvas, etc.',
        is_required: false,
        is_approved: false,
        is_checked: false,
      },
    ],
  };

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.subitem = data;
    const template = this.checklistTemplates[this.subitem.category] || [];

    const formArray = this.checklistForm.get('checklist') as FormArray;

    template.forEach((item: any) => {
      const control = {
        ...item,
      };

      formArray.push(this.fb.group(control));
    });
  }

  get checklistFormArray(): FormArray {
    return this.checklistForm.get('checklist') as FormArray;
  }

  getFormValue() {
    return this.checklistForm.value.checklist;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    const checklistFormValue = this.checklistFormArray.value;
    
    this.dialogRef.close(checklistFormValue);
  }

  onEdit(index: number, stateOfEdit: boolean) {
    const item = this.checklistFormArray.controls[index] as FormGroup;
    item.get('is_checked')?.setValue(stateOfEdit);
  }
}
