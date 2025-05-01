import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  private deviceType$ = new BehaviorSubject<DeviceType>(this.getDeviceType());

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(200), startWith(null))
        .subscribe(() => {
          const newType = this.getDeviceType();
          if (newType !== this.deviceType$.value) {
            this.ngZone.run(() => this.deviceType$.next(newType));
          }
        });
    });
  }

  getDeviceTypeObservable(): Observable<DeviceType> {
    return this.deviceType$.asObservable();
  }

  getCurrentDeviceType(): DeviceType {
    return this.deviceType$.value;
  }

  private getDeviceType(): DeviceType {
    const width = window.innerWidth;

    if (width <= 767) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }
}
