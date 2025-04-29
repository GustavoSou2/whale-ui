import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, Signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { single } from 'rxjs';

@Component({
  selector: 'confirm-account-ui',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './confirm-account-ui.component.html',
  styleUrl: './confirm-account-ui.component.scss',
})
export class  ConfirmAccountUiComponent {
  router = inject(Router);

  email: string = 'examplo@gmail';
  timer = signal(10);
  isResendEnabled = signal(false);

  constructor() {
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.timer() > 0) {
        this.timer.set(this.timer() - 1);
      } else {
        this.isResendEnabled.set(true);
        clearInterval(interval);
      }
    }, 1000);
  }

  resendEmail() {
    this.isResendEnabled.set(false);
    this.timer.set(300);
    this.startCountdown();
    console.log('Reenviando e-mail para:', this.email);
  }

  logIn() {
    this.router.navigate(['/login']);
  }
}
