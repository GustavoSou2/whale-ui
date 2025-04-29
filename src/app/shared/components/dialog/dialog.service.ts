import {
  ApplicationRef,
  createComponent,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private viewContainerRef!: ViewContainerRef;
  private isOpen = new BehaviorSubject(false);
  private currentComponentRef: ComponentRef<any> | null = null;

  isOpen$ = this.isOpen.asObservable();

  get dialogState() {
    return this.isOpen.getValue();
  }

  constructor(private appRef: ApplicationRef, private injector: Injector) {}

  setViewContainerRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  open<T>(component: Type<T>, config: { data?: any } = {}) {
    if (!this.viewContainerRef) {
      throw new Error('Dialog host container (ViewContainerRef) not set.');
    }

    this.viewContainerRef.clear();

    const componentRef: any = this.viewContainerRef.createComponent(component, {
      environmentInjector: this.appRef.injector,
    });

    if (config.data && 'data' in componentRef.instance) {
      (componentRef.instance as any).data = config.data;
    }

    this.currentComponentRef = componentRef;

    // this.appRef.attachView(componentRef.hostView);
    this.isOpen.next(true);

    return {
      componentRef,
      close: () => this.close(),
    };
  }

  close() {
    if (this.currentComponentRef) {
      this.isOpen.next(false);

      setTimeout(() => {
        this.appRef.detachView(this.currentComponentRef!.hostView);
        this.currentComponentRef!.destroy();
        this.currentComponentRef = null;
      }, 500);
    }
  }
}
