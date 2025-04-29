import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, output, signal } from '@angular/core';

@Component({
  selector: 'button-custom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input('');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  icon = input('');
  iconPosition = input<'left' | 'right'>('left');
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'primary' | 'secondary' | 'danger' | 'transparent'>(
    'primary'
  );
  clicked = output<any>();

  isLoading = signal<boolean>(false);

  handleClick(event: Event) {
    if (this.disabled() || this.isLoading()) return;
    this.clicked.emit(event);

    setTimeout(() => this.isLoading.set(false), 1000);
  }

  get buttonClass() {
    return `button-custom button-custom--${this.variant()} ${
      this.disabled() ? 'disabled' : ''
    } button-custom--${this.size()}`;
  }

  get iconClass() {
    return this.icon() || '';
  }
}
