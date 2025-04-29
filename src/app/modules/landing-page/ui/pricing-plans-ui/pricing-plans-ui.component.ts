import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'pricing-plans-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-plans-ui.component.html',
  styleUrl: './pricing-plans-ui.component.scss',
})
export class PricingPlansUiComponent {
  plans = [
    {
      name: 'Essencial',
      priceMonthly: 89,
      priceYearly: 854,
      features: [
        { label: 'Até 3 usuários', included: true },
        { label: 'Projetos ilimitados', included: true },
        { label: 'Plano de ação padrão', included: true },
        { label: 'Fluxo de aprovação básico', included: true },
        { label: 'Comentários e checklists', included: true },
        { label: 'Relatórios PDF/Excel', included: false },
        { label: 'Upload de arquivos', included: false },
        { label: 'Integrações personalizadas', included: false },
      ],
      popular: false,
    },
    {
      name: 'Profissional',
      priceMonthly: 189,
      priceYearly: 1814,
      features: [
        { label: 'Até 10 usuários', included: true },
        { label: 'Projetos ilimitados', included: true },
        { label: 'Fluxos personalizados', included: true },
        { label: 'Relatórios PDF/Excel', included: true },
        { label: 'Upload de arquivos', included: true },
        { label: 'Dashboard avançado', included: true },
        { label: 'Integrações personalizadas', included: false },
        { label: 'Suporte dedicado', included: false },
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      priceMonthly: 239,
      priceYearly: 2294,
      features: [
        { label: 'Usuários ilimitados', included: true },
        { label: 'Projetos ilimitados', included: true },
        { label: 'Fluxos personalizados', included: true },
        { label: 'Relatórios PDF/Excel', included: true },
        { label: 'Upload de arquivos', included: true },
        { label: 'Integrações personalizadas', included: true },
        { label: 'Suporte dedicado', included: true },
        { label: 'Treinamento e implantação', included: true },
      ],
      popular: false,
    },
  ];
}
