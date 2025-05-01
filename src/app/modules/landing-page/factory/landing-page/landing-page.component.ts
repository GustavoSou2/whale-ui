import { Component, inject } from '@angular/core';
import { LandingPageUiComponent } from '../../ui/landing-page-ui/landing-page-ui.component';
import { MatDialog } from '@angular/material/dialog';
import { BetaEndedUiComponent } from '../../ui/beta-ended-ui/beta-ended-ui.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LandingPageUiComponent],
  template: `<landing-page-ui (callToAction)="toAction()" />`,
})
export class LandingPageComponent {
  dialogService = inject(MatDialog);
  isBeta = true;

  toAction() {
    if (this.isBeta) {
      this.openDialogEnded();
    }
  }

  openDialogEnded() {
    const dialogRef = this.dialogService.open(BetaEndedUiComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
