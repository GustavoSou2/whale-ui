import { Component, inject, output } from '@angular/core';
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
  callToEnded = output<boolean>();
  menuOpen = false;

  redirectToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.menuOpen = false;
    }
  }
  
  emitEnded() {
    this.callToEnded.emit(true);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}
