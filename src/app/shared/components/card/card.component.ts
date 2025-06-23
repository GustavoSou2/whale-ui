import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  project = input<any>();

  router = inject(Router);

  get banner() {
    return this.project().banner;
  }

  get id() {
    return this.project().id;
  }

  get name() {
    return this.project().name;
  }

  get description() {
    let description = this.project().description;
    return description.length > 150
      ? this.project().description.slice(0, 150) + '...'
      : this.project().description;
  }

  get status() {
    return this.project().project_status;
  }

  get created_by() {
    return this.project().users;
  }

  get clients() {
    return this.project().clients;
  }

  get init_date() {
    return this.project().init_date;
  }

  get end_date() {
    return this.project().end_date;
  }

  get favorite() {
    return this.project().favorite;
  }

  set favorite(value: boolean) {
    this.project().favorite = value;
  }

  navigate() {
    this.router.navigate([`/projects/${this.id}/detail`]).then(() => {});
  }
}
