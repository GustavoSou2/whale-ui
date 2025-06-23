import { Component, inject, TemplateRef } from '@angular/core';
import { HeroBarService } from './service/hero-bar.service';
import {
  DynamicComponent,
  DynamicComponentInjectorToken,
  DynamicDirectivesModule,
  DynamicIoDirective,
  DynamicModule,
} from 'ng-dynamic-component';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hero-bar',
  standalone: true,
  imports: [CommonModule, DynamicModule, DynamicIoDirective],
  templateUrl: './hero-bar.component.html',
  styleUrl: './hero-bar.component.scss',
})
export class HeroBarComponent {
  private heroBarService = inject(HeroBarService);
  private cookieService = inject(CookieService);

  heroBar$ = this.heroBarService.getHeroBar();
  userstringfy = this.cookieService.get('user');

  verifyHeroIsTemplate(hero: any) {
    return hero instanceof TemplateRef;
  }

  get user() {
    return JSON.parse(this.userstringfy);
  }
}
