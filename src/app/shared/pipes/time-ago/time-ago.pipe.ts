import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const createdDate = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffYear = Math.floor(diffDay / 365);

    if (diffMin < 1) return 'agora mesmo';
    if (diffMin < 60) return `${diffMin} min atrás`;
    if (diffHr < 24) return `${diffHr}h atrás`;
    if (diffDay < 7) return `${diffDay} dia${diffDay > 1 ? 's' : ''} atrás`;
    if (diffWeek < 52)
      return `${diffWeek} semana${diffWeek > 1 ? 's' : ''} atrás`;
    return `${diffYear} ano${diffYear > 1 ? 's' : ''} atrás`;
  }
}
