import { Component, Input } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { TextareaCustomComponent } from '../textarea-custom/textarea-custom.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/time-ago/time-ago.pipe';

@Component({
  selector: 'comments',
  standalone: true,
  imports: [
    AvatarComponent,
    FormsModule,
    TextareaCustomComponent,
    ButtonComponent,
    CommonModule,
    TimeAgoPipe,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() bgDetail = 'var(--big-stone-50)';

  comment: any;

  addComment() {}

  comments = [
    {
      users: { username: 'João Silva' },
      content:
        'Estou acompanhando o andamento desse projeto desde o início e preciso dizer que está superando as expectativas. A estrutura está bem organizada e o código limpo facilita muito o entendimento. Parabéns a todos os envolvidos!',
      created_at: new Date('2025-04-18T09:15:30'),
    },
    {
      users: { username: 'Maria Oliveira' },
      content:
        'Notei que na tela de orçamento ainda não temos um filtro por período. Acho que isso ajudaria bastante na hora de visualizar os lançamentos mensais e comparar com orçamentos anteriores. Podemos discutir essa melhoria?',
      created_at: new Date('2025-04-19T11:02:45'),
    },
  ];
}
