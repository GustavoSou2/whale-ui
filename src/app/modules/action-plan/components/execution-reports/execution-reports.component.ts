import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Inject,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ExecutionReportsService } from './services/reports/execution-reports.service';
import { tap } from 'rxjs';
import { TableDataSourceService } from '../../../../shared/components/table/table.service';
import { UploaderComponent } from '../../../../shared/components/uploader/uploader.component';
import { FileManagerService } from '../../../../core/handlers/file-manager/file-manager.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ExecutionHistoryService } from './services/history/execution-history.service';
import { DateDiffPipe } from '../../../../shared/pipes/date-diff/date-diff.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';

interface ExecutionReport {
  id?: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

interface ExecutionHistory {
  id?: number;
  execution_report_id?: number;
  date?: string;
  progress?: string;
  notes?: string;
  documents?: any;
}

interface ExecutionReportMenu {
  id: number;
  name: string;
  icon: string;
  progress: any;
  templateRef: TemplateRef<any>;
  context: any;
}

/**
 * Function to calculate the progress of the report
 *
 * @param start Start date of the report
 * @param end End date of the report
 * @param current Current date of send history
 * @returns
 */
function calculateProgress(start: Date, end: Date, current: Date): number {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const currentTime = new Date(current).getTime();

  const totalDuration = endTime - startTime;
  const elapsed = currentTime - startTime;

  if (totalDuration === 0) {
    return currentTime === startTime ? 100 : 0;
  }

  const progress = (elapsed / totalDuration) * 100;

  return +Math.min(Math.max(progress, 0), 100).toFixed(2);
}

@Component({
  selector: 'app-execution-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCustomComponent,
    TextareaCustomComponent,
    ButtonComponent,
    MatChipsModule,
    UploaderComponent,
    DateDiffPipe,
    MatTooltipModule,
  ],
  templateUrl: './execution-reports.component.html',
  styleUrl: './execution-reports.component.scss',
  providers: [
    ExecutionReportsService,
    TableDataSourceService,
    ExecutionHistoryService,
    DatePipe,
  ],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('collapseAnimation', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ExecutionReportsComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ExecutionReportsComponent>);
  private executionReportsService = inject(ExecutionReportsService);
  private executionHistoryService = inject(ExecutionHistoryService);
  private tableDataSourceService = inject(TableDataSourceService);
  private datePipe = inject(DatePipe);
  private fileManager = inject(FileManagerService);
  @ViewChild('executionReportDetailRef', { static: true })
  executionReportDetailRef!: TemplateRef<any>;

  templateConfig = signal<any>(null);
  allHistoryHasCompleted = signal(false);

  reportForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
  });

  executionHistoryForm: FormGroup = this.fb.group({
    date: [
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      Validators.required,
    ],
    notes: [''],
    document: [{}],
    document_attachment: [{}],
  });

  executionReportsMenu: FormGroup = this.fb.group({
    reports: this.fb.array([]),
  });

  isShowExecutionHistoryForm = signal(false);

  toggleExecutionHistoryFormState() {
    const actualState = this.isShowExecutionHistoryForm();
    this.isShowExecutionHistoryForm.set(!actualState);
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    let executionReports = this.data.execution_reports;

    executionReports.forEach((report: any) => {
      report.progress = this.getExecutionReportProgress(
        report.execution_history
      );

      const reportControl = {
        id: report.id,
        name: report.name,
        progress: report.progress,
        icon: 'fa-solid fa-arrow-trend-up',
        templateRef: this.executionReportDetailRef,
        context: { report },
      };

      const reportFormControl = this.fb.group(reportControl);

      const reportsFormArray = this.executionReportsMenu.get(
        'reports'
      ) as FormArray;

      reportsFormArray.push(reportFormControl);
    });
  }

  get reportsFormArray() {
    return this.executionReportsMenu.get('reports') as FormArray;
  }

  onSingleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.fileManager.uploadSingle(input.files[0]).then(() => {
        const { single } = this.fileManager.fileValues;

        this.executionHistoryForm.get('document')?.setValue(single);
      });
    }
  }

  get actionPlan() {
    return this.data;
  }

  get allExecutionReportsIsCompleted() {
    const reports = this.reportsFormArray.value;

    return (
      reports.every((report: any) => +report.progress === 100) &&
      reports.length > 0
    );
  }

  newExecutionReport() {
    const reportFormValue = this.reportForm.value;

    this.executionReportsService
      .createExecutionReport({
        ...reportFormValue,
        start_date: new Date(reportFormValue.start_date),
        end_date: new Date(reportFormValue.end_date),
        action_plan_target_id: this.actionPlan.target_id,
      })
      .pipe(
        tap(({ values: executionReport }: any) => {
          this.reportForm.reset();
          this.tableDataSourceService.reload();

          const reportsFormArray = this.reportsFormArray;

          console.log(executionReport);

          const newReport = {
            id: executionReport.id,
            name: executionReport.name,
            progress: executionReport.progress,
            icon: 'fa-solid fa-arrow-trend-up',
            templateRef: this.executionReportDetailRef,
            context: { report: { ...executionReport, execution_history: [] } },
          };

          const newReportGroup = this.fb.group(newReport);

          reportsFormArray.push(newReportGroup);
        })
      )
      .subscribe();
  }

  switchTemplateToShow(templateRef: TemplateRef<any>, context: any) {
    this.templateConfig.set({ templateRef, context });
  }

  createHistory(report: any) {
    const {
      date: historyDate,
      document_attachment,
      document,
      ...history
    } = this.executionHistoryForm.value;

    const individualHistoryProgress = calculateProgress(
      report.start_date,
      report.end_date,
      historyDate
    );

    const executionHistory = {
      ...history,
      progress: individualHistoryProgress,
      date: new Date(historyDate),
      execution_report_id: report.id,
    };

    this.executionHistoryService
      .createExecutionHistory(executionHistory)
      .pipe(
        tap(({ values: executionHistory }: any) => {
          this.executionHistoryForm.reset();
          this.tableDataSourceService.reload();

          report.execution_history.push(executionHistory);

          const reportsFormArray = this.reportsFormArray;

          const reportIndexOf = reportsFormArray.value.findIndex(
            (r: any) => r.id === report.id
          );

          const resportNewProgress = this.getExecutionReportProgress(
            report.execution_history
          );

          console.log(reportsFormArray);
          console.log(reportIndexOf);

          reportsFormArray.at(reportIndexOf)?.patchValue({
            progress: resportNewProgress,
          });
        })
      )
      .subscribe();
  }

  getExecutionReportProgress(histories: ExecutionHistory[]): number {
    if (!histories.length) return 0;

    const latest = histories.reduce((latest: any, h: any) =>
      new Date(h.date) > new Date(latest.date) ? h : latest
    );

    return Math.min(+latest.progress!, 100);
  }

  onClose() {
    this.dialogRef.close();
  }

  onFinishExecution() {
    this.dialogRef.close(this.actionPlan);
  }
}
