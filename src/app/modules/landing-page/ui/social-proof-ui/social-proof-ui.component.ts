import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'social-proof-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-proof-ui.component.html',
  styleUrl: './social-proof-ui.component.scss',
})
export class SocialProofUiComponent {
  feedbacks = [
    {
      name: 'Carlos Silva',
      role: 'Engenheiro Civil',
      feedback:
        'A plataforma tornou a gestão das minhas obras muito mais organizada. Consigo acompanhar tudo em tempo real sem complicações!',
      highlight: 'Facilidade de gestão e monitoramento em tempo real',
    },
    {
      name: 'Mariana Souza',
      role: 'Gerente de Projetos',
      feedback:
        'Com o controle financeiro e os relatórios detalhados, conseguimos economizar mais de 10% no orçamento das últimas obras.',
      highlight: 'Controle financeiro e geração de relatórios',
    },
    {
      name: 'João Pedro Almeida',
      role: 'Construtor Autônomo',
      feedback:
        'A interface é muito intuitiva. Mesmo sem muita experiência com tecnologia, consegui usar tudo facilmente!',
      highlight: 'Interface simples e fácil de usar',
    },
    {
      name: 'Fernanda Lima',
      role: 'Coordenadora de Obras',
      feedback:
        'A integração entre equipes melhorou demais. Agora todos sabem exatamente o que fazer e quando fazer!',
      highlight: 'Comunicação e alinhamento de equipes',
    },
    {
      name: 'Ricardo Menezes',
      role: 'Arquiteto',
      feedback:
        'Os fluxos de aprovação e a gestão de tarefas estão impecáveis. Reduzimos bastante o retrabalho nas nossas entregas.',
      highlight: 'Automação de tarefas e fluxos de aprovação',
    },
  ];
}
