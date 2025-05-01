import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PhoneMaskDirective } from '../../../../core/directives/phone-mask/phone-mask.directive';

@Component({
  selector: 'contact-ui',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule, ButtonComponent, PhoneMaskDirective],
  templateUrl: './contact-ui.component.html',
  styleUrl: './contact-ui.component.scss',
})
export class ContactUiComponent {
  
  fb = inject(FormBuilder);
  contact = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required]],
    email: [''],
    message: [''],
  });

  onSubmit() {
    console.log('Form submitted:', this.contact.value);
  }
}
