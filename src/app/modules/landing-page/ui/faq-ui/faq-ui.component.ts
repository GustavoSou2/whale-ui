import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'faq-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-ui.component.html',
  styleUrl: './faq-ui.component.scss',
  animations: [
    trigger('collapseAnimation', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class FaqUiComponent {
  openIndex: number | null = null;

  faqs = [
    {
      question: 'O que é a plataforma?',
      answer:
        'Nossa plataforma é uma solução completa e especializada em gestão de obras para empresas da construção civil. Com ela, você consegue estruturar seus projetos desde o início até a entrega final, utilizando recursos como planos de ação inteligentes, fluxos de aprovação e controle detalhado de cada etapa da obra. É ideal para quem busca organização, produtividade e padronização nos processos construtivos.',
    },
    {
      question: 'Quais setores da construção civil podem usar a plataforma?',
      answer:
        'A plataforma é altamente adaptável e atende desde pequenas empreiteiras até grandes construtoras, escritórios de engenharia, arquitetos, prestadores de serviço e empresas que atuam com reformas, manutenções ou obras de grande porte. Qualquer profissional ou empresa que precise controlar obras com mais eficiência pode se beneficiar da ferramenta.',
    },
    {
      question: 'Como funciona o plano de ação?',
      answer:
        'O plano de ação é um recurso central do sistema onde você estrutura todas as etapas de um projeto. Nele, é possível dividir as fases da obra em itens e subitens, atribuir responsáveis, definir prazos, adicionar tarefas, anexar documentos, acompanhar pendências e registrar observações. Além disso, é possível automatizar checklists e validações, garantindo que cada etapa seja concluída corretamente antes de avançar.',
    },
    {
      question: 'O que é o fluxo de aprovação?',
      answer:
        'O fluxo de aprovação é um mecanismo de controle que permite definir etapas da obra que só podem ser concluídas mediante a validação de um ou mais responsáveis. Isso garante que decisões críticas, como o fechamento de orçamento, execução de etapas ou finalização de entregas, passem por uma revisão técnica ou gerencial antes de seguirem adiante, evitando erros e retrabalhos.',
    },
    {
      question: 'Posso gerar relatórios em PDF e Excel?',
      answer:
        'Sim. A plataforma permite gerar relatórios detalhados sobre planos de ação, status de projetos, checklists, tarefas realizadas, validações pendentes e muito mais. Esses relatórios podem ser exportados em formatos PDF e Excel para facilitar auditorias, apresentações ou compartilhamento com clientes e stakeholders.',
    },
    {
      question: 'Quantas pessoas podem usar o sistema?',
      answer:
        'O número de usuários permitidos varia conforme o plano contratado. O plano Essencial permite até 3 usuários, o plano Profissional até 10 e o plano Enterprise oferece suporte a equipes ilimitadas. Além disso, é possível configurar perfis e permissões para cada usuário, garantindo segurança e controle sobre o que cada colaborador pode acessar e modificar.',
    },
    {
      question: 'É necessário instalar algo?',
      answer:
        'Não. A plataforma é totalmente baseada na nuvem, o que significa que você não precisa instalar nada em seus dispositivos. Basta acessar com seu login a partir de qualquer navegador moderno, seja em computadores, tablets ou smartphones. Isso garante mobilidade, atualizações automáticas e acesso seguro de qualquer lugar.',
    },
  ];

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
