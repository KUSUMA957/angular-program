import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe',
})
export class CustompipePipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(names: string[], searchText: string): string[] {
    if(!names || !searchText) {
      return names;
    }
    const search = searchText.toLowerCase();
    return names.filter(name =>
      name.toLowerCase().includes(search)
    );
  }
}
