import { Component, output } from '@angular/core';
import { HeroUiComponent } from '../hero-ui/hero-ui.component';
import { ServicesUiComponent } from '../services-ui/services-ui.component';
import { DiffUiComponent } from '../diff-ui/diff-ui.component';
import { CtaUiComponent } from '../cta-ui/cta-ui.component';
import { SocialProofUiComponent } from '../social-proof-ui/social-proof-ui.component';
import { FooterUiComponent } from '../footer-ui/footer-ui.component';
import { MenuUiComponent } from '../menu-ui/menu-ui.component';
import { PricingPlansUiComponent } from '../pricing-plans-ui/pricing-plans-ui.component';
import { ContactUiComponent } from '../contact-ui/contact-ui.component';
import { FaqUiComponent } from '../faq-ui/faq-ui.component';
import { CtaHeroUiComponent } from '../cta-hero-ui/cta-hero-ui.component';

@Component({
  selector: 'landing-page-ui',
  standalone: true,
  imports: [
    HeroUiComponent,
    ServicesUiComponent,
    DiffUiComponent,
    CtaUiComponent,
    SocialProofUiComponent,
    FooterUiComponent,
    MenuUiComponent,
    PricingPlansUiComponent,
    ContactUiComponent,
    FaqUiComponent,
    CtaHeroUiComponent,
  ],
  templateUrl: './landing-page-ui.component.html',
  styleUrl: './landing-page-ui.component.scss',
})
export class LandingPageUiComponent {
  callToAction = output<boolean>();

  emitCallToAction() {
    this.callToAction.emit(true);
  }
}
