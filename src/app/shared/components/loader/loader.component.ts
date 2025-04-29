import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../animations/animations.global';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  animations: [fadeInOut],
})
export class LoaderComponent {
  loader = inject(LoaderService);

  get loading() {
    return this.loader.loading$;
  }
}
