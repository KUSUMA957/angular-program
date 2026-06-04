import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'result',
  standalone: true
})
export class ResultPipe implements PipeTransform {
  transform(marks: number, total: number, format: string = 'percentage'): string {
    const percentage = (marks / total) * 100;
    
    if (format === 'percentage') {
      return `${marks}/${total} (${percentage.toFixed(1)}%)`;
    } else if (format === 'fraction') {
      return `${marks}/${total}`;
    } else if (format === 'grade') {
      if (percentage >= 90) return `${marks}/${total} - A+`;
      if (percentage >= 80) return `${marks}/${total} - A`;
      if (percentage >= 70) return `${marks}/${total} - B`;
      if (percentage >= 60) return `${marks}/${total} - C`;
      if (percentage >= 50) return `${marks}/${total} - D`;
      return `${marks}/${total} - F`;
    }
    
    return `${marks}/${total}`;
  }
}
