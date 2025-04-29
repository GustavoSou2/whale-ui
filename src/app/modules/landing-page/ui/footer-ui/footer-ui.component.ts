import { Component } from '@angular/core';

@Component({
  selector: 'footer-ui',
  standalone: true,
  imports: [],
  templateUrl: './footer-ui.component.html',
  styleUrl: './footer-ui.component.scss',
})
export class FooterUiComponent {
  currentYear: number = new Date().getFullYear();
}
