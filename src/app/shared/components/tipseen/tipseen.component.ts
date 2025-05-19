import { Component, HostBinding, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-tipseen',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './tipseen.component.html',
  styleUrl: './tipseen.component.scss',
  animations: [
    trigger('fadeInOut', [
      state(':enter', style({ opacity: 1, transform: 'scale(1)' })),
      state(':leave', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition(': => hidden', [animate('200ms ease-in-out')]),
      transition('hidden => visible', [animate('200ms ease-in-out')]),
    ]),
  ],
})
export class TipseenComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @HostBinding('@fadeInOut') animationState = 'visible';

  show() {
    this.animationState = 'visible';
  }

  hide() {
    this.animationState = 'hidden';
    setTimeout(() => this.onHidden(), 200);
  }

  private onHidden() {
    (this as any).destroySelf();
  }
}
