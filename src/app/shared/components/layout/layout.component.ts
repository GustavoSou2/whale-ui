import { Component, input } from '@angular/core';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  title = input<string>();
}
