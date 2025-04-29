import { Component, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'hero-ui',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero-ui.component.html',
  styleUrl: './hero-ui.component.scss',
})
export class HeroUiComponent {
  callToEnded = output<boolean>();

  emitEnded() {
    this.callToEnded.emit(true);
  }
}
