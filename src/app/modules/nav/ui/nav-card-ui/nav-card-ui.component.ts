import { Component, input } from '@angular/core';
import { Module } from '../../factory/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-card-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-card-ui.component.html',
  styleUrl: './nav-card-ui.component.scss',
})
export class NavCardUiComponent {
  module = input.required<Module>();
  size = input<'sm' | 'md' | 'lg'>('md');

  get icon() {
    return this.module().icon;
  }

  get title() {
    return this.module().title;
  }

  get defaultModuleColor() {
    return this.module().colorDefault;
  }
}
