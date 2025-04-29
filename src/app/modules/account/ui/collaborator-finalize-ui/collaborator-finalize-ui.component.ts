import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { PasswordValidator } from '../../validators/password/password.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { decryptData } from '../../../../core/functions/cripto.function';


@Component({
  selector: 'collaborator-finalize-ui',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputCustomComponent,
    ButtonComponent,
  ],
  templateUrl: './collaborator-finalize-ui.component.html',
  styleUrl: './collaborator-finalize-ui.component.scss',
})
export class CollaboratorFinalizeUiComponent {
  @Input() form!: FormGroup;
  @Input() urlData!: any;
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

  onSubmit() {
    this.submit.emit(true);
  }
}
