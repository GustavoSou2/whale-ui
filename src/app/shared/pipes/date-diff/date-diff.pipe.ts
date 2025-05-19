import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDiff',
  standalone: true,
})
export class DateDiffPipe implements PipeTransform {
  transform(
    start: Date | string,
    end: Date | string,
    unit: 'days' | 'hours' | 'minutes' | 'seconds' = 'days'
  ): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = endDate.getTime() - startDate.getTime();

    switch (unit) {
      case 'seconds':
        return Math.floor(diffInMs / 1000);
      case 'minutes':
        return Math.floor(diffInMs / (1000 * 60));
      case 'hours':
        return Math.floor(diffInMs / (1000 * 60 * 60));
      case 'days':
        return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      default:
        return diffInMs;
    }
  }
}
