import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export class PasswordValidator {
  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value || '';

      let score = 0;
      if (password.length >= 8) score += 20;
      if (password.length >= 12) score += 10;
      if (/[A-Z]/.test(password)) score += 20;
      if (/[a-z]/.test(password)) score += 20;
      if (/[0-9]/.test(password)) score += 20;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10;

      return score >= 60 ? null : { weakPassword: { score } };
    };
  }

  static validatePasswordStrength(password: string): number {
    let score = 0;

    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10;

    return score;
  }

  static passwordsMatchValidator(
    passwordKey: string,
    confirmPasswordKey: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const group = formGroup as FormGroup;
      const password = group.controls[passwordKey]?.value;
      const confirmPassword = group.controls[confirmPasswordKey]?.value;

      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }
}
