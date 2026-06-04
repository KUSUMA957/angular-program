import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evenOdd',
})
export class EvenOddPipe implements PipeTransform {
  transform(value: number): string {
    if (value % 2 === 0) return 'Even';
    return 'Odd';
  }
}
