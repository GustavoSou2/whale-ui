import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateService } from './core/handlers/state/state.service';
import { HttpClient } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { DialogHostDirective } from './shared/components/dialog/directive/dialog-host.directive';
import { DialogService } from './shared/components/dialog/dialog.service';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { StatusActionPlanService } from './modules/status-action-plan/services/status-action-plan/status-action-plan.service';
import { environment } from '../environment/environment';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    ToastComponent,
    DialogComponent,
    CommonModule,
    DialogHostDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('slideDialog', [
      state('closed', style({ right: '-100%' })),
      state('open', style({ right: '0' })),
      transition('closed <=> open', animate('300ms linear')),
    ]),
  ],
})
export class AppComponent implements AfterViewInit {
  private statusActionPlanService = inject(StatusActionPlanService);
  dialogService = inject(DialogService);
  eRef = inject(ElementRef);

  @ViewChild('dialog', { static: true }) dialogElement!: ElementRef;

  @ViewChild(DialogHostDirective, { static: true })
  dialogHost!: DialogHostDirective;

  dialogIsOpen$ = this.dialogService.isOpen$;

  dialogIsOpen = false;

  actionStatus$ = this.statusActionPlanService.loadActionStatus();

  ngAfterViewInit(): void {

    console.log(environment);
    console.log(routes);

    if (!this.dialogHost) {
      console.error('dialogHost não encontrado!');
      return;
    }

    this.dialogService.setViewContainerRef(this.dialogHost.viewContainerRef);

    this.dialogService.isOpen$.subscribe((isOpen) => {
      this.dialogIsOpen = isOpen;
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    this.dialogIsOpen = !this.dialogIsOpen;

    if (!this.dialogIsOpen) return;

    const clickedInside = this.dialogElement.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogService.close();
  }
}
