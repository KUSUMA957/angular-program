import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'napipe',
})
export class NapipePipe implements PipeTransform {
  transform(value: any): any {
    return value ? value : 'N/A';
  }
}
