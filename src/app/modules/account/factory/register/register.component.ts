import { Component, inject } from '@angular/core';
import { RegisterUiComponent } from '../../ui/register-ui/register-ui.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { AuthService, UserCompany } from '../../services/auth/auth.service';
import { PasswordValidator } from '../../validators/password/password.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterUiComponent, CommonModule],
  template: `
    <register-ui [form]="register" (submit)="onSubmit()"></register-ui>
  `,
  providers: [AuthService],
  animations: [
    trigger('slideVertical', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '500ms ease-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  loaderService = inject(LoaderService);
  router = inject(Router);

  register = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          PasswordValidator.passwordStrengthValidator(),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      document: ['', [Validators.required, Validators.minLength(14)]],
    },
    {
      validators: PasswordValidator.passwordsMatchValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  onSubmit() {
    let value: UserCompany = this.register.value as UserCompany;
    let loader = this.loaderService.show();

    this.authService.register(value).subscribe((authResponse) => {
      loader.hide();
      this.router.navigate(['register/confirm-account']);
    });
  }

  finalizeWizard() {
    console.log('Cadastro concluído!');
  }
}
