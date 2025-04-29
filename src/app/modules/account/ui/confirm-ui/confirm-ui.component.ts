import { Component, inject, Input, signal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'confirm-ui',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './confirm-ui.component.html',
  styleUrl: './confirm-ui.component.scss',
})
export class ConfirmUiComponent {
  router = inject(Router);

 

  hasToken = signal<boolean>(false);
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
