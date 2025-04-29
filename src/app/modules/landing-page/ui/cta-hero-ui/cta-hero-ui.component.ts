import { Component, output } from '@angular/core';

@Component({
  selector: 'cta-hero-ui',
  standalone: true,
  imports: [],
  templateUrl: './cta-hero-ui.component.html',
  styleUrl: './cta-hero-ui.component.scss'
})
export class CtaHeroUiComponent {
  callToEnded = output<boolean>();


  emitEnded() {
    this.callToEnded.emit(true);
  }
}
