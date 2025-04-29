import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ConfirmAccountUiComponent } from '../../ui/confirm-account-ui/confirm-account-ui.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-account',
  standalone: true,
  imports: [ConfirmAccountUiComponent, CommonModule],
  template: `<confirm-account-ui></confirm-account-ui>`,
})
export class ConfirmAccountComponent {
}
