import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'nav-ui',
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  templateUrl: './nav-ui.component.html',
  styleUrl: './nav-ui.component.scss',
})
export class NavUiComponent {}
