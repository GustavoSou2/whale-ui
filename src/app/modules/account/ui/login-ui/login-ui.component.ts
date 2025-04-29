import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputCustomComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'login-ui',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCustomComponent,
    ButtonComponent,
  ],
  templateUrl: './login-ui.component.html',
  styleUrl: './login-ui.component.scss',
})
export class LoginUiComponent {
  @Input() form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
}
