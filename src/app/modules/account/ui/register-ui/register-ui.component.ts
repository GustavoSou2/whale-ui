import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PasswordValidator } from '../../validators/password/password.service';
import { errorAnimation } from '../../../../shared/animations/animations.global';

@Component({
  selector: 'register-ui',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCustomComponent,
    ButtonComponent,
  ],
  templateUrl: './register-ui.component.html',
  styleUrl: './register-ui.component.scss',
  animations: [errorAnimation],
})
export class RegisterUiComponent {
  @Input() form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  get passwordScore() {
    let password = this.form.get('password')?.value as string;
    return PasswordValidator.validatePasswordStrength(password);
  }

  get passwordHasData() {
    return !!this.form.get('password')?.value;
  }

  get confirmPasswordHasError() {
    return !!this.form.get('confirmPassword')?.value;
  }

  get passwordMedByScore() {
    let score = this.passwordScore;

    if (score > 0 && score <= 20) {
      return {
        color: '#ee5253',
        label: 'Sua senha é muito fraca',
      };
    } else if (score > 20 && score <= 40) {
      return {
        color: '#f78c72',
        label: 'Sua senha é fraca',
      };
    } else if (score > 40 && score <= 60) {
      return {
        color: '#f7d674',
        label: 'Sua senha é boa',
      };
    } else if (score > 60 && score <= 80) {
      return {
        color: '#6aa6c6',
        label: 'Sua senha é forte',
      };
    } else if (score > 80 && score <= 100) {
      return {
        color: '#10ac84',
        label: 'Sua senha é muito forte',
      };
    } else {
      return {
        color: '#c8cfd9',
        label: 'Digite sua senha',
      };
    }
  }
}
