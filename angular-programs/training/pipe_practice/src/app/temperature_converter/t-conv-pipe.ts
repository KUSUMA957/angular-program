import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tConv',
})
export class TConvPipe implements PipeTransform {
  transform(value: number, unit: string = 'C'): number {
    if (unit === 'F') {
      return (value * 9) / 5 + 32; // Celsius → Fahrenheit
    }
    return value; // return Celsius as-is
  }
}
