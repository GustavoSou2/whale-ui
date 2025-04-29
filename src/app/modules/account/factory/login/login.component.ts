import { Component, inject } from '@angular/core';
import { LoginUiComponent } from '../../ui/login-ui/login-ui.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { StatusActionPlanService } from '../../../status-action-plan/services/status-action-plan/status-action-plan.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginUiComponent],
  template: `<login-ui [form]="login" (submit)="onSubmit()" />`,
  providers: [AuthService],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  loaderService = inject(LoaderService);
  cookieService = inject(CookieService);
  toastService = inject(ToastService);

  router = inject(Router);

  login = this.fb.group({
    alicerce_email: ['', [Validators.required, Validators.email]],
    alicerce_password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    let { alicerce_email: email, alicerce_password: password } =
      this.login.value;

    let loader = this.loaderService.show();

    this.authService
      .login(email!, password!)
      .subscribe(({ values: authResponse }: any) => {
        loader.hide();

        this.toastService.addToast('Sucesso!', 'Login realizado com sucesso!');

        this.cookieService.set('token', authResponse.access_token, 7);
        this.cookieService.set('user', JSON.stringify(authResponse.user), 7);

        this.router.navigate(['home']);
      });
  }
}
