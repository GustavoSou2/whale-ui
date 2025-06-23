import { Injectable, TemplateRef, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface HeroBar {
  component: Type<any>;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class HeroBarService {
  private heroBar = new BehaviorSubject<HeroBar | null>(null);
  heroBar$ = this.heroBar.asObservable();

  constructor() {}

  setHeroBar(heroBar: HeroBar) {
    this.heroBar.next(heroBar);
  }

  getHeroBar() {
    return this.heroBar$;
  }
}
