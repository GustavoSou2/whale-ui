import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { TipseenComponent } from './tipseen.component';

@Directive({
  selector: '[tipseen]',
  standalone: true,
})
export class TipseenDirective implements OnInit, OnDestroy {
  @Input('tipseen') tipseenData!: { title: string; message: string };
  private tipseenRef?: ComponentRef<TipseenComponent>;
  private globalClickListener?: () => void;

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this.tipseenData) {
      this.showTipseen();
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tipseenRef) {
      this.showTipseen();
    }
  }

  private showTipseen() {
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(TipseenComponent);
    this.tipseenRef = this.viewContainerRef.createComponent(factory);
    this.tipseenRef.instance.title = this.tipseenData.title;
    this.tipseenRef.instance.message = this.tipseenData.message;

    (this.tipseenRef.instance as any).destroySelf = () => this.closeTipseen();

    const { left, top, height, width } =
      this.el.nativeElement.getBoundingClientRect();
    const tooltipElement = this.tipseenRef.location.nativeElement;

    tooltipElement.style['z-index'] = 10;

    this.globalClickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        if (
          this.tipseenRef &&
          !this.el.nativeElement.contains(event.target) &&
          !tooltipElement.contains(event.target)
        ) {
          this.tipseenRef.instance.hide(); // Chama animação antes de destruir
        }
      }
    );
  }

  private closeTipseen() {
    this.tipseenRef?.destroy();
    (this.tipseenRef?.instance as TipseenComponent)?.hide();
    this.tipseenRef = undefined;

    if (this.globalClickListener) {
      this.globalClickListener();
      this.globalClickListener = undefined;
    }
  }

  ngOnDestroy() {
    this.closeTipseen();
  }
}
