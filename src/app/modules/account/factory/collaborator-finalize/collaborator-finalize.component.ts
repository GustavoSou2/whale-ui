import { Component, inject } from '@angular/core';
import { CollaboratorFinalizeUiComponent } from '../../ui/collaborator-finalize-ui/collaborator-finalize-ui.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/password/password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptData } from '../../../../core/functions/cripto.function';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-collaborator-finalize',
  standalone: true,
  imports: [CollaboratorFinalizeUiComponent],
  template: `<collaborator-finalize-ui
    [form]="form"
    [urlData]="urlData"
    (submit)="onSubmit()"
  ></collaborator-finalize-ui>`,
  providers: [AuthService],
})
export class CollaboratorFinalizeComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastService);

  token = this.activedRoute.snapshot.queryParams['token'];
  urlEncriptoData = this.activedRoute.snapshot.queryParams['data'];
  urlData: any = decryptData(decodeURIComponent(this.urlEncriptoData));

  form!: FormGroup;

  constructor() {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            PasswordValidator.passwordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: PasswordValidator.passwordsMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  onSubmit() {
    const { username, password } = this.form.value;

    this.authService
      .collaboratorFinalize({ token: this.token, username, password })
      .subscribe((status) => {
        this.toastService.addToast(
          'success',
          'Seu cadastro foi finalizado com sucesso. Faça login...'
        );
        this.router.navigate(['login']);
      });
  }
}
