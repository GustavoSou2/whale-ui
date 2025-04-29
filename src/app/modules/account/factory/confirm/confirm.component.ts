import { Component, inject, OnInit } from '@angular/core';
import { ConfirmUiComponent } from '../../ui/confirm-ui/confirm-ui.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ConfirmUiComponent, CommonModule],
  template: `<confirm-ui></confirm-ui>`,
  providers: [AuthService],
})
export class ConfirmComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  loaderService = inject(LoaderService);
  authService = inject(AuthService);
  token: string | null = this.activatedRoute.snapshot.queryParams['token'];
  loader = this.loaderService.show();
  confirm$ = this.authService.confirm(<string>this.token).pipe(
      map((data) => {
        this.loader.hide();
      })
    ).subscribe((data) => {});

  ngOnInit(): void {
  }
}
