import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TapBarService {

  constructor() { }

  private currentRoute = new BehaviorSubject<any>(null);
  currentRoute$ = this.currentRoute.asObservable();

  setStateCurrentRoute(route: any) {
    this.currentRoute.next(route);
  }

  getCurrentRoute() {
    return this.currentRoute$;
  }
}
