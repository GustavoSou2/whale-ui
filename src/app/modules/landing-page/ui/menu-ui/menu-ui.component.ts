import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-ui',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './menu-ui.component.html',
  styleUrl: './menu-ui.component.scss',
})
export class MenuUiComponent {
  private router = inject(Router);
  menuOpen = false;

  redirectToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
      const offset = element.getBoundingClientRect().top + window.scrollY - 60; // compensa altura do menu
      window.scrollTo({ top: offset, behavior: 'smooth' });
      this.menuOpen = false;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  redirect(path: string) {}
}
