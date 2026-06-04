import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordMask',
})
export class PasswordMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    if (value.length <= 2) return value; // no masking needed
    const maskLength = value.length - 2;
    return '*'.repeat(maskLength) + value.slice(-2);
  }
}
