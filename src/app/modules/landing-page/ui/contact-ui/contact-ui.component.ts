import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'contact-ui',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './contact-ui.component.html',
  styleUrl: './contact-ui.component.scss',
})
export class ContactUiComponent {
  name = '';
  phone = '';
  email = '';
  message = '';

  onSubmit() {
    console.log('Form submitted:', {
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
    });
  }
}
