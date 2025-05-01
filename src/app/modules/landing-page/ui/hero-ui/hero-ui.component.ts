import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DeviceDetectorService } from '../../../../core/handlers/device-detector/device-detector.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hero-ui',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
  templateUrl: './hero-ui.component.html',
  styleUrl: './hero-ui.component.scss',
})
export class HeroUiComponent {
  callToEnded = output<boolean>();
  deviceDetectorService = inject(DeviceDetectorService);

  device$ = this.deviceDetectorService.getDeviceTypeObservable();

  emitEnded() {
    this.callToEnded.emit(true);
  }
}
