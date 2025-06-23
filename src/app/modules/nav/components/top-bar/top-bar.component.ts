import { Component, inject, Input } from '@angular/core';
import { TapBarService } from './subservice/tap-bar.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [CommonModule, AvatarComponent, ButtonComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  private tapBarService = inject(TapBarService);
  currentRoute$ = this.tapBarService.getCurrentRoute();
  @Input() set user(user: any) {
    this.currentUser = user;
  }

  currentUser: any;
}
