import { Component, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'cta-ui',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './cta-ui.component.html',
  styleUrl: './cta-ui.component.scss',
})
export class CtaUiComponent {
  callToEnded = output<boolean>();

  emitEnded() {
    this.callToEnded.emit(true);
  }
}
