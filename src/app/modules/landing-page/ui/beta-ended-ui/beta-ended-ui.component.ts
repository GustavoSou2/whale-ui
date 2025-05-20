import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PreLaunchService } from '../../services/pre-launch/pre-launch.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-beta-ended-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputCustomComponent,
    ButtonComponent,
  ],
  templateUrl: './beta-ended-ui.component.html',
  styleUrl: './beta-ended-ui.component.scss',
  providers: [PreLaunchService],
})
export class BetaEndedUiComponent {
  dialogRef = inject(MatDialogRef<BetaEndedUiComponent>);
  fb = inject(FormBuilder);
  loader = inject(LoaderService);
  toastService = inject(ToastService);
  preLaunchService = inject(PreLaunchService);

  betaEndedForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    const betaEndedFormValue = this.betaEndedForm.value;
    const loaderRef = this.loader.show();
    this.preLaunchService
      .sendPreLaunch(<any>betaEndedFormValue)
      .pipe(
        tap(() => {
          this.toastService.addToast(
            'Sucesso',
            'Cadastro na lista de lançamento realizado com sucesso!'
          );
          loaderRef.hide();
          this.dialogRef.close(this.betaEndedForm.value);
          this.betaEndedForm.reset();
          this.dialogRef.close(this.betaEndedForm.value);
        }),
        catchError((error) => {
          loaderRef.hide();
          this.toastService.addToast(
            'Erro',
            error.error.message.includes('Email já cadastrado')
              ? 'Este email já foi cadastrado na nossa lista de espera!'
              : 'Ocorreu um erro ao enviar o email.'
          );
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
