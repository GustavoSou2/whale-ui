import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PhoneMaskDirective } from '../../../../core/directives/phone-mask/phone-mask.directive';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ContactService } from '../../services/contact/contact.service';
import { TextareaCustomComponent } from '../../../../shared/components/textarea-custom/textarea-custom.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'contact-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    SelectComponent,
    InputCustomComponent,
    TextareaCustomComponent,
  ],
  templateUrl: './contact-ui.component.html',
  styleUrl: './contact-ui.component.scss',
  providers: [ContactService],
})
export class ContactUiComponent {
  fb = inject(FormBuilder);
  contactService = inject(ContactService);
  toastService = inject(ToastService);

  contact = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    origin: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  onSubmit() {
    const contactFormValue = this.contact.value;
    
    this.contactService
      .sendContactForm(<any>contactFormValue)
      .pipe(
        tap(() => {
          this.toastService.addToast('Sucesso', 'Email enviado com sucesso!');
          this.contact.reset();
        }),
        catchError((error) => {
          this.toastService.addToast(
            'Erro',
            'Ocorreu um erro ao enviar o email.'
          );
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
