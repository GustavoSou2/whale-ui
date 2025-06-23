import { Component } from '@angular/core';
import { ConfigUiComponent } from '../../ui/config-ui/config-ui.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [ConfigUiComponent],
  template: `<config-ui />`,
})
export class ConfigComponent {}
