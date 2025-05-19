import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UploaderComponent } from '../../../../shared/components/uploader/uploader.component';
import { FileManagerService } from '../../../../core/handlers/file-manager/file-manager.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
const documents = [
  {
    id: 1,
    name: 'Alvará de Construção',
    name_code: 'alvara_construcao',
    description:
      'Documento emitido pela prefeitura, autorizando o início da obra. Sem ele, a construção não pode iniciar legalmente.',
    is_required: true,
  },
  {
    id: 2,
    name: 'ART (Anotação de Responsabilidade Técnica)',
    name_code: 'art',
    description:
      'Documento assinado pelo engenheiro ou arquiteto responsável, atestando a responsabilidade técnica pela obra.',
    is_required: true,
  },
  {
    id: 3,
    name: 'Projeto Arquitetônico',
    name_code: 'projeto_arquitetonico',
    description:
      'Projeto detalhado da construção, aprovado pela prefeitura, que inclui plantas baixas, layouts e especificações.',
    is_required: true,
  },
  {
    id: 4,
    name: 'Memorial Descritivo',
    name_code: 'memorial_descritivo',
    description:
      'Documento técnico descrevendo os materiais e técnicas que serão usados na obra.',
    is_required: true,
  },
  {
    id: 7,
    name: 'CNPJ da Empresa Construtora',
    name_code: 'cnpj_empresa_construtora',
    description:
      'Cadastro da empresa responsável pela obra junto à Receita Federal.',
    is_required: true,
  },
  {
    id: 5,
    name: 'Alvará Sanitário',
    name_code: 'alvara_sanitario',
    description:
      'Licença exigida para garantir que a obra está em conformidade com normas sanitárias, especialmente em empreendimentos comerciais.',
    is_required: false,
  },
  {
    id: 6,
    name: 'Licença Ambiental',
    name_code: 'licenca_ambiental',
    description:
      'Licença necessária quando a obra impacta áreas ambientais sensíveis, como zonas de preservação.',
    is_required: false,
  },
  {
    id: 8,
    name: 'Registro de Incorporação',
    name_code: 'registro_incorporacao',
    description:
      'Documento necessário para projetos que envolvem unidades autônomas, como prédios de apartamentos.',
    is_required: false,
  },
  {
    id: 9,
    name: 'Ficha de Inscrição no Cadastro Imobiliário',
    name_code: 'inscricao_imobiliaria',
    description:
      'Inscrição obrigatória em algumas prefeituras, vinculando a obra ao cadastro imobiliário local.',
    is_required: false,
  },
  {
    id: 10,
    name: 'Licença de Instalação',
    name_code: 'licenca_instalacao',
    description:
      'Exigido para obras industriais e comerciais para garantir que a instalação de equipamentos segue normas de segurança.',
    is_required: false,
  },
  {
    id: 11,
    name: 'Estudo de Impacto de Vizinhança (EIV)',
    name_code: 'estudo_impacto_vizinhança',
    description:
      'Necessário para grandes empreendimentos que podem impactar a área circundante.',
    is_required: false,
  },
  {
    id: 12,
    name: 'Autorização de Uso de Solo',
    name_code: 'autorizacao_uso_solo',
    description:
      'Necessário para confirmar que o uso do solo no local da obra está de acordo com o zoneamento urbano.',
    is_required: false,
  },
  {
    id: 13,
    name: 'Laudo de Inspeção de Segurança',
    name_code: 'laudo_inspecao_seguranca',
    description:
      'Exigido para obras que envolvem reformas estruturais significativas, garantindo que a edificação está segura.',
    is_required: false,
  },
  {
    id: 14,
    name: 'Certificado de Conformidade de Equipamentos',
    name_code: 'certificado_conformidade_equipamentos',
    description:
      'Certificado que comprova que os equipamentos utilizados na obra estão em conformidade com as normas de segurança.',
    is_required: false,
  },
  {
    id: 15,
    name: 'Autorização para Movimentação de Terra',
    name_code: 'autorizacao_movimentacao_terra',
    description:
      'Autorização necessária para realizar movimentos de terra em áreas de risco ou que possam impactar o meio ambiente.',
    is_required: false,
  },
  {
    id: 16,
    name: 'Licença de Construção Temporária',
    name_code: 'licenca_construcao_temporaria',
    description:
      'Exigida para construções temporárias, como palcos e instalações para eventos.',
    is_required: false,
  },
  {
    id: 17,
    name: 'Seguro de Responsabilidade Civil',
    name_code: 'seguro_responsabilidade_civil',
    description:
      'Seguro opcional, mas recomendado, para cobrir danos durante a obra, incluindo acidentes com trabalhadores e terceiros.',
    is_required: false,
  },
];

@Component({
  selector: 'app-action-plan-validate-document-stage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    UploaderComponent,
    ButtonComponent,
  ],
  templateUrl: './action-plan-validate-document-stage.component.html',
  styleUrl: './action-plan-validate-document-stage.component.scss',
  animations: [
    trigger('collapseAnimation', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ActionPlanValidateDocumentStageComponent {
  private fb = inject(FormBuilder);
  private fileManager = inject(FileManagerService);
  private dialogRef = inject(
    MatDialogRef<ActionPlanValidateDocumentStageComponent>
  );
  actionPlan = {};
  documentsForm = this.fb.group({
    documents: this.fb.array([]),
  });

  documents = documents;

  get documentsFormArray() {
    return this.documentsForm.get('documents') as FormArray;
  }

  validateDocumentStatus(document: any) {
    if (!document.is_uploaded) {
      return {
        status: 'Aguardando envio',
        style: {
          color: '#353b48',
          background: '#353b4830',
          fill: '#353b48',
        },
        icon: 'fa-regular fa-clock',
      };
    } else {
      return {
        status: 'Aprovado',
        style: {
          color: '#10ac84',
          background: '#10ac8420',
          fill: '#10ac84',
        },
        icon: 'fa-solid fa-check',
      };
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    const documentsFormArray = <FormArray>this.documentsForm.get('documents');

    this.actionPlan = data;

    this.documents.forEach((document) => {
      const isRequered = document.is_required;

      const documentFormGroup = this.fb.group({
        ...document,
        is_collapsed: false,
        document_attachment: [null, isRequered ? [Validators.required] : null],
        document: [null, isRequered ? [Validators.required] : null],
        is_uploaded: false,
        is_approved: false,
      });

      documentsFormArray.push(documentFormGroup);
    });
  }

  setDocumentFormGroupIsCollapsed(documentControlIndex: number) {
    const documentFormGroup = this.documentsFormArray.at(
      documentControlIndex
    ) as FormGroup;
    const currentStatusIsCollapseOfDocumentFormGroup =
      documentFormGroup.get('is_collapsed')?.value;

    documentFormGroup
      .get('is_collapsed')
      ?.setValue(!currentStatusIsCollapseOfDocumentFormGroup);
  }

  onSingleFileChange(documentControlIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const documentFormGroup = this.documentsFormArray.at(
      documentControlIndex
    ) as FormGroup;
    
    if (input.files?.[0]) {
      this.fileManager.uploadSingle(input.files[0]).then(() => {
        const { single } = this.fileManager.fileValues;
        documentFormGroup.get('document')?.setValue(single);
        documentFormGroup.get('is_uploaded')?.setValue(true);
      });
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    const documentsFormValue = this.documentsFormArray.value;
    this.dialogRef.close(documentsFormValue);
  }
}
