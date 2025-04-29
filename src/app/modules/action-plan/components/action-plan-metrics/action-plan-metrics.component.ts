import { CommonModule } from '@angular/common';
import { Component, Input, input, output, signal } from '@angular/core';

const metricsTotalsKeys = [
  'totalTargets',
  'totalEstimated',
  'totalActual',
  'totalDifference',
] as const;

const METRICS_TOTALS_DICTIONARY = {
  totalTargets: 'Total de Ações',
  totalEstimated: 'Gastos Estimados',
  totalActual: 'Gastos Reais',
  totalDifference: 'Diferença de Gastos',
};

type ActionPlanMetricsTotals = (typeof metricsTotalsKeys)[number];

type ActionPlanMetricsTotalsType = {
  [key in ActionPlanMetricsTotals]: number;
};

interface Metrics {
  totalTargets: number;
  totalEstimated: number;
  totalActual: number;
  totalDifference: number;
  groupedByCategory: Record<string, number>;
  groupedByPriority: Record<string, number>;
  groupedByUser: Record<string, number>;
  groupedByActionType: Record<string, number>;
}

@Component({
  selector: 'action-plan-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-plan-metrics.component.html',
  styleUrl: './action-plan-metrics.component.scss',
})
export class ActionPlanMetricsComponent {
  @Input() set metrics(data: Metrics) {
    if (!data) return;
    
    this.metricsTotal.set([]);

    Object.entries(data).forEach(([key, value]) => {
      const isMetricsTotalKey = metricsTotalsKeys.includes(
        key as ActionPlanMetricsTotals
      );

      if (!!isMetricsTotalKey) {
        this.metricsTotal.update((prev) => [
          ...prev,
          {
            title: METRICS_TOTALS_DICTIONARY[key as ActionPlanMetricsTotals],
            value: value,
          },
        ]);
      }
    });
  }

  metricsTotal = signal<{ title: string; value: number }[]>([]);
}
